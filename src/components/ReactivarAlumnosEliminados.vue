<template>
  <div class="reactivar_alumnos">
    <h1>Reacivar Alumnos</h1>
    <small>{{usuarioSesion.nombre_sucursal}}</small>
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
            <button class="btn btn-outline-secondary" type="button" v-on:click="buscarPorNombre()">
              <i class="fas fa-search"></i>
            </button>
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
            </thead>
            <tr v-for="row in lista" :key="row.id">
              <td class="text-right" style="padding-left:2px;padding-right:2px;">
                <!--src="row.foto == null ? (row.sexo == 'Niño' ? './../assets/avatar_niño.jpg':'./../assets/avatar_niña.jpg'):row.foto"-->
                <img
                  :src="row.foto"
                  width="50"
                  height="50"
                  v-on:click="subirFotoPerfil(row.id)"
                  alt="..."
                  title="Actualizar foto de perfil"
                  class="rounded-circle"
                  style="cursor:pointer"
                />
              </td>
              <td class="text-left" style="padding-left:0px;">
                <button
                  type="button"
                  class="btn btn-link"
                  title="Ver el perfil del alumno"
                  v-on:click="verPerfil(row)"
                >
                  {{ row.nombre }}
                  <span v-if="row.mostrar_nombre_carino">({{row.nombre_carino}})</span>
                  <span class="text-danger">{{row.motivo_eliminacion}}</span>
                </button>
              </td>
              <td class="hidden-xs">{{ row.apellidos }}</td>
              <td>
                <span
                  :style="row.color ? 'background-color:'+row.color:'' "
                  class="badge badge-info text-wrap"
                >{{ row.nombre_grupo }}</span>
              </td>
              <td>{{ row.hora_entrada }}</td>
              <td>{{ row.hora_salida }}</td>
              <td>
                <div class="btn-group" v-if="!row.adeuda">
                  <button
                    type="button"
                    class="btn btn-link text-gray"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-ellipsis-v"></i>
                  </button>
                  <div class="dropdown-menu bg-light">
                    <button
                      class="dropdown-item"
                      v-on:click="cambiarSucursal(row)"
                      title="Cambiar de sucursal."
                    >
                      <i class="fas fa-exchange-alt"></i>Cambiar de sucursal
                    </button>
                    <button
                      class="dropdown-item text-danger"
                      v-on:click="select(row,'DELETE')"
                      title="Dar de baja el alumno."
                    >
                      <i class="fas fa-user-minus"></i> Iniciar Baja
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import { getUsuarioSesion } from '../helpers/Sesion';

export default {
  name: "cat_alumnos_eliminados",
  components: {
    
  },
  mixins: [operacionesApi],
  data() {
    return {
      response: "",
      usuarioSesion: {},
      criterioNombre: "",
      lista: [],
      listaRespaldo: [],
      eliminados:true,
    
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
   async cargarAlumnosEliminados(){
    this.lista = await this.getAsync(`${URL.ALUMNOS_BASE}/${this.usuarioSesion.co_sucursal}/eliminados/true`);
    //this.listaRespaldo = this.response;
    },
    
    buscarPorNombre() {
      console.log("Buscar por nombre " + this.criterioNombre);
      if (this.criterioNombre == '') {
        this.lista = this.listaRespaldo;
      } else {

        this.lista = this.listaRespaldo
          .filter(
            e =>
              e.nombre.toUpperCase().includes(this.criterioNombre.toUpperCase())
              || (e.nombre_carino ? e.nombre_carino.toUpperCase().includes(this.criterioNombre.toUpperCase()) : false)


          );

      }
    },
    
  }
};
</script>

<style scoped>
</style>
