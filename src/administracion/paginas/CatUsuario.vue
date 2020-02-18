<template>
  <div class="catalogo_alumno">
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
          <label>
            Hora de entrada
            <span class="text-danger">*</span>
          </label>
          <vue-timepicker v-model="usuario.hora_entrada" format="HH:mm"></vue-timepicker>

          <label>
            Hora de salida
            <span class="text-danger">*</span>
          </label>
          <vue-timepicker v-model="usuario.hora_salida" format="HH:mm"></vue-timepicker>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" @click="guardar()">Guardar</button>
      </div>
    </Popup>

    <Loader :loading="loader" />

    {{lista.length}}
    <button @click="init()">CARGAR</button>

    <vue-good-table
      :columns="columnas"
      :rows="lista"
      :line-numbers="true"
      :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
      :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
      :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
      :groupOptions="{
  	          enabled: false,               
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'nombre'">
          {{props.row.nombre}}
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script src="../../controller/CatUsuarioController.js" >
</script>

<style scoped>
</style>
