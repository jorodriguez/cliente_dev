<template>
  <div class="catalogo_alumno">
    <h1>Usuarios ({{contador}})</h1>
    <div class="row">
      <div class="col-1">
        <router-link to="/Administracion" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>        
      </div>
      <div class="col-1">
        <button type="button" class="btn btn-primary btn-lg" v-on:click="nuevo()">Nuevo</button>
      </div>
      <div class="col-10 text-right">
        <router-link
          to="/AsistenciasUsuarioSucursal"
          class="btn btn-outline-primary btn-lg outline"
        >Reporte de Asistencias</router-link>
      </div>
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
            <span v-if="props.column.field == 'nombre'">{{props.row.nombre}}</span>
            <span v-else-if="props.column.field == 'botones'">
              <button
                type="button"
                class="btn btn-primary btn-sm"
                v-on:click="seleccionar(props.row,'EDIT')"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                type="button"
                class="btn btn-danger btn-sm"
                v-on:click="seleccionar(props.row,'DELETE')"
              >
                <i class="fas fa-trash-alt"></i>
              </button>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
    </div>


    <Popup id="popup_usuario" show_button_close="true" size="md">
      <div slot="header">Registro de usuario</div>
      <div slot="content">
        <div class="container text-left">
          <!--  <ValidationObserver ref="observer" v-slot="{ invalid }">-->
          <div class="form-group">
            <label for="nombreInput">
              Nombre
              <span class="text-danger">*</span>
            </label>
            <!--<ValidationProvider rules="required" v-slot="{errors}">-->
            <input
              id="nombreInput"
              type="text"
              v-model="usuario.nombre"
              class="form-control"
              placeholder="Nombre "
              required
              autofocus
            />
            <!--  <span>{{ errors[0] }}</span>
            </ValidationProvider>-->
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
              <span class="text-primary">(opcional)</span>
            </label>
            <!--<ValidationProvider name="email" rules="required|email"  v-slot="{errors}">-->
            <input
              id="correoInput"
              type="email"
              v-model="usuario.correo"
              class="form-control"
              placeholder="micorreo@ejemplo.com"
            />
            <!--  <span>{{ errors[0] }}</span>
            </ValidationProvider>-->
          </div>
          <div class="row">
            <div class="col">
              <label>
                Hora Entrada
                <span class="text-danger">*</span>
              </label>
              <vue-timepicker
                v-model="usuario.hora_entrada"
                @change="validarHoras()"
                :minute-interval="15"
                :hour-range="rangoHora"
                :hide-disabled-hours="true"
                hour-label="hora"
                minute-label="minuto"
                format="HH:mm"
                placeholder="00:00"
              ></vue-timepicker>
              {{usuario.hora_entrada}}
            </div>
            <div class="col">
              <label>
                Hora Salida
                <span class="text-danger">*</span>
              </label>
              <vue-timepicker
                v-model="usuario.hora_salida"
                @change="validarHoras()"
                :min="hora_entrada"
                :minute-interval="15"
                :hour-range="rangoHora"
                :hide-disabled-hours="true"
                hour-label="hora"
                minute-label="minuto"
                format="HH:mm"
                placeholder="00:00"
              ></vue-timepicker>
              {{usuario.hora_salida}}
            </div>
          </div>
          <!--</ValidationObserver>-->
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" @click="guardar()" v-if="operacion == 'INSERT'">Guardar</button>
        <button class="btn btn-primary" @click="modificar()" v-if="operacion == 'EDIT'">Modificar</button>
      </div>
    </Popup>
  </div>
</template>

<script src="../../controller/CatUsuarioController.js" >
</script>

<style scoped>
</style>
