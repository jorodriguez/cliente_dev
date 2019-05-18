<template>
  <div class="principal">
    <small class="text-bold">
      {{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}
      <span class="text-left">
        <i class="fas fa-power-off" v-on:click="signout()"></i>
      </span>
    </small>
    <div class="p-1 mb-1 text-white">
      <router-link to="/CatAlumno" class="btn btn-head btn-info">
        <i class="fas fa-child"></i>
        <span style=" font-size: 7px;">Alumnos</span>
      </router-link>
      <router-link to="/Asistencia" class="btn btn-head btn-success">
        <i class="fas fa-door-open"></i>
      </router-link>
      <router-link to="/Actividades" class="btn btn-head btn-success">
        <i class="fas fa-skating"></i>
      </router-link>
    </div>
    <div class="row">
      <div class="col-6">
        <div class="dropdown">
          <button
            class="btn btn-link dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >{{grupo}}</button>
          <div
            class="dropdown-menu"
            aria-labelledby="dropdownMenu2"
            v-for="grupoItem in listaGrupos"
            v-bind:key="grupoItem.id"
          >
            <button class="dropdown-item" type="button">{{grupoItem.nombre}}</button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <button
          type="button"
          data-toggle="modal"
          data-target="#modal_actividad"
          class="btn btn-block btn-info"
        >Actividad</button>
        <button class="btn btn-danger btn-sm text-right">Salida</button>
      </div>
    </div>

    <div class="jumbotron m-1">
      <div class="media">
        <div class="row">
          <div
            v-for="alumnoItem in listaAlumnos"
            v-bind:key="alumnoItem.id"
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
              <i v-on:click="addToListAlumno(alumnoItem)">{{alumnoItem.nombre_alumno}}</i>
              <i v-if="alumnoItem.selecionado">Select</i>
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL ACTIVIDADES-->
    <div
      id="modal_actividad"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Confirmar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="bg-gray">
              <div class="container jumbotron m-1">
                <div class="media">
                  <div class="row">
                    <div
                      v-for="alumnoItem in listaAlumnosSeleccionados"
                      v-bind:key="alumnoItem.id"
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
                        <i v-on:click="removeToListAlumno(alumnoItem)">{{alumnoItem.nombre}}</i>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- seleccion de actividad -->
            <div class="form-group">
              <label>Actividad</label>
              <select
                v-model="actividadSelecionada"
                class="form-control"
                placeholder="Grupo"
                required
                autofocus
              >
                <option
                  v-for="actividadItem in listaActividades"
                  v-bind:value="actividadItem"
                  v-bind:key="actividadItem.id"
                >{{ actividadItem.nombre }}</option>
              </select>
            </div>

            <div class="form-group" v-if="actividadSelecionada.tipo_actividad != null">
              <!--<label>Tipo</label>-->
              <select
                v-model="actividad.cat_tipo_actividad"
                class="form-control"
                placeholder="Tipo"
                required
              >
                <option
                  v-for="tipoActividadItem in actividadSelecionada.tipo_actividad"
                  v-bind:value="tipoActividadItem.id"
                  v-bind:key="tipoActividadItem.id"
                >{{ tipoActividadItem.nombre }}</option>
              </select>
            </div>
            <div class="form-group" v-if="actividadSelecionada.sub_actividad != null">
              <!--<label>Tipo</label>-->
              <select
                v-model="actividad.cat_sub_actividad"
                class="form-control"
                placeholder="Tipo"
                required
              >
                <option
                  v-for="subActividadItem in actividadSelecionada.sub_actividad"
                  v-bind:value="subActividadItem.id"
                  v-bind:key="subActividadItem.id"
                >{{ subActividadItem.nombre }}</option>
              </select>
            </div>
            <div class="form-group">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-succes" data-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Confirmar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal actividad -->
  </div>
</template>
<script>
import SesionHelper from "../helpers/SesionHelper";
import ActividadModel from "../models/ActividadModel";
export default {
  name: "Principal",
  data() {
    return {
      usuarioSesion: {},
      sesion: {},
      response: "",
      listaAlumnos: [],
      listaAlumnosSeleccionados: [],
      listaGrupos: [],
      grupo: "Todos",
      actividad: ActividadModel,
      actividadSelecionada: {},
      listaActividades: [],
      listaTipoActividad: [],
      uriTempAsistencia: "http://localhost:5000/asistencia",
      uriTempGrupos: "http://localhost:5000/grupos",
      uriTempActividad: "http://localhost:5000/actividad/catalogo_actividad"
    };
  },
  //FIXME: SESION
  mounted() {
    console.log("iniciando el Bienvenida ");

    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    console.log("Cargando lista alumno");
    this.loadFunctionAlumnosDentro = function() {
      this.listaRecibidos = [];
      this.$http
        .get(
          this.uriTempAsistencia +
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
            if (this.response != null) {
              console.log(" ==== " + this.response);
              this.listaAlumnos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    //actividades

    this.$http
      .get(this.uriTempActividad, {
        headers: {
          "x-access-token": this.sesion.token
        }
      })
      .then(
        result => {
          this.response = result.data;
          console.log("Consulta de actividades" + this.response);
          if (this.response != null) {
            if (this.response.length > 0) {
              this.listaActividades = this.response[0].catalogo_actividades;
              console.log("  ===  " + JSON.stringify(this.listaActividades));
              //console.log("  ===  "+JSON.stringify(this.listaActividades[0].catalogo_actividades));
            }
          }
        },
        error => {
          console.error(error);
        }
      );

    //traer grupo
    this.$http
      .get(this.uriTempGrupos, {
        headers: {
          "x-access-token": this.sesion.token
        }
      })
      .then(
        result => {
          this.response = result.data;
          if (this.response != null) {
            this.listaGrupos = this.response;
          }
        },
        error => {
          console.error(error);
        }
      );

    this.loadFunctionAlumnosDentro();
  },
  methods: {
    addToListAlumno(itemSelected) {
      if (!itemSelected.seleccionado) {
        itemSelected["seleccionado"] = true;
        this.listaAlumnosSeleccionados.push(itemSelected);
      } else {
        itemSelected.seleccionado = false;
        this.removeToListAlumno(itemSelected);
      }
      console.log("Add " + JSON.stringify(itemSelected));
    },
    removeToListAlumno(itemSelected) {
      console.log("Remove " + itemSelected.nombre);

      var pos = this.listaAlumnosSeleccionados.indexOf(itemSelected);

      var elemento = this.listaAlumnosSeleccionados[pos];

      this.listaAlumnosSeleccionados.splice(pos, 1);
    },
    signout() {
      console.log("Signout ");
      this.$session.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.btn-head {
  width: 70px !important;
  height: 70px !important;
  font-size: 40px;
}
</style>
