<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h3>{{alumno.nombre}}</h3>
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
                class="rounded-circle"
              />
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
          <div slot="selected-row-actions"></div>
        </vue-good-table>

        <Popup id="detalleCargoAlumno" show_button_close="true">
          <div slot="header">Detalle de registro</div>
          <div slot="content">
            <div class="row">
              <div class="container"></div>
            </div>
          </div>
          <div slot="footer"></div>
        </Popup>
      </div>
    </div>
  </div>
</template>

<script src="../controller/AdministrarCargosController.js" >
</script>
