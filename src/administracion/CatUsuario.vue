<template>
  <div class="cat_alumno">
    <h1>Usuarios</h1>
    <div class="text-left">
      <button type="button" class="btn btn-primary btn-lg" v-on:click="nuevo()">Nuevo</button>
    </div>
    
    <Popup id="popup_usuario" show_button_close="true" size="lg">
      <div slot="header">Registro de usuario</div>
      <div slot="content">
        <div class="container">
           <label>
                  Nombre
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  v-model="usuario.nombre"
                  class="form-control"
                  placeholder="Nombre"
                  required
                  autofocus
                />
                <label>
                  Fecha de entrada
                  <span class="text-danger">*</span>
                </label>               
                <datepicker
                  name="fecha_entrada"
                  v-model="usuario.fecha_entrada"
                  input-class="form-control"
                  :bootstrap-styling="true"              
                  :language="es"
                  required
                ></datepicker>

                <label>
                  Correo
                  <span class="text-danger">*</span>
                </label>
                <input
                  type="text"
                  v-model="usuario.correo"
                  class="form-control"
                  placeholder="Correo"
                  required
                  autofocus
                />
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>


    


<!--
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
          -->
        
        
        
      </div>
    </div>
  </div>
</template>

<script src="../controller/CatUsuarioController.js" >
</script>

<style scoped>
</style>
