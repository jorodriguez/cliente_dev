<template>
  <div class="reporte_gastos_container">
    <h1>Gastos</h1>
    <small class="font-weight-bold h6">
      {{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}
      <button
        type="button"
        class="btn btn-sm btn-warning"
        v-on:click="signout()"
      >
        <i class="fas fa-power-off" v-on:click="signout()"></i>
      </button>
    </small>
    <br>

    <ul class="nav nav-pills mb-3 nav-justified" id="pills-tab" role="tablist">
      <li class="nav-item">
        <a
          class="nav-link active"
          id="pills-home-tab"
          data-toggle="pill"
          href="#pills-home"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >Gastos</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="pills-profile-tab"
          data-toggle="pill"
          href="#pills-profile"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
        >Comparativa</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div
        class="tab-pane fade show active"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
      >
        <div class="card">
          <div class="card-body">
            <div class="row mb-3">
              <div
                v-for="row in listaGastosPorSucursal"
                :key="row.id"
                class="col-xl-3 col-sm-4 py-2 mx-auto"
              >
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
              </div>
            </div>
            <h3>{{sucursal_seleccionada.nombre}} {{mes_seleccionado.mes_anio}}</h3>
              <div class="mx-auto">
            <button v-on:click="verGastosGlobal()" class="btn btn-link">Ver Global</button>
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
                        <h6>
                          <strong>{{row.mes_anio}}</strong>
                        </h6>
                        <p
                          v-bind:class="row.suma == 0 ? 'text-muted text-danger':'text-muted'"
                        >${{ formatPrice(row.suma)}}</p>                                                                        
                      </td>                      
                    </tr>                    
                  </tbody>
                </table>
              </div>
              <div class="mx-auto">
                <button v-on:click="verGastosGlobal()" class="btn btn-link">Ver Detallado</button>
              </div>
            </div>
            <!-- TREND DE MES -->

            <div class="table-responsive">
              <table class="table">
                <thead>                  
                  <th>Tipo </th>
                  <th >Suma de Gasto</th>                  
                  <th></th>
                </thead>
                <tr v-for="row in listaGastosPorSucursalTipo" :key="row.id" class="text-left">                  
                  <td>
                    <button
                      type="button"
                      class="btn btn-link"
                      title="Ver "                      
                    >
                      {{ row.nombre_tipo_gasto }}                      
                    </button>
                  </td>
                  <td class="hidden-xs">{{ row.apellidos }}</td>
                  <td class="text-center">
                    ${{formatPrice(row.suma)}}
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        class="tab-pane fade"
        id="pills-profile"
        role="tabpanel"
        aria-labelledby="pills-profile-tab"
      >
        <div class="card">
          <div class="card-body">aa</div>
        </div>
      </div>
    </div>

    <!--- Detalle -->

    <div id="modal_detallado" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalle del Alumno</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h4>{{alumno_seleccionado.nombre}} {{alumno_seleccionado.apellidos}}</h4>
            <small class="text-muted">{{alumno_seleccionado.nombre_sucursal}}</small>
            <div class="table-responsive table-striped">
              <table class="table table-hover">
                <tr>
                  <td>Adeuda</td>
                  <td>
                    <span v-bind:class="alumno_seleccionado.total_adeudo == 0 ? '':'text-danger'">
                      <strong>$ {{alumno_seleccionado.total_adeudo}}</strong>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Pagado</td>
                  <td>
                    <span class="text-success">$ {{alumno_seleccionado.total_pagos}}</span>
                  </td>
                </tr>
                <tr>
                  <td>Mensualidad</td>
                  <td>
                    <span class="text-primary">$ {{alumno_seleccionado.costo_colegiatura}}</span>
                  </td>
                </tr>
                <tr>
                  <td>Inscrito</td>
                  <td>
                    <span>{{alumno_seleccionado.fecha_inscripcion | moment("DD-MMM-YYYY")}}</span>
                  </td>
                </tr>
                <tr>
                  <td>Entrada : {{alumno_seleccionado.hora_entrada}}</td>
                  <td>Salida : {{alumno_seleccionado.hora_salida}}</td>
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
