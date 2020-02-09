<template>
  <div class="cat_alumno container">
    <h1>Balances</h1>
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
    <br />

    <div class="row text-right">
      <div class="col align-self-end">
        <router-link
          to="/ReporteGastos"
          class="btn btn-outline-danger"
        >Gastos $ {{ formatPrice(gasto_mensual)}}</router-link>
      </div>
    </div>

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
        >Cargos</a>
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
        >Crecimiento</a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          id="pills-mensualidades-tab"
          data-toggle="pill"
          href="#pills-mensualidades"
          role="tab"
          aria-controls="pills-mensualidades"
          aria-selected="false"
        >Mensualidades</a>
      </li>
      <!--
      <li class="nav-item">
        <a
          class="nav-link"
          id="pills-alumnos-cargos-tab"
          data-toggle="pill"
          href="#pills-alumnos-cargos"
          role="tab"
          aria-controls="pills-alumnos-cargos"
          aria-selected="false"
        >Alumnos</a>
      </li>-->
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
                v-for="row in listaBalanceSucursal"
                :key="row.id"
                class="col-xl-3 col-sm-4 py-2 mx-auto"
              >
                <div
                  class="card text-white h-100 pointer sucursal-item-hover hover"
                  v-on:click="verDetalleDeudasSucursal(row)"
                  title="Clic para ver el detalle"
                  v-bind:style="{'background-color':row.class_color}"
                >
                  <div class="card-body" v-bind:style="{'background-color':row.class_color}">
                    <h6 class="text-uppercase">{{row.nombre}}</h6>
                    <small>Pendiente</small>

                    <h4 class="display-5">${{formatPrice(row.total_adeuda)}}</h4>
                    <div v-if="row.array_desglose_cargos.length > 0">
                      <div v-for="desglose in row.array_desglose_cargos" :key="desglose.id">
                        <small
                          v-bind:title="'Total en cargos $'+desglose.total_cargos_desglose+', Total pagados : $'+desglose.total_cargos_pagados_desglose"
                        >
                          ${{ formatPrice(desglose.total_cargos_pendiente_desglose)}} de
                          <span
                            class="badge badge-light"
                          >{{desglose.cargos_pendientes_pago}}</span>
                          {{desglose.tipo_cargo}}
                        </small>
                      </div>
                    </div>
                  </div>
                  <h6>{{row.contador_alumnos}} alumnos en total</h6>
                </div>
              </div>
            </div>
            <h3>{{sucursal_seleccionada.nombre}}</h3>
            <br />
            <!--<div class="row">
              <div
                v-for="desglose in sucursal_seleccionada.array_desglose_cargos"
                :key="desglose.id"
                class="col-sm-4 py-1 mx-auto border"
              >
                <div
                  class="card  h-100 pointer sucursal-item-hover hover"
                  @click="verDetalleDeudasSucursalYTipoCargo(desglose)"
                  v-bind:title="'Total en cargos $'+desglose.total_cargos_desglose+', Total pagados : $'+desglose.total_cargos_pagados_desglose"
                >
                  <div class="card-body">
                    <p >{{desglose.tipo_cargo}}</p>
                    <span class="badge badge-light">{{desglose.cargos_pendientes_pago}}</span>
                  </div>
                  <h6>Ver</h6>
                </div>                
              </div>              
            </div>-->
            <div class="row">
              <div class="col-auto mr-auto"></div>
              <div class="col-auto">
                <select
                  v-model="id_tipo_cargo_seleccionado"
                  class="form-control"
                  placeholder="Filtrar"
                  @change="verDetalleDeudasSucursalYTipoCargoChange()"
                >
                  <option v-bind:value="-1" v-bind:key="-1">Todos los cargos</option>
                  <option
                    v-for="desglose in sucursal_seleccionada.array_desglose_cargos"
                    v-bind:value="desglose.id_cargo"
                    v-bind:key="desglose.id_cargo"
                  >
                    {{desglose.tipo_cargo}}
                    <strong>
                      <span class="text-danger">({{ desglose.cargos_pendientes_pago }})</span>
                    </strong>
                  </option>
                </select>
              </div>
            </div>
            <br />

            <vue-good-table
              :columns="columnsAlumnos"
              :rows="listaBalancesAlumnosPorSucursal"
              :line-numbers="true"
              :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
              :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
              :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'nombre'">
                  <button
                    type="button"
                    class="btn btn-link"
                    title="Ver datos del alumno"
                    v-on:click="verPerfil(props.row)"
                  >
                    {{ props.row.nombre }}
                    <sup
                      v-if="props.row.nuevo_ingreso"
                      class="badge badge-pill badge-warning"
                    >
                      <i>Nuevo Ingreso</i>
                    </sup>
                    <span class="text-danger">{{props.row.adeuda ? '*':''}}</span>
                  </button>
                </span>

                <span v-else-if="props.column.field == 'foto'">
                  {{props.row.id}}
                  <img
                    :src="props.row.foto != '' ? props.row.foto :'https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg' "
                    width="50"
                    height="50"
                    alt="..."
                    class="rounded-circle"
                    v-on:click="verPerfil(props.row)"
                  />
                </span>
                <span v-else-if="props.column.field == 'cargos_array'">
                  <ul v-if="props.row.existen_cargos_adeuda">
                    <li v-for="row in props.row.cargos_array" :key="row.id" class="text-left">
                      <strong>${{row.total_adeudo}}</strong>
                      {{row.nombre_cargo}} {{row.texto_ayuda}}
                      <span
                        v-if="row.texto_ayuda"
                      >'{{row.anio}}</span>
                      <span v-if="row.total_pagado_cargo > 0" class="text-info">
                        (Abonó
                        <strong>${{row.total_pagado_cargo}}</strong>)
                      </span>
                    </li>
                  </ul>
                </span>
                <span v-else-if="props.column.field == 'total_adeudo'">
                  <span
                    v-if="props.row.total_adeudo > 0"
                    class="text-danger"
                  >${{ props.row.total_adeudo }}</span>
                  <span v-else>${{ props.row.total_adeudo }}</span>
                </span>

                <span v-else>{{props.formattedRow[props.column.field]}}</span>
              </template>
              <div slot="selected-row-actions"></div>
            </vue-good-table>

            <!--<div class="table-responsive">
              <table class="table">
                <thead>
                  <th></th>
                  <th>Nombre</th>
                  <th class="hidden-xs">Apellidos</th>
                  <th>Adeuda</th>
                  <th></th>
                </thead>
                <tr v-for="row in listaBalancesAlumnosPorSucursal" :key="row.id" class="text-left">
                  <td>
                    <img
                      src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                      width="50"
                      height="50"
                      alt="..."
                      title="Ver datos del alumno"
                      class="rounded-circle"
                      v-on:click="verPerfil(row)"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-link"
                      title="Ver datos del alumno"
                      v-on:click="verPerfil(row)"
                    >
                      {{ row.nombre }}
                      <sup
                        v-if="row.nuevo_ingreso"
                        class="badge badge-pill badge-warning"
                      >
                        <i>Nuevo Ingreso</i>
                      </sup>
                      <span class="text-danger">{{row.adeuda ? '*':''}}</span>
                    </button>
                  </td>
                  <td class="hidden-xs">{{ row.apellidos }}</td>
                  <td class="text-center">
                    <span v-if="row.total_adeudo > 0" class="text-danger">${{ row.total_adeudo }}</span>
                    <span v-else>${{ row.total_adeudo }}</span>
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>-->
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
          <div class="card-body">
            <div class="row mb-3">
              <div
                v-for="row in listaBalanceCrecimiento"
                :key="row.id"
                class="col-xl-3 col-sm-4 py-2 mx-auto"
              >
                <div
                  class="card text-white h-100 pointer sucursal-item-hover"
                  v-on:click="verDetalleCrecimientoSucursal(row)"
                  title="Clic para ver el detalle"
                >
                  <div class="card-body" v-bind:style="{'background-color':row.class_color}">
                    <h6 class="text-uppercase">{{row.nombre}}</h6>
                    <h6>
                      <span
                        v-bind:class="row.count_alumno == 0 ? 'badge badge-pill badge-danger':'badge badge-pill badge-light'"
                      >{{row.count_alumno}}</span>
                      alumnos inscritos este mes
                    </h6>
                    <!--<h4 class="display-5">Cargos : ${{formatPrice(row.total_cargos_crecimiento)}}</h4>-->
                    <small>Crecimiento (Mensualidad)</small>
                    <h4>
                      <p>${{formatPrice(row.suma_colegiaturas)}}</p>
                    </h4>
                    <small class="text-muted">Inscripciones</small>
                    <h4 class="text-muted">
                      <p>${{formatPrice(row.suma_inscripciones)}}</p>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div class="mx-auto">
              <h3>{{sucursal_seleccionada_crecimiento.nombre}}</h3>
              <br />
            </div>

            <div class="row text-center">
              <div class="table-responsive">
                <table class="table alumnos_table">
                  <tbody>
                    <tr>
                      <td
                        v-for="row in listaCrecimientoMensualSucursal"
                        :key="row.id"
                        class="border pointer"
                        v-on:click="verAlumnosCrecimientoMensualSucursal(row)"
                        title="Clic para ver la lista de alumnos ingresados."
                      >
                        <h6>
                          <strong>{{row.mes_anio}}</strong>
                        </h6>
                        <p
                          v-bind:class="row.count_alumno == 0 ? 'badge badge-pill badge-danger':'badge badge-pill badge-info'"
                        >
                          {{row.count_alumno}}
                          <span>Alumnos</span>
                        </p>
                        <p
                          v-bind:class="row.count_alumno == 0 ? 'text-muted text-danger':'text-muted'"
                        >${{ formatPrice(row.suma_colegiaturas)}}</p>
                        <small>Gastos</small>
                        <p
                          v-bind:class="row.suma_gastos > 0 ? 'text-danger':''"
                        >${{ formatPrice(row.suma_gastos)}}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mx-auto">
                <button v-on:click="verCrecimientoGlobal()" class="btn btn-link">Ver Global</button>
              </div>
            </div>

            <!-- PENDIENTE
            <div class="card mx-auto">
              Ingresos - gastos
              <div class="card-body">
                <table class="table table-striper" v-if="reporteIngresoMenosGastos != null">
                  <tr>
                    <th>Sucursal</th>
                    <th>Mensualidades</th>
                    <th>Gastos</th>
                    <th>Ingresos - Cargos</th>
                  </tr>
                  <tr>
                    <td>{{reporteIngresoMenosGastos.sucursal}}</td>
                    <td>$ {{ formatPrice(reporteIngresoMenosGastos.cargos)}}</td>
                    <td>
                      <span
                        v-bind:class="reporteIngresoMenosGastos.suma_gastos > 0 ? 'text-danger':'text-success'"
                      >$ {{ formatPrice(reporteIngresoMenosGastos.suma_gastos)}}</span>
                    </td>
                    <td>
                      
                        <strong>
                          <span
                            v-if="reporteIngresoMenosGastos.suma_gastos == null"
                            class="text-success"
                          >$ {{formatPrice(reporteIngresoMenosGastos.cargos)}}</span>

                          <span
                            v-if="reporteIngresoMenosGastos.suma_gastos != null"
                            v-bind:class="reporteIngresoMenosGastos.ganancias <= 0 ? 'text-danger':'text-success'"
                          >$ {{formatPrice(reporteIngresoMenosGastos.ganancias)}}</span>
                        </strong>
                      
                    </td>
                  </tr>
                </table>               
              </div>
            </div>
            -->

            <div class="table-responsive">
              <table class="table">
                <thead>
                  <th></th>
                  <th>Nombre</th>
                  <th class="hidden-xs">Apellidos</th>
                  <th>Inscripción</th>
                  <th>Mensualidad</th>
                  <th></th>
                </thead>
                <tbody v-for="row in listaBalancesAlumnosNuevosPorSucursal" :key="row.id">
                  <tr class="text-left">
                    <td>
                      <img
                        :src="row.foto"
                        width="50"
                        height="50"
                        alt="..."
                        title="Ver datos del alumno"
                        class="rounded-circle"
                        v-on:click="verPerfil(row)"
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-link"
                        title="Ver datos del alumno"
                        v-on:click="verPerfil(row)"
                      >
                        {{ row.nombre }}
                        <sup
                          v-if="row.nuevo_ingreso"
                          class="badge badge-pill badge-warning"
                        >
                          <i>Nuevo Ingreso</i>
                        </sup>
                        <span class="text-danger">{{row.adeuda ? '*':''}}</span>
                      </button>
                    </td>

                    <td class="hidden-xs text-center">{{ row.apellidos }}</td>

                    <td class="text-center">
                      <span>{{row.fecha_inscripcion | moment("DD-MMM-YYYY")}}</span>
                    </td>

                    <td class="text-center">
                      <strong>
                        <span class="text-primary">$ {{ formatPrice(row.costo_colegiatura)}}</span>
                      </strong>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-mensualidades"
        role="tabpanel"
        aria-labelledby="pills-mensualidades-tab"
      >
        <div class="card">
          <ReporteMensualidades />
        </div>
      </div>
      <!-- ALUMNO CARGOS -->

      <!-- <div
        class="tab-pane fade"
        id="pills-alumnos-cargos"
        role="tabpanel"
        aria-labelledby="pills-alumnos-cargo-tab"
      >
        <div class="card">
          <AlumnosCargos />
        </div>
      </div>-->
    </div>

    <!--- Detalle -->

    <div id="modal_alumno" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
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

<script src="../controller/ReporteDeudasController.js" >
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
