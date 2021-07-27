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
import { getUsuarioSesion, getSesion, getToken } from '../helpers/Sesion';
import SubirFotoAlumno from '@/components/SubirFotoAlumno'
import ReporteAsistenciaUsuariosRh from '@/components/ReporteAsistenciaUsuariosRh'
import AdministrarUsuariosRh from '@/components_admin/AdministrarUsuariosRh'

import VueSession from 'vue-session'

Vue.use(Router);
Vue.use(VueSession);

const router = new Router({
  routes: [
    {
      path: '/',
      beforeEnter(to, from, next) {
        console.log("REVISNADO SESION ");
        const sesion = getSesion();
        if (sesion != null && sesion.auth) {
          console.log("REDIRECCION A " + sesion.paginaPrincipal);
          next({ path: sesion.paginaPrincipal });
        } else {
          next({ name: 'Login' });
        }
      },
    },
    { path: '/login', name: 'Login', component: Login },    
    {       
      path: '/bienvenido', name: 'Bienvenido', component: Bienvenido, meta: { requiresAuth: true },
      children: [
        { path: '/principal', name: 'PaginaPrincipal', component: Principal, meta: { requiresAuth: true, validar: false } },
        { path: '/CatAlumno', name: 'CatAlumno', component: CatAlumno, meta: { requiresAuth: true, validar: false } },
        { path: '/PerfilAlumno/:id', name: 'PerfilAlumno', component: PerfilAlumno, meta: { requiresAuth: true, validar: false } },
        { path: '/SubirFotoAlumno/:id', name: 'SubirFotoAlumno', component: SubirFotoAlumno, meta: { requiresAuth: true, validar: false } },        
        { path: '/Asistencia', name: 'Asistencia', component: Asistencia, meta: { requiresAuth: true, validar: false } },
        { path: '/Actividades', name: 'Actividades', component: RegistroActividad, meta: { requiresAuth: true, validar: false } },
        { path: '/Gastos', name: 'Gastos', component: Gastos, meta: { requiresAuth: true, validar: false } },
        { path: '/CambioSucursal/:id_alumno', name: 'CambioSucursal', component: CambiarSucursal, meta: { requiresAuth: true, validar: false } },
        { path: '/ReporteAsistencias', name: 'ReporteAsistencias', component: ReporteAsistencia, meta: { requiresAuth: true, validar: false } },
        { path: '/ReporteAsistenciasSucursalMes', name: 'ReporteAsistenciasSucursalMes', component: ReporteAsistenciasFaltasSucursalMes, meta: { requiresAuth: true, validar: false } },
        { path: '/AsistenciasUsuarios', name: 'AsistenciasUsuarios', component: AsistenciasUsuarios, meta: { requiresAuth: true, validar: false } },
        { path: '/AsistenciasUsuarioSucursal', name: 'AsistenciasUsuarioSucursal', component: ReporteAsistenciaRangoFechasSuc, meta: { requiresAuth: true, validar: true } },
        { path: '/AsistenciasUsuariosRh', name: 'AsistenciasUsuariosRh', component: ReporteAsistenciaUsuariosRh, meta: { requiresAuth: true, validar: true } },
        { path: '/CatalogoUsuario', name: 'CatalogoUsuario', component: CatUsuario, meta: { requiresAuth: true, validar: false } },
        { path: '/Administracion', name: 'Administracion', component: Administracion, meta: { requiresAuth: true, validar: false } },
        { path: '/Reportes', name: 'Reportes', component: Reportes, meta: { requiresAuth: true, validar: false } },

        { path: '/ReporteAdmin', name: 'ReporteDeudas', component: ReporteDeudas, meta: { requiresAuth: true, is_admin: true, validar: false } },
        { path: '/CrecimientoGlobal', name: 'CrecimientoGlobal', component: CrecimientoGlobal, meta: { requiresAuth: true, is_admin: true, validar: false } },
        { path: '/ReporteGastos', name: 'ReporteGastos', component: ReporteGastos, meta: { requiresAuth: true, validar: false } },
        { path: '/UsuariosRh', name: 'UsuariosRh', component: AdministrarUsuariosRh, meta: { requiresAuth: true, validar: false,is_admin: true, } }

      ]
    },
    /*{ si se activa no se ve el menu
      path: '/ReporteAdmin', name: 'ReporteDeudas', component: ReporteDeudas, meta: { requiresAuth: true , is_admin: true },
      children: [
        { path: '/CrecimientoGlobal', name: 'CrecimientoGlobal', component: CrecimientoGlobal, meta: { requiresAuth: true, is_admin: true } },
        { path: '/ReporteGastos', name: 'ReporteGastos', component: ReporteGastos, meta: { requiresAuth: true, is_admin: true  } },
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
      //console.log(" SESION "+JSON.stringify(user));
      console.log("USUARIO " + (user != null) + " admin " + user.permiso_gerente);
      if (to.matched.some(record => record.meta.is_admin)) {
        if (user.permiso_gerente) {
          console.log("Es Admin");
          next();
        } else {
          console.log("redireccion a home de admin");
          next({ name: 'ReporteAdmin' })
        }
      } else {
        if (to.matched.some(record => record.meta.validar)) {
          console.log("#### VALIDAR ### " + JSON.stringify(to.name));
          let roles = user.opciones_acceso || [];
          let pasaValidacion = false;
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].ruta == to.name) {
              pasaValidacion = true;
            }
          }
          if (pasaValidacion) {
            next();
          } else {
            next({ name: 'PaginaPrincipal' });
          }
        } else {
          console.log("PASA a URL");
          next();
        }
      }
    }
  } else {
    console.log("No requiere AUTH");
    next();
  } 
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