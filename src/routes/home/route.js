/**
 * @desc route config of page home
 * @author pika
 */

const HomePage = import('./index');
const homeModel = import('./model')

export default [
    {
        breadcrumbName: '首页',
        path: '/',
        component: HomePage,
        models: homeModel
    },
];
