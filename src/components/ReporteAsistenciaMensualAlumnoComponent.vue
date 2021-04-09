<template>
  <div id="reporte-asistencia-alumno-mes">    
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
             
            </div>
          </div>
        </div>
        <vue-good-table
          :columns="columnas"
          :rows="listaAsistencia"
          :line-numbers="true"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"          
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
                   
        >
          <template slot="table-header-row" slot-scope="props">
            <span class="font-weight-bold text-info h5">{{ props.row.label }}</span>
          </template>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'foto'">
              <img :src="props.row.foto" alt class="rounded-circle" width="50" height="50" />
            </span>
            <span v-else-if="props.column.field == 'nombre'">
              <span :class="props.row.numero_asistencias == 0 ? 'font-weight-bold text-danger':''" >
                {{props.row.nombre}}
                <span >{{props.row.apellidos}}</span>
                <span v-if="props.row.mostrar_nombre_carino" >({{props.row.nombre_carino}})</span>
              </span>
            </span>
            <span v-else-if="props.column.field == 'nombre_grupo'">              
              <span :style="props.column.field != null ? 'background-color:'+props.row.color : ''" class="badge badge-info text-wrap">{{props.row.nombre_grupo}}</span>
            </span>
             <span v-else-if="props.column.field == 'numero_asistencias'">
              <span :class="props.row.numero_asistencias == 0 ? 'font-weight-bold text-danger':''">{{props.row.numero_asistencias}}/{{props.row.num_dias_trabajados}}</span>
            </span>
            <span v-else-if="props.column.field == 'num_dias_trabajados'">
              <span :class="props.row.numero_asistencias == 0 ? 'font-weight-bold text-danger':''">{{props.row.num_dias_trabajados}}</span>
            </span>
            
            <span v-else-if="props.column.field == 'opciones'">
             <!-- <button class="btn btn-primary" @click="seleccionarAlumno(props.row)">Ver Detalle</button>-->
              <!--<GraficaCalendarioAsistencia :idalumno="props.row.id"></GraficaCalendarioAsistencia >-->
            </span>
            
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>

      </div>
    </div>       

  </div>
</template>

<script src="../controller/ReporteAsistenciaMensualAlumnoComponentController.js" >
</script>
