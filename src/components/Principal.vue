<template>
  <div class="principal">
    <h1>Asistencias</h1>    
    <h6>{{usuarioSesion.nombre_sucursal}}</h6>
    <div class="row"></div>
      <div class="scroll-panel-salida-div rounded border">
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
          >Seleccionar</button>
        </div>
        <div class="col text-right">
          <div class="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                data-toggle="modal"
                class="btn btn-success rounded"
                v-on:click="initRegistroActividad()"
                title="Registrar una actividad"
              >
              <i class="fas fa-bullhorn"></i>
              Actividad
              </button>
    
            <button
              type="button"
              class="btn btn-warning rounded"
              title="Salida de alumno"
              v-on:click="iniciarRegistrarSalida()"
            >
              <i class="fas fa-hand-holding-heart"></i>
              <span style="font-size:12px;">Salida Alumnos</span>
            </button>
            <button
              type="button"
              title="Actualizar lista de alumno"
              class="btn btn-light border text-info"
              v-on:click="loadFunctionAlumnosDentro()"
            >
              <i class="fas fa-sync"></i>
            </button>
          </div>
        </div>
      </div>
      <br />
     
      <div v-if="loaderAlumnosPorEntregar" class="d-flex justify-content-center">
            <div class="spinner-border text-info" role="status">
              <span class="sr-only">Espere...</span>
            </div>
      </div>
      <div class="media">       

        <div class="row overflow-auto">
         <span v-if="tipoInscripcionSucursal.cat_tipo_cobranza == 1" class="d-flex align-content-center flex-wrap">
          <div
            
            v-for="alumnoItem in listaAlumnos"
            v-bind:key="alumnoItem.id"            
          >
            <ItemCapsulaAlumno
              v-if="alumnoItem.visible"
              :texto="alumnoItem.nombre_alumno"
              :foto="alumnoItem.foto"
              :color="alumnoItem.color"
              :seleccion="toggleSelectAlumno"
              :value="alumnoItem"
              :seleccionado="alumnoItem.seleccionado"
            >
              <span slot="cuerpo">
                <i v-bind:id="alumnoItem.id+'_selection_alumno'" is_alumno></i>                
                <span
                  v-if="alumnoItem.calcular_tiempo_extra"                  
                  class="badge badge-pill badge-warning text-wrap"
                  style="width: 2rem;background-color:#ECE050;"
                >
                  <small>
                    <i class="fas fa-plus"></i>
                  </small>
                  <span >{{alumnoItem.tiempo_extra.hours > 0 ? alumnoItem.tiempo_extra.hours:''}}</span>
                  <span class="text-muted">{{alumnoItem.tiempo_extra.hours > 0 ? 'h':''}}</span>
                  {{alumnoItem.tiempo_extra.minutes}}
                  <span class="text-muted">min</span>
                </span>
                <!--<i v-if="alumnoItem.seleccionado" class=""></i>-->
              </span>
              <span slot="texto_ayuda">

              </span>
              <span slot="icono_seleccionado">
                  <i v-if="alumnoItem.seleccionado" class="fas fa-check-circle text-white"></i>
              </span>
            </ItemCapsulaAlumno>      
          </div>
         </span>
         

         <span v-if="tipoInscripcionSucursal.cat_tipo_cobranza == 2" class="d-flex align-content-center flex-wrap">
          <div
            
            v-for="alumnoItem in listaAlumnos"
            v-bind:key="alumnoItem.id"            
          >
            <ItemCapsulaAlumno
              v-if="alumnoItem.visible"
              :texto="alumnoItem.nombre_alumno"
              :foto="alumnoItem.foto"
              :color="alumnoItem.color"
              :seleccion="toggleSelectAlumno"
              :value="alumnoItem"              
            >
              <span slot="cuerpo">
                  <i v-bind:id="alumnoItem.id+'_selection_alumno'" is_alumno></i>                                                                                   
                  <span><i class="fa fa-clock text-gray"></i></span>                                                    
              </span>
              <span slot="texto_ayuda" >
                    <span class="font-weight-normal text-lowercase"><i class="fa fa-warning "></i>{{alumnoItem.tiempo_usado}} h</span>
                    <span v-if="alumnoItem.adeuda_tiempo " class="font-weight-normal text-lowercase">                        
                        <span class="badge badge-pill  " style="border: 2px solid #F8B153;"> Tiempo Expirado {{alumnoItem.tiempo_adeuda}} h</span>
                   </span>
              </span>
              <span slot="icono_seleccionado">
                  <i v-if="alumnoItem.seleccionado" class="fas fa-check-circle text-white "></i>                
              </span>
            </ItemCapsulaAlumno>                  
          </div>

           </span>

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
      data-keyboard="false"
      data-backdrop="static"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <!-- <form class="needs-validation" novalidate>-->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle"><i class="fas fa-bullhorn"></i> Registro de Actividad</h5>
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
      data-keyboard="false"
      data-backdrop="static"
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

            <div v-if="tipoInscripcionSucursal.cat_tipo_cobranza == 1" class="container jumbotron m-1 scroll-div">
              <div class="media">
                <div class="row">
                  <div
                    v-for="alumnoItem in listaAlumnos"
                    v-bind:key="alumnoItem.id"
                    class="d-flex align-content-top flex-wrap"
                  >
                    <span
                      :style="alumnoItem.color == '' ? '':'background-color:'+alumnoItem.color"
                      class="badge badge-pill badge-info"                      
                      v-if="alumnoItem.seleccionado"
                    >
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

            <h3 v-if="tipoInscripcionSucursal.cat_tipo_cobranza == 1">
              <small>
                <span
                  class="badge badge-pill badge-warning"
                >{{listaAlumnosSeleccionadosCalculoHoraExtra ? listaAlumnosSeleccionadosCalculoHoraExtra.length:0 }}</span> Alumnos con horas extras
              </small>
            </h3>
            <div class="container m-3 scroll-horas-extra-div">
              <div v-if="loaderAsistencia" class="spinner-border text-primary" role="status">
                <span class="sr-only">Cargando...</span>
              </div>
              <table class="table">
                <tr>
                  <td class="p-0"></td>
                  <td class="p-0"></td>
                  <td class="p-0">
                    <small>Aplicar Cargos</small>
                  </td>
                </tr>
                
                <tr                  
                  v-for="alumnoItem in listaAlumnosSeleccionadosCalculoHoraExtra"
                  v-bind:key="alumnoItem.id"
                >
                  <td class="text-left"><span style="text-transform: uppercase;">{{alumnoItem.nombre_alumno}}</span> </td>
                  <td class="p-1">
                    
                    <div v-if="alumnoItem.cat_tipo_cobranza == 1" class="badge badge-pill badge-warning" style="font-size:12px;">
                      <small>
                        <i class="fas fa-plus"></i>
                      </small>
                      <span>{{alumnoItem.tiempo_extra.hours > 0 ? alumnoItem.tiempo_extra.hours:''}}</span>
                      <span
                        class="text-muted"                        
                      >{{alumnoItem.tiempo_extra.hours > 0 ? 'h':''}}</span>
                      {{alumnoItem.tiempo_extra.minutes}}
                      <span
                        class="text-muted"
                        style="font-size:12px;"
                      >min</span>
                    </div>

                    <table v-if="alumnoItem.cat_tipo_cobranza == 2" class="table ">                                              
                        <tr>
                          <td class="p-0 text-left">Estancia de hoy</td>
                          <td class="p-0 text-right">{{alumnoItem.tiempo_usado}} hrs</td>
                        </tr>
                        <tr>
                          <td class="p-0 text-left">Entro: {{alumnoItem.hora_entrada_format}}</td>

                          <td class="p-0 text-right">Salida: {{alumnoItem.hora_salida_format ? alumnoItem.hora_salida_format:alumnoItem.hora_actual_format }}</td>
                        </tr>
                        <tr>
                            <td class="p-0 text-left">Horas del mes</td>
                            <td class="p-0 text-right">{{alumnoItem.tiempo_saldo}} hrs </td>
                        </tr>
                        <tr>
                          <td class="p-0 text-left">Tiempo expirado por cobrar</td>
                          <td class="p-0 text-right font-weight-bold"> 
                                <span  class="text-danger" v-if="alumnoItem.adeuda_tiempo">{{alumnoItem.tiempo_adeuda}} hrs</span>
                                <span v-else><i class="fa fa-check text-green"></i> ninguno</span>
                          </td>
                        </tr>
                    </table>

                  </td>
                  <td>
                    <div class="custom-control custom-switch text-center">
                      <input
                        :id="alumnoItem.id"
                        v-model="alumnoItem.seleccionado"
                        type="checkbox"
                        class="custom-control-input"
                      />
                      <label class="custom-control-label" :for="alumnoItem.id">
                        <small></small>
                      </label>
                    </div>
                  </td>
                </tr>

              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
            <button
              type="button"
              :disabled="this.listaAlumnos == null || this.listaAlumnos == [] || loaderAsistencia || loaderSalida"
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

.scroll-horas-extra-div {
  width: 100%;
  height: 300px;
  overflow-y: scroll;
}

.scroll-panel-salida-div {
  width: 100%;
  height: 600px;
  padding-left: 15px;
  padding-right: 15px;
  /*overflow-y: scroll;*/
  overflow-y: hidden;
}

#toast-container {
  z-index: 9999999;
}

.fondo-rosa {
  background-color: "#e83e8c" !important;
}
</style>
