/**
* @desc route config of league
* @author pika
*/

const LeaguePage = import('./index');
const leagueModel = import('./model');
const LeagueAdd = import('./add');

export default [
  {
    breadcrumbName: 'menu1',
    path: '/league',
    models: leagueModel,
    component: LeaguePage,
    routes: [{
      breadcrumbName: 'menu1-add',
      path: '/league/add',
      models: leagueModel,
      component: LeagueAdd,
    }],
  },
];
