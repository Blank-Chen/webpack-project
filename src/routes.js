import React, { useEffect } from 'react'
import dynamic from 'dva/dynamic'
import CommonLayout from '@/components/layout/index'
import Loading from '@/components/loading'
import { Router, Route, Switch } from 'dva/router'

// set defult loading during component load by dva/dynamic
dynamic.setDefaultLoadingComponent(Loading)

/**
* @desc create route by file
* @author pika
*/
function getRoutesByFiles (routeCtx, app) {
    let routes = []
    routeCtx.keys().forEach(key => {
        const curRoutes = routeCtx(key).default
        curRoutes.forEach(route => {
            routes = routes.concat(configRoute(route, app))
        })
    })
    return routes
}

/**
 * @desc render component or not,you can do sth by this before render component
 * @param {Object} dynamic dynamic component
 * @param {Object} app app instance
 * @param {Array} routeStack route in stack
 */
function renderComponent (dynamic, app, routeStack = []) {
    const { _store: { dispatch } } = app
    const DynamicComponent = dynamic
    return function DynamicHooks () {
        useEffect(() => {
            // update routes
            dispatch({
                type: 'system/save',
                payload: {
                    routes: routeStack
                }
            })
        })
        return <DynamicComponent />
    }
}

/**
* @desc parse route by route config
* @param {Object} route route config
* @param {Object} app app instance
* @param {Array} routeStack push every step of route in stack
* @author pika
*/
function configRoute (route, app, routeStack = []) {
    let routes = []
    const { breadcrumbName, path, component } = route
    const stack = [...routeStack].concat([{
        breadcrumbName, path, component
    }])
    const routeConfig = {
        ...route,
        exact: typeof (route.exact) === 'undefined' ? true : route.exact,
        // load component async
        component: renderComponent(dynamic({
            app,
            component: () => route.component,
            models: () => Array.isArray(route.models) ? route.models : [route.models]
        }), app, stack)
    }
    // delete unuse attribute
    delete routeConfig['routes']
    delete routeConfig['models']
    routes.push(routeConfig)
    if (Array.isArray(route.routes)) {
        route.routes.forEach(ele => {
            routes = routes.concat(configRoute(ele, app, stack))
        })
    }
    return routes
}

/**
* @desc create route by route config
* @param {Object} route current route
* @author pika
*/
function createRoute (route) {
    return <Route {...route} key={Math.random().toString(36).substring(6)}>
        {route.routes ? route.routes.map(ele => createRoute(ele)) : null}
    </Route>
}

function RouterConfig ({ app, history }) {
    const routeContext = require.context('./routes', true, /route\.js$/)
    const routes = getRoutesByFiles(routeContext, app)
    return <Router history={history}>
        <CommonLayout>
            <Switch>
                {routes.map(route => createRoute(route))}
            </Switch>
        </CommonLayout>
    </Router>
}
export default RouterConfig