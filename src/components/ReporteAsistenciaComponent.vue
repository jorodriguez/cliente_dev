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
              <span :style="props.column.field != null ? 'background-color:'+props.row.color : ''" class="badge badge-info text-wrap">{{props.row.nombre_grupo}}</span>
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
            <span v-else-if="props.column.field == 'grafica'">
              <!--<GraficaCalendarioAsistencia :idalumno="props.row.id_alumno"></GraficaCalendarioAsistencia >-->
            </span>
            
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
       
      </div>
    </div>
  </div>
</template>

<script src="../controller/ReporteAsistenciaComponentController.js" >
</script>
