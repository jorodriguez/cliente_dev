

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
  if (error.ok == false && error.status == 401) {
    if (error.body && error.body.auth == false && error.body.message == 'TokenExpiredError') {
      mensaje = "Sesión expirada.";
    }
  }
  $("#id_header_popup_expiracion_sesion").text(mensaje == "" ? "Ups¡ Ocurrió un error" : mensaje);
  $("#id_mensaje_popup_expiracion_sesion").text("Expiró su sesión");
  $("#id_mensaje_secundario_popup_expiracion_sesion").empty();
  $("#id_mensaje_secundario_popup_expiracion_sesion").append(` 
              <button
              type="button"       
              class="btn  btn-link"     
              v-on:click="signout()"   
                >
                  <i class="fas fa-power-off" v-on:click="signout()">Click aquí para iniciar sesión</i>
              </button>`);
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




