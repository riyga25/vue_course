import Vue from 'vue'
import App from './App'
import './assets/styles/styles.scss';

var vm = new Vue({
  el: '#app',
  render: h => h(App),
  data:{
    text : 'Hello'
  }
});
