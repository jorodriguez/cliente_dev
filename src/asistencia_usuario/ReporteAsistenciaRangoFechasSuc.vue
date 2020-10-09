<template>
  <div id="reporte-asistencia-miss-rango-fecha">
    <div>
      <h1>Asistencias y sueldos de Miss</h1>
      <small>{{usuarioSesion.nombre_sucursal}}</small>
      <!--<div class="text-left">
        <router-link to="/AsistenciasUsuarios" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>-->
    </div>
    <div class="card">
      <div class="card-body">
        <div v-if="mensaje" class="alert alert-warning">{{mensaje}}</div>
        <div v-if="loading" class="h4">
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Cargando...</span>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group col-md-4">
            <select
              v-model="anio_seleccionado"
              class="form-control"
              placeholder="Año"
              v-on:change="cargarFiltroQuincenas()"
            >
              <option selected v-bind:value="0" v-bind:key="0">Año..</option>
              <option
                v-for="anio in listaAnios"
                v-bind:value="anio"
                v-bind:key="anio.numero_anio"
              >{{ anio.numero_anio }}</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <select
              v-model="quincena_seleccionada"
              class="form-control"
              placeholder="Año"
              v-on:change="cargarFechasQuincena()"
            >
              <option selected v-bind:value="{}" v-bind:key="0">Quincena..</option>
              <option
                v-for="quincena in listaQuincenas"
                v-bind:value="quincena"
                v-bind:key="quincena.index"
              >{{quincena.numero_primer_dia_quincena}} al {{quincena.numero_ultimo_dia_quincena}} de {{ quincena.nombre_mes }}</option>
            </select>
          </div>
          <div class="form-group col-md-4">
            <button
              class="btn btn-primary"
              :disabled="quincena_seleccionada == {} && anio == 0"
              @click="cargarRegistros"
            >Buscar</button>
          </div>
        </div>

        <h2>Registros de {{quincena_enlistada.numero_primer_dia_quincena}} - {{quincena_enlistada.numero_ultimo_dia_quincena}} de {{ quincena_enlistada.nombre_mes }}</h2>

        <span v-for="row in listaAsistenciaSucursal" :key="row.id">
          <div class="card text-left m-2 border border-info">
            <div class="row p-3">
              <div class="col-4">
                <h2>
                  <span class="pointer" @click="verDetalleUsuario(row)">{{row.usuario}}</span>
                </h2>
              </div>
              <div class="col-4">
                <span>
                  <!--<strong v-if="quincena_seleccionada != {}">{{quincena_seleccionada.numero_primer_dia_quincena}} al {{quincena_seleccionada.numero_ultimo_dia_quincena}} de {{quincena.nombre_mes}}</strong>-->
                  <strong>{{row.hora_entrada}} a {{row.hora_salida}}</strong>
                  <div class="text-left">
                    <span v-if="row.count_dias_faltas > 0" class="text-danger">
                      <i class="far fa-hand-point-right"></i>
                      <strong>{{row.count_dias_faltas}}</strong> de
                      <strong>{{row.dias_laborables}}</strong>
                      <span v-if="row.count_dias_faltas > 1">días</span>
                      <span v-else>día</span>
                      faltó (-{{row.porcentaje_falta}}%)
                    </span>
                    <span v-else>
                      <i class="far fa-thumbs-up"></i> 100% asistencia
                    </span>
                    <p
                      class="text-danger"
                      v-if="(row.count_checo_entrada-row.count_checo_salida) > 0"
                    >
                      <i class="far fa-hand-point-right"></i>
                      <span
                        class="font-weight-bold"
                      >{{row.count_checo_entrada-row.count_checo_salida}}</span>
                      <span v-if="(row.count_checo_entrada-row.count_checo_salida) > 1">días</span>
                      <span v-else>día</span> no registró salida
                    </p>
                    <!--<p class="text-primary pointer" @click="verDetalleUsuario(row)">Más detalle</p>-->                    
                    <p/>
                    <PopupOperacionesUsuario
                      :buscar="true"
                      :id_usuario="row.id"
                      :metodo_refrescar="cargarRegistros"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-dark btn-sm"
                      title="Ver la lista de asistencia a detalle"
                      @click="verDetalleUsuario(row)"                      
                    >                      
                      <i class="fas fa-list"></i>
                    </button>
                    
                  </div>
                </span>
              </div>
              <div class="col-4 d-flex justify-content-end">
                <table>
                  <tr>
                    <td>Mensual</td>
                    <td>
                      <strong>: ${{row.sueldo_base_mensual}}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Quincenal</td>
                    <td>
                      <strong>: ${{row.sueldo_base_quincenal}}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span
                        class="text-danger"
                        v-if="row.count_dias_faltas > 0"
                      >-{{row.count_dias_faltas}} días</span>
                    </td>
                    <td>
                      <span
                        class="text-danger"
                        v-if="row.count_dias_faltas > 0"
                      >: ${{row.descuento_faltas}}</span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="card-footer d-flex justify-content-end">
              <h2>Total : ${{row.sueldo_quincenal_pago}}</h2>
            </div>
          </div>
        </span>
      </div>
    </div>
    <!-- popup para detalle de asistencias en el rango de fechas seleccionado -->
    <Popup id="popup_detalle_asistencia" show_button_close="true" size="lg">
      <div slot="header">Registro de asistencias</div>
      <div slot="content">
        <div class="container">
          <div class="row">
            <div class="col-8">
              <table class="table text-left" v-if="usuario_seleccionado != null">
                <tr>
                  <td>
                    <span>
                      <strong>{{usuario_seleccionado.usuario}}</strong>
                    </span>
                  </td>
                  <td colspan="2">
                    Horario :
                    <strong>{{usuario_seleccionado.hora_entrada}} a {{usuario_seleccionado.hora_salida}}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{{usuario_seleccionado.dias_laborables}}</strong> días Laborables
                  </td>
                  <td>
                    <span v-if="usuario_seleccionado.count_dias_faltas > 0" class="text-danger">
                      <span>
                        <i class="far fa-hand-point-right"></i>
                        {{usuario_seleccionado.count_dias_faltas}}
                        <span
                          v-if="usuario_seleccionado.count_dias_faltas > 1"
                        >días</span>
                        <span v-else>día</span>
                        faltó (-{{usuario_seleccionado.porcentaje_falta}}%)
                      </span>
                    </span>
                    <span v-else>
                      <i class="far fa-thumbs-up"></i> 100% asistencia
                    </span>
                  </td>
                  <td>
                    <span
                      class="text-danger"
                      v-if="usuario_seleccionado.count_checo_entrada != null && (usuario_seleccionado.count_checo_entrada-usuario_seleccionado.count_checo_salida) > 0"
                    >
                      <i class="far fa-hand-point-right"></i>
                      <span
                        class="font-weight-bold"
                      >{{usuario_seleccionado.count_checo_entrada-usuario_seleccionado.count_checo_salida}}</span>
                      <span
                        v-if="(usuario_seleccionado.count_checo_entrada-usuario_seleccionado.count_checo_salida) > 1"
                      >días</span>
                      <span v-else>día</span> no registró salida
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="col-4">
              <table class="table text-left" v-if="usuario_seleccionado != null">
                <tr>
                  <td>
                    <ul style="list-style:none">
                      <li>
                        <span>
                          <strong>${{usuario_seleccionado.sueldo_base_mensual}}</strong>
                        </span>
                        Base Mensual
                      </li>
                      <li>
                        <span>
                          <strong>${{usuario_seleccionado.sueldo_base_quincenal}}</strong>
                        </span>
                        Base Quincenal
                      </li>
                      <li>
                        <span>
                          <strong>${{usuario_seleccionado.sueldo_base_diario}}</strong>
                        </span>
                        Base por día
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <vue-good-table
            :columns="columnasUsuario"
            :rows="listaAsistenciaUsuario"
            :line-numbers="true"
            :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
            :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
            :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
          >
            <template slot="table-header-row" slot-scope="props">
              <span class="font-weight-bold text-info h5">{{ props.row.label }}</span>
            </template>

            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'fecha_rango'">
                <span>{{props.row.fecha_rango}}</span>
              </span>
              <span v-else-if="props.column.field == 'hora_entrada'">
                <span>{{props.row.hora_entrada}}</span>
                <span
                  class="badge badge-danger"
                  v-if="props.row.falta && !props.row.dia_asueto"
                >No Asistió</span>
                <span class="badge badge-pill badge-secondary" v-if="props.row.dia_asueto">Asueto</span>
              </span>
              <span v-else-if="props.column.field == 'comentario_salida'">
                <p class="text-justify">{{props.row.comentario_salida}}</p>
              </span>

              <span v-else>{{props.formattedRow[props.column.field]}}</span>
            </template>
          </vue-good-table>
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>

    <!--  Editar el sueldo -->
    <Popup id="popup_editar_usuario" show_button_close="true" size="sm">
      <div slot="header">Editar usuario</div>
      <div slot="content">
        <div class="container">
          <div class="row">
            <div class="col-8">
              <table class="table text-left" v-if="usuario_seleccionado != null">
                <tr>
                  <td>
                    <span>
                      <strong>{{usuario_seleccionado.usuario}}</strong>
                    </span>
                  </td>
                  <td colspan="2">
                    Horario :
                    <strong>{{usuario_seleccionado.hora_entrada}} a {{usuario_seleccionado.hora_salida}}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>{{usuario_seleccionado.dias_laborables}}</strong> días Laborables
                  </td>
                  <td>
                    <span v-if="usuario_seleccionado.count_dias_faltas > 0" class="text-danger">
                      <span>
                        <i class="far fa-hand-point-right"></i>
                        {{usuario_seleccionado.count_dias_faltas}}
                        <span
                          v-if="usuario_seleccionado.count_dias_faltas > 1"
                        >días</span>
                        <span v-else>día</span>
                        faltó (-{{usuario_seleccionado.porcentaje_falta}}%)
                      </span>
                    </span>
                    <span v-else>
                      <i class="far fa-thumbs-up"></i> 100% asistencia
                    </span>
                  </td>
                  <td>
                    <span
                      class="text-danger"
                      v-if="usuario_seleccionado.count_checo_entrada != null && (usuario_seleccionado.count_checo_entrada-usuario_seleccionado.count_checo_salida) > 0"
                    >
                      <i class="far fa-hand-point-right"></i>
                      <span
                        class="font-weight-bold"
                      >{{usuario_seleccionado.count_checo_entrada-usuario_seleccionado.count_checo_salida}}</span>
                      <span
                        v-if="(usuario_seleccionado.count_checo_entrada-usuario_seleccionado.count_checo_salida) > 1"
                      >días</span>
                      <span v-else>día</span> no registró salida
                    </span>
                  </td>
                </tr>
              </table>
            </div>
            <div class="col-4">
              <table class="table text-left" v-if="usuario_seleccionado != null">
                <tr>
                  <td>
                    <ul style="list-style:none">
                      <li>
                        <span>
                          <strong>${{usuario_seleccionado.sueldo_base_mensual}}</strong>
                        </span>
                        Base Mensual
                      </li>
                      <li>
                        <span>
                          <strong>${{usuario_seleccionado.sueldo_base_quincenal}}</strong>
                        </span>
                        Base Quincenal
                      </li>
                      <li>
                        <span>
                          <strong>${{usuario_seleccionado.sueldo_base_diario}}</strong>
                        </span>
                        Base por día
                      </li>
                    </ul>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>
  </div>
</template>

<script src="../asistencia_usuario/ReporteAsistenciaRangoFechasSucController.js" >
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>