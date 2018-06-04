// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Store from './store/store';
import Router from './router/router'

import App from './pages/index';

import './assets/styles/styles.scss';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router: Router,
  store: Store,
  components: { App },
  template: '<App/>',
});
