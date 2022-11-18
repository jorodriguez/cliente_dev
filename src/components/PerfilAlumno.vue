<template>
  <div class="perfil container">
    <div class="text-info">{{mensaje}}</div>
    <div v-if="display==true" class="text-left">
      <!-- MODAL PARA AGREGAR FAMILIAR -->
     
        <div id="modal_familiar" class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Registro de Familiar</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body text-left">
                 <span class="text-danger"> {{ mensaje }} </span>
                <div class="form-group" v-if="operacion == 'INSERT'">
                  <label for="selectParentescoFamiliar">
                    Parentesco
                    <span class="text-danger">*</span>
                  </label>
                  <select
                    v-model="co_parentesco_seleccionado"
                    v-on:change="seleccionarParentesco"
                    class="form-control"
                    placeholder="Parentesco"
                    required
                    autofocus
                  >
                    <option
                      id="selectParentesco"
                      v-for="p in listaParentesco"
                      v-bind:value="p"
                      v-bind:key="p.id"
                    >{{ p.nombre }}  </option>
                  </select>                  
               </div>
                <div class="form-group" v-else-if="operacion == 'UPDATE'">
                  <input type="text" v-model="familiar.parentesco" class="form-control" disabled>
                </div>
              <!-- posible familiar -->              
              <div class="form-group" v-if="operacion == 'INSERT' && (co_parentesco_seleccionado.id == 1 || co_parentesco_seleccionado.id == 2)">
                  <label for="selectPosiblePadres">
                    Seleccionar una persona ya registrada
                  </label>
                  <select
                    v-model="familiarRelacionado"
                    v-on:change="seleccionarFamiliarParaRelacion"
                    class="form-control"
                    placeholder="Padre"                                        
                  >
                   <option
                      id="opcionEscribirPadre"                                            
                      v-bind:value="null"
                      v-bind:key="-1"
                    > Ecribir nuevo registro </option>
                    <option
                      id="selectPosiblePadres"
                      v-for="p in listaPosiblesPadres"
                      v-bind:value="p"
                      v-bind:key="p.id"
                    >{{ p.nombre }} - {{p.parentesco}} de {{p.alumno_hijo}} </option>
                  </select>
                </div>
                
              <!-- posible familiar -->

                <div class="form-group" >
                  <label for="inputNombreFamiliar">
                    Nombre
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="inputNombreFamiliar"
                    type="text"
                    name="nombre"
                    v-model="familiar.nombre"
                    class="form-control"
                    placeholder="Nombre"
                    v-bind:disabled="familiarRelacionado != null"
                    v-bind:style="familiarRelacionado != null ? 'color:green' : ''"
                    required
                  >                  
                </div>
                <div class="form-group" >
                  <label for="inputTelefonoFamiliar">
                    Telefono
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="inputTelefonoFamiliar"
                    type="text"
                    v-model="familiar.telefono"
                    class="form-control"
                    name="telefono"
                    placeholder="Telefono"
                    v-bind:disabled="familiarRelacionado != null"
                    v-bind:style="familiarRelacionado != null ? 'color:green' : ''"
                  >
                </div>
                <div class="form-group" >
                  <label for="inputFnacimientoFamiliar">Fecha de Nacimiento</label>
                  <datepicker 
                    id="inputFnacimientoFamiliar"
                    v-model="familiar.fecha_nacimiento"
                    v-bind:input-class="familiarRelacionado != null ? 'form-control text-success':'form-control'"
                    name="fecha_nacimiento"
                    v-bind:disabled="familiarRelacionado != null"      
                    :bootstrap-styling="true"              
                    :language="es"
                    required
                  ></datepicker>                                    
                </div>
                <div class="form-group" >
                  <label for="inputCorreoFamiliar">
                    Correo
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="inputCorreoFamiliar"
                    type="text"
                    name="correo"
                    v-model="familiar.correo"
                    class="form-control"
                    placeholder="Correo"
                    v-bind:disabled="familiarRelacionado != null"
                    v-bind:style="familiarRelacionado != null ? 'color:green' : ''"
                    required
                  >
                </div>
              </div>
              <div class="modal-footer">
                <div v-if="operacion == 'INSERT'">
                  <!-- data-dismiss="modal" -->
                  <button class="btn btn-lg btn-primary" v-on:click="agregarFamiliar()">Guardar</button>
                </div>
                <div v-else-if="operacion == 'UPDATE'">
                  <!-- data-dismiss="modal"-->
                  <button class="btn btn-lg btn-primary" v-on:click="modificarFamiliar()">Modificar</button>
                </div>
                <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      

      <!-- ELIMINAR MODAL FAMILIAR-->
      <div
        id="modal_eliminar_familiar"
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
              <p>
                ¿Confirma que desea eliminar al familiar?
                <br>
                <strong>{{familiar.nombre}}</strong>
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                v-on:click="eliminarFamiliar()"
                data-dismiss="modal"
              >Eliminar</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL PARA AGREGAR FAMILIAR -->

      <div class="row">
        <div class="col">
          <router-link :to="{ name: 'CatAlumno', params: {} }" class="btn btn-secondary btn-lg"
              v-if="!usuarioSesion.permiso_gerente">
            <i class="fas fa-arrow-circle-left text-gray"></i>
          </router-link>
          <router-link :to="{ name: 'ReporteDeudas', params: {} }" class="btn btn-secondary btn-lg"
              v-if="usuarioSesion.permiso_gerente">
            <i class="fas fa-arrow-circle-left text-gray"></i>
          </router-link>
          <!--<a @click="$router.go(-1)" class="btn btn-secondary btn-lg">
            <i class="fas fa-arrow-circle-left text-white"></i>
          </a>
          -->
        </div>
        <div class="col text-center">          
          <img
            :src="alumno.foto"            
            class="rounded-circle"
            width="50"
            height="50"
            style="cursor:pointer"
            title="Actualizar foto de perfil"
            @click="subirFotoPerfil(alumno.id)"
          />
          <p class="font-weight-bold h4">
            {{alumno.nombre}}
            {{alumno.apellidos}}
            <span v-if="alumno.mostrar_nombre_carino">({{alumno.nombre_carino}})</span>
          </p>          
          <p>
            <small>{{alumno.nombre_grupo}}</small>
          </p>
        </div>
        <div class="col text-center">
          <div class="text-danger card font-weight-bold h6">
            <div class="card-body">
            Balance
            <p>
              $<balance-alumno :idalumno="id" mostrarfecha="true"></balance-alumno>
            </p>
                <estado-cuenta :idAlumno="id" />                                
            </div>
          </div>
        </div>
        <div class="w-100"/>
      </div>

      <div  v-if="alumno.fecha_limite_pago_mensualidad == null" class="alert alert-warning">
       <i class="far fa-hand-point-right"></i><strong>Hola!</strong> por favor captura la fecha de pago de la mensualidad.<button @click="iniciarCapturaFechaPago()" class="btn btn-link"> Clic aquí para capturar</button>          
      </div>
      <div class="row">
        <div class="col">
          
            <!-- CONTENIDO -->
            <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >Perfil</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"
                  v-on:click="cargarTabInscripcion()"
                >Inscripción</a>
              </li>
              <!--<li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >Mamá/Papá</a>
              </li>-->
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-institucion-tab"
                  data-toggle="pill"
                  href="#pills-institucion"
                  role="tab"
                  aria-controls="pills-institucion"
                  aria-selected="false"
                  v-on:click="cargarTabInstitucion()"
                >Institución</a>
              </li>

              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-familiares-tab"
                  data-toggle="pill"
                  href="#pills-familiares"
                  role="tab"
                  aria-controls="pills-familiares"
                  aria-selected="false"
                  v-on:click="cargarTabFamiliares()"
                >Familiares</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-servicios-tab"
                  data-toggle="pill"
                  href="#pills-servicios"
                  role="tab"
                  aria-controls="pills-servicios"
                  aria-selected="false"
                >Pagos  </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-servicios-tab"
                  data-toggle="pill"
                  href="#pills-facturacion"
                  role="tab"
                  aria-controls="pills-facturacion"
                  aria-selected="false"
                >Facturación</a>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div class="card">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="inputNombre">
                        Nombre
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        id="inputNombre"
                        type="text"
                        v-model="alumno.nombre"
                        class="form-control"
                        placeholder="Nombre"
                        required
                        autofocus
                      >
                    </div>

                    <div class="form-group">
                      <label for="inputApellidos">
                        Apellidos
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        id="inputApellidos"
                        type="text"
                        v-model="alumno.apellidos"
                        class="form-control"
                        placeholder="Apellidos"
                        required
                      >
                    </div>
                    <div class="form-group">
                      <label for="inputFechaNacimientoAlumno">
                        Fecha de Nacimiento
                        <span class="text-danger">*</span>
                      </label>
                    
                      <datepicker
                        id="inputFechaNacimientoAlumno"
                        v-model="alumno.fecha_nacimiento"
                        input-class="form-control"
                        :bootstrap-styling="true"
                        :language="es"
                        required
                      ></datepicker>                          
                    </div>
                    <div class="form-group">
                      <label for="inputSexo">
                        Sexo
                        <span class="text-danger">*</span>
                      </label>
                       <select
                        v-model="alumno.cat_genero"
                        class="form-control"
                        placeholder="Grupo"
                        required
                      >
                        <option
                          id="selectGeneroAlumno"
                          v-for="genero in listaGeneroAlumno"
                          v-bind:value="genero.id"
                          v-bind:key="genero.id"
                        >{{ genero.nombre }}</option>
                      </select>

                    </div>

                    <div class="form-group">
                      <label for="inputAlergias">Alergias</label>
                      <input
                        id="inputAlergias"
                        type="textarea"
                        class="form-control"
                        v-model="alumno.alergias"
                        placeholder="Alergias"
                      >
                    </div>

                    <div class="form-group">
                      <label for="selectGrupo">
                        Grupo
                        <span class="text-danger">*</span>
                      </label>
                      <select
                        v-model="alumno.co_grupo"
                        class="form-control"
                        placeholder="Grupo"
                        required
                      >
                        <option
                          id="selectGrupo"
                          v-for="grupo in listaGrupos"
                          v-bind:value="grupo.id"
                          v-bind:key="grupo.id"
                        >{{ grupo.nombre }}</option>
                      </select>
                    </div>

                    <div class="row"
                          v-if="alumno.cat_tipo_cobranza == 1">
                      <div class="col col-md-6">
                        <div class="form-group">
                          <label for="inputHoraEntrada">
                            Hora Entrada <span class="text-muted small">(Pe. 08:00)</span>
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            id="inputHoraEntrada"
                            type="time"
                            v-model="alumno.hora_entrada"
                            class="form-control"
                            placeholder="H. Entrada"
                            required
                          >
                        </div>
                      </div>
                      <div class="col col-md-6">
                        <div class="form-group">
                          <label for="inputHoraSalida">
                            Hora Salida <span class="text-muted small">(Pe. 18:00)</span>
                            <span class="text-danger">*</span>
                          </label>
                          <input
                            id="inputHoraSalida"
                            type="time"
                            v-model="alumno.hora_salida"
                            class="form-control"
                            placeholder="H. Salida"
                            required
                          >
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputMinutosGracia">
                        Minutos de Gracia
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        id="inputMinutosGracia"
                        type="number"
                        v-model="alumno.minutos_gracia"
                        class="form-control"
                        placeholder="Min. Gracia"
                        min="0"
                        required
                      >                   
                    </div>

                    <div class="form-group">
                      <label for="inputCostoInscripcion">
                        Costo Inscripción
                        <span class="text-danger">*</span>
                      </label>
                       <div class="input-group ">
                         <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
                      <input
                        id="inputCostoInscripcion"
                        type="number"
                        v-model="alumno.costo_inscripcion"
                        class="form-control"
                        placeholder="Costo Inscripcion"
                        min="0"
                        required
                      >
                    </div>
                    </div>

                    <div class="form-group">
                      <label for="inputCostoColegiatura">
                         Colegiatura
                        <span class="text-danger">*</span>
                      </label>
                        <div class="input-group ">
                         <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
                      <input
                        id="inputCostoColegiatura"
                        type="number"
                        v-model="alumno.costo_colegiatura"
                        class="form-control"
                        placeholder="Costo Colegiatura"
                        min="0"
                        required
                      >        
                        </div>              
                    </div>
                    
                      <span v-if="alumno.cat_tipo_cobranza == 2">
            <label >
              Horas en el mes
              <span class="text-danger">*</span>
            </label>

            <input
              type="number"
              v-model="alumno.tiempo_hora"
              class="form-control"
              placeholder="Horas"
              min="0"
              required
            />
            </span>

                                 

                    <div class="form-group">
                      <label for="inputNota">Nota</label>
                      <input
                        type="text"
                        v-model="alumno.nota"
                        class="form-control"
                        placeholder="Nota"
                      >
                    </div>

                    <button
                      type="button"
                      class="btn btn-lg btn-primary"
                      v-on:click="modificar()"
                    >Guardar</button>
                  </div>
                </div>
              </div>

              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <div class="card">
                  <div class="card-body">
                    <!-- DATOS DE INSCRIPCION  -->
                    <div class="form-group">
                      <label for="inputInscripcion">Fecha de Inscripción</label>
                      <datepicker
                        id="inputInscripcion"
                        v-model="alumno.fecha_inscripcion"
                        input-class="form-control"
                        :bootstrap-styling="true"
                        :disabled-dates="disableDaysFechaLimitePago"
                        :language="es"
                        required
                      ></datepicker>
                    </div>

                    <div class="form-group">
                      <label for="inputFReinscripcion">
                        Fecha de Reinscripción
                        <span class="text-danger">*</span>
                      </label>
                      <datepicker
                        id="inputFReinscripcion"
                        v-model="alumno.fecha_reinscripcion"
                        input-class="form-control"
                        :bootstrap-styling="true"
                        :disabled-dates="disableDaysFechaLimitePago"
                        :language="es"
                        required
                      ></datepicker>
                    </div>

                    <div class="form-group">
                      <label for="inputInscripcion">Nombre de cariño</label>
                      <input
                        id="inputNombreCarino"
                        type="text"
                        v-model="alumno.nombre_carino"
                        class="form-control"
                        
                        placeholder="Nombre de cariño"
                        required
                      >
                      <input
                          type="checkbox"
                          id="checkboxMostrarNombreCarino"
                          v-model="alumno.mostrar_nombre_carino"                          
                          /> Mostrar este nombre en la asistencia
                    </div>
                    <div class="form-group">
                      <label for="inputHermanos">No. Hermanos</label>
                      <input
                        id="inputHermanos"
                        type="number"
                        v-model="alumno.formato_inscripcion.hermanos"
                        class="form-control"
                        name="hermanos"
                        placeholder="Hermanos"
                        required
                      >
                    </div>
                    <div class="form-group">
                      <label for="inputPadres">Padres</label>
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          v-model="alumno.formato_inscripcion.estado_convivencia_padres"
                          id="customRadioInline1"
                          name="radio_estado_conviencia"
                          class="custom-control-input"
                          value="Viven Juntos"
                        >
                        <label class="custom-control-label" for="customRadioInline1">Viven Juntos</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          v-model="alumno.formato_inscripcion.estado_convivencia_padres"
                          id="customRadioInline2"
                          name="radio_estado_conviencia"
                          class="custom-control-input"
                          value="Separados"
                        >
                        <label class="custom-control-label" for="customRadioInline2">Separados</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          v-model="alumno.formato_inscripcion.estado_convivencia_padres"
                          id="customRadioInline3"
                          name="radio_estado_conviencia"
                          class="custom-control-input"
                          value="Viudo"
                        >
                        <label class="custom-control-label" for="customRadioInline3">Viudo</label>
                      </div>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input
                          type="radio"
                          v-model="alumno.formato_inscripcion.estado_convivencia_padres"
                          id="customRadioInline4"
                          name="radio_estado_conviencia"
                          class="custom-control-input"
                          value="Soltero"
                        >
                        <label class="custom-control-label" for="customRadioInline4">Soltero</label>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="inputServicioContratar">Servicio a contratar</label>
                      <select
                        id="inputServicioContratar"
                        v-model="alumno.formato_inscripcion.cat_servicio"
                        class="form-control"
                        placeholder="Servicio"
                        required
                        autofocus
                      >
                        <option
                          id="selectServicio"
                          v-for="s in listaServicios"
                          v-bind:value="s.id"
                          v-bind:key="s.id"
                        >{{ s.nombre }}</option>
                      </select>
                    </div>

                    <!--
              <div class="form-group">
                <label for="inputHorario">Horario</label>
                <input
                  id="inputHorario"
                  type="text"
                  v-model="alumno.formato_inscripcion.horario_servicio"
                  class="form-control"
                  placeholder="Horario"
                  required
                >
                    </div>-->

                    <!-- DATOS DE DOMICILIO -->
                    <!--<div >
                <h5 class="text-center text-muted">Datos de Domicilio</h5>
                <div class="card">
                  <div class="card-header">Header</div>
                  <div class="card-body">Content</div>
                </div>
                    </div>-->

                    <div class="form-group">
                      <label for="inputDireccion">Dirección</label>
                      <input
                        id="inputDireccion"
                        type="text"
                        v-model="alumno.formato_inscripcion.direccion"
                        class="form-control"
                        placeholder="Dirección, No. de Calle "
                        required
                      >
                    </div>
                    <button
                      type="button"
                      class="btn btn-lg btn-primary"
                      v-on:click="modificar()"
                    >Guardar</button>
                    <!-- DATOS DE INSCRIPCION  -->
                  </div>
                </div>
              </div>

              <!-- INSTITUTCION -->
              <div
                class="tab-pane fade"
                id="pills-institucion"
                role="tabpanel"
                aria-labelledby="pills-institucion-tab"
              >
                <div class="card">
                  <div class="card-body">
                    <div class="form-group">
                      <label
                        for="inputPregEscuelaGuarderia"
                      >¿Ha estado en alguna escuela o guardería?</label>
                      <input
                        id="inputPregEscuelaGuarderia"
                        type="text"
                        v-model="alumno.formato_inscripcion.resp_escuela_guarderia"
                        class="form-control"
                        placeholder="Nombre de la escuela ó Guardería"
                      >
                    </div>
                    <div class="form-group">
                      <label
                        for="inputPregMotivoInscripcion"
                      >¿Cuál fue el motivo que los llevó a tomar la decisión de inscribir a su hijo con nosotros?</label>
                      <input
                        id="inputPregMotivoInscripcion"
                        type="text"
                        v-model="alumno.formato_inscripcion.resp_motivo_inscripcion"
                        class="form-control"
                        placeholder="Describa el Motivo"
                      >
                    </div>

                    <div class="form-group">
                      <label>¿Qué esperan de nosotros como institución?</label>
                      <div class="form-check" v-for="row in listaValoresEsperados" :key="row.id">
                        <label class="form-check-label">
                          <input
                            type="checkbox"
                            class="form-check-input"
                            v-model="row.seleccionado"
                            value="row.seleccionado"
                          >
                          {{row.concepto}}
                        </label>
                      </div>
                    </div>

                    <div class="form-group">
                      <input
                        id="inputPregEsperanComoInstutucion"
                        type="text"
                        v-model="alumno.formato_inscripcion.resp_esperan_como_institucion"
                        class="form-control"
                        placeholder="Motivo espefico"
                      >
                    </div>

                    <button
                      type="button"
                      class="btn btn-lg btn-primary"
                      v-on:click="modificar()"
                    >Guardar</button>
                  </div>
                </div>
              </div>
              <!-- INSTITUTCION -->

              <!-- PERSONAS AUTORIZADAS -->
              <div
                class="tab-pane fade"
                id="pills-familiares"
                role="tabpanel"
                aria-labelledby="pills-familiares-tab"
              >
                <div class="card">
                  <div class="card-body">
                    <button
                      type="button"
                      class="btn btn-success"
                      data-toggle="modal"
                      data-target="#modal_familiar"
                      v-on:click="iniciarAgregarFamiliar()"
                    >Agregar</button>

                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <th></th>
                          <th>Nombre</th>
                          <th>Telefono</th>
                          <th>Correo</th>
                          <th>Parentesco</th>
                          <th></th>
                          <th></th>
                        </thead>
                        <tr v-for="row in listaFamiliares" :key="row.id">
                          <td class="text-right">
                            <!--<img
              src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
              width="50"
              height="50"
              v-on:click="verPerfil(row)"
              alt="..."
              class="rounded"
                            >-->
                          </td>
                          <td>
                            <button
                              type="button"
                              class="btn btn-link"
                              data-toggle="modal"
                              data-target="#modal_familiar"
                              v-on:click="seleccionarFamiliar(row,'UPDATE')"
                            >{{ row.nombre }}</button>
                          </td>
                          <td>
                            <span>{{ row.telefono }}</span>
                          </td>
                          <td>{{ row.correo }}</td>
                          <td>{{ row.parentesco }}</td>
                          <td>
                            <button
                              v-if="!row.sistema"
                              type="button"
                              class="btn btn-link red"
                              data-toggle="modal"
                              data-target="#modal_eliminar_familiar"
                              v-on:click="seleccionarFamiliar(row,'DELETE')"
                            >Eliminar</button>
                          </td>
                          <td>
                            <button
                              v-if="row.sistema"
                              type="button"
                              class="btn btn-link blue"                              
                              v-on:click="seleccionarFamiliarResetClave(row)"
                            >Resetear contraseña</button>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- PERONAS AUTORIZADAS -->

              <!-- SERVICOS CONTRATADOS -->
              <div
                class="tab-pane fade"
                id="pills-servicios"
                role="tabpanel"
                aria-labelledby="pills-servicios-tab"
              >
                <div class="card">
                  <div class="card-body">
                    <!-- Componente especial para cargos y pagos -->
                    <cargos-pagos :idalumno="id" :requiere_factura="alumno.factura"></cargos-pagos>
                  </div>
                </div>
              </div>
              <!-- SERVICIOS CONTRATADOS -->

              <div
                class="tab-pane fade"
                id="pills-facturacion"
                role="tabpanel"
                aria-labelledby="pills-facturacion-tab"
              >
                <div class="card">
                  <div class="card-body">
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          id="checkboxRequiereFacturacion"
                          v-model="alumno.factura"
                          name="factura"                          
                          v-on:click="iniciarHabilitarDesabilitarDatosFacturacion()"
                        >
                        <label
                          class="form-check-label"
                          for="checkboxRequiereFacturacion"
                          v-on:click="iniciarHabilitarDesabilitarDatosFacturacion()"
                        >Requiere Factura. <span v-if="!alumno.factura" class="text-danger">| por el momento no se requieren facturas.</span> </label>
                      </div>
                    </div>
                    <!--<div :class="{ requiere_datos_facturacion ? '':'disabled'}" >-->

                    <div class="form-row">
                      <div class="form-group col-md-6 disable">
                        <label for="inputRfc">
                          RFC
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputRfc"
                          placeholder="RFC"
                          name="rfc"
                          v-model="datos_facturacion.rfc"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputCurp">
                          Curp
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputCurp"
                          placeholder="Curp"
                          name="curp"
                          v-model="datos_facturacion.curp"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-12">
                        <label for="inputRazonSocial">
                          Razón Social
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control text-uppercase"
                          id="inputRazonSocial"
                          placeholder="Razón Social"
                          name="razon_social"
                          v-model="datos_facturacion.razon_social"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-8">
                        <label for="inputCurp">
                          Calle
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputCalle"
                          placeholder="Calle"
                          name="calle"
                          v-model="datos_facturacion.calle"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputNoExterior">
                          No. Ext.
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputNoExterior"
                          placeholder="No. Exterior"
                          name="numero_exterior"
                          v-model="datos_facturacion.numero_exterior"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-8">
                        <label for="inputColonia">
                          Colonia
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Colonia"
                          id="inputColonia"
                          name="colonia"
                          v-model="datos_facturacion.colonia"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputCP">
                          CP.
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="CP."
                          id="inputCP"
                          name="codigo_postal"
                          v-model="datos_facturacion.codigo_postal"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="inputCiudad">
                          Ciudad
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputCiudad"
                          placeholder="Ciudad"
                          name="ciudad"
                          v-model="datos_facturacion.ciudad"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputMunicipio">
                          Municipio
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputMunicipio"
                          placeholder="Municipio"
                          name="municipio"
                          v-model="datos_facturacion.municipio"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputEstado">
                          Estado
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Estado"
                          id="inputEstado"
                          name="estado"
                          v-model="datos_facturacion.estado"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="inputTelefono">
                          Teléfono
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputTelefono"
                          placeholder="Telefono"
                          name="telefono_contacto"
                          v-model="datos_facturacion.telefono_contacto"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="inputEstado">
                          Correo
                          <span class="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          class="form-control"
                          placeholder="Correo"
                          id="inputCorreo"
                          name="correo_contacto"
                          v-model="datos_facturacion.correo_contacto"
                          :disabled="!alumno.factura"
                          required
                        >
                      </div>
                    </div>

                    <button
                      class="btn btn-primary"
                      v-on:click="guardarDatosFacturacion()"
                      :disabled="!alumno.factura"
                    >Guardar</button>
                    <!-- <button class="btn btn-danger" v-on:click="habilitarDesabilitarDatosFacturacion()"                    
                            :disabled="!alumno.factura">
                        No requiere factura
                    </button>                    
                    -->
                    <!-- form -->
                  </div>
                </div>
              </div>
            </div>
            <!--<button type="button" class="btn btn-lg btn-primary" v-on:click="modificar()">Guardar</button>-->
        
        </div>
      </div>

      <!-- confirmar desabilitar factura -->
      <div
        id="modal_confirmar_facturacion"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Confirmar facturación</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">              
              <p class="text-danger">{{mensaje_facturacion}} <strong>{{alumno.nombre}} {{alumno.apellidos}}</strong>.</p>
              <p>
                ¿Confirma que desea <strong>{{alumno.factura ? 'Habilitar':'DESABILITAR'}} </strong> la facturación?                
              </p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                v-on:click="habilitarDesabilitarDatosFacturacion()"
                data-dismiss="modal"
              >Confirmar</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal"
              v-on:click="cancelarHabilitarDesabilitarDatosFacturacion()"
              >Cancelar</button>
            </div>
          </div>
        </div>
      </div>

     <!-- confirmar resetear clave -->
      <div
        id="modal_confirmar_resetear_clave"
        class="modal fade"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Resetear clave</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">                            
              <p>
                ¿Confirma que desea resetear la contraseña de cliente <strong>{{familiar.nombre}} </strong> ?                
              </p>
              <p>Se enviará un correo a <strong>{{familiar.correo}}</strong>  con la nueva clave al cliente.</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger"
                v-on:click="confirmarResetClave()"
                data-dismiss="modal"
              >Confirmar</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal"              
              >Cancelar</button>
            </div>
          </div>
        </div>
      </div>

      
    </div>

    <!-- EN CASO DE NO ENVIAR EL ID -->
    <div class="text-info" v-else-if="display==false">Es necesario seleccionar un alumno</div>
    <!-- MODAL TOAST -->
    <div
      id="toast_id"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      class="toast border-warning"
      data-autohide="true"
      data-delay="1000"
    >
      <div class="toast-header p-1 mb-1 bg-warning text-dark">
        <!--<img src="" class="rounded mr-2" alt="...">-->
        <strong class="mr-auto">Perfil</strong>
        <!--<small>11 mins ago</small>-->
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        <p id="toast_msg"></p>
      </div>
    </div>
    <!-- MODAL TOAST -->

    <!-- captura de fecha de pago-->

      <Popup id="popup_captura_fecha_pago"   :show_button_close="false">
          <div slot="header">Fecha de pago <strong> {{alumno.nombre}} {{alumno.apellidos}}</strong></div>
          <div slot="content">                                      
            <div class="row justify-content-md-center">
              <span>* Seleccione la fecha límite de pago</span>
              <datepicker
                        id="inputFechaLimitePagoColegiatura1"
                        v-model="alumno.fecha_limite_pago_mensualidad"
                        input-class="form-control"
                        :bootstrap-styling="true"                        
                        :language="es"
                        :inline="true"
                        :full-month-name="true"
                        required
              > </datepicker>        
              </div>                                    
          </div>
          <div slot="footer">            
            <button
                      class="btn btn-secondary"
                      v-on:click="cancelarModificarFechaPago()"                      
                    >Cancelar</button>  
               <button
                      class="btn btn-primary"
                      v-on:click="modificarFechaLimitePago()"                      
                    >Seleccionar</button>            
          </div>
        </Popup>   

  </div>
</template>

<script src="../controller/PerfilAlumnoController.js"></script>

<style scoped>
.scroll-div {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
}
</style>
