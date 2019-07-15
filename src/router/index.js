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
import Home from '@/components/Home'
import VueSession from 'vue-session'

Vue.use(Router);
Vue.use(VueSession);

const router = new Router({       
  routes: [    
    { path: '/', name:'Login', component: Login },        ,        
    //{ path: '/login', name:'Login', component: Login },        
    { path: '/principal', name: 'PaginaPrincipal', component: Principal },
    { path: '/CatAlumno', name: 'CatAlumno', component: CatAlumno },
    { path: '/PerfilAlumno/:id', name: 'PerfilAlumno', component: PerfilAlumno },
    { path: '/Asistencia', name: 'Asistencia', component: Asistencia },
    { path: '/Actividades', name: 'Actividades', component: RegistroActividad },
    { path: '/ReporteAdmin', name: 'ReporteDeudas', component: ReporteDeudas },
    { path: '/CrecimientoGlobal', name: 'CrecimientoGlobal', component: CrecimientoGlobal},
    { path: '/Gastos', name: 'Gastos', component: Gastos},
    { path: '/ReporteGastos', name: 'ReporteGastos', component:ReporteGastos },
    {path: '*', redirect: '/'}
  ]
})


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