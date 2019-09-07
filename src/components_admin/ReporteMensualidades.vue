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

        <!--
        <div class="row d-flex flex-row-reverse">
          <div class="custom-control custom-switch p-2">
            <input
              type="checkbox"
              v-model="verTodosCargos"
              v-on:click="toggleTodosCargos"
              class="custom-control-input"
              id="customSwitch1"
            />
            <label class="custom-control-label" for="customSwitch1">Ver todas las mensualidades</label>
          </div>
        </div>-->
        <div class="row text-right">
          Meses
        </div>
        <vue-good-table
        
          :columns="columnsCargos"
          :rows="listaCargos"
          :line-numbers="true"          
          @on-row-click="onRowClick"
          @on-search="onSearch"          
          :search-options="{
                        enabled: true,                        
                        skipDiacritics: true,                        
                        placeholder: 'Buscar'                       
                    }"
          :pagination-options="{
                      enabled: true,
                      mode: 'records',
                      perPage: 10,
                      position: 'bottom',
                      //perPageDropdown: [3, 7, 9],
                      dropdownAllowAll: false,
                      setCurrentPage: 2,
                      nextLabel: 'Siguiente',
                      prevLabel: 'Anterior',
                      rowsPerPageLabel: 'Registros por pagina',
                      ofLabel: 'de',
                      pageLabel: 'Pagina', // for 'pages' mode
                      allLabel: 'Todos',
              }"
              @on-selected-rows-change="selectionChanged"
              :selectOptions="{
                    enabled: true,
                    selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                    selectionInfoClass: 'custom-class',
                    selectionText: 'rows selected',
                    clearSelectionText: 'clear',
                    disableSelectInfo: true, // disable the select info panel on top
                }"
            @on-select-all="selectAll"
                
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'pago'">              
                <span v-bind:class=" props.row.pagado ? 'text-success':'text-danger'">${{formatPrice(props.row.pago)}}</span>
                <small v-if="(props.row.pago > 0 && props.row.pagado==false)" 
                v-bind:class=" (props.row.pago > 0 && props.row.pagado==false) ? 'label info text-success':'text-danger'">Abono</small>
            </span>
            <span v-else-if="props.column.field == 'cargo'">              
                <span v-bind:class="props.row.pagado ? '':'text-danger'">${{formatPrice(props.row.cargo)}}</span>
            </span>
            <span v-else-if="props.column.field == 'fecha_pago'">              
              <span  v-bind:class="props.row.pagado ? '':'text-danger'">{{props.row.fecha_pago | moment("DD-MMM-YYYY") }}</span>
            </span>
            <span v-else-if="props.column.field == 'pagado'">              
              <small class="fas fa-check-circle text-success text-small" v-if="props.row.pagado" title="Pagado"></small>
              <small class="fas fa-check-circle text-danger text-small" v-if="!props.row.pagado" title="¡Adeuda!"></small>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>

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
