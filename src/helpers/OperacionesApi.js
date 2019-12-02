
const get = function (url, token, handler) {
  /*promesaGet(url, token)
    .then(
      result => {
        handler(result);
      },
      error => {
        console.error(error);
        console.log("Revisando la sesion " + JSON.stringify(error));
        lanzarAvisoExpiracionSesion(error);
      });
*/
  this.$http.get(url,
    {
      headers: {
        "x-access-token": token
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

const post = function (url, params, token, handler) {
  /*promesaPost(url, params, token)
    .then(
      result => {
        handler(result);
      },
      error => {
        console.error(error);
        console.log("Revisando la sesion " + JSON.stringify(error));
        lanzarAvisoExpiracionSesion(error);
      });*/
  this.$http
    .post(
      url, params,
      { headers: { "x-access-token": token } })
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


const put = function (url, params, token, handler) {

  /* promesaPut(url, params, token)
     .then(
       result => {
         handler(result);
       },
       error => {
         console.error(error);
         console.log("Revisando la sesion " + JSON.stringify(error));
         lanzarAvisoExpiracionSesion(error);
       });
 */
  this.$http
    .put(
      url, params,
      { headers: { "x-access-token": token } }
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


const remove = function (url, token, handler) {
  /*promesaRemove(url, token)
    .then(
      result => {
        handler(result);
      },
      error => {
        console.error(error);
        console.log("Revisando la sesion " + JSON.stringify(error));
        lanzarAvisoExpiracionSesion(error);
      });;
*/

  this.$http
    .delete(
      url,
      {
        headers: {
          "x-access-token": token
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
  },
  /*promesaGet: promesaGet,
  promesaPost: promesaPost,
  promesaPut: promesaPut,
  promesaRemove: promesaRemove*/
};

export { operacionesApi };




