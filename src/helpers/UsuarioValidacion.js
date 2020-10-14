

import Vue from 'vue'
import * as moment from 'moment';
import { validarEmail } from './CorreoValidacion'

export const validarDatosUsuario = (usuario) => {
  console.log("# VALIDACION DE USUARIO #");
  if (usuario == null || usuario == undefined) {
    return false;
  } else {

    if (usuario.nombre == '') {
      Vue.prototype.$notificacion.error('Escribe el nombre', 'El nombre es requerido.');
      return false;
    }

    if (usuario.correo != null && usuario.correo != undefined && usuario.correo != '') {
      if (!validarEmail(usuario.correo)) {
        Vue.prototype.$notificacion.error('Formato de correo ', 'El correo no cumple con el formato correcto.');
        return false;
      }
    }

    if (usuario.sueldo_mensual == null 
              || usuario.sueldo_mensual == undefined 
              || usuario.sueldo_mensual == '') {      
        Vue.prototype.$notificacion.error('Escribe el sueldo mensual', 'El sueldo mensual es requerido.');
        return false;      
    }

    if (usuario.hora_entrada == null || usuario.hora_salida == null
      || usuario.hora_entrada == '' || usuario.hora_salida == '') {
      Vue.prototype.$notificacion.error('Selecciona la hora de entrada y salida', 'La hora de entrada y salida son requeridos.');
      return false;
    }

    //--validar horario
    console.log("hora entrada"+usuario.hora_entrada.HH+" "+usuario.hora_entrada);
    console.log("hora entrada"+usuario.hora_salida.HH+" "+usuario.hora_salida);

   // let horaEntrada = moment(usuario.hora_entrada);
   // let horaSalida = moment(usuario.hora_salida);

    /*let horaEntrada = moment((usuario.hora_entrada.HH+':'+usuario.hora_entrada.mm),'HH:mm');
      let horaSalida = moment((usuario.hora_salida.HH+':'+usuario.hora_salida.mm),'HH:mm');
      */
    if (usuario.hora_salida <= usuario.hora_entrada) {
      Vue.prototype.$notificacion.error('Hora de entrada y salida', 'La hora de entrada es menos a la hora de salida.');
      return false;
    }

    return true;
  }
}

