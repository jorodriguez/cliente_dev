<template>
  <div class="cat_alumno">
    <h1>Alumnos ({{ lista != [] ? lista.length:0}})</h1>
    <small>{{usuarioSesion.nombre_sucursal}}</small>
    <div class="text-left">
      <router-link to="/principal" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
      <button type="button" class="btn btn-primary btn-lg" v-on:click="nuevo()">Nuevo</button>
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
                  <span class="text-danger">{{row.adeuda ? '*':''}}</span>
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

<script src="../controller/CatAlumnoController.js" >
</script>

<style scoped>
</style>
