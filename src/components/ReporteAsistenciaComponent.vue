<template>
  <div id="reporte-asistencia">    
    <div class="card">
      <div class="card-body">
        <div v-if="mensaje" class="alert alert-warning">{{mensaje}}</div>
        <div v-if="loading" class="h4">
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Cargando...</span>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <div class="float-right">
              <datepicker
                name="fecha"
                v-model="fecha"
                input-class="form-control"
                @selected="cambiarFecha"
              ></datepicker>
            </div>
          </div>
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
          :groupOptions="{
  	          enabled: false,               
          }"
        >
          <template slot="table-header-row" slot-scope="props">
            <span class="font-weight-bold text-info h5">{{ props.row.label }}</span>
          </template>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'foto'">
              <img :src="props.row.foto" alt class="rounded-circle" width="50" height="50" />
            </span>
            <span v-else-if="props.column.field == 'nombre_alumno'">
              <span>
                {{props.row.nombre_alumno}}
                <span class="text-muted">{{props.row.apellido_alumno}}</span>
              </span>
            </span>
            <span v-else-if="props.column.field == 'nombre_grupo'">
              <span class="badge badge-info text-wrap">{{props.row.nombre_grupo}}</span>
            </span>
            <span v-else-if="props.column.field == 'tiempo'">
              <span :class="props.row.alerta_tiempo ? 'text-danger':'text-success'">
                <i :class="props.row.alerta_tiempo ? 'fas fa-clock':''"></i>
                {{props.row.alerta_tiempo ? props.row.tiempo:""}}
              </span>
            </span>
            <span v-else-if="props.column.field == 'hora_salida'">
              <span :class="props.row.hora_salida != null ? 'text-primary':'text-muted'">
                {{props.row.hora_salida != null ? props.row.hora_salida:''}}
                <i
                  :class="props.row.hora_salida != null ? 'fas fa-check':''"
                ></i>
              </span>
             
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
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
