
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";

export default {
  name: "Asistencia",
  data() {
    return {
      //uriTemp: "http://localhost:5000/asistencia",
      uriTemp:'https://api-ambiente-desarrollo.herokuapp.com/asistencia',
      //uriTemp:'https://api-ambiente-produccion.herokuapp.com/asistencia',
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      lista: [],
      listaSeleccion: [],
      listaRecibidos: [],
      listaSeleccionSalida: [],
      listaFiltroGrupos: [],
      grupoSeleccionado: {id:-1,nombre:''},
      grupoDefault : {id:-1,nombre:'Todos'},
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
    this.loadFunction = function () {
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
              this.filtrarAlumnosPorGrupo(this.grupoDefault);
              this.actualizarComboFiltro();
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    //Funcion get alumnos salida
    this.loadFunctionAlumnosSalida = function () {
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

    this.actualizarComboFiltro = () => {
      var resArr = [];
      this.lista.filter(function (item) {
          var i = resArr.findIndex(x => x.nombre == item.nombre_grupo);
          if (i <= -1) {
              resArr.push({ id: item.co_grupo, nombre: item.nombre_grupo });
          }
          return null;
      });
      this.listaFiltroGrupos = resArr;
      console.log("Grupos filtrados " + JSON.stringify(this.listaFiltroGrupos));
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
      this.mensaje = "";
    },
    removeToList(itemSelected) {
      console.log("Remove " + itemSelected.nombre);

      var pos = this.listaSeleccion.indexOf(itemSelected);

      var elemento = this.listaSeleccion[pos];

      console.log("esta en la pos " + pos + " el elemento " + elemento.nombre);
      this.lista.push(elemento);

      this.listaSeleccion.splice(pos, 1);

      this.filtrarAlumnosPorGrupo(this.grupoSeleccionado);
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
      this.mensaje = "";
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
    },
    filtrarAlumnosPorGrupo(grupoItem) {
      console.log("Grupo selecionado " + JSON.stringify(grupoItem));

      this.grupoSeleccionado = grupoItem;

      if (this.grupoSeleccionado.id == -1) {
        console.log("sinfiltro");
        this.lista.forEach(element => {
          element.visible = true;
        });
      } else {
        console.log("Filtrar por grupo " + grupoItem.nombre);
        this.lista.forEach(element => {
          if (element.co_grupo == grupoItem.id) {
            element.visible = true;
          } else {
            element.visible = false;
          }
        });

      }
    },
  }
};