
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";

export default {
  name: "cambiar-alumno-sucursal",
  data() {
    return {
      uriTemp: "http://localhost:5000/sucursal",
      uriTempCambioSucursal: "http://localhost:5000/cambio_sucursal",
      uriTempAlumnos: "http://localhost:5000/alumnos",
      //uriTemp:'https://api-ambiente-desarrollo.herokuapp.com/asistencia',
      //uriTemp:'https://api-ambiente-produccion.herokuapp.com/asistencia',
      usuarioSesion: {},
      sesion: {},
      listaSucursal: [],
      sucursal_seleccionada: { id: -1, nombre: "" },
      alumno: AlumnoModel,
      response: "",
      mensaje: "",
      loadFunction: null
    };
  },
  mounted() {
    console.log("iniciando el componente de cambio de sucursal ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    let id_alumno = this.$route.params.id_alumno;

    if (id_alumno == undefined) {
      console.log("No se recibe ningun id de alumno ");
      this.$router.push("/cat_alumno");

    } else {

      //cargar informacion del alumno
      this.$http
        .get(this.uriTempAlumnos + "/id/" + id_alumno, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.alumno = result.data;
            this.loadFunction();
          },
          error => {
            console.error(error);
          }
        );

      this.loadFunction = function () {
        this.$http
          .get(this.uriTemp,
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          )
          .then(
            result => {
              this.response = result.data;
              console.log("Consulta " + JSON.stringify(this.response));
              console.log("alumni " + JSON.stringify(this.alumno));
              if (this.response != null) {
                this.listaSucursal = this.response.filter(row => row.id != this.alumno.co_sucursal);
                console.log("Consulta " + JSON.stringify(this.listaSucursal));
              }

            },
            error => {
              console.error(error);
            }
          );
      };



    }
  },
  methods: {
    iniciarCambioSucursal() {
      this.mensaje = "";
      if (this.sucursal_seleccionada == null || this.sucursal_seleccionada == undefined || this.sucursal_seleccionada.id == -1) {
        this.mensaje = "Selecciona la sucursal destino.";
        $("#id_sucursal_destino").focus();
      } else {
        $("#modal_confirmar_cambio_sucursal").modal("show");
      }

    },
    confirmarCambioSucursal() {
      this.$http
        .put(this.uriTempCambioSucursal + "/" + this.alumno.id, {
          id_sucursal_origen: this.alumno.co_sucursal,
          id_sucursal_destino: this.sucursal_seleccionada.id,
          genero: this.usuarioSesion.id
        },
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("Consulta " + this.response);
            if (this.response != 0) {
              console.log("Se cambio de sucursal sin problemas ");
              this.mensaje = "Se realizó el cambio de sucursal del Alumno(a) " + this.alumno.nombre + " " + this.alumno.apellidos
                + ", de " + this.alumno.nombre_sucursal + " a " + this.sucursal_seleccionada.nombre + ".";
            } else {
              console.log("Existieron problemas para cambiar de sucursal ");
              this.mensaje = `Existió un error al intentar realizar el cambio de sucursal, por favor contacta al equipo de soporte para notificar este detalle.`;
            }
            $("#modal_mensaje").modal("show");
          },
          error => {
            console.error(error);
          }
        );

    }
  }
};