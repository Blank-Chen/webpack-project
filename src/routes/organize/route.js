/**
* @desc route config of organize
* @author pika
*/

const OrganizePage = import('./index');
const organizeModel = import('./model');
const OrganizeEdit = import('./edit');
const OrganizeInfo = import('./detail');

export default [
  {
    breadcrumbName: 'menu2',
    path: '/organize',
    models: organizeModel,
    component: OrganizePage,
    routes: [{
      breadcrumbName: 'menu2-add',
      path: '/organize/add',
      models: organizeModel,
      component: OrganizeEdit,
    }, {
      breadcrumbName: 'menu2-detail',
      path: '/organize/info/:id',
      models: organizeModel,
      component: OrganizeInfo,
    }],
  },
];
