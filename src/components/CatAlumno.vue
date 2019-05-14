<template>
  <div class="cat_alumno container">
     <router-link to="/principal" class="btn btn-lg btn-link">
      Regresar
     </router-link>         
    <h1>Alumnos ({{usuarioSesion}})</h1>
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
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registro de Alumno</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body text-left">
            <form>
              <div class="form-row">
                <label>Nombre</label>
                <input
                  type="text"
                  v-model="input.nombre"
                  class="form-control"
                  placeholder="Nombre"
                  required
                  autofocus
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
                  v-model="input.fecha_nacimiento"
                  class="form-control"
                  placeholder="F. Nacimiento"
                  required
                >
                <label>Alergias</label>
                <input
                  type="textarea"
                  class="form-control"
                  v-model="input.alergias"
                  placeholder="Alergias"
                >

                <label>Nota</label>
                <input type="text" v-model="input.nota" class="form-control" placeholder="Nota">
                <div class="row">
                  <div class="col col-md-6">
                    <label>Hora Entrada</label>
                    <input
                      type="time"
                      v-model="input.hora_entrada"
                      class="form-control"
                      placeholder="H. Entrada"
                      required
                    >
                  </div>
                  <div class="col col-md-6">
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
                <div class="row">
                  <div class="col col-md-6">
                    <label>Costo Inscripción</label>
                    <input
                      type="number"
                      v-model="input.costo_inscripcion"
                      class="form-control"
                      placeholder="Costo Inscripcion"
                      required
                    >
                  </div>
                  <div class="col col-md-6">
                    <label>Costo Colegiatura</label>
                    <input
                      type="number"
                      v-model="input.costo_colegiatura"
                      class="form-control"
                      placeholder="Costo Colegiatura"
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
                <label>F. de Reinscripción</label>
                <input
                  type="date"
                  v-model="input.fecha_reinscripcion"
                  class="form-control"
                  placeholder="F. Reinscripcion"
                  required
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div v-if="operacion == 'INSERT'">
              <button class="btn btn-lg btn-primary" v-on:click="guardar()"
              data-dismiss="modal">Guardar</button>
            </div>
            <div v-else-if="operacion == 'UPDATE'">
              <button class="btn btn-lg btn-primary" v-on:click="modificar()"
              data-dismiss="modal">Modificar</button>
            </div>
            <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cerrar</button>
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
            <button type="button" class="btn btn-danger" v-on:click="eliminar()" data-dismiss="modal">Eliminar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-striped">
      <thead>
        <th></th>
        <th>Nombre</th>
        <th>Apellidos</th>      
        <th>Hora de Entrada</th>
        <th>Hora de Salida</th>        
        <th></th>
        <th></th>
      </thead>
      <tr v-for="row in lista" :key="row.id">
        <td class="text-right">
          <img src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg" 
            width="50"           
            height="50"
            v-on:click="verPerfil(row)"
           alt="..." class="rounded-circle">
        </td>
        <td>           
           <button type="button"
                class="btn btn-link" 
                v-on:click="verPerfil(row)" >
             {{ row.nombre }}</button>      
        </td>
        <td>          
             {{ row.apellidos }}
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
    <!--<div>{{response}}</div>-->
    <!--  <v-table :data="lista">
    <thead slot="head">
        <th>Nombre</th>
        <th>Age</th>
        <th>Email</th>
        <th>Address</th>
    </thead>
    <tbody slot="body" slot-scope="{lista}">
        <tr v-for="row in lista" :key="row.id">
          <td>{{ row.nombre }}</td>
          <td>{{ row.apellidos }}</td>
          <td>{{ row.fecha_nacimiento }}</td>
          <td>{{ row.alergias }}</td>
          <td>{{ row.nota }}</td>
          <td>{{ row.hora_entrada }}</td>
          <td>{{ row.hora_salida }}</td>
          <td>{{ row.costo_inscripcion }}</td>
          <td>{{ row.costo_colegiatura }}</td>
          <td>{{ row.minutos_gracia}}</td>
          <td>{{ row.fecha_reinscripcion }}</td>
        </tr>
    </tbody>
    </v-table>-->
  </div>
</template>

<script>

import AlumnoModel from '../models/AlumnoModel';

export default {
  name: "Alumno",
  data() {
    return {
      input:AlumnoModel,
      response: "",
      usuarioSesion: {},      
      operacion: "INSERT",
      lista: [],
      loadFunction: null,
      //uriTemp: "http://localhost:5000/alumnos"
      uriTemp:'https://app-restexpres.herokuapp.com/alumnos'
    };
  },
  mounted() {
    console.log("iniciando el componente alumno ");
    this.usuarioSesion = this.$session.get("usuario_sesion");
    console.log("Cargando lista alumno");

    //this.uriTemp = 'http://localhost:5000/alumnos';
    //process.env.ROOT_API
    this.loadFunction = function() {
      this.$http.get(this.uriTemp).then(
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

    this.loadFunction();
  },
  methods: {
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.input = {
        id: 0,
        nombre: "",
        apellidos: "",
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
      this.$http.post(this.uriTemp, this.input).then(
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
    modificar() {
      console.log("Modificar el id " + this.input.id);
      this.$http.put(this.uriTemp + "/" + this.input.id, this.input).then(
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
      this.$http.delete(this.uriTemp + "/" + this.input.id).then(
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
    verPerfil(rowSelect){
        console.log("fila seleccionada " + rowSelect.nombre);
        this.$router.push({name:'PerfilAlumno',params:{id:rowSelect.id}});
    }
  }
};
</script>

<style scoped>
</style>
