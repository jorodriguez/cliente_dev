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
        <i class="fas fa-child" style="font-size:40px;"></i>
        Alumnos
      </router-link>
      <router-link to="/Asistencia" class="btn btn-head btn-success">
        <i class="fas fa-door-open" style="font-size:40px;"></i>
        Asistencias
        <!--<i class="fas fa-door-open"></i>-->
      </router-link>
      <!--<router-link to="/Actividades" class="btn btn-head btn-success">
        <i class="fas fa-skating"></i>
      </router-link>-->
      <button
        type="button"
        data-toggle="modal"
        class="btn btn-head btn-success"
        v-on:click="initRegistroActividad()"
      >
        <i class="fas fa-skating" style="font-size:40px;"></i>
        Actividad
      </button>
    </div>
    <div class="row">
      <div class="col-6 text-left">
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
        <!--<button
          type="button"
          data-toggle="modal"
          class="btn btn-block btn-info"
          v-on:click="initRegistroActividad()"
        >Actividad</button>-->
      </div>
    </div>

    <div class="jumbotron m-1">
      <div class="media">
        <div class="row">
          <div
            id="div_foreach_alumno"
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
              <i v-bind:id="alumnoItem.id+'_selection_alumno'" is_alumno></i>
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
        <!-- <form class="needs-validation" novalidate>-->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Registro de Actividad</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="bg-gray">
              <div class="container jumbotron m-1 scroll-div">
                <div class="media">
                  <div class="row">
                    <div
                      v-for="alumnoItem in listaAlumnosSeleccionados"
                      v-bind:key="alumnoItem.id"
                      class="d-flex align-content-top flex-wrap"
                    >
                      <span class="badge badge-pill badge-info">
                        <!--<img
                          src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                          width="20"
                          height="20"
                          alt="..."
                          class="rounded-circle"
                        >-->
                        {{alumnoItem.nombre_alumno}}
                        <i
                          v-on:click="removeToListAlumno(alumnoItem)"
                          class="fas fa-minus-circle text-danger"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- seleccion de actividad -->
            <div class="form-group">
              <label>Actividad</label>
              <select
                id="combo_actividad_principal"
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
                id="combo_tipo_actividad"
                v-model="actividad.tipo_actividad"
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
                id="combo_sub_actividad"
                v-model="actividad.sub_actividad"
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
              <textarea id="nota_id" class="form-control" v-model="actividad.nota" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="registrarActividad()"
            >Confirmar</button>
          </div>
        </div>
        <!-- </form>-->
      </div>
    </div>
    <!-- Modal actividad -->

    <!-- MODAL TOAST -->
    <div
      id="toast_id"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      class="toast border-warning"
      data-autohide="true"
    >
      <div class="toast-header p-1 mb-1 bg-warning text-dark">
        <!--<img src="" class="rounded mr-2" alt="...">-->
        <strong class="mr-auto">Mensaje</strong>
        <!--<small>11 mins ago</small>-->
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        <p id="toast_msg"></p>
      </div>
    </div>
    <!-- MODAL TOAST -->
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
      listaGruposFiltrados: [],
      grupo: "Todos",
      actividad: ActividadModel,
      actividadSelecionada: {},
      listaActividades: [],
      listaTipoActividad: [],
      limpiarFormularioActividad: null,
      validacion: null,
      mensajeToast: null,
      uriTempAsistencia: "http://localhost:5000/asistencia",
      //uriTempAsistencia: "https://app-restexpres.herokuapp.com/asistencia",
      uriTempGrupos: "http://localhost:5000/grupos",
      //uriTempGrupos: "https://app-restexpres.herokuapp.com/grupos",
      uriTempActividad: "http://localhost:5000/actividad"
      //uriTempActividad: "https://app-restexpres.herokuapp.com/actividad"
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
              console.log(" ====>> " + JSON.stringify(this.response));
              this.listaAlumnos = this.response;
              this.actualizarComboFiltro();
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    //toast
    this.mensajeToast = mensaje => {
      $("#toast_msg").text(mensaje);
      $("#toast_id").toast("show");
    };

    //funcion de limpiado de actividad
    this.limpiarFormularioActividad = function() {
      $("#combo_actividad_principal").prop("selectedIndex", -1);
      $("#combo_sub_actividad").prop("selectedIndex", -1);
      $("#combo_tipo_actividad").prop("selectedIndex", -1);
      $("#nota_id").text("");
      this.actividadSelecionada = {};
      this.actividad.id = 0;
      this.actividad.cat_actividad = -1;
      this.actividad.tipo_actividad = -1;
      this.actividad.sub_actividad = -1;
      this.actividad.genero = -1;
      this.actividad.alumnosIds = [];
    };

    //actividades
    this.$http
      .get(this.uriTempActividad + "/catalogo_actividad", {
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
              //console.log("  ===  " + JSON.stringify(this.listaActividades));
              //console.log("  ===  "+JSON.stringify(this.listaActividades[0].catalogo_actividades));
            }
          }
        },
        error => {
          console.error(error);
        }
      );

    //traer grupo
    /*  this.$http
      .get(this.uriTempGrupos, {
        headers: {
          "x-access-token": this.sesion.token
        }
      })
      .then(
        result => {
          this.response = result.data;
          if (this.response != null) {
            //console.log("Grupos "+JSON.stringify(this.response));
            this.listaGrupos = this.response;
          }
        },
        error => {
          console.error(error);
        }
      );
*/
    ///c
    this.validacion = function() {
      if (
        this.actividadSelecionada.tipo_actividad !== null &&
        this.actividad.tipo_actividad === -1
      ) {
        return false;
      }

      if (
        this.actividadSelecionada.sub_actividad !== null &&
        this.actividad.sub_actividad === -1
      ) {
        return false;
      }

      return true;
    };

    //Filtro de grupos

    this.actualizarComboFiltro = ()=>{
      const distinct = (value,index,self)=>{
          return self.indexOf(value) === index;
      }

      //this.listaGrupos = this.listaAlumnos.filter(distinct);

      this.listaGrupos = this.listaAlumnos.map(e => {
        return { id: e.co_grupo, grupo: e.nombre_grupo };
      }).filter(distinct);

      console.log("Grupos filtrados " + JSON.stringify(this.listaGrupos));

      //return { id: e.co_grupo, grupo: e.nombre_grupo };
    };

    /*this.actualizarComboFiltro = () => {
      this.listaGrupos = this.listaAlumnos.map(e => {
        return { id: e.co_grupo, grupo: e.nombre_grupo };
      });
      console.log("Grupos filtrados " + JSON.stringify(this.listaGrupos));
    };*/

    this.loadFunctionAlumnosDentro();
    //this.validacion();
  },
  methods: {
    addToListAlumno(itemSelected) {
      if (!itemSelected.seleccionado) {
        itemSelected["seleccionado"] = true;
        this.listaAlumnosSeleccionados.push(itemSelected);
        $("#" + itemSelected.id + "_selection_alumno").addClass(
          "fas fa-check-circle text-danger"
        );

        console.log(" Alumno seleccionado  " + JSON.stringify(itemSelected));
      } else {
        itemSelected.seleccionado = false;
        this.removeToListAlumno(itemSelected);
      }
      console.log("Add " + JSON.stringify(itemSelected));
    },
    removeToListAlumno(itemSelected) {
      console.log("Remove " + itemSelected.nombre_alumno);

      var pos = this.listaAlumnosSeleccionados.indexOf(itemSelected);

      var elemento = this.listaAlumnosSeleccionados[pos];

      this.listaAlumnosSeleccionados.splice(pos, 1);

      $("#" + itemSelected.id + "_selection_alumno").removeClass(
        "fas fa-check-circle text-danger"
      );

      if (this.listaAlumnosSeleccionados.length == 0) {
        this.limpiarFormularioActividad();
        this.loadFunctionAlumnosDentro();
        $("#modal_actividad").modal("hide");
      }
    },
    initRegistroActividad() {
      console.log("init registro actividad");
      if (this.listaAlumnosSeleccionados.length > 0) {
        this.limpiarFormularioActividad();
        $("#modal_actividad").modal("show");
      } else {
        this.mensajeToast("Seleccione al menos un alumno");
      }
    },
    registrarActividad() {
      console.log("Registrar actividad");

      console.log(JSON.stringify(this.actividad));

      if (this.listaAlumnosSeleccionados.length == 0) {
        console.log("Seleccione al menos un alumno");
        this.mensajeToast("Seleccione al menos un alumno");
        return;
      }

      //if (this.actividad.cat_actividad == -1) {
      if (!this.actividadSelecionada.id) {
        console.log("Seleccione la actividad");
        this.mensajeToast("Seleccione la actividad");
        return;
      }

      if (!this.validacion()) {
        console.log("complete los campos");
        this.mensajeToast("Complete los campos");
        return;
      }

      const alumnosIds = this.listaAlumnosSeleccionados.map(
        item => item.id_alumno
      );
      //console.log("Alumnos seleccionado " + alumnosIds);
      //console.log("Actividad Principal selecionada "+this.actividadSelecionada.nombre);

      this.actividad["alumnosIds"] = alumnosIds;
      this.actividad["cat_actividad"] = this.actividadSelecionada.id;
      this.actividad.genero = this.usuarioSesion.id;

      console.log("ENVO " + JSON.stringify(this.actividad));

      this.$http
        .post(this.uriTempActividad + "/registrar", this.actividad, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;
            console.log("Actividades insertadas " + this.response);
            if (this.response != null) {
              var rowsAffected = this.response;
              if (rowsAffected > 0) {
                this.mensaje = "Se registro la actividad";
                this.listaAlumnosSeleccionados = [];
                this.limpiarFormularioActividad();

                $("[is_alumno]").removeClass("fas fa-check-circle text-danger");
                //$("#div_foreach_alumno").find('[is_alumno]');

                $("#modal_actividad").modal("hide");
              }
            }
          },
          error => {
            console.error(error);
          }
        );
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
  /*font-size: 40px;*/
  font-size: 11px;
}

.scroll-div {
  width: 100%;
  height: 75px;
  overflow-y: scroll;
}

#toast-container {
  z-index: 9999999;
}
</style>
