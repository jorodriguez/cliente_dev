import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Principal from '@/components/Principal'
import CatAlumno from '@/components/CatAlumno'
import PerfilAlumno from '@/components/PerfilAlumno'
import Asistencia from '@/asistencia/Asistencia'
import RegistroActividad from '@/actividad/RegistroActividad'
import ReporteDeudas from '@/components_admin/ReporteDeudas'
import CrecimientoGlobal from '@/components_admin/CrecimientoGlobal'
import ReporteGastos from '@/components_admin/ReporteGastos'
import Gastos from '@/components/Gastos'
import CambiarSucursal from '@/components/CambiarSucursal'
import ReporteAsistencia from '@/components/ReporteAsistencia'
import ReporteAsistenciasFaltasSucursalMes from '@/components/ReporteAsistenciasFaltasSucursalMes'
import AsistenciasUsuarios from '@/components/AsistenciaUsuarios'
import ReporteAsistenciaRangoFechasSuc from '@/asistencia_usuario/ReporteAsistenciaRangoFechasSuc'
import Bienvenido from '@/components/Bienvenido'
import CatUsuario from '../administracion/paginas/CatUsuario'
import Administracion from '../administracion/Administracion'
import Reportes from '../reportes/Reportes'
import { getUsuarioSesion, getToken } from '../helpers/Sesion';

import VueSession from 'vue-session'

Vue.use(Router);
Vue.use(VueSession);

const router = new Router({
  routes: [
    { path: '/', name: 'Login', component: Login }, 
    {
      path: '/bienvenido', name: 'Bienvenido', component: Bienvenido, meta: { requiresAuth: true },
      children: [
        { path: '/principal', name: 'PaginaPrincipal', component: Principal, meta: { requiresAuth: true }},
        { path: '/CatAlumno', name: 'CatAlumno', component: CatAlumno, meta: { requiresAuth: true } },
        { path: '/PerfilAlumno/:id', name: 'PerfilAlumno', component: PerfilAlumno, meta: { requiresAuth: true } },
        { path: '/Asistencia', name: 'Asistencia', component: Asistencia, meta: { requiresAuth: true } },
        { path: '/Actividades', name: 'Actividades', component: RegistroActividad, meta: { requiresAuth: true } },
        { path: '/Gastos', name: 'Gastos', component: Gastos, meta: { requiresAuth: true } },
        { path: '/CambioSucursal/:id_alumno', name: 'CambioSucursal', component: CambiarSucursal, meta: { requiresAuth: true } },
        { path: '/ReporteAsistencias', name: 'ReporteAsistencias', component: ReporteAsistencia, meta: { requiresAuth: true } },
        { path: '/ReporteAsistenciasSucursalMes', name: 'ReporteAsistenciasSucursalMes', component: ReporteAsistenciasFaltasSucursalMes, meta: { requiresAuth: true } },
        { path: '/AsistenciasUsuarios', name: 'AsistenciasUsuarios', component: AsistenciasUsuarios, meta: { requiresAuth: true } },
        { path: '/AsistenciasUsuarioSucursal', name: 'AsistenciasUsuarioSucursal', component: ReporteAsistenciaRangoFechasSuc, meta: { requiresAuth: true } },
        { path: '/CatalogoUsuario', name: 'CatalogoUsuario', component: CatUsuario, meta: { requiresAuth: true } },
        { path: '/Administracion', name: 'Administracion', component: Administracion, meta: { requiresAuth: true } },
        { path: '/Reportes', name: 'Reportes', component: Reportes, meta: { requiresAuth: true } },

        {path: '/ReporteAdmin', name: 'ReporteDeudas', component: ReporteDeudas, meta: { requiresAuth: true ,is_admin: true}},
        { path: '/CrecimientoGlobal', name: 'CrecimientoGlobal', component: CrecimientoGlobal, meta: { requiresAuth: true, is_admin: true } },
        { path: '/ReporteGastos', name: 'ReporteGastos', component: ReporteGastos, meta: { requiresAuth: true } }
      ]
    },
    /*{
      path: '/ReporteAdmin', name: 'ReporteDeudas', component: ReporteDeudas, meta: { requiresAuth: true },
      children: [
        { path: '/CrecimientoGlobal', name: 'CrecimientoGlobal', component: CrecimientoGlobal, meta: { requiresAuth: true, is_admin: true } },
        { path: '/ReporteGastos', name: 'ReporteGastos', component: ReporteGastos, meta: { requiresAuth: true } },
      ]
    },*/
        { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("@beforeEach");

  if (to.matched.some(record => record.meta.requiresAuth)) {
    console.log("@Requiere auth");
    if (getToken() == null) {
      console.log("no tiene sesion pasa a login");
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      console.log("Revisando Sesion");
      let user = getUsuarioSesion();
      console.log("USUARIO " + (user!=null)+" admin "+user.permiso_gerente);
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.permiso_gerente) {
          console.log("Es Admin");
          next();
        }else {
          console.log("redireccion a home de admin");
          next({ name: 'ReporteAdmin' })
        }
      } else {
        console.log("PASA a URL");
        next()
      }
    }
  } else {
    console.log("No requiere AUTH");    
    next();
  } /*else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {

      next()
    }
    else {
      next({ name: 'principal' })
    }
  } else {
    next()
  }*/

});

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router;