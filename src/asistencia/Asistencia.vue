<template>
  <div class="asistencia container">
    <router-link to="/principal" class="btn btn-lg btn-link">Regresar</router-link>
    <h1>Asistencias</h1>
    <span>{{this.mensaje}}</span>
    <nav>
      <div class="nav nav-pills nav-justified" id="nav-tab" role="tablist">
        <a
          class="nav-item nav-link active"
          id="nav-home-tab"
          data-toggle="tab"
          href="#nav-home"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >Entrada</a>
        <a
          class="nav-item nav-link"
          id="nav-profile-tab"
          data-toggle="tab"
          href="#nav-profile"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
        >Salida</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <!--<h3>ENTRADA</h3>-->
        <div class="row m-1">
          <button
            type="button"
            class="btn btn-success btn-block"
            v-on:click="registrarEntrada()"
          >Confirmar</button>
        </div>
        <div class="container jumbotron m-1">
          <p>Alumnos seleccionados</p>
          <div class="media">
            <div class="row">
              <div
                v-for="item in listaSeleccion"
                v-bind:key="item.id"
                class="d-flex flex-wrap align-content-center bg-light"
              >
                <small class="badge badge-pill badge-info">
                  <img
                    src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                    width="35"
                    height="35"
                    alt="..."
                    class="rounded-circle"
                  >
                  <i>{{item.nombre}}</i>
                  <button
                    type="button"
                    class="btn btn-link btn-xs text-white"
                    v-on:click="removeToList(item)"
                  >
                    <span class="badge badge-pill badge-danger">x</span>
                  </button>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="container jumbotron m-1">
          <p>Seleccione para registrar entrada</p>
          <div class="row">
            <div
              v-for="item in lista"
              v-bind:key="item.id"
              class="d-flex align-content-center flex-wrap"
            >
              <small class="badge badge-pill badge-warning" v-on:click="addToList(item)">
                <img
                  src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                  width="35"
                  height="35"
                  alt="..."
                  class="rounded-circle"
                >
                <i>{{item.nombre}}</i>
              </small>
            </div>
          </div>
        </div>
        <div class="row m-1">
          <button
            type="button"
            class="btn btn-success btn-block"
            v-on:click="registrarEntrada()"
          >Confirmar</button>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <!--<h3>SALIDA</h3>-->
        <div class="row m-1">
          <button
            type="button"
            class="btn btn-block btn-danger"
            v-on:click="registrarSalida()"
          >Confirmar Salida</button>
        </div>
        <div class="container jumbotron m-1">
          <p>Alumnos seleccionados</p>
          <div class="media">
            <div class="row">
              <div
                v-for="item in listaSeleccionSalida"
                v-bind:key="item.id"
                class="d-flex align-content-center flex-wrap"
              >
                <small class="badge badge-pill badge-info">
                  <img
                    src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                    width="35"
                    height="35"
                    alt="..."
                    class="rounded-circle"
                  >
                  <i>{{item.nombre_alumno}}</i>
                  <button
                    type="button"
                    class="btn btn-link btn-xs text-white"
                    v-on:click="removeToListSalida(item)"
                  >
                    <span class="badge badge-pill badge-danger">x</span>
                  </button>
                </small>

                <!--<span class="label label-default">
                  {{item.nombre_alumno}}
                  <span class="badge badge-primary">
                    <button
                      type="button"
                      class="btn btn-link btn-sm text-white"
                      v-on:click="removeToListSalida(item)"
                    >X</button>
                  </span>
                </span>-->
              </div>
            </div>
          </div>
        </div>

        <div class="container jumbotron m-1">
          <p>Seleccione para registrar salida</p>
          <div class="row">
            <div
              v-for="item in listaRecibidos"
              v-bind:key="item.id"
              class="d-flex align-content-center flex-wrap"
            >
              <small  v-on:click="addToListSalida(item)" class="badge badge-pill badge-info">
                <img
                  src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                  width="35"
                  height="35"
                  alt="..."
                  class="rounded-circle"
                >
                <i>{{item.nombre_alumno}}</i>              
              </small>

              <!--<span class="label label-default">
                {{item.nombre_alumno}}
                <span class="badge badge-primary">
                  <button
                    type="button"
                    class="btn btn-link btn-sm text-white"
                    v-on:click="addToListSalida(item)"
                  >X</button>
                </span>
              </span>-->
            </div>
          </div>
        </div>
        <div class="row m-1">
          <button
            type="button"
            class="btn btn-block btn-danger"
            v-on:click="registrarSalida()"
          >Confirmar Salida</button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";

export default {
  name: "Asistencia",
  data() {
    return {
      //uriTemp: "http://localhost:5000/asistencia",
      uriTemp:'https://app-restexpres.herokuapp.com/asistencia',
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
        .get(this.uriTemp + "/alumnos_por_recibidos"+ "/" + this.usuarioSesion.co_sucursal, {
          headers: {
            "x-access-token": this.sesion.token
          }
        }).then(
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
        .get(this.uriTemp + "/alumnos_recibidos"+ "/" + this.usuarioSesion.co_sucursal, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
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
            { ids: ids },
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
            { ids: ids },
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          ).then(
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
</script>

<style scoped>
</style>
