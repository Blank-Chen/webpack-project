import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import NotFound from '@/routes/404'
import CommonLayout from '@/components/layout'
import routes from './router.config.js'

/**
 * @desc 主生成路由函数
 * @param {Object} route 路由配置
 * @param {Object} app dva app
 */
const createRoute = (route, app) => {
    const Component = route.component(app)
    return <Route key={Math.random().toString(36).substring(6)} path={route.path} exact={typeof (route.exact) === 'undefined' ? true : route.exact} component={Component}>
        {route.children && route.children.map(ele => {
            return createRoute(ele, app)
        })}
    </Route>
}

function RouterConfig ({ history, app }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/404' component={NotFound} />
                <CommonLayout>
                    <Switch>
                        {
                            routes.map(route => createRoute(route, app))
                        }
                        <Redirect to="/404" />
                    </Switch>
                </CommonLayout>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
