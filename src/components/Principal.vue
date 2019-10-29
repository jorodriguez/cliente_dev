<template>
  <div class="principal">
       <small class="font-weight-bold h6">
      {{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}
       <button
        type="button"       
        class="btn btn-sm btn-warning"     
        v-on:click="signout()"   
      >
        <i class="fas fa-power-off" v-on:click="signout()"></i>
       </button>
    </small>
    
    <div class="p-1 mb-1 text-white">
      <router-link to="/CatAlumno" class="btn btn-lg  btn-info">        
        Alumnos
      </router-link>
      <router-link to="/Asistencia" class="btn btn-lg  btn-success">        
        Asistencias        
      </router-link>             
      <!-- btn-head-->
      <button
        type="button"
        data-toggle="modal"
        class="btn btn-success btn-lg "
        v-on:click="initRegistroActividad()"
      >        
        Actividad
      </button>
      <router-link to="/Gastos" class="btn btn-lg  btn-primary">        
        Gastos        
      </router-link>
    </div>
    <div class="row">
      <div class="col text-left">
        <div class="dropdown">
          <button
            class="btn btn-link btn-sm dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >{{grupoSeleccionado.nombre}}</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              class="dropdown-item"
              v-on:click="filtrarAlumnosPorGrupo(grupoDefault)"
              type="button"
            >{{grupoDefault.nombre}}</button>
            <button
              class="dropdown-item"
              v-for="grupoItem in listaGrupos"
              v-bind:key="grupoItem.id"
              v-on:click="filtrarAlumnosPorGrupo(grupoItem)"
              type="button"
            >{{grupoItem.nombre}}</button>
          </div>
        </div>
      </div>
      <div class="col">
        <button
          type="button"
          class="btn btn-link btn-sm"
          :disabled="this.listaAlumnos == null || this.listaAlumnos == []"
          v-on:click="toggleSeleccionVisibles()"
        >
          <!--<i class="fas fa-user-check"></i>-->
          Seleccionar
        </button>
      </div>
      <div class="col">
        <button
          type="button"
          class="btn btn-danger "                           
          v-on:click="iniciarRegistrarSalida()"
        >
         <!--<i class="fas fa-arrow-right"></i>-->
        Salida</button>
      </div>
    </div>

    <div class="jumbotron m-1">
      <div class="media">
        <div class="row overflow-auto">
          <div
            id="div_foreach_alumno"
            v-for="alumnoItem in listaAlumnos"
            v-bind:key="alumnoItem.id"
            class="d-flex align-content-center flex-wrap"
          >
            <small class="badge badge-pill badge-info" v-if="alumnoItem.visible">
              <img
                src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                width="35"
                height="35"
                alt="..."
                class="rounded-circle"
              >
              <!--<i v-on:click="addToListAlumno(alumnoItem)">{{alumnoItem.nombre_alumno}}</i>-->
              <i v-on:click="toggleSelectAlumno(alumnoItem)">{{alumnoItem.nombre_alumno}}</i>

              <i v-bind:id="alumnoItem.id+'_selection_alumno'" is_alumno></i>
              <i v-if="alumnoItem.seleccionado" class="fas fa-check-circle text-danger"></i>
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL ACTIVIDADES-->
    <div
      id="modal_actividad"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      data-keyboard="false" data-backdrop="static" 
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <!-- <form class="needs-validation" novalidate>-->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Registro de Actividad</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="bg-gray">
              <div class="container jumbotron m-1 scroll-div">
                <div class="media">
                  <div class="row">
                    <div
                      v-for="alumnoItem in listaAlumnos"
                      v-bind:key="alumnoItem.id"
                      class="d-flex align-content-top flex-wrap"
                    >
                      <span class="badge badge-pill badge-info" v-if="alumnoItem.seleccionado">                      

                        <!--v-on:click="removeToListAlumno(alumnoItem)" -->
                        {{alumnoItem.nombre_alumno}}
                        <i
                          v-on:click="toggleSelectAlumno(alumnoItem)"
                          class="fas fa-minus-circle text-danger"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- seleccion de actividad -->
            <div class="form-group">
              <label>Actividad</label>
              <select
                id="combo_actividad_principal"
                v-model="actividadSelecionada"
                class="form-control"
                placeholder="Actividad"
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
                id="combo_tipo_actividad"
                v-model="actividad.tipo_actividad"
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
                id="combo_sub_actividad"
                v-model="actividad.sub_actividad"
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
            <div class="form-group">
              <textarea id="nota_id" class="form-control" v-model="actividad.nota" rows="3"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="registrarActividad()"
            >Confirmar</button>
          </div>
        </div>
        <!-- </form>-->
      </div>
    </div>
    <!-- Modal actividad -->

    <!-- MODAL CONFIRMAR SALIDA -->
    <div
      class="modal fade bd-example-modal-sm"
      tabindex="-1"
      role="dialog"
      aria-labelledby="mySmallModalLabel"
      aria-hidden="true"
      data-keyboard="false" data-backdrop="static" 
      id="confirmar_salida_modal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar Salida</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">            
            <div class="container jumbotron m-1 scroll-div">
              <div class="media">
                <div class="row">
                  <div
                    v-for="alumnoItem in listaAlumnos"
                    v-bind:key="alumnoItem.id"
                    class="d-flex align-content-top flex-wrap"
                  >
                    <span class="badge badge-pill badge-info" v-if="alumnoItem.seleccionado">                                          
                      {{alumnoItem.nombre_alumno}}
                      <i
                        v-on:click="toggleSelectAlumno(alumnoItem)"
                        class="fas fa-minus-circle text-danger"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            
            <button
              type="button"
              :disabled="this.listaAlumnos == null || this.listaAlumnos == []"              
              class="btn btn-success"
              v-on:click="registrarSalida()"
            >
              Confirmar Salida
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL CONFIRMAR SALIDA -->

    <!-- MODAL TOAST -->
    <div
      id="toast_id"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      class="toast border-warning"
       data-delay="1000"
      data-autohide="true"
    >
      <div class="toast-header p-1 mb-1 bg-warning text-dark">
        <strong class="mr-auto">Mensaje</strong>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        <p id="toast_msg"></p>
      </div>
    </div>
    <!-- MODAL TOAST -->
  </div>
</template>

<script src="../controller/PrincipalController.js"></script>

<style scoped>
.btn-head {
  width: 70px !important;
  height: 70px !important;
  /*font-size: 40px;*/
  font-size: 11px;
}

.scroll-div {
  width: 100%;
  height: 75px;
  overflow-y: scroll;
}

#toast-container {
  z-index: 9999999;
}
</style>
