
import Vue from 'vue'

// constantes de configuracion de goof table
const notificacion = {
  error: function (titulo,descripcion) {
    Vue.notify({
      group: 'notificacion_principal',
      title: (titulo || '¡Atención!'),
      text: (descripcion || ''),
      duration: 2000,
      speed: 1000,
      type: 'error',
      position: 'top center'
    });  
  },
  info: function (titulo,descripcion) {
    Vue.notify({
      group: 'notificacion_principal',
      title: (titulo || '¡Información!'),
      text: (descripcion || ''),
      duration: 2000,
      speed: 1000,
      type: "info",
      position: 'top center'
    });
  },
  warn: function (titulo,descripcion) {
    Vue.notify({
      group: 'notificacion_principal',
      title: (titulo || '¡Atención!'),
      text: (descripcion || ''),
      duration: 2000,
      speed: 1000,
      type: "warn",
      position: 'top center'
    });
  }
}

export default notificacion;


