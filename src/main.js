// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource';
import VueSessionStorage from 'vue-sessionstorage'
import VueGoogleCharts from 'vue-google-charts'
import Notifications from 'vue-notification'
import Notificaciones from './helpers/Notificaciones'
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import VuePageTransition from 'vue-page-transition'

/*import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, email } from 'vee-validate/dist/rules';
extend('required', {
  ...required,
  message: 'Campo requerido'
});
extend('email', email);*/

Vue.use(VueResource);
Vue.use(VueSessionStorage)
Vue.use(require('vue-moment'));
Vue.use(VueGoogleCharts);
Vue.use(Notifications);
Vue.use(VueTimepicker);
//Vue.use(Notificacion);
Vue.use(VuePageTransition);
Vue.prototype.$notificacion = Notificaciones;

/*Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
*/
Vue.config.productionTip = false

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App),
})
