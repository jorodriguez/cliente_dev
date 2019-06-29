<template>
  <div class="cat_alumno container">
  
    <h1>Balances</h1>
    <boton-logout></boton-logout>
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
        <div class="row mb-3">

      <div  v-for="row in listaBalanceSucursal" :key="row.id"  class="col-xl-3 col-sm-4 py-2">
         <div class="card bg-success text-white h-100" v-on:click="verDetalleSucursal(row.id)">
                        <div class="card-body bg-info">
                            <!--div class="rotate">
                                <i class="fa fa-user fa-3x"></i>
                            </div>-->
                            <h6 class="text-uppercase ">{{row.nombre}}</h6>
                            <h4 class="display-5">${{formatPrice(row.total_adeuda)}}</h4>
                            <h6>{{row.contador_alumnos}} alumnos en total</h6>
                            <h6><small> {{row.contador_alumnos_ingresado_mes}} alumnos inscritos este mes </small></h6>
                        </div>
                    </div>
                <!--<button                  
                  class="btn btn-link "
                  v-on:click="verDetalleSucursal(row.id)"
                  title="ver detalle ."
                >{{row.nombre}} {{row.total_adeuda}}</button>-->
      </div>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <th></th>
              <th>Nombre</th>
              <th class="hidden-xs">Apellidos</th>              
              <th>Adeuda</th>
              <th></th>              
            </thead>
            <tr v-for="row in listaBalancesAlumnosPorSucursal" :key="row.id" class="text-left">
              <td >
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
                  {{ row.nombre }} <sup v-if="row.nuevo_ingreso" class="badge badge-pill badge-warning"><i> Nuevo Ingreso</i> </sup>
                  <span class="text-danger">{{row.adeuda ? '*':''}}</span>
                </button>
              </td>
              <td class="hidden-xs">{{ row.apellidos }}</td>                           
              <td class="text-center"> 
                <span v-if="row.total_adeudo > 0" class="text-danger" > ${{ row.total_adeudo }} </span>
                <span v-else > ${{ row.total_adeudo }} </span>
               </td>
              <td>
                
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
