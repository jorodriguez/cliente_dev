<template>
  <div class="catalogo_alumno">
    <h1>Avisos ({{contador}})</h1>
    <small>{{usuarioSesion.nombre_sucursal}}</small> 
    <div class="row">
      <div class="col-1">
        <router-link to="/Administracion" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>        
      </div>
      <div class="col-1">        
        <PopupNuevoUsuario :metodo_refrescar="init"></PopupNuevoUsuario>
      </div>
    
    </div>   
    <Loader :loading="loader" />
    <br/>
    
    <div class="card">
      <div class="card-body">
        <vue-good-table
          :columns="columnasUsuario"
          :rows="listaUsuario"
          :line-numbers="true"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
          :groupOptions="{enabled: false}"
        >
          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'nombre'">
              <span > {{props.row.nombre}} <span v-if="props.row.nuevo_ingreso" class="badge  badge-pill badge-warning">Nuevo</span> 
              </span>               
            </span>
            <span v-else-if="props.column.field == 'sueldo_mensual'">
              <span > ${{props.row.sueldo_mensual}} </span>
            </span>
            <span v-else-if="props.column.field == 'botones'">              
              <PopupOperacionesUsuario :usuario_value="props.row" :metodo_refrescar="init"/>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script src="../../controller/CatUsuarioController.js" >
</script>

<style scoped>
</style>
