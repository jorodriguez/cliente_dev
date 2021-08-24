

import Vue from 'vue'
import * as moment from 'moment';
import { validarEmail } from './CorreoValidacion'

export const validarDatosAviso = (aviso) => {
  console.log("# VALIDACION DE AVISO #");
  if (aviso == null || aviso == undefined) {
    return false;
  } else {

    if (!aviso.para || aviso.para == '' || aviso.para == null) {      
      Vue.prototype.$notificacion.error('Selecciona para', 'Selecciona para quien será el aviso.');
      return false;      
  }

    if (!aviso.titulo) {      
        Vue.prototype.$notificacion.error('Titulo requerido', 'El titulo es requerido.');
        return false;      
    }
   

    if (!aviso.aviso) {      
      Vue.prototype.$notificacion.error('Aviso requerido', 'Tienes que escribir el contenido del aviso.');
      return false;      
  }
   

    return true;
  }
}

