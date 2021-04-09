<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div v-for="row in listaSucursales" :key="row.id" class="col-xl-3 col-sm-4 py-2 mx-auto">
            <SucursalCard
              @click="verListaMensualidadesFacturadas(row)"
              :class_color="row.class_color"
              titulo
              :nombre="row.nombre"
              :foto="row.foto"
              icono_etiqueta
              etiqueta="Mensualidades"
              descripcion
            />
             <!--<img src="../assets/magic.png" class="rounded-lg" width="235" height="110" />-->
          </div>
        </div>
        <h5 class="text-muted">Mensualidades</h5>
        <h2>{{sucursal_seleccionada.nombre}}</h2>
        <h2>{{anio_seleccionado != null ? ('('+anio_seleccionado+')'):''}}</h2>
        <Loader :loading="isLoading" :mini="false" />

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

        <div style="overflow-x:auto;">
          <div class="row mx-auto">
            <table border="1" style="width:100%;border-color:#8D8D8D;">
              <th></th>
              <th>Enero</th>
              <th>Febrero</th>
              <th>Marzo</th>
              <th>Abril</th>
              <th>Mayo</th>
              <th>Junio</th>
              <th>Julio</th>
              <th>Agosto</th>
              <th>Septiembre</th>
              <th>Octubre</th>
              <th>Noviembre</th>
              <th>Diciembre</th>
              <tr>
                <td>Mensualidades</td>
                <td>{{formatPrice(sumasMeses.enero)}}</td>
                <td>{{formatPrice(sumasMeses.febrero)}}</td>
                <td>{{formatPrice(sumasMeses.marzo)}}</td>
                <td>{{formatPrice(sumasMeses.abril)}}</td>
                <td>{{formatPrice(sumasMeses.mayo)}}</td>
                <td>{{formatPrice(sumasMeses.junio)}}</td>
                <td>{{formatPrice(sumasMeses.julio)}}</td>
                <td>{{formatPrice(sumasMeses.agosto)}}</td>
                <td>{{formatPrice(sumasMeses.septiembre)}}</td>
                <td>{{formatPrice(sumasMeses.octubre)}}</td>
                <td>{{formatPrice(sumasMeses.noviembre)}}</td>
                <td>{{formatPrice(sumasMeses.diciembre)}}</td>
              </tr>
               <tr>
                <td>Descuentos</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.enero)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.febrero)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.marzo)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.abril)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.mayo)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.junio)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.julio)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.agosto)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.septiembre)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.octubre)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.noviembre)}}</td>
                <td>{{formatPrice(sumaTotalDescuentosMeses.diciembre)}}</td>
              </tr>
              <tr>
                <td>Pagado</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.enero)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.febrero)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.marzo)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.abril)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.mayo)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.junio)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.julio)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.agosto)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.septiembre)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.octubre)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.noviembre)}}</td>
                <td>{{formatPrice(sumaTotalPagadoMeses.diciembre)}}</td>
              </tr>
              <tr>
                <td>Pendiente</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.enero - sumaTotalDescuentosMeses.enero) - sumaTotalPagadoMeses.enero )}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.febrero - sumaTotalDescuentosMeses.febrero) - sumaTotalPagadoMeses.febrero)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.marzo -sumaTotalDescuentosMeses.marzo) - sumaTotalPagadoMeses.marzo)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.abril - sumaTotalDescuentosMeses.abril) - sumaTotalPagadoMeses.abril)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.mayo - sumaTotalDescuentosMeses.mayo) - sumaTotalPagadoMeses.mayo)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.junio - sumaTotalDescuentosMeses.junio) - sumaTotalPagadoMeses.junio)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.julio - sumaTotalDescuentosMeses.agosto) - sumaTotalPagadoMeses.julio)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.agosto - sumaTotalDescuentosMeses.septiembre) - sumaTotalPagadoMeses.agosto)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.septiembre - sumaTotalDescuentosMeses.octubre) - sumaTotalPagadoMeses.septiembre)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.octubre - sumaTotalDescuentosMeses.noviembre ) - sumaTotalPagadoMeses.octubre )}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.noviembre - sumaTotalDescuentosMeses.noviembre)-  sumaTotalPagadoMeses.noviembre)}}</td>
                <td class="font-weight-bold">{{formatPrice((sumasMeses.diciembre - sumaTotalDescuentosMeses.diciembre) - sumaTotalPagadoMeses.diciembre)}}</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <div class="btn-group" role="group" aria-label="Basic example">
              <download-excel
                v-if="listaCargos != []"
                class="btn btn-success btn-sm"
                :data="listaCargos"
                :fields="columnExport"
                :worksheet="nombre_libro"
                :name="nombre_reporte+'.xls'"
              >
                <i class="fas fa-download" /> XLS
              </download-excel>
              <download-excel
                v-if="listaCargos != []"
                class="btn btn-secondary btn-sm"
                :data="listaCargos"
                :fields="columnExport"
                :worksheet="nombre_libro"
                :name="nombre_reporte+'.csv'"
              >
                <i class="fas fa-download" /> csv
              </download-excel>
            </div>
          </div>
        </div>

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
              <span>{{ obtenerValorCargo(props.row.enero)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_enero'">
              <span>{{obtenerValorDescuento(props.row.enero)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.enero != null && props.row.enero.descuento_aplicado) ? props.row.enero.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_enero'">
              <span>{{props.row.enero != null ? props.row.enero.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'febrero'">
              <span>{{obtenerValorCargo(props.row.febrero)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_febrero'">
              <span>{{obtenerValorDescuento(props.row.febrero)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.febrero != null && props.row.febrero.descuento_aplicado) ? props.row.febrero.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_febrero'">
              <span>{{props.row.febrero != null ? props.row.febrero.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'marzo'">
              <span>{{obtenerValorCargo(props.row.marzo)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_marzo'">
              <span>{{obtenerValorDescuento(props.row.marzo)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.marzo != null && props.row.marzo.descuento_aplicado) ? props.row.marzo.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_marzo'">
              <span>{{props.row.marzo != null ? props.row.marzo.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'abril'">
              <span>{{obtenerValorCargo(props.row.abril)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_abril'">
              <span>{{obtenerValorDescuento(props.row.abril)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.abril != null && props.row.abril.descuento_aplicado) ? props.row.abril.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_abril'">
              <span>{{props.row.abril != null ? props.row.abril.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'mayo'">
              <span>{{obtenerValorCargo(props.row.mayo)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_mayo'">
              <span>{{obtenerValorDescuento(props.row.mayo)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.mayo != null && props.row.mayo.descuento_aplicado) ? props.row.mayo.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_mayo'">
              <span>{{props.row.mayo != null ? props.row.mayo.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'junio'">
              <span>{{obtenerValorCargo(props.row.junio)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_junio'">
              <span>{{obtenerValorDescuento(props.row.junio)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.junio != null && props.row.junio.descuento_aplicado) ? props.row.junio.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_junio'">
              <span>{{props.row.junio != null ? props.row.junio.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'julio'">
              <span>{{obtenerValorCargo(props.row.julio)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_julio'">
              <span>{{obtenerValorDescuento(props.row.julio)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.julio != null && props.row.julio.descuento_aplicado) ? props.row.julio.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_julio'">
              <span>{{props.row.julio != null ? props.row.julio.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'agosto'">
              <span>{{obtenerValorCargo(props.row.agosto)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_agosto'">
              <span>{{obtenerValorDescuento(props.row.agosto)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.agosto != null && props.row.agosto.descuento_aplicado) ? props.row.agosto.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_agosto'">
              <span>{{props.row.agosto != null ? props.row.agosto.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'septiembre'">
              <span>{{obtenerValorCargo(props.row.septiembre)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_septiembre'">
              <span>{{obtenerValorDescuento(props.row.septiembre)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.septiembre != null && props.row.septiembre.descuento_aplicado) ? props.row.septiembre.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_septiembre'">
              <span>{{props.row.septiembre != null ? props.row.septiembre.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'octubre'">
              <span>{{obtenerValorCargo(props.row.octubre)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_octubre'">
              <span>{{obtenerValorDescuento(props.row.octubre)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.octubre != null && props.row.octubre.descuento_aplicado) ? props.row.octubre.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_octubre'">
              <span>{{props.row.octubre != null ? props.row.octubre.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'noviembre'">
              <span>{{obtenerValorCargo(props.row.noviembre)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_noviembre'">
              <span>{{obtenerValorDescuento(props.row.noviembre)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.noviembre != null && props.row.noviembre.descuento_aplicado) ? props.row.noviembre.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_noviembre'">
              <span>{{props.row.noviembre != null ? props.row.noviembre.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'diciembre'">
              <span>{{obtenerValorCargo(props.row.noviembre)}}</span>
            </span>
            <span v-else-if="props.column.field == 'descuento_diciembre'">
              <span>{{obtenerValorDescuento(props.row.diciembre)}}</span>
              <span
                class="text-primary small"
              >{{(props.row.diciembre != null && props.row.diciembre.descuento_aplicado) ? props.row.diciembre.nombre_descuento : ''}}</span>
            </span>
            <span v-else-if="props.column.field == 'importe_diciembre'">
              <span>{{props.row.diciembre != null ? props.row.diciembre.total_pagado : 0}}</span>
            </span>

            <span v-else-if="props.column.field == 'alumno'">
              <span>{{ props.row.alumno }}</span>
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

<style scoped>
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #f5f5f5;
}
th,
td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
</style>