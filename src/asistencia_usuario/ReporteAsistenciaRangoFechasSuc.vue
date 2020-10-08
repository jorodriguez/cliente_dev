<template>
  <div id="reporte-asistencia-miss-rango-fecha">
    <div>
      <h1>Asistencias y sueldos de Miss</h1>
      <small>{{usuarioSesion.nombre_sucursal}}</small>
      <div class="text-left">
        <router-link to="/AsistenciasUsuarios" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>
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
            <option selected
                v-bind:value="0"
                v-bind:key="0"
            >Año..</option>
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
              <option selected
                v-bind:value="{}"
                v-bind:key="0"
                >Quincena..</option>
              <option
                v-for="quincena in listaQuincenas"
                v-bind:value="quincena"
                v-bind:key="quincena.index"
              >{{quincena.numero_primer_dia_quincena}} al {{quincena.numero_ultimo_dia_quincena}} de {{ quincena.nombre_mes }}</option>
            </select>
          </div>
            <div class="form-group col-md-4">               
            <button class="btn btn-primary" @click="cargarRegistros">Buscar</button>
          </div>
        </div>

        <vue-good-table
          :columns="columnas"
          :rows="listaAsistenciaSucursal"
          :line-numbers="true"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
        >
          <template slot="table-header-row" slot-scope="props">
            <span class="font-weight-bold text-info h5">{{ props.row.label }}</span>
          </template>

          <template slot="table-row" slot-scope="props">
            <div v-if="props.column.field == 'usuario'">
              <div class="text-left">
                <span class="h3 pointer" @click="verDetalleUsuario(props.row)">{{props.row.usuario}}</span>
                <p>
                  Horario:
                  <strong>{{props.row.hora_entrada}} a {{props.row.hora_salida}}</strong>
                </p>
                <span v-if="props.row.count_dias_faltas > 0" class="text-danger">
                  <i class="far fa-hand-point-right"></i>
                  <strong>{{props.row.count_dias_faltas}}</strong> de
                  <strong>{{props.row.dias_laborables}}</strong>
                  <span v-if="props.row.count_dias_faltas > 1">días</span>
                  <span v-else>día</span>
                  faltó (-{{props.row.porcentaje_falta}}%)
                </span>
                <span v-else>
                  <i class="far fa-thumbs-up"></i> 100% asistencia
                </span>
                <p
                  class="text-danger"
                  v-if="(props.row.count_checo_entrada-props.row.count_checo_salida) > 0"
                >
                  <i class="far fa-hand-point-right"></i>
                  <span
                    class="font-weight-bold"
                  >{{props.row.count_checo_entrada-props.row.count_checo_salida}}</span>
                  <span v-if="(props.row.count_checo_entrada-props.row.count_checo_salida) > 1">días</span>
                  <span v-else>día</span> no registró salida
                </p>
              </div>
              <p
                class="text-primary pointer"
                @click="verDetalleUsuario(props.row)"
              >Ver detalle de asistencia</p>
            </div>
            <span v-else-if="props.column.field == 'sueldo_base_quincenal'">
              <span>
                <strong>${{props.row.sueldo_base_quincenal}}</strong>
              </span>
            </span>
            <span v-else-if="props.column.field == 'pago_sueldo_quincenal'">
              <span class="text-primary">
                <strong>${{props.row.pago_sueldo_quincenal}}</strong>
              </span>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
    </div>
    <!-- popup para detalle de asistencias en el rango de fechas seleccionado -->
    <Popup id="popup_detalle_asistencia" show_button_close="true" size="lg">
      <div slot="header">Registro de asistencias</div>
      <div slot="content">
        <div class="container">
          <table class="table border text-left" v-if="usuario_seleccionado != null">
            <tr>
              <td>
                <span>
                  <strong>{{usuario_seleccionado.usuario}}</strong>
                </span>
              </td>
              <td>
                Horario :
                <strong>{{usuario_seleccionado.hora_entrada}} a {{usuario_seleccionado.hora_salida}}</strong>
              </td>
              <td>
                <strong>{{usuario_seleccionado.dias_laborables}}</strong> días Laborables
              </td>
            </tr>
            <tr>
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
              <td></td>
            </tr>
          </table>

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
  </div>
</template>

<script src="../asistencia_usuario/ReporteAsistenciaRangoFechasSucController.js" >
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>