
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";

export default {
  name: "Asistencia",
  data() {
    return {  
      uriTemp: "http://localhost:5000/asistencia",       
      //uriTemp:'https://api-ambiente-desarrollo.herokuapp.com/asistencia',
      //uriTemp:'https://api-ambiente-produccion.herokuapp.com/asistencia',
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      lista: [],
      listaSeleccion: [],
      listaRecibidos: [],
      listaSeleccionSalida: [],
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente de asistencia ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    //this.usuarioSesion = this.$session.get("usuario_sesion");
    this.loadFunction = function() {
      this.$http
        .get(
          this.uriTemp +
            "/alumnos_por_recibidos" +
            "/" +
            this.usuarioSesion.co_sucursal,
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
            if (this.response != null) {
              this.lista = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    //Funcion get alumnos salida
    this.loadFunctionAlumnosSalida = function() {
      this.listaRecibidos = [];
      this.$http
        .get(
          this.uriTemp +
            "/alumnos_recibidos" +
            "/" +
            this.usuarioSesion.co_sucursal,
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
            if (this.response != null) {
              this.listaRecibidos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };
    this.loadFunction();
    this.loadFunctionAlumnosSalida();
  },
  methods: {
    addToList(itemSelected) {
      console.log("Add ");
      this.listaSeleccion.push(itemSelected);
      var pos = this.lista.indexOf(itemSelected);
      var elementoEliminado = this.lista.splice(pos, 1);
    },
    removeToList(itemSelected) {
      console.log("Remove " + itemSelected.nombre);

      var pos = this.listaSeleccion.indexOf(itemSelected);

      var elemento = this.listaSeleccion[pos];

      console.log("esta en la pos " + pos + " el elemento " + elemento.nombre);
      this.lista.push(elemento);

      this.listaSeleccion.splice(pos, 1);
    },
    registrarEntrada() {
      console.log("registrando entrada");
      if (this.listaSeleccion.length > 0) {
        var ids = [];

        for (var i = 0; i < this.listaSeleccion.length; i++) {
          var elem = this.listaSeleccion[i];
          ids.push(elem.id);
        }

        this.$http
          .post(
            this.uriTemp + "/entradaAlumnos",
            { ids: ids, genero: this.usuarioSesion.id },
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          )
          .then(
            result => {
              this.response = result.data;
              console.log("insertados " + this.response);
              if (this.response != null) {
                this.lista = this.response;
                this.mensaje = "Se registro la entrada";
                this.loadFunction();
                this.loadFunctionAlumnosSalida();
                this.listaSeleccion = [];
                this.listaSeleccionSalida = [];
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.mensaje = "Seleccione al menos un alumno de la lista";
      }
    },
    addToListSalida(itemSelected) {
      this.listaSeleccionSalida.push(itemSelected);
      var pos = this.listaRecibidos.indexOf(itemSelected);
      var elementoEliminado = this.listaRecibidos.splice(pos, 1);
    },
    removeToListSalida(itemSelected) {
      console.log("Remove en lista de salida" + itemSelected.nombre);

      var pos = this.listaSeleccionSalida.indexOf(itemSelected);

      var elemento = this.listaSeleccionSalida[pos];

      console.log("esta en la pos " + pos + " el elemento " + elemento.nombre);
      this.listaRecibidos.push(elemento);

      this.listaSeleccionSalida.splice(pos, 1);
    },
    registrarSalida() {
      console.log("Registrar salida");

      if (this.listaSeleccionSalida.length > 0) {
        var ids = [];

        for (var i = 0; i < this.listaSeleccionSalida.length; i++) {
          var elem = this.listaSeleccionSalida[i];
          ids.push(elem.id);
        }

        this.$http
          .post(
            this.uriTemp + "/salidaAlumnos",
            { ids: ids, genero: this.usuarioSesion.id },
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          )
          .then(
            result => {
              this.response = result.data;
              if (this.response != null) {
                this.lista = this.response;
                this.mensaje = "Se registro la salida de los alumnos";
                console.log("Se registro la salida");
                this.loadFunction();
                this.loadFunctionAlumnosSalida();
                this.listaSeleccionSalida = [];
                this.listaSeleccion = [];
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.mensaje = "Seleccione al menos un alumno de la lista";
      }
    }
  }
};