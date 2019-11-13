// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import VueSessionStorage from 'vue-sessionstorage'
import VueGoogleCharts from 'vue-google-charts'

import FunctionalCalendar from 'vue-functional-calendar';


Vue.use(VueResource);
Vue.use(VueSessionStorage)
Vue.use(require('vue-moment'));
Vue.use(VueGoogleCharts);
/*
Vue.use(FunctionalCalendar, {
  dayNames: ['Moa', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
});*/

Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
})
