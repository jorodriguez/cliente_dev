<template>
  <div>    
    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div v-for="row in listaSucursales" :key="row.id" class="col-xl-3 col-sm-4 py-2 mx-auto">

            <SucursalCard 
                @click="verListaMensualidadesFacturadas(row)"
                :class_color="row.class_color"
                titulo=""
                :nombre="row.nombre"
                :foto="row.foto"
                icono_etiqueta=""
                etiqueta="Mensualidades"
                descripcion=""
            />
           
          </div>
        </div>
        <h5 class="text-muted">Mensualidades</h5>
        <h2>{{sucursal_seleccionada.nombre}}</h2>
        <h2>{{anio_seleccionado != null ? ('('+anio_seleccionado+')'):''}}</h2>
         <div class="d-flex flex-row-reverse d-highlight">
          <div class="bd-highlight">
            <div class="form-group">              
              <select
                id="filtroAnios"
                v-model="anio_seleccionado"
                v-on:change="cambiarAnio"
                class="form-control h3"
                placeholder="Año"
              >
                <option
                  v-for="p in listaFiltroAnios"
                  v-bind:value="p.anio"
                  v-bind:key="p.anio"
                >{{ p.anio }}</option>
              </select>
            </div>
          </div>
        </div>
        
        <button @click="calcularOperaciones()">
          Calcular
        </button>

        {{sumasMeses}}

        <vue-good-table
          :columns="columnsCargos"
          :rows="listaCargos"
          :line-numbers="true"
          @on-search="onSearch"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'enero'">
              <CeldaMesMensualidad
                :value="props.row.enero"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />              
            </span>
            <span v-else-if="props.column.field == 'porcentaje_enero'">
              porcentaje_enero
            </span>            
            <span v-else-if="props.column.field == 'febrero'">
              <CeldaMesMensualidad
                :value="props.row.febrero"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'marzo'">
              <CeldaMesMensualidad
                :value="props.row.marzo"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'abril'">
              <CeldaMesMensualidad
                :value="props.row.abril"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'mayo'">
              <CeldaMesMensualidad
                :value="props.row.mayo"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'junio'">
              <CeldaMesMensualidad
                :value="props.row.junio"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'julio'">
              <CeldaMesMensualidad
                :value="props.row.julio"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'agosto'">
              <CeldaMesMensualidad
                :value="props.row.agosto"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'septiembre'">
              <CeldaMesMensualidad
                :value="props.row.septiembre"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'octubre'">
              <CeldaMesMensualidad
                :value="props.row.octubre"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'noviembre'">
              <CeldaMesMensualidad
                :value="props.row.noviembre"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>
            <span v-else-if="props.column.field == 'diciembre'">
              <CeldaMesMensualidad
                :value="props.row.diciembre"
                :mostrar_mes="mostrar_mes"
                :mostrar_monto="mostrar_monto"
                :mostrar_pagado="mostrar_pagado"
                :mostrar_adeuda="mostrar_adeuda"
              />
            </span>

            <span v-else-if="props.column.field == 'alumno'">
              <span>{{ props.row.alumno }} </span>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
          <div slot="selected-row-actions"></div>
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
                    <td class="font-weight-bold">Estatus</td>
                    <td>
                      <span v-if="pago_seleccionado.pagado" class="text-success">
                        <strong>
                          PAGADO
                          <i class="fas fa-check-circle text-success text-small"></i>
                        </strong>
                      </span>
                      <span v-else class="text-danger">
                        <strong>PENDIENTE</strong>
                      </span>
                    </td>
                  </tr>

                  <tr>
                    <td class="font-weight-bold">Alumno</td>
                    <td>{{pago_seleccionado.nombre_alumno}}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Fecha de cargo</td>
                    <td>
                      <span
                        :class="pago_seleccionado.pagado ? '':'text-danger'"
                      >{{ pago_seleccionado.fecha_cargo | moment("DD-MMM-YYYY") }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Fecha de pago</td>
                    <td>
                      <span
                        v-if="pago_seleccionado.pagado"
                      >{{ pago_seleccionado.fecha_pago | moment("DD-MMM-YYYY") }}</span>
                      <span v-else class="text-danger">PENDIENTE</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Cargo</td>
                    <td>
                      <span
                        :class="pago_seleccionado.pagado ? '':'text-danger'"
                      >{{ pago_seleccionado.nombre_cargo }}</span>
                    </td>
                  </tr>
                  <tr class="font-weight-bold">
                    <td>Monto</td>
                    <td>
                      <span
                        :class="pago_seleccionado.pagado ? '':'text-danger'"
                      >{{ formatPrice(pago_seleccionado.cargo) }}</span>
                    </td>
                  </tr>
                  <tr v-if="pago_seleccionado.pagado">
                    <td class="font-weight-bold">Factura</td>
                    <td>
                      <span
                        v-if="pago_seleccionado.identificador_factura != ''"
                      >{{ pago_seleccionado.identificador_factura }}</span>
                      <span v-else class="text-muted small">Sin Registro</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Forma Pago</td>
                    <td>{{ pago_seleccionado.forma_pago }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div slot="footer"></div>
        </Popup>
      </div>
    </div>
  </div>
</template>

<script src="../controller/ReporteMensualidadesController.js" >
</script>
