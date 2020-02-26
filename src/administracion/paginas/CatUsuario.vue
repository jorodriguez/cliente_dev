<template>
  <div class="catalogo_alumno">
    <h1>Usuarios</h1>
    <div class="text-left">
      <button type="button" class="btn btn-primary btn-lg" v-on:click="nuevo()">Nuevo</button>
    </div>

    <Popup id="popup_usuario" show_button_close="true" size="md">
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

          <!--<label>
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
          ></datepicker>-->
          <div class="form-group">
            <label for="correoInput">
              Correo
              <span class="text-danger">*</span>
            </label>
            <input
              id="correoInput"
              type="text"
              v-model="usuario.correo"
              class="form-control"
              placeholder="micorreo@ejemplo.com"
              required              
            />
          </div>
          <div class="row">
            <div class="col">
              <label>
                Hora Entrada
                <span class="text-danger">*</span>
              </label>
              <vue-timepicker v-model="usuario.hora_entrada" 
                              @change="validarHoras()"
                              :minute-interval="15" 
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
              <vue-timepicker v-model="usuario.hora_salida" 
                              @change="validarHoras()"
                              :minute-interval="15" 
                              :hour-range="[7,8,9,10,11,12,20]"
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
        <button class="btn btn-primary" @click="guardar()" v-if="operacion == 'INSERT'">Guardar</button>
        <button class="btn btn-primary" @click="modificar()" v-if="operacion == 'EDIT'">Modificar</button>
      </div>
    </Popup>

    <Loader :loading="loader" />
    {{listaUsuario.length}}
    <button @click="init()">CARGAR</button>

    <table class="table">
      <thead>
        <th class="col">Nombre</th>
        <th class="col">Correo</th>
        <th class="col">Hora Entrada</th>
        <th class="col">Hora Salida</th>
        <th class="col"></th>
      </thead>
      <tbody v-for="row in listaUsuario" :key="row.id">
        <tr>
          <td>
            <span>{{row.nombre}}</span>
          </td>
          <td>
            <span>{{row.correo}}</span>
          </td>
          <td>
            <span>{{row.hora_entrada}}</span>
          </td>
          <td>
            <span>{{row.hora_salida}}</span>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary btn-sm"
              v-on:click="seleccionar(row,'EDIT')"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              type="button"
              class="btn btn-danger btn-sm"
              v-on:click="seleccionar(row,'DELETE')"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!--
   
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
          {{props.row.nombre}}
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>

    -->
  </div>
</template>

<script src="../../controller/CatUsuarioController.js" >
</script>

<style scoped>
</style>
