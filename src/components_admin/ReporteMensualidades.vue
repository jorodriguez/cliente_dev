<template>
  <div> 
    {{usuarioSesion.nombre_sucursal}} = {{usuarioSesion.id}}
    <button @click="loadFunctionReporteContadoresSucursalesMesActual()">Reload</button>
    
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
                <small class="badge badge-info " style="background-color: gray"> {{row.total_cargos}}</small>
                <small>Mensualidades </small>                
                <!--<small>{{formatNumeroMes(row.numero_mes)}}</small>-->
                <!--<h4 class="display-5">{{row.pagos_facturados}} de {{row.cargos_pagados}}</h4>-->
              </div>
            </div>
          </div>
        </div>
        <h3>{{sucursal_seleccionada.sucursal}}</h3>
        <h5 class="text-muted">Mensualidades</h5>
         <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td
                    v-for="row in listaMeses"
                    :key="row.id"
                    class="border pointer"
                    v-on:click="verCargosPorMes(row)"
                    title="Clic para ver la lista de cargos."
                  >
                    <h6>
                      <strong>{{row.mes_anio}}</strong>
                    </h6>
                    <p
                      v-bind:class="row.cargos_no_pagados > 1 ? 'text-muted text-danger':'text-muted'"
                    >{{ formatNumeroMes(row.numero_mes) }} ({{ row.cargos_no_pagados }} pendientes)</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
<!--
        <div class="d-flex flex-row-reverse d-highlight">
          <div class="bd-highlight">
            <div class="form-group">
              <select
                id="meses"
                v-model="mes_seleccionado"
                v-on:change="cambiarMes"
                class="form-control"
                placeholder="Mes"
              >
                <option
                  v-for="p in listaMeses"
                  v-bind:value="p.anio_mes"
                  v-bind:key="p.anio_mes"
                >{{ formatNumeroMes(p.numero_mes) }} ({{ p.cargos_no_pagados }} pendientes)</option>
              </select>
            </div>
          </div>
        </div>-->
        <vue-good-table
          :columns="columnsCargos"
          :rows="listaCargos"
          :line-numbers="true"
          @on-row-click="onRowClick"
          @on-search="onSearch"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
          @on-selected-rows-change="selectionChanged"
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
          @on-select-all="selectAll"
        >
          <template slot="table-row" slot-scope="props">
            <!--<span v-if="props.row.pagado && props.row.vgtSelected">
                nada
            </span>
            <span v-else-if="props.column.field == 'pago'">-->
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
            <span v-else-if="props.column.field == 'fecha_pago'">
              <span
                v-bind:class="props.row.pagado ? '':'text-danger'"
              >{{props.row.fecha_pago | moment("DD-MMM-YYYY") }}</span>
            </span>
            <span v-else-if="props.column.field == 'pagado'">
              <small
                class="fas fa-check-circle text-success text-small"
                v-if="props.row.pagado"
                title="Pagado"
              ></small>
              <small
                class="fas fa-check-circle text-danger text-small"
                v-if="!props.row.pagado"
                title="¡Adeuda!"
              ></small>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
          <div slot="selected-row-actions">
            <button class="btn btn-primary" v-on:click="iniciarEnvio">Aviso de pago</button>
          </div>
        </vue-good-table>

        <Popup id="confirmarRecordatorioEnvioRecibo" show_button_close="true">
          <div slot="header">Confirmar envio de recordatorio</div>
          <div slot="content">
            <p class="text-danger">{{mensaje}}</p>
            <div class="row">
              <div class="col text-left">
                <label for="validationTextarea">
                  <strong>
                    Nota de recordatorio
                    <span class="text-danger">*</span>
                  </strong>
                </label>
                <textarea
                  class="form-control text-primary"
                  id="validationTextarea"
                  placeholder="Nota de recordatorio de pago"
                  v-model="texto_recordatorio"
                  style="width:100%;heigth:100%"
                  required
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div class="container">
                <small
                  class="text-danger"
                >La notificación se enviará a las direcciones de correo válidas.</small>
                <vue-good-table
                  class="table"
                  :columns="[{
                      label: 'Alumno',
                      field: 'nombre_alumno',
                      filterable: true,
                      thClass: 'text-center',
                      tdClass: 'text-center',
                },
                {
                      label: 'Padres',
                      field: 'nombres_padres',
                      filterable: true,
                      thClass: 'text-center',
                      tdClass: 'text-center',
                },
                {
                      label: 'Correos',                      
                      field: 'correos',
                      filterable: false,                                  
                      thClass: 'text-center',
                      tdClass: 'text-center',
                },
                {
                      label: 'Movil',
                      field: 'tokens',  
                      filterable: false,                    
                      sorteable:false,
                      thClass: 'text-center',
                      tdClass: 'text-center',
                },
                ]"
                  :rows="rowSelection"
                  :line-numbers="false"
                  :select-options="{enabled:false}"
                  :search-options="{enabled:true}"
                  :sort-options="{enabled: false}"
                  max-height="200px"
                  :fixed-header="true"
                >
                  <template slot="table-row" slot-scope="props">
                    <span v-if="props.column.field == 'correos'">
                      <span>{{procesarListaCorreo(props.row.correos)}}</span>
                    </span>
                    <span v-else-if="props.column.field == 'tokens'">
                      <span
                        v-bind:class=" props.row.tokens ? 'text-success':'text-danger'"
                      >{{(props.row.tokens != null && props.row.tokens != []) ? 'OK':'X'}}</span>
                    </span>
                    <span v-else>{{props.formattedRow[props.column.field]}}</span>
                  </template>
                </vue-good-table>
              </div>
            </div>
          </div>
          <div slot="footer">
            <button class="btn btn-primary" v-on:click="enviarRecordatorio">Enviar recordatorio</button>
          </div>
        </Popup>

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

        <!-- Tabla de cargos -->
        <!-- <div class="table-responsive">
          <table class="table">
            <thead>
              <th class="text-left">Alumno</th>
              <th class="text-left">Fecha de pago</th>
              <th class="text-left">Pago</th>
              <th class="text-left">Cargo</th>
              <th class="text-left">Factura</th>
              <th></th>
            </thead>
            <tr v-for="row in listaCargos" :key="row.id" class="text-left">
              <td>                
                <span v-bind:class=" row.pagado ? '':'text-danger'">
                  <strong>{{row.nombre_alumno}}</strong>
                </span>
              </td>
              <td>
                <span
                  v-bind:class=" row.pagado ? '':'text-danger'"
                >{{ row.fecha_pago | moment("DD-MMM-YYYY") }}</span>
              </td>
              <td class="text-left">
                <span v-bind:class=" row.pagado ? '':'text-danger'">${{formatPrice(row.pago)}}</span>
              </td>
              <td class="text-left">
                <span v-bind:class=" row.pagado ? '':'text-danger'">${{formatPrice(row.cargo)}}</span>
              </td>
              <td>
                <span class="text-success">
                  <strong>{{row.identificador_factura}}</strong>
                </span>
              </td>
              <td>
                <i class="fas fa-check-circle text-success text-small" v-if="row.pagado">Pagado</i>
                <i class="fas fa-check-circle text-danger text-small" v-if="!row.pagado">¡Adeuda!</i>
              </td>
            </tr>
          </table>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script src="../controller/ReporteMensualidadesController.js" >
</script>
