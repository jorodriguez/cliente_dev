import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Principal from '@/components/Principal'
import CatAlumno from '@/components/CatAlumno'
import PerfilAlumno from '@/components/PerfilAlumno'
import Asistencia from '@/asistencia/Asistencia'
import RegistroActividad from '@/actividad/RegistroActividad'
import Home from '@/components/Home'
import VueSession from 'vue-session'

Vue.use(Router);
Vue.use(VueSession);

//export default new Router({      
  const router = new Router({   
    //{ path: '/', name:'Login', component: Login },        
  routes: [    
    { path: '/', name:'Login', component: Login },        ,        
    //{ path: '/login', name:'Login', component: Login },        
    { path: '/principal', name: 'PaginaPrincipal', component: Principal },
    { path: '/CatAlumno', name: 'CatAlumno', component: CatAlumno },
    { path: '/PerfilAlumno/:id', name: 'PerfilAlumno', component: PerfilAlumno },
    { path: '/Asistencia', name: 'Asistencia', component: Asistencia },
    { path: '/Actividades', name: 'Actividades', component: RegistroActividad }
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