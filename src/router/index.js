import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Principal from '@/components/Principal'
import CatAlumno from '@/components/CatAlumno'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',name: 'Login', component: Login},
    { path: '/principal', name: 'PaginaPrincipal',component: Principal},
    { path: '/CatAlumno', name: 'CatAlumno',component: CatAlumno}
  ]
})
