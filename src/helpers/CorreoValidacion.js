

import Vue from 'vue'

const REG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/

export function validarEmail(valor) {
  if(valor == null || valor == undefined || valor == ''){
    return false;
  }
  
  return REG.test(valor);
    
}