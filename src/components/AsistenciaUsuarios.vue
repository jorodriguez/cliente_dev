<template>
  <div id="id_asistencia_maestras">
    <h1>Asistencia Personal</h1>
    <!--<small>{{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}</small>)-->
    <div class="row">
      <div class="col-auto mr-auto">
        <router-link to="/principal" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>
    </div>
    <br />
    <div class="row">
      <div class="col">
        <h4>Entrada</h4>
         <div v-if="loaderPorEntrar" class="h4">
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Cargando...</span>
          </div>
        </div>
        <vue-good-table
          :columns="COLUMNAS_ENTRADA"
          :rows="listaPorEntrar"
          :line-numbers="false"                    
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"          
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"          
        >
          <template slot="table-header-row" slot-scope="props">
            <span class="font-weight-bold text-info h5">{{ props.row.label }}</span>
          </template>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'foto'">
              <img :src="props.row.foto" alt class="rounded-circle" width="100" height="100" />
            </span>            
            <span v-else-if="props.column.field == 'botones'">
              <button class="btn  btn-primary" @click="seleccionarUsuario(props.row)">Entrada</button>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
      <div class="col">
        <h4>Salida</h4>
        <div v-if="loaderPorSalir" class="h4">
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Cargando...</span>
          </div>
        </div>
        <vue-good-table
          :columns="COLUMNAS_SALIDA"
          :rows="listaPorSalir"
          :line-numbers="false"                    
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"          
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"          
        >
          <template slot="table-header-row" slot-scope="props">
            <span class="font-weight-bold text-info h5">{{ props.row.label }}</span>
          </template>

          <template slot="table-row" slot-scope="props">
            <span v-if="props.column.field == 'foto'">
              <img :src="props.row.foto" alt class="rounded-circle" width="100" height="100" />
            </span>           
            <span v-else-if="props.column.field == 'botones'">              
              <button v-if="props.row.hora_asistencia_salida == null" class="btn btn-danger" @click="seleccionarUsuarioAsistencia(props.row)" >Salida</button>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
    </div>

    <!-- MODAL PARA REGISTRO DE ASISTENCIA -->
    <Popup id="popup_entrada" show_button_close="true">
      <div slot="header">Registro de entrada</div>
      <div slot="content">
        {{mensaje}}
        <div class="container">
          <table class="table">
            <tr>
              <td>{{usuarioSeleccionado.nombre}}</td>
            </tr>
            <tr>
              <td>
                <label>Comentario</label>
                <textarea v-model="comentario" class="form-control" />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div slot="footer">
        <button @click="registrarEntrada()" class="btn btn-primary">Confirmar Entrada</button>
      </div>
    </Popup>

    <Popup id="popup_salida" show_button_close="true">
      <div slot="header">Registro de salida</div>
      <div slot="content">
        {{mensaje}}
        <div class="container">
          <table class="table">
            <tr>
              <td><h4> {{usuarioAsistenciaSeleccionado.nombre}} </h4></td>
            </tr>
            <tr>
              <td><h5 class="text-muted"> ENTRADA:{{usuarioAsistenciaSeleccionado.hora_asistencia_entrada}}</h5></td>
            </tr>
            <tr>
              <td>
                <label>Comentario</label>
                <textarea v-model="comentario" class="form-control" />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div slot="footer">
        <button @click="registrarSalida()" class="btn btn-primary">Confirmar Salida</button>
      </div>
    </Popup>
  </div>
</template>

<script src="../controller/AsistenciaUsuariosController.js"></script>

<style scoped>
</style>
