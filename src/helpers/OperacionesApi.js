
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
        console.log("Revisando la sesion " + JSON.stringify(error));
        lanzarAvisoExpiracionSesion(error);
      });
};

const lanzarAvisoExpiracionSesion = function (error) {
  console.log("lanzar aviso");
  let mensaje = "";
  console.log("error " + JSON.stringify(error));
  if (error.ok == false && error.status == 401) {

    if (error.body && error.body.auth == false && error.body.message.name == 'TokenExpiredError') {
      mensaje = "Sesión expirada.";
    }
  }
  $("#id_header_popup_expiracion_sesion").text(mensaje == "" ? "Ups¡ Ocurrió un error" : mensaje);
  $("#id_mensaje_popup_expiracion_sesion").text("Expiró su sesión");
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




