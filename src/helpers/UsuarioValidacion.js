

import Vue from 'vue'
import * as moment from 'moment';


export const validarDatosUsuario = (usuario) => {
  console.log("# VALIDACION DE USUARIO #");
  if (usuario == null || usuario == undefined) {
    return false;
  } else {

    if (usuario.nombre == '') {      
      Vue.prototype.$notificacion.error('Escribe el nombre', 'El nombre es requerido.');
      return false;
    }
    if (usuario.correo == '') {      
      Vue.prototype.$notificacion.error('Escribe el correo', 'El correo es requerido.');
      return false;
    }
    
    if (usuario.horaEntrada == null || usuario.horaSalida == null
        || usuario.horaEntrada == '' || usuario.horaSalida == '') {      
      Vue.prototype.$notificacion.error('Selecciona la hora de entrada y salida', 'La hora de entrada y salida son requeridos.');
      return false;
    }
    
    //--validar horario
    let horaEntrada = moment(usuario.horaEntrada);
    let horaSalida = moment(usuario.horaSalida);
    if(horaSalida <= horaEntrada){
      Vue.prototype.$notificacion.error('Hora de entrada y salida', 'La hora de entrada es menos a la hora de salida.');
       return false;
    }

    return true;
  }
}

