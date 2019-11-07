<template>
  <div id="reporte-asistencia">
    <div class="card">
      <div class="card-body">                
        <h5 class="text-muted">Asistencias </h5>       
         <div class="alert alert-warning">{{mensaje}}</div>
         <div v-if="loading" class="h4">Cargando...</div>
         <div class="row">
           <!--
             <datepicker
                  name="fecha_reporte"
                  v-model="fecha"                  
                  input-class="form-control"               
             ></datepicker>
             -->
         </div>
         
        <vue-good-table
          :columns="columnas"
          :rows="listaAsistencia"
          :line-numbers="true"
          @on-row-click="onRowClick"
          @on-search="onSearch"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
          @on-selected-rows-change="selectionChanged"
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
          @on-select-all="selectAll"
        >
          <!--<template slot="table-row" slot-scope="props">            
            <span v-if="props.column.field == 'pago'">
              <span
                v-bind:class=" props.row.pagado ? 'text-success':'text-danger'"
              >${{formatPrice(props.row.pago)}}</span>
              <small
                v-if="(props.row.pago > 0 && props.row.pagado==false)"
                v-bind:class=" (props.row.pago > 0 && props.row.pagado==false) ? 'label info text-success':'text-danger'"
              >Abono</small>
            </span>
            <span v-else-if="props.column.field == 'cargo'">
              <span
                v-bind:class="props.row.pagado ? '':'text-danger'"
              >${{formatPrice(props.row.cargo)}}</span>            
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>-->
          <!--<div slot="selected-row-actions">
            
            <button class="btn btn-primary">Prueba</button>
          </div>-->
        </vue-good-table>

      <!--
        <Popup id="detallePago" v-if="pago_seleccionado != null" show_button_close="true">
          <div slot="header">Detalle de registro</div>
          <div slot="content">            
            <div class="row">
              <div class="container">
                 <table class="table table-striped text-left">
                   <tr>
                     <td class="font-weight-bold"> Estatus</td>                     
                     <td>
                         <span v-if="pago_seleccionado.pagado" class="text-success">                         
                         <strong>PAGADO <i class="fas fa-check-circle text-success text-small"></i></strong> 
                       </span>
                        <span v-else class="text-danger"> 
                          <strong>PENDIENTE</strong>
                        </span>
                       </td>
                   </tr> 
                   
                   <tr>
                     <td class="font-weight-bold"> Alumno </td>                     
                     <td>{{pago_seleccionado.nombre_alumno}}</td>
                   </tr> 
                   <tr>
                     <td class="font-weight-bold">Fecha de cargo </td>                     
                     <td>
                       <span :class="pago_seleccionado.pagado ? '':'text-danger'">{{ pago_seleccionado.fecha_cargo | moment("DD-MMM-YYYY") }} </span> </td>
                   </tr>
                   <tr>
                     <td class="font-weight-bold">Fecha de pago </td>                     
                     <td> 
                       <span v-if="pago_seleccionado.pagado">                         
                         {{ pago_seleccionado.fecha_pago | moment("DD-MMM-YYYY") }} 
                       </span>
                        <span v-else class="text-danger"> 
                          PENDIENTE
                        </span>
                    </td>
                   </tr>
                   <tr>
                     <td class="font-weight-bold">Cargo </td>                     
                     <td> <span :class="pago_seleccionado.pagado ? '':'text-danger'"> {{ pago_seleccionado.nombre_cargo }} </span></td> 
                   </tr>
                   <tr class="font-weight-bold">
                     <td>Monto </td>                     
                     <td><span :class="pago_seleccionado.pagado ? '':'text-danger'"> {{ formatPrice(pago_seleccionado.cargo) }} </span></td>
                   </tr>
                   <tr v-if="pago_seleccionado.pagado">
                     <td class="font-weight-bold">Factura </td>                     
                     <td> 
                       <span v-if="pago_seleccionado.identificador_factura != ''" >{{ pago_seleccionado.identificador_factura }}</span>
                       <span v-else class="text-muted small" >Sin Registro</span>
                     </td>
                   </tr>
                   <tr>
                     <td class="font-weight-bold">Forma Pago </td>                     
                     <td> {{ pago_seleccionado.forma_pago }} </td>
                   </tr>
                                     
                 </table>
                 
              </div>
            </div>
          </div>
          <div slot="footer">            
          </div>
        </Popup>
-->      
      </div>
    </div>
  </div>
</template>

<script src="../controller/ReporteAsistenciaComponentController.js" >
</script>
