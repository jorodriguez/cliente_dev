<template>
  <div id="reporte-asistencia-miss-rango-fecha">    
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
            <div class="float-center">              
              <datepicker
                name="fecha_inicio"
                v-model="fecha_inicio"
                input-class="form-control"
                @selected="cambiarFechaInicio"
              ></datepicker>
            </div>
          </div>
          <div class="col">
            <div class="float-center">
             <datepicker
                name="fecha_fin"
                v-model="fecha_fin"
                input-class="form-control"
                @selected="cambiarFechaFin"
              ></datepicker>
            </div>
          </div>
          <div class="col">
            <button class="btn btn-primary" @click="cargarRegistros" >Cargar</button>
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
            <span v-if="props.column.field == 'count_dias_asistencia'">
                <span>{{props.row.count_dias_asistencia}}/{{props.row.dias_trabajo}} </span>
            </span>              
            <!--<span v-else-if="props.column.field == 'grafica'">              
            </span>-->
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
       
      </div>
    </div>
  </div>
</template>

<script src="../asistencia_usuario/ReporteAsistenciaRangoFechasSucController.js" >
</script>
