/**
 * @desc all route will be registered by this file
 * @author pika
 */
import dynamic from 'dva/dynamic'
import Loading from '@/components/loading'
// set default loading before component load
dynamic.setDefaultLoadingComponent(Loading)
export default [{
    path: '/',
    pathname: 'Home',
    component: app => dynamic({
        app,
        component: () => import('./routes/home/index'),
        models: () => [
            import('./models/home/model'),
        ]
    })
}, {
    path: '/league',
    pathname: 'menu1',
    component: app => dynamic({
        app,
        component: () => import('./routes/league/index'),
        models: () => [
            import('./models/league/model'),
        ]
    })
}, {
    path: '/league/add',
    pathname: 'menu1-1',
    component: app => dynamic({
        app,
        component: () => import('./routes/league/add/index'),
        models: () => [
            import('./models/league/model'),
        ]
    })
}]