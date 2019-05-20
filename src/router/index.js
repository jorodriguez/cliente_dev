import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Principal from '@/components/Principal'
import CatAlumno from '@/components/CatAlumno'
import PerfilAlumno from '@/components/PerfilAlumno'
import Asistencia from '@/asistencia/Asistencia'
import RegistroActividad from '@/actividad/RegistroActividad'
import VueSession from 'vue-session'

Vue.use(Router);
Vue.use(VueSession);

//{ path: '/', name: 'Login', component: Login },
export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name:'Login', component: Login },
    { path: '/principal', name: 'PaginaPrincipal', component: Principal },
    { path: '/CatAlumno', name: 'CatAlumno', component: CatAlumno },
    { path: '/PerfilAlumno/:id', name: 'PerfilAlumno', component: PerfilAlumno },
    { path: '/Asistencia', name: 'Asistencia', component: Asistencia },
    { path: '/Actividades', name: 'Actividades', component: RegistroActividad }
  ]
})
