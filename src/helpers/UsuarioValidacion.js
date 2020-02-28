

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
    if (usuario.correo != null && usuario.correo != undefined) {
      if (validarEmail(usuario.correo)) {
        Vue.prototype.$notificacion.error('Formato de correo ', 'El correo no cumple con el formato correcto.');
        return false;
      }
    }

    if (usuario.hora_entrada == null || usuario.hora_salida == null
      || usuario.hora_entrada == '' || usuario.hora_salida == '') {
      Vue.prototype.$notificacion.error('Selecciona la hora de entrada y salida', 'La hora de entrada y salida son requeridos.');
      return false;
    }

    //--validar horario
    let horaEntrada = moment((usuario.hora_entrada.HH+':'+usuario.hora_entrada.mm),'HH:mm');
      let horaSalida = moment((usuario.hora_salida.HH+':'+usuario.hora_salida.mm),'HH:mm');
      
    if (horaSalida <= horaEntrada) {
      Vue.prototype.$notificacion.error('Hora de entrada y salida', 'La hora de entrada es menos a la hora de salida.');
      return false;
    }

    return true;
  }
}

