

import Vue from 'vue'
//import VueSession from 'vue-session'

//Vue.use(VueSession)

//import Notificaciones from './helpers/Notificaciones'

/*export const getSession = () => {
    var session = JSON.parse(localStorage.getItem("usuario_sesion"));  
    return session;  
}*/

export const setSession = (session) => {
  localStorage.setItem("usuario_sesion",JSON.stringify(session));    
  //VueSession.$session.setItem("usuario_sesion",session);
}

export const setToken = (token) => {
  //localStorage.setItem("jwt",token);    
  //VueSession.$session.setItem("token",token);
  localStorage.setItem("token",token);    
}

export const getToken = () => {
  //console.log("VueSession "+Vue-prototype.$session) 
  //let token = Vue-prototype.$session.getItem("token");
  //return token || null;
  let token = localStorage.getItem("token");
  return token || null;
}

export const getUsuarioSesion = () => {
//  return getSession() ? getSession().usuario : null
   //let usuario = VueSession.$session.getItem("usuario_sesion");
   //return usuario || null;     
   let sesion = JSON.parse(localStorage.getItem("usuario_sesion"));     
   console.log(sesion); 
   return sesion.usuario || null;     
};  
///export const token = getSession() ? getSession().token : null;  


export const clearSesion = () => {
console.log("======== SESION OUT ============");
 // vue.prototype.$session.removeItem("usuario_sesion",session);
 // vue.prototype.$session.removeItem("token",session);
  localStorage.removeItem("usuario_sesion");    
  localStorage.removeItem("token");    

}

