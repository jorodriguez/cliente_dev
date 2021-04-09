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
              v-on:click="verListaAlumnosSucursal(row)"
              title="Clic para ver la lista de alumnos de la sucursal"
              v-bind:style="{'background-color':row.class_color}"
            >
              <div class="card-body" v-bind:style="{'background-color':row.class_color}">
                <h6 class="text-uppercase">{{row.nombre}}</h6>                
                
              </div>
            </div>
          </div>
        </div>
        <h3>{{sucursal_seleccionada.sucursal}}</h3>
        <h5 class="text-muted">Alumnos</h5>      
        <vue-good-table
          :columns="columnsAlumnos"
          :rows="listaAlumnosCargos"
          :line-numbers="true"
          @on-row-click="onRowClick"
          @on-search="onSearch"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"          
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"          
        >
          <template slot="table-row" slot-scope="props">           
            <span v-if="props.column.field == 'nombre_alumno'">
              <span>{{props.row.nombre_alumno}} {{props.row.apellidos}}</span>              
            </span>

            <span v-else-if="props.column.field == 'foto'">              
                    <img
                        :src="props.row.foto"                         
                        width="50"
                        height="50"
                        alt="..."           
                        v-if="props.row.foto"             
                        class="rounded-circle"/>
            </span>           
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
            
          </template>
          <div slot="selected-row-actions">
           
          </div>
        </vue-good-table>           
      
      </div>
    </div>
  </div>
</template>

<script src="../controller/AlumnoCargoController.js" >
</script>
