<template>
  <div class="principal container">
   <div class="text-left">
      <router-link to="/principal">
        <i class="fas fa-arrow-circle-left text-gray" style="font-size:20px;"></i>
      </router-link>
    </div>

    <div class="panel">
      <h2>Registrar Actividad</h2>(
      <small>{{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}</small>)
    </div>
    <div class="panel">
      <div class="form-group">
        <label>Actividad</label>
        <select
          v-model="actividadSelecionada"
          class="form-control"
          placeholder="Grupo"
          required
          autofocus
        >
          <option
            v-for="actividadItem in listaActividades"
            v-bind:value="actividadItem"
            v-bind:key="actividadItem.id"
          >{{ actividadItem.nombre }}</option>
        </select>
      </div>

      <div class="form-group" v-if="actividadSelecionada.tipo_actividad != null">
        <!--<label>Tipo</label>-->
        <select
          v-model="actividad.cat_tipo_actividad"
          class="form-control"
          placeholder="Tipo"
          required
        >
          <option
            v-for="tipoActividadItem in actividadSelecionada.tipo_actividad"
            v-bind:value="tipoActividadItem.id"
            v-bind:key="tipoActividadItem.id"
          >{{ tipoActividadItem.nombre }}</option>
        </select>
      </div>
      <div class="form-group" v-if="actividadSelecionada.sub_actividad != null">
        <!--<label>Tipo</label>-->
        <select
          v-model="actividad.cat_sub_actividad"
          class="form-control"
          placeholder="Tipo"
          required
        >
          <option
            v-for="subActividadItem in actividadSelecionada.sub_actividad"
            v-bind:value="subActividadItem.id"
            v-bind:key="subActividadItem.id"
          >{{ subActividadItem.nombre }}</option>
        </select>
      </div>
      <div class="form-group" >
      <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
       
       <div class="row m-1">

          <button
            type="button"
            data-toggle="modal"
            data-target="#modal_continuar"
            class="btn btn-block btn-primary"
            v-on:click="continuar()"
          >Continuar</button>
        </div>
    </div>
  <!-- MODAL -->
   <div
      id="modal_continuar"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Confirmar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="bg-gray">
        <p>Alumnos </p>
        <div class="container jumbotron m-1">          
          <div class="media">
            <div class="row">
              <div
                v-for="alumnoItem in listaAlumnos"
                v-bind:key="alumnoItem.id"
                class="d-flex align-content-center flex-wrap"
              >
                <small class="badge badge-pill badge-info">
                  <img
                    src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                    width="35"
                    height="35"
                    alt="..."
                    class="rounded-circle"
                  >
                  <i>{{alumnoItem.nombre}}</i>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-succes"              
              data-dismiss="modal"
            >Cancelar</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script src="../controller/RegistroActividadController.js"></script>

<style scoped>
</style>
