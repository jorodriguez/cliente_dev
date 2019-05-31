<template>
  <div class="perfil container">
    <div class="alert alert-info">{{mensaje}}</div>
    <div v-if="display==true" class="text-left">
      <div class="text-left">
        <router-link :to="{ name: 'CatAlumno', params: {} }">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>

      <!-- MODAL PARA AGREGAR FAMILIAR -->
      <form>
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
                {{mensaje}}
                <div class="form-group" v-if="operacion == 'INSERT'">
                  <label for="selectParentescoFamiliar">
                    Parentesco
                    <span class="text-danger">*</span>
                  </label>
                  <select
                    v-model="familiar.co_parentesco"
                    class="form-control"
                    placeholder="Parentesco"
                    required
                    autofocus
                  >
                    <option
                      id="selectParentesco"
                      v-for="p in listaParentesco"
                      v-bind:value="p.id"
                      v-bind:key="p.id"
                    >{{ p.nombre }}</option>
                  </select>
                </div>
                <div class="form-group" v-else-if="operacion == 'UPDATE'">
                  <input type="text" v-model="familiar.parentesco" class="form-control" disabled>
                </div>

                <div class="form-group">
                  <label for="inputNombreFamiliar">
                    Nombre
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="inputNombreFamiliar"
                    type="text"
                    v-model="familiar.nombre"
                    class="form-control"
                    placeholder="Nombre"
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="inputTelefonoFamiliar">
                    Telefono
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="inputTelefonoFamiliar"
                    type="text"
                    v-model="familiar.telefono"
                    class="form-control"
                    placeholder="Telefono"
                  >
                </div>
                <div class="form-group">
                  <label for="inputFnacimientoFamiliar">Fecha de Nacimiento</label>
                  <input
                    id="inputFnacimientoFamiliar"
                    type="date"
                    pattern="yyyy-MM-dd"
                    v-model="familiar.fecha_nacimiento"
                    class="form-control"
                    placeholder="Fecha de Nacimiento"
                  >
                </div>
                <div class="form-group">
                  <label for="inputCorreoFamiliar">Correo</label>
                  <input
                    id="inputCorreoFamiliar"
                    type="text"
                    v-model="familiar.correo"
                    class="form-control"
                    placeholder="Correo"
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
      </form>

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

      <!-- MODAL PARA SERVICIOS -->

      <form>
        <div id="modal_cargo_productos" class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Agregar producto</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body text-left">
                <label for="selectProducto">
                  Producto
                  <span class="text-danger">*</span>
                </label>
                <select
                  id="selectProductos"
                  v-model="producto.cat_producto"
                  class="form-control"
                  placeholder="Producto"
                  required
                  autofocus
                >
                  <option
                    id="selectProducto"
                    v-for="p in listaProductos"
                    v-bind:value="p.id"
                    v-bind:key="p.id"
                  >{{ p.nombre }}</option>
                </select>

                <div class="form-group">
                  <label for="inputCantidad">
                    Cantidad
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="inputCantidad"
                    type="text"
                    v-model="producto.cantidad"
                    class="form-control"
                    placeholder="Cantidad"
                    required
                  >
                </div>
              </div>
              <div class="modal-footer">
                <!--<div v-if="operacion == 'INSERT'">                  -->
                <button class="btn btn-lg btn-primary" v-on:click="agregarProducto()">Guardar</button>
                <!--</div>-->
                <!--<div v-else-if="operacion == 'UPDATE'">                  
                  <button class="btn btn-lg btn-primary" v-on:click="modificarFamiliar()">Modificar</button>
                </div>-->
                <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <!-- MODAL PARA SERVICIOS -->

      <div>
        <div class="col text-center">
          <img
            src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
            alt
            class="rounded-circle"
            width="50"
            height="50"
          >
          <p>
            {{alumno.nombre}}
            {{alumno.apellidos}}
          </p>
        </div>
        <div class="col text-center">
          <span class="text-danger">$</span>
        </div>
        <div class="w-100"/>
      </div>
      <div class="row">
        <div class="col">
          <form>
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
                >Otros cargos</a>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div class="form-group">
                  <label for="inputNombre">Nombre</label>
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
                  <label for="inputApellidos">Apellidos</label>
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
                  <label for="inputFechaNacimientoAlumno">Fecha de Nacimiento</label>
                  <input
                    id="inputFechaNacimientoAlumno"
                    type="date"
                    pattern="yyyy-MM-dd"
                    v-model="alumno.fecha_nacimiento"
                    class="form-control"
                    placeholder="F. Nacimiento"
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="inputSexo">Sexo</label>
                  <select
                    id="inputSexo"
                    v-model="alumno.sexo"
                    class="form-control"
                    placeholder="Sexo"
                    required
                  >
                    <option value="Niño" selected>Niño</option>
                    <option value="Niña">Niña</option>
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
                  <label for="selectGrupo">Grupo</label>
                  <select
                    v-model="alumno.co_grupo"
                    class="form-control"
                    placeholder="Grupo"
                    required
                    autofocus
                  >
                    <option
                      id="selectGrupo"
                      v-for="grupo in listaGrupos"
                      v-bind:value="grupo.id"
                      v-bind:key="grupo.id"
                    >{{ grupo.nombre }}</option>
                  </select>
                </div>

                <div class="row">
                  <div class="col col-md-6">
                    <div class="form-group">
                      <label for="inputHoraEntrada">Hora Entrada</label>
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
                      <label for="inputHoraSalida">Hora Salida</label>
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
                  <label for="inputMinutosGracia">Minutos de Gracia</label>
                  <input
                    id="inputMinutosGracia"
                    type="number"
                    v-model="alumno.minutos_gracia"
                    class="form-control"
                    placeholder="Min. Gracia"
                    required
                  >
                </div>
                <div class="form-group">
                  <label for="inputCostoColegiatura">Costo Colegiatura</label>
                  <input
                    id="inputCostoColegiatura"
                    type="number"
                    v-model="alumno.costo_colegiatura"
                    class="form-control"
                    placeholder="Costo Colegiatura"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="inputCostoInscripcion">Costo Inscripción</label>
                  <input
                    id="inputCostoInscripcion"
                    type="number"
                    v-model="alumno.costo_inscripcion"
                    class="form-control"
                    placeholder="Costo Inscripcion"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="inputFReinscripcion">Fecha de Reinscripción</label>
                  <input
                    id="inputFReinscripcion"
                    type="date"
                    pattern="yyyy-MM-dd"
                    v-model="alumno.fecha_reinscripcion"
                    class="form-control"
                    placeholder="F. Reinscripcion"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="inputNota">Nota</label>
                  <input type="text" v-model="alumno.nota" class="form-control" placeholder="Nota">
                </div>
              </div>
              <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
                <!-- DATOS DE INSCRIPCION  -->
                <div class="form-group">
                  <label for="inputInscripcion">Fecha de Inscripción</label>
                  <input
                    id="inputInscripcion"
                    type="date"
                    pattern="yyyy-MM-dd"
                    v-model="alumno.fecha_inscripcion"
                    class="form-control"
                    placeholder="Fecha de inscripción"
                    required
                  >
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
                </div>
                <div class="form-group">
                  <label for="inputHermanos">No. Hermanos</label>
                  <input
                    id="inputHermanos"
                    type="number"
                    v-model="alumno.formato_inscripcion.hermanos"
                    class="form-control"
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

                <!-- DATOS DE INSCRIPCION  -->
              </div>

              <!-- INSTITUTCION -->
              <div
                class="tab-pane fade"
                id="pills-institucion"
                role="tabpanel"
                aria-labelledby="pills-institucion-tab"
              >
                <div class="form-group">
                  <label for="inputPregEscuelaGuarderia">¿Ha estado en alguna escuela o guardería?</label>
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
                  <div class="form-check" 
                        v-for="row in listaValoresEsperados" :key="row.id" >
                    <label class="form-check-label">
                      <input
                        type="checkbox"
                        class="form-check-input"
                        v-model="row.seleccionado"
                        value="row.seleccionado"
                      >{{row.concepto}}
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
              </div>
              <!-- INSTITUTCION -->

              <!-- PERSONAS AUTORIZADAS -->
              <div
                class="tab-pane fade"
                id="pills-familiares"
                role="tabpanel"
                aria-labelledby="pills-familiares-tab"
              >
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
                    </tr>
                  </table>
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
                <button
                  type="button"
                  class="btn btn-success"
                  data-toggle="modal"
                  data-target="#modal_cargo_productos"
                  v-on:click="iniciaragregarProducto()"
                >Agregar Servicio</button>

                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <th>Servicio</th>
                      <th>Descripción</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Fecha Registro</th>
                      <th></th>
                    </thead>
                    <tr v-for="row in listaProductosAlumno" :key="row.id_relacion">
                      <td>{{row.nombre}}</td>
                      <td>
                        <span>{{ row.descripcion }}</span>
                      </td>
                      <td>{{ row.cantidad }}</td>
                      <td>{{ row.precio }}</td>
                      <td>{{ row.fecha }}</td>
                      <td>
                        <button
                          type="button"
                          class="btn btn-link red"
                          data-toggle="modal"
                          data-target="#modal_eliminar_servicio"
                          v-on:click="seleccionarProducto(row,'DELETE')"
                        >Eliminar</button>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- SERVICIOS CONTRATADOS -->
            </div>

            <button type="button" class="btn btn-lg btn-primary" v-on:click="modificar()">Guardar</button>
          </form>
        </div>
      </div>
      <div class="alert alert-info">{{mensaje}}</div>
    </div>

    <!-- EN CASO DE NO ENVIAR EL ID -->
    <div class="alert alert-warning" v-else-if="display==false">Es necesario seleccionar un alumno</div>
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
  </div>
</template>

<script>
import router from "@/router/index";
import AlumnoModel from "../models/AlumnoModel";
import FormatoModel from "../models/FormatoModel";
import FamiliarModel from "../models/FamiliarModel";
import Utils from "../models/FormatoUtils";

export default {
  name: "PerfilAlumno",
  data() {
    return {
      id: 0,
      alumno: AlumnoModel,
      familiar: {
        id: 0,
        id_relacion: -1,
        co_alumno: -1,
        co_parentesco: -1,
        parentesco: "",
        nombre: "",
        telefono: "",
        fecha_nacimiento: null,
        correo: "",
        genero: 0
      },
      producto: { co_alumno: -1, cat_producto: -1, cantidad: 1 },
      listaFamiliares: [],
      metadatos: Utils,
      listaGrupos: [],
      listaParentesco: [],
      listaProductos: [],
      listaProductosAlumno: [],
      listaServicios: [],
      listaValoresEsperados: [],
      display: true,
      //uri:"http://localhost:5000/",
      //uri:"https://app-restexpres.herokuapp.com/",      
      uriTemp: "http://localhost:5000/alumnos",
      uriTempGrupos: "http://localhost:5000/grupos",
      uriTempFamiliar: "http://localhost:5000/familiar",
      uriTempParentesco: "http://localhost:5000/parentesco",            
      uriTempProducto: "http://localhost:5000/producto",
      uriTempServicios: "http://localhost:5000/servicios",
      uriTempValoresEsperados: "http://localhost:5000/valores_esperados",
      
      //--
      /*uriTemp: "https://app-restexpres.herokuapp.com/alumnos",
      uriTempGrupos: "https://app-restexpres.herokuapp.com/grupos",
      uriTempFamiliar: "https://app-restexpres.herokuapp.com/familiar",
      uriTempParentesco: "https://app-restexpres.herokuapp.com/parentesco",            
      uriTempProducto: "https://app-restexpres.herokuapp.com/producto",
      uriTempServicios: "https://app-restexpres.herokuapp.com/servicios",
      uriTempValoresEsperados: "https://app-restexpres.herokuapp.com/valores_esperados",*/
      response: "",
      mensaje: "",
      sesion: {},
      loadFamiliaresFuncion: null,
      loadCatalogoParentescoFuncion: null,
      loadCatalogoProductosFuncion: null,
      loadProductosAlumnoFuncion: null,
      loadValoresEsperadosFunction:null,
      mensajeToast: null,
      initFamiliar: null,
      operacion: "",
      usuarioSesion: {}
    };
  },
  mounted() {
    console.log("iniciando el componente Perfil alumno");

    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }

    this.usuarioSesion = this.sesion.usuario;

    this.id = this.$route.params.id;

    console.log("this.uriTemp  " + this.uriTempGrupos);

    if (this.id == undefined) {
      this.display = false;
      console.log("No se recibe ningun id de alumno ");
    } else {
      console.log("this.uriTemp  " + this.uriTemp);

      this.$http
        .get(this.uriTemp + "/id/" + this.id, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.alumno = result.data;

            if (this.alumno.formato_inscripcion == null)
              this.alumno.formato_inscripcion = {};

            console.log("Preparando alumno como insticucion " + JSON.stringify(this.alumno));
              
              this.loadValoresEsperadosFunction(this.alumno.formato_inscripcion.id);
              
          },
          error => {
            console.error(error);
          }
        );

      //familiares
      this.loadFamiliaresFuncion = () => {
        this.$http
          .get(this.uriTempFamiliar + "/" + this.id, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;
              if (this.response != null) {
                this.listaFamiliares = this.response;
              }
            },
            error => {
              console.error(error);
            }
          );

        //grupos
        //traer grupos

        this.$http
          .get(this.uriTempGrupos, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;
              if (this.response != null) {
                this.listaGrupos = this.response;
              }
            },
            error => {
              console.error(error);
            }
          );
      };
      // Parentesco
      this.loadCatalogoParentescoFuncion = () => {
        this.$http
          .get(this.uriTempParentesco + "/" + this.id, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;
              if (this.response != null) {
                this.listaParentesco = this.response;
              }
            },
            error => {
              console.error(error);
            }
          );
      };

      //Traer productos
      this.loadCatalogoProductosFuncion = () => {
        this.$http
          .get(this.uriTempProducto, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;
              if (this.response != null) {
                this.listaProductos = this.response;
              }
            },
            error => {
              console.error(error);
            }
          );
      };

      this.loadProductosAlumnoFuncion = () => {
        console.log("loadProductosAlumnoFuncion ");
        this.$http
          .get(this.uriTempProducto + "/" + this.id, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;
              console.log("Respuesta " + JSON.stringify(this.response));
              if (this.response != null) {
                this.listaProductosAlumno = this.response;
              }
            },
            error => {
              console.error(error);
            }
          );
      };

      //traer sevicios
      this.$http
        .get(this.uriTempServicios, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;
            if (this.response != null) {
              this.listaServicios = this.response;
              console.log("Servicios " + this.listaServicios);
            }
          },
          error => {
            console.error(error);
          }
        );

      this.loadValoresEsperadosFunction = (id_formato) => {
        this.$http
          .get(this.uriTempValoresEsperados + "/" + id_formato, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;
              if (this.response != null) {
                this.listaValoresEsperados = this.response;                           
                
                console.log("Valores esperados " + this.listaValoresEsperados);
              }
            },
            error => {
              console.error(error);
            }
          );
      };
      
      
      this.loadFamiliaresFuncion();
      this.loadCatalogoProductosFuncion();
      this.loadProductosAlumnoFuncion();
     
    }

    this.mensajeToast = mensaje => {
      $("#toast_msg").text(mensaje);
      $("#toast_id").toast("show");
    };
  },
  methods: {
    //FIXME : pasar al servicio
    modificar() {
      console.log("Modificar el id " + this.alumno.id);
      this.mensaje = JSON.stringify(this.alumno);

      this.alumno.genero = this.usuarioSesion.id;
      this.alumno.formato_inscripcion.valores_esperados = this.listaValoresEsperados;

      this.$http
        .put(this.uriTemp + "/" + this.alumno.id, this.alumno, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.mensaje = "Se actualizaron los datos del alumno.";
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    iniciarAgregarFamiliar() {
      this.operacion = "INSERT";
      this.familiar = {
        id: 0,
        id_relacion: -1,
        co_alumno: -1,
        co_parentesco: -1,
        parentesco: "",
        nombre: "",
        telefono: "",
        fecha_nacimiento: null,
        correo: "",
        genero: 0
      };
      this.loadCatalogoParentescoFuncion();
    },
    seleccionarFamiliar(item, operacion) {
      this.familiar = item;
      this.operacion = operacion;
      this.loadCatalogoParentescoFuncion();
    },
    agregarFamiliar() {
      console.log("Agregar familiar ");

      if (
        this.familiar.co_parentesco == -1 ||
        this.familiar.nombre == "" ||
        this.familiar.telefono == ""
      ) {
        this.mensaje = "Escribe los valores requeridos";
        this.mensajeToast("Escribe los valores requeridos");
        return;
      }

      console.log("== " + JSON.stringify(this.familiar));
      this.familiar.genero = this.usuarioSesion.id;

      this.$http
        .post(this.uriTempFamiliar + "/" + this.alumno.id, this.familiar, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.mensaje = "Se agrego el familiar.";

              $("#modal_familiar").modal("hide");

              this.loadFamiliaresFuncion();
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    modificarFamiliar() {
      console.log("modificar familiar");

      if (
        this.familiar.co_parentesco == -1 ||
        this.familiar.nombre == "" ||
        this.familiar.telefono == ""
      ) {
        this.mensajeToast("Escribe los valores requeridos");
        return;
      }
      this.familiar.genero = this.usuarioSesion.id;      

      this.$http
        .put(this.uriTempFamiliar + "/" + this.familiar.id, this.familiar, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              if (this.response == 0 || this.response == null) {
                this.mensaje = "Sucedió un error inesperado";
              } else {
                this.mensaje = "Se actualizaron los datos de familiar.";
                this.loadFamiliaresFuncion();
                $("#modal_familiar").modal("hide");
              }
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    eliminarFamiliar() {
      this.familiar.genero = this.usuarioSesion.id;

      console.log("Eliminar familiar " + JSON.stringify(this.familiar));

      this.$http
        .put(
          this.uriTempFamiliar + "/eliminar/" + this.familiar.id_relacion,
          this.familiar,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              if (this.response == 0 || this.response == null) {
                this.mensaje = "Sucedió un error inesperado";
              } else {
                this.mensaje = "Se actualizaron los datos de familiar.";
                this.loadFamiliaresFuncion();
                $("#modal_eliminar_familiar").modal("hide");
              }
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    iniciaragregarProducto() {
      console.log("Iniciar add producto");
      this.producto = { co_alumno: -1, cat_producto: -1, cantidad: 1 };
      this.loadCatalogoProductosFuncion();
    },
    seleccionarProducto(item, operacion) {
      console.log("seleccionar producto");
    },
    agregarProducto() {
      console.log("agregar servicio");

      if (this.producto.cantidad == null || this.producto.cantidad == 0) {
        this.mensaje = "La cantidad no es correcta ";
        return;
      }

      if (this.producto.cat_producto == null || this.producto.cantidad == -1) {
        this.mensaje = "Selecione el producto ";
        return;
      }

      this.producto.genero = this.usuarioSesion.id;
      this.producto.co_alumno = this.alumno.id;

      this.$http
        .post(this.uriTempProducto, this.producto, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.mensaje = "Se agrego el producto.";

              $("#modal_producto").modal("hide");

              this.loadProductosAlumnoFuncion();
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    eliminarproducto() {
      console.log("eliminar producto");
    }
  }
};
</script>

<style scoped>
.scroll-div {
  width: 100%;
  height: 500px;
  overflow-y: scroll;
}
</style>
