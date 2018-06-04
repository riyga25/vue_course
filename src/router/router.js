import Vue from 'vue';
import Router from 'vue-router';

import Home from '../pages/Home'
import Edit from '../pages/PlaceAdd'
import Detail from '../pages/Detail'
import Error from '../pages/Error'

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
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/place/:id',
      name: 'place',
      component: Detail,
      props: true
    },
  ]
})
