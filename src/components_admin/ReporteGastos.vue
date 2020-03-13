<template>
  <div class="reporte_gastos_container">
    <h1>Gastos</h1>
    <div class="row text-left">
      <div class="col">
        <router-link :to="{ name: 'ReporteDeudas', params: {} }" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>
    </div>

    <div class="card">
      <div class="card-body">        
        <div class="row mb-3">
          <div
            v-for="row in listaGastosPorSucursal"
            :key="row.id"
            class="col-xl-3 col-sm-4 py-2 mx-auto"
          >
           <SucursalCard 
                @click="verDetalleSucursal(row)"
                :class_color="row.class_color"
                titulo=""
                :nombre="row.nombre"
                :foto="row.foto"
                icono_etiqueta=""
                etiqueta="Gastos"
                descripcion=""
            >
            <div slot="contenido">
              <h1 class="display-5 text-white">${{formatPrice(row.suma)}}</h1>
            </div>
           </SucursalCard>

          <!--
            <div
              class="card text-white h-100 pointer sucursal-item-hover hover"
              v-on:click="verDetalleSucursal(row)"
              title="Clic para ver el detalle"
              v-bind:style="{'background-color':row.class_color}"
            >
              <div class="card-body" v-bind:style="{'background-color':row.class_color}">
                <h6 class="text-uppercase">{{row.nombre}}</h6>
                <small>Gastos</small>
                <h4 class="display-5">${{formatPrice(row.suma)}}</h4>
              </div>
            </div>
            -->
          </div>
        </div>
        <h3>{{sucursal_seleccionada.nombre}} {{mes_seleccionado.mes_anio}}</h3>
        <div class="mx-auto">
            <button v-on:click="verGastosGlobal()" class="btn btn-link h3">Ver lista global</button>
        </div>
        <!-- TREND DE MES -->
        <div class="row text-center">
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td
                    v-for="row in listaGastosPorSucursalTrendMensual"
                    :key="row.id"
                    class="border pointer"
                    v-on:click="verGastosPorMes(row)"
                    title="Clic para ver la lista de gastos."
                  >
                  <h6><strong>{{sucursal_seleccionada.nombre}}</strong></h6>
                    <h6>                      
                      <strong>{{row.mes_anio}}</strong>
                    </h6>
                    <h2
                      v-bind:class="row.suma == 0 ? 'text-muted text-danger':'text-muted'"
                    >${{ formatPrice(row.suma)}}</h2>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>          
        </div>
        <!-- TREND DE MES -->
        <div class="row text-right">
          <div class="col">
            <h4>{{mes_seleccionado.mes_anio}}</h4>            
            <h1>Gasto Total : ${{formatPrice(mes_seleccionado.suma)}}</h1>
          </div>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead >
              <th class="text-left">Fecha</th>
              <th class="text-left">Tipo</th>
              <th class="text-left">Gasto</th>
              <th class="text-left">Observaciones</th>
              <th></th>
            </thead>
            <tr v-for="row in listaGastosPorSucursalTipo" :key="row.id" class="text-left">
              <td><p class="text-left" >{{ row.fecha_text}}</p></td>
              <td>
                <p class="text-left" >{{ row.nombre_tipo_gasto }}</p>
              </td>              
              <td ><p class="text-left" >${{formatPrice(row.gasto)}}</p></td>              
              <td >
                <textarea class="form-control text-justify disabled"
                disabled
                rows="3"
                 v-model="row.observaciones">                    
                </textarea>                
                </td>
            </tr>
          </table>
        </div>
          <div class="row text-right">
          <div class="col">
            <h4>{{mes_seleccionado.mes_anio}}</h4>            
            <h1>Gasto Total : ${{formatPrice(mes_seleccionado.suma)}}</h1>
          </div>
        </div>
      </div>
    </div>

    <!-- Detalle de gastos -->
     <div id="modal_detall_gasto_categoria" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalle de gasto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <th>Mes</th>
                  <th>Sucursal</th>
                  <th>Suma de Gastos</th>
                  <th></th>
                </thead>
                <tr v-for="row in listaGastosGlobal" :key="row.id" class="text-left">
                  <td>{{ row.nombre_mes_abreviado  }}-{{ row.anio }}</td>
                  <td>{{ row.nombre_sucursal }}</td>
                  <td class="text-center">${{formatPrice(row.suma)}}</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!--- GLOBAL -->

    <div id="modal_detallado" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Suma de Gastos de sucursales mensual</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <th>Mes</th>
                  <th>Sucursal</th>
                  <th>Suma de Gastos</th>
                  <th></th>
                </thead>
                <tr v-for="row in listaGastosGlobal" :key="row.id" class="text-left">
                  <td>{{ row.nombre_mes_abreviado  }}-{{ row.anio }}</td>
                  <td>{{ row.nombre_sucursal }}</td>
                  <td class="text-center">${{formatPrice(row.suma)}}</td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detalle -->
  </div>
</template>

<script src="../controller/ReporteGastosController.js" >
</script>


<style scoped>
.pointer {
  cursor: pointer;
}

.alumnos_table td:hover {
  background: #ffdddd;
}

.sucursal-item-hover:hover {
  border-color: #f4720f !important;
}
</style>
