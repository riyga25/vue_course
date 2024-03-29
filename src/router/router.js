import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home';
import Add from '../pages/PlaceAdd';
import Edit from '../pages/PlaceEdit';
import Detail from '../pages/Detail';
import Error from '../pages/Error';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '*',
      name: 'error',
      component: Error
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/place/add',
      name: 'add',
      component: Add
    },
    {
      path: '/place/edit/:id',
      name: 'edit',
      component: Edit,
      props: true
    },
    {
      path: '/place/:id',
      name: 'place',
      component: Detail,
      props: true
    },
  ]
})
