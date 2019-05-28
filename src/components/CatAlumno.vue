<template>
  <div class="cat_alumno container">
    <div class="text-left">
      <router-link to="/principal">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
    </div>

    <h1>Alumnos</h1>(
    <small>{{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}</small>)
    <div class="text-left">
      <button
        type="button"
        class="btn btn-primary btn-lg"
        data-toggle="modal"
        data-target="#modal_alumno"
        v-on:click="nuevo()"
      >Nuevo</button>
    </div>
    <br>

    <div id="modal_alumno" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div id="modal_alumno" class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Registro de Alumno</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body text-left">
                <form>
                  <div>
                    <label>Nombre</label>
                    <input
                      type="text"
                      v-model="input.nombre"
                      class="form-control"
                      placeholder="Nombre"
                      required
                    >
                    <label>Apellidos</label>
                    <input
                      type="text"
                      v-model="input.apellidos"
                      class="form-control"
                      placeholder="Apellidos"
                      required
                    >
                    <label>Fecha de nacimiento</label>
                    <input
                      type="date"
                      pattern="yyyy-MM-dd"
                      v-model="input.fecha_nacimiento"
                      class="form-control"
                      placeholder="F. Nacimiento"
                      required
                    >
                    <label>Sexo</label>
                    <select
                      id="inputServicioContratar"
                      v-model="input.sexo"
                      class="form-control"
                      placeholder="Servicio"
                      required
                    >
                      <option value="Niño" selected>Niño</option>
                      <option value="Niña">Niña</option>
                    </select>

                    <label>Alergias</label>
                    <input
                      type="textarea"
                      class="form-control"
                      v-model="input.alergias"
                      placeholder="Alergias"
                    >

                    <label>Grupo</label>
                    <select
                      v-model="input.co_grupo"
                      class="form-control"
                      placeholder="Grupo"
                      required
                      autofocus
                    >
                      <option
                        v-for="grupo in listaGrupos"
                        v-bind:value="grupo.id"
                        v-bind:key="grupo.id"
                      >{{ grupo.nombre }}</option>
                    </select>

                    <div class="row">
                      <div class="col-sm-6">
                        <label>Hora Entrada</label>
                        <input
                          type="time"
                          v-model="input.hora_entrada"
                          class="form-control"
                          placeholder="H. Entrada"
                          required
                        >
                      </div>
                      <div class="col-sm-6">
                        <label>Hora Salida</label>
                        <input
                          type="time"
                          v-model="input.hora_salida"
                          class="form-control"
                          placeholder="H. Salida"
                          required
                        >
                      </div>
                    </div>

                    <label>Minutos de Gracia</label>
                    <input
                      type="number"
                      v-model="input.minutos_gracia"
                      class="form-control"
                      placeholder="Min. Gracia"
                      required
                    >

                    <label>Costo Colegiatura</label>
                    <input
                      type="number"
                      v-model="input.costo_colegiatura"
                      class="form-control"
                      placeholder="Costo Colegiatura"
                      required
                    >

                    <label>Costo Inscripción</label>
                    <input
                      type="number"
                      v-model="input.costo_inscripcion"
                      class="form-control"
                      placeholder="Costo Inscripcion"
                      required
                    >

                    <label>F. de Reinscripción</label>
                    <input
                      type="date"
                      v-model="input.fecha_reinscripcion"
                      class="form-control"
                      placeholder="F. Reinscripcion"
                      required
                    >
                    <label>Nota</label>
                    <input type="text" v-model="input.nota" class="form-control" placeholder="Nota">
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <div v-if="operacion == 'INSERT'">
                  <button
                    class="btn btn-lg btn-primary"
                    v-on:click="guardar()"
                    data-dismiss="modal"
                  >Guardar</button>
                </div>
                <div v-else-if="operacion == 'UPDATE'">
                  <button
                    class="btn btn-lg btn-primary"
                    v-on:click="modificar()"
                    data-dismiss="modal"
                  >Modificar</button>
                </div>
                <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ELIMINAR MODAL -->
    <div
      id="modal_eliminar_alumno"
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
            <p>
              ¿Confirma que desea eliminar al alumno?
              <br>
              <strong>{{input.nombre}} {{input.apellidos}}</strong>
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="eliminar()"
              data-dismiss="modal"
            >Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table">
        <thead>
          <th></th>
          <th>Nombre</th>
          <th class="hidden-xs">Apellidos</th>
          <th>Grupo</th>
          <th>Hora de Entrada</th>
          <th>Hora de Salida</th>
          <th></th>
          <th></th>
        </thead>
        <tr v-for="row in lista" :key="row.id">
          <td class="text-right">
            <img
              src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
              width="50"
              height="50"
              v-on:click="verPerfil(row)"
              alt="..."
              class="rounded-circle"
            >
          </td>
          <td>
            <button type="button" class="btn btn-link" v-on:click="verPerfil(row)">{{ row.nombre }}</button>
          </td>
          <td class="hidden-xs">{{ row.apellidos }}</td>
          <td>
            <span class="badge badge-info">{{ row.nombre_grupo }}</span>
          </td>
          <td>{{ row.hora_entrada }}</td>
          <td>{{ row.hora_salida }}</td>
          <td>
            <button
              class="btn btn-link red"
              data-toggle="modal"
              data-target="#modal_eliminar_alumno"
              v-on:click="select(row,'DELETE')"
            >Eliminar</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import AlumnoModel from "../models/AlumnoModel";

//import SesionHelper from "../helpers/SesionHelper"

export default {
  name: "Alumno",
  data() {
    return {
      input: AlumnoModel,
      response: "",
      usuarioSesion: {},
      sesion: {},
      operacion: "INSERT",
      lista: [],
      listaGrupos: [],
      loadFunction: null,
      loadFunctionGrupos: null,
      uriTemp: "http://localhost:5000/alumnos",
      uriTempGrupos: "http://localhost:5000/grupos"
      //uriTemp: "https://app-restexpres.herokuapp.com/alumnos",
      //uriTempGrupos: "https://app-restexpres.herokuapp.com/grupos"
    };
  },
  mounted() {
    console.log("iniciando el componente alumno ");

    //console.log("SesionHelper.getSesion() "+JSON.stringify(SesionHelper)) ;

    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    console.log("Cargando lista alumno");

    //process.env.ROOT_API

    this.loadFunction = function() {
      this.$http
        .get(this.uriTemp + "/" + this.usuarioSesion.co_sucursal, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
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

    //traer grupos
    console.log("process.env.URL_GRUPOS " + process.env.URL_GRUPOS);
    this.loadFunctionGrupos = function() {
      this.$http
        .get(this.uriTempGrupos, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;
            console.log("Grupos " + this.response);
            if (this.response != null) {
              this.listaGrupos = this.response;
              // this.input.co_grupo =  (this.listaGrupos[0] || -1 );
            }
          },
          error => {
            console.error(error);
          }
        );
    };
    this.loadFunction();
    this.loadFunctionGrupos();
  },
  methods: {
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.input = {
        id: 0,
        //formato_inscripcion:FormatoModel,
        co_sucursal: 0,
        co_grupo: 0,
        nombre: "",
        apellidos: "",
        nombre_carino: "",
        sexo: "",
        nombre_grupo: "",
        nombre_sucursal: "",
        fecha_nacimiento: "",
        alergias: "",
        nota: "",
        hora_entrada: "",
        hora_salida: "",
        costo_inscripcion: "",
        costo_colegiatura: "",
        minutos_gracia: "",
        fecha_reinscripcion: "",
        foto: "",
        genero: 1
      };
    },
    guardar() {
      //this.$http.get(process.env.ROOT_API+'/alumnos')
      console.log("Insertar");
      this.input.co_sucursal = this.usuarioSesion.co_sucursal;
      this.input.genero = this.usuarioSesion.id;

      this.$http
        .post(this.uriTemp, this.input, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("===" + this.response);
              this.loadFunction();
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    modificar() {
      console.log("Modificar el id " + this.input.id);
      this.$http
        .put(this.uriTemp + "/" + this.input.id, this.input, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.loadFunction();
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    eliminar() {
      console.log("Modificar el id " + this.input.id);
      this.$http
        .delete(this.uriTemp + "/" + this.input.id, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.loadFunction();
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    select(rowSelect, operacion) {
      console.log("fila seleccionada " + rowSelect.nombre);
      this.operacion = operacion;
      this.input = rowSelect;
    },
    verPerfil(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    }
  }
};
</script>

<style scoped>
</style>
