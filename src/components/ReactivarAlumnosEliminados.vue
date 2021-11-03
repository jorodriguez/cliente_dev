<template>
  <div class="reactivar_alumnos">
    <h1>Reacivar Alumnos</h1>
    <small>{{ usuarioSesion.nombre_sucursal }}</small>
    <div class="text-left">
      <router-link to="/CatAlumno" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
    </div>
    <br />
    <!--<form>-->

    <div class="card">
      <div class="card-body">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar por nombre.."
            v-model="criterioNombre"
            v-on:keyup.enter="buscarPorNombre()"
            aria-label="Buscar por nombre.."
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              v-on:click="buscarPorNombre()"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      <div class="row " >
      
        <div class="col-3  " v-for="row in lista" :key="row.id">
          <div class="card border border-secondary " >           
            <img class="card-img-top rounded-circle"  :src="row.foto" alt="Card image cap" />
            <div class="card-body">
              <h5 class="card-title">{{ row.nombre }}
               <span v-if="row.mostrar_nombre_carino"
                  >({{ row.nombre_carino }})</span>
              </h5>              
              <p class="card-text small">
                {{ row.apellidos }}
              </p>              
              <p
                  :style="row.color ? 'background-color:' + row.color : ''"
                  class="badge badge-info text-wrap"
                  >{{ row.nombre_grupo }}
              </p>
              <p>{{row.hora_entrada}}</p>
              <p>{{row.hora_salida}}</p>
            </div>
            <!--<ul class="list-group list-group-flush">
              <li class="list-group-item"> 
              <span
                  :style="row.color ? 'background-color:' + row.color : ''"
                  class="badge badge-info text-wrap"
                  >{{ row.nombre_grupo }}
                </span></li>
              <li class="list-group-item">{{row.hora_entrada}}</li>
              <li class="list-group-item">{{row.hora_salida}}</li>
            </ul>-->
            <div class="card-footer">        
              <button type="button" class="btn btn-outline-danger btn-block">Activar</button>    
              <!--<a href="#" class="card-link text-danger">Reactivar</a>   -->
            </div>
          </div>
        </div>
     
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import { getUsuarioSesion } from "../helpers/Sesion";

export default {
  name: "cat_alumnos_eliminados",
  components: {},
  mixins: [operacionesApi],
  data() {
    return {
      response: "",
      usuarioSesion: {},
      criterioNombre: "",
      lista: [],
      listaRespaldo: [],
      eliminados: true
    };
  },
  mounted() {
    console.log("##### iniciando catalogo alumno eliminados ####");

    this.usuarioSesion = getUsuarioSesion();
    this.cargarAlumnosEliminados();
  },
  methods: {
    verPerfil(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    },
    async cargarAlumnosEliminados() {
      this.lista = await this.getAsync(
        `${URL.ALUMNOS_BASE}/${this.usuarioSesion.co_sucursal}/eliminados/true`
      );
      //this.listaRespaldo = this.response;
    },

    buscarPorNombre() {
      console.log("Buscar por nombre " + this.criterioNombre);
      if (this.criterioNombre == "") {
        this.lista = this.listaRespaldo;
      } else {
        this.lista = this.listaRespaldo.filter(
          e =>
            e.nombre
              .toUpperCase()
              .includes(this.criterioNombre.toUpperCase()) ||
            (e.nombre_carino
              ? e.nombre_carino
                  .toUpperCase()
                  .includes(this.criterioNombre.toUpperCase())
              : false)
        );
      }
    }
  }
};
</script>

<style scoped></style>
