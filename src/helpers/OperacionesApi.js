
const get = function (url, token, handler) {
  this.$http
    .get(
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

const post = function (url, params, token, handler) {
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
  this.$http
    .put(
      url, params,
      {headers: {"x-access-token": token }}
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
  console.log("error "+JSON.stringify(error) );
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

/*const signout() {
  console.log("Signout ");
  this.$session.clear();
  this.$router.push("/");
}*/

const operacionesApi = {
  methods: {
    get, post, put, remove
  }
};

export { operacionesApi };




