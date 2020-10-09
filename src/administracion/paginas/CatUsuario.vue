<template>
  <div class="catalogo_alumno">
    <h1>Usuarios ({{contador}})</h1>
    <small>{{usuarioSesion.nombre_sucursal}}</small> 
    <div class="row">
      <div class="col-1">
        <router-link to="/Administracion" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>        
      </div>
      <div class="col-1">
        <!--<button type="button" class="btn btn-primary btn-lg" v-on:click="nuevo()">Nuevo</button>-->
        <PopupNuevoUsuario :metodo_refrescar="init"></PopupNuevoUsuario>
      </div>
      <!--<div class="col-10 text-right">
        <router-link
          to="/AsistenciasUsuarioSucursal"
          class="btn btn-outline-primary btn-lg outline"
        >Reporte de Asistencias</router-link>
      </div>-->
    </div>   
    <Loader :loading="loader" />
    <br/>
    <!-- {{listaUsuario.length}}
    <button @click="init()">CARGAR</button>
    -->
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
            <span v-else-if="props.column.field == 'botones'">
              <!--<button
                type="button"
                :class="props.row.acceso_sistema ? 'btn btn-sm btn-warning':'btn btn-sm btn-secondary'"                
                :title="props.row.acceso_sistema ? 'Acceso a sistema':'Dar acceso a sistema'"
                v-on:click="seleccionar(props.row,'ACCESO_SISTEMA')"
              >                
                <i class="fas fa-key"  ></i>
              </button>
              -->
              <!--
              <button
                type="button"
                class="btn btn-primary btn-sm"
                title="Modificar registro"
                v-on:click="seleccionar(props.row,'EDIT')"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                title="Eliminar registro"
                v-on:click="seleccionar(props.row,'DELETE')"
              >
                <i class="fas fa-trash-alt"></i>
              </button>-->
              <PopupOperacionesUsuario :usuario_value="props.row" :metodo_refrescar="init"/>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
    </div>

<!--
    <Popup id="popup_usuario" :show_button_close="false" size="md">
      <div slot="header">Registro de usuario</div>
      <div slot="content">
        <div class="container text-left">
          
          <div class="form-group">
            <label for="nombreInput">
              Nombre
              <span class="text-danger">*</span>
            </label>
          
            <input
              id="nombreInput"
              type="text"
              v-model="usuario.nombre"
              class="form-control"
              placeholder="Nombre "
              required
              autofocus
            />
          </div>
        

          <div class="form-group">
            <label for="correoInput">
              Correo
              <span class="text-primary">(opcional)</span>
            </label>            
            <input
              id="correoInput"
              type="email"
              v-model="usuario.correo"
              class="form-control"
              placeholder="micorreo@ejemplo.com"
            />            
          </div>
          
          <div class="row">
            <div class="col">
              <label>
                Hora Entrada
                <span class="text-danger">*</span>
              </label>
              <vue-timepicker
                v-model="usuario.hora_entrada"
               
                :minute-interval="15"
                :hour-range="[[7, 20]]"
                :hide-disabled-hours="true"
                hour-label="hora"
                minute-label="minuto"
                format="HH:mm"
                placeholder="00:00"
              ></vue-timepicker>              
            </div>
            <div class="col">
              <label>
                Hora Salida
                <span class="text-danger">*</span>
              </label>
              <vue-timepicker
                v-model="usuario.hora_salida"
               
                :min="usuario.hora_entrada"
                :minute-interval="15"
                :hour-range="[[7, 20]]"
                :hide-disabled-hours="true"
                hour-label="hora"
                minute-label="minuto"
                format="HH:mm"
                placeholder="00:00"
              ></vue-timepicker>              
            </div>
          </div>
          
        </div>
      </div>
      <div slot="footer">                
        <button class="btn btn-secondary" @click="cancelar()" v-if="operacion == 'EDIT' || operacion == 'INSERT'">Cerrar</button>        
        <button class="btn btn-primary" @click="guardar()" v-if="operacion == 'INSERT'">Guardar</button>
        <button class="btn btn-primary" @click="modificar()" v-if="operacion == 'EDIT'">Modificar</button>        
      </div>    
    </Popup>
    -->

    <!-- Add acceso -->
  <!--  <Popup id="popup_acceso" show_button_close="true" size="md">
      <div slot="header">Acceso al Sistema</div>
      <div slot="content">
        <div class="container text-left">          
          <p>Usuario : {{usuario.nombre}}</p>
          <div class="form-group">
            <label for="nombreInput">
              Correo
              <span class="text-danger">*</span>
            </label>            
            <input
              id="correoInput"
              type="text"
              v-model="usuario.correo"
              class="form-control"
              placeholder="Correo "
              required
              autofocus
            />          
          </div>       
        </div>
      </div>
      <div slot="footer">
      </div>
    </Popup>

     <Popup id="popup_baja" show_button_close="true" size="md">
      <div slot="header">Acceso al Sistema</div>
      <div slot="content">
        <div class="container text-left">  
          <p class="text-danger">Con la siguiente acción se desactivara todo acceso y uso en el sistema de <strong>{{usuario.nombre}}</strong>. </p>                  
          <label>
            Fecha de Baja
            <span class="text-danger">*</span>
          </label>
          <datepicker
            name="fechaBaja"
            v-model="datosBaja.fecha_baja"
            input-class="form-control"
            :disabled-dates="{from:new Date()}"
            :bootstrap-styling="true"
            :language="es"
            required
          ></datepicker>
          <div class="form-group" >
            <label>Escriba algúna observación</label>
              <textarea class="form-control" v-model="datosBaja.motivo_baja" rows="3"></textarea>
          </div>
          
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-danger" @click="eliminar()">Confirmar Baja</button>        
      </div>
    </Popup>
-->

  </div>
</template>

<script src="../../controller/CatUsuarioController.js" >
</script>

<style scoped>
</style>
