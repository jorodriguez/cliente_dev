<template>
  <div id="reporte-asistencia-miss-rango-fecha">
    <div>
      <h1>Reporte de Asistencias Miss</h1>      
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
        <div class="row">
          <div class="row">
            <div class="col text-right">
              <label>Fecha de Inicio</label>
            </div>
            <div class="col text-left">
              <datepicker
                name="fecha_inicio"
                v-model="fecha_inicio"
                input-class="form-control"
                @selected="cambiarFechaInicio"
              ></datepicker>
            </div>
            <div class="col text-right">
              <label>Fecha de Fin</label>
            </div>
            <div class="col">
              <datepicker
                name="fecha_fin"
                v-model="fecha_fin"
                input-class="form-control"
                @selected="cambiarFechaFin"
              ></datepicker>
            </div>
          </div>

          <div class="col">
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
            <span v-if="props.column.field == 'count_dias_asistencia'" class="text-center">
              <span>{{props.row.count_dias_asistencia}}/{{props.row.dias_trabajo}}</span>
            </span>
            <span v-else-if="props.column.field == 'usuario'">
              <button class="btn btn-link" @click="verDetalleUsuario(props.row)">
                <span>{{props.row.usuario}}</span>
              </button>
            </span>
            <span v-else-if="props.column.field == 'count_dias_faltas'">
              <button class="btn btn-link" @click="verDetalleUsuario(props.row)">
                <span
                  v-if="props.row.count_dias_faltas > 0"
                  class="text-danger font-weight-bold"
                >{{props.row.count_dias_faltas}}</span>
                <span v-else>{{props.row.count_dias_faltas}}</span>
              </button>
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
          <table class="table border" v-if="usuario_seleccionado != null">
            <tr>
              <td>
                <strong>{{usuario_seleccionado.usuario}}</strong>
              </td>
              <td>
                Horario de Entrada :
                <strong>{{usuario_seleccionado.hora_entrada}}</strong>
              </td>
              <td>
                Horario de Salida :
                <strong>{{usuario_seleccionado.hora_salida}}</strong>
              </td>
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
                <span class="badge badge-pill badge-secondary" v-if="props.row.dia_asueto">Asueto</span>
                <span>{{props.row.fecha_rango}}</span>                
              </span>
              <span v-else-if="props.column.field == 'hora_entrada'">
                <span>{{props.row.hora_entrada}}</span>
                <span class="badge badge-danger" v-if="props.row.falta">No Asistió</span>
              </span>
               <span v-else-if="props.column.field == 'comentario_salida'">
                 <p class="text-justify"> {{props.row.comentario_salida}}</p>
                                
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
