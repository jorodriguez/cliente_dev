<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div
            v-for="row in listaSucursales"
            :key="row.id_sucursal"
            class="col-xl-3 col-sm-4 py-2 mx-auto"
          >
            <div
              class="card text-white h-100 pointer sucursal-item-hover hover"
              v-on:click="verListaMensualidadesFacturadas(row)"
              title="Clic para ver el detalle"
              v-bind:style="{'background-color':row.class_color}"
            >
              <div class="card-body" v-bind:style="{'background-color':row.class_color}">
                <h6 class="text-uppercase">{{row.sucursal}}</h6>
                <small>Mensualidades Facturadas</small>
                <h4 class="display-5">{{row.pagos_facturados}} de {{row.cargos_pagados}}</h4>
              </div>
            </div>
          </div>
        </div>
        <h3>{{sucursal_seleccionada.sucursal}}</h3>
        <h5 class="text-muted">Mensualidades</h5>
        
        <div class="row d-flex flex-row-reverse">
          <div class="custom-control custom-switch p-2">
            <input type="checkbox" 
                   v-model="verTodosCargos"
                   v-on:click="toggleTodosCargos"
                   class="custom-control-input" id="customSwitch1" />
            <label class="custom-control-label" for="customSwitch1">Ver todas las mensualidades</label>
          </div>          
        </div>

        <!-- Tabla de cargos -->
        <div class="table-responsive">
          <table class="table">
            <thead>              
              <th class="text-left">Alumno</th>
              <th class="text-left">Fecha de pago</th>
              <th class="text-left">Pago</th>
              <th class="text-left">Cargo</th>
              <th  class="text-left">Factura </th>
              <th></th>
            </thead>
            <tr v-for="row in listaCargos" :key="row.id" class="text-left">              
              <td>
                <!--<button type="button" class="btn btn-link" title="Ver ">{{ row.nombre_alumno }}</button>-->                
                <span  v-bind:class=" row.pagado ? '':'text-danger'" > <strong >{{row.nombre_alumno}}</strong> </span>
              </td>
              <td><span  v-bind:class=" row.pagado ? '':'text-danger'" > {{ row.fecha_pago | moment("DD-MMM-YYYY") }}</span></td>
              <td class="text-left"> <span  v-bind:class=" row.pagado ? '':'text-danger'" > ${{formatPrice(row.pago)}} </span> </td>
              <td class="text-left"> <span  v-bind:class=" row.pagado ? '':'text-danger'" > ${{formatPrice(row.cargo)}} </span> </td>              
              <td> <span class="text-success" > <strong>{{row.identificador_factura}}</strong> </span> </td>
              <td>                
                <i class="fas fa-check-circle text-success text-small" v-if="row.pagado">Pagado</i>                 
                <i class="fas fa-check-circle text-danger text-small" v-if="!row.pagado">¡Adeuda!</i>                 
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../controller/ReporteMensualidadesController.js" >
</script>
