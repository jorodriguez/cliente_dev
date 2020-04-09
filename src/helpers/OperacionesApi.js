
import {getToken} from '../helpers/Sesion';

const get = function (url, handler) {
  console.log("== TOKEN INTERNO "+getToken());
 
  this.$http.get(url,
    {
      headers: {
        "x-access-token": getToken()
      }
    })
    .then(
      result => {
        handler(result);
      },
      error => {
        console.error(error);
        console.log("Revisando la sesion " + JSON.stringify(error));
        lanzarAvisoExpiracionSesion(error);
      });
};

const post = function (url, params, handler) {
  this.$http
    .post(
      url, params,
      { headers: { "x-access-token": getToken() } })
    .then(
      result => {
        handler(result);
      },
      error => {
        console.error(error);
        console.log("Revisando la sesion " + JSON.stringify(error));
        lanzarAvisoExpiracionSesion(error);
      });
}


const put = function (url, params, handler) {

  this.$http
    .put(
      url, params,
      { headers: { "x-access-token": getToken() } }
    ).then(
      result => {
        handler(result);
      },
      error => {
        console.error(error);
        console.log("Revisando la sesion " + JSON.stringify(error));
        lanzarAvisoExpiracionSesion(error);
      });
};


const remove = function (url, handler) {
  
  this.$http
    .delete(
      url,
      {
        headers: {
          "x-access-token": getToken()
        }
      })
    .then(
      result => {
        handler(result);
      },
      error => {
        console.error(error);
        console.log(" Error => " + JSON.stringify(error));
        lanzarAvisoExpiracionSesion(error);
      });
};

const lanzarAvisoExpiracionSesion = function (error) {
  console.log("lanzar aviso");
  let mensaje = "";
  let sesionExpirada = false;
  console.log("error " + JSON.stringify(error));
  if (error.ok == false && error.status == 401) {
   // if (error.body && error.body.auth == false && error.body.message.name == 'TokenExpiredError') {
     console.log("==="+error.tokenExpired);
     sesionExpirada = error.body.tokenExpired;    
      mensaje =  sesionExpirada ? "Su sesión ha expirado." :'Ocurrió un error.';    
  }

  $("#id_header_popup_expiracion_sesion").text(sesionExpirada ? "Sesión":"Ups¡");
  $("#id_icono_popup_expiracion_sesion").attr('class',sesionExpirada ? "fas fa-user-clock fa-5x":"fas fa-error fa-5x");  
  $("#id_mensaje_popup_expiracion_sesion").text(mensaje);
  $("#id_mensaje_secundario_popup_expiracion_sesion").empty();
  $("#popup_expiracion_sesion").modal("show");
};

const promesaGet = (url, token) => this.$http.get(url, { headers: { "x-access-token": token } });

const promesaPost = function (url, params, token) {
  return this.$http.post(url, params, {
    headers: {
      "x-access-token": token
    }
  });
};

const promesaPut = function (url, params, token) {
  return this.$http.put(url, params, {
    headers: {
      "x-access-token": token
    }
  });
};

const promesaRemove = function (url, params, token) {
  return this.$http.delete(url, params, {
    headers: {
      "x-access-token": token
    }
  });
};

const operacionesApi = {
  methods: {
    get, post, put, remove
  }  
};

export { operacionesApi };




