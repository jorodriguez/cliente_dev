<template>
  <div class="cat_alumno container">
  
    <h1>Pagos</h1>(
    <small>{{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}</small>)
    <div class="text-left">
      <router-link to="/principal" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>      
    </div>
    <br>
        
    <div class="card">
      <div class="card-body">
        <!--
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar por nombre.."
            v-model="criterioNombre"
             v-on:keyup.enter="buscarPorNombre()"
            aria-label="Buscar por nombre.."
            aria-describedby="basic-addon2"
          >
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" 
                type="button"
                v-on:click="buscarPorNombre()">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>-->

        <div class="table-responsive">
          <table class="table">
            <thead>
              <th></th>
              <th>Nombre</th>
              <th class="hidden-xs">Apellidos</th>              
              <th>Adeuda</th>
              <th></th>              
            </thead>
            <tr v-for="row in lista" :key="row.id">
              <td class="text-right">
                <img
                  src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                  width="50"
                  height="50"
                 
                  alt="..."
                  title="Ver datos del alumno"
                  class="rounded-circle"
                >
              </td>
              <td>
                <button type="button" class="btn btn-link" title="Ver datos del alumno">
                  {{ row.nombre }}
                  <span class="text-danger">{{row.adeuda ? '*':''}}</span>
                </button>
              </td>
              <td class="hidden-xs">{{ row.apellidos }}</td>                           
              <td>{{ row.hora_salida }}</td>
              <td>
                <!--
                <button
                  v-if="!row.adeuda"
                  class="btn btn-link red"
                  v-on:click="select(row,'DELETE')"
                  title="Dar de baja el alumno."
                >Iniciar Baja</button>-->
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../controller/ReporteDeudasController.js" >
</script>

<style scoped>
</style>
