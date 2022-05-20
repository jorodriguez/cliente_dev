<template>
  <div class="cat_alumno">
    <h1>Alumnos ({{ lista != [] ? lista.length : 0 }})</h1>
    <small>{{ usuarioSesion.nombre_sucursal }}</small>
    <div class="row">
      <div class="col-auto mr-auto">
        <router-link to="/principal" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
        <button
          type="button"
          class="btn btn-primary btn-lg"
          v-on:click="nuevo()"
        >
          Nuevo
        </button>
      </div>
      <div class="col-auto">
        <router-link
          to="/ReactivarAlumno"
          class="btn btn-outline-danger btn-lg"
        >
          Reactivar alumno
        </router-link>
      </div>
    </div>

    <!--<div class="text-left">
      <router-link to="/principal" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
      <button type="button" class="btn btn-primary btn-lg" v-on:click="nuevo()">Nuevo</button>
    </div>-->
    <br />
    <!--<form>-->
    <div
      id="modal_alumno"
      class="modal"
      tabindex="-1"
      data-keyboard="false"
      data-backdrop="static"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Registro de Alumno</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-left">
            <!--<span class="text-danger text-sm">{{mensaje}}</span>-->
            <div>
              <label>
                Nombre
                <span class="text-danger">*</span>
              </label>
              <input
                type="text"
                v-model="input.nombre"
                class="form-control"
                placeholder="Nombre"
                required
                autofocus
              />
              <label>Apellidos</label>
              <input
                type="text"
                v-model="input.apellidos"
                class="form-control"
                placeholder="Apellidos"
                required
              />
              <label>
                Fecha de nacimiento
                <span class="text-danger">*</span>
              </label>
              <!--
                <input
                  type="date"
                  pattern="yyyy-MM-dd"
                  v-model="input.fecha_nacimiento"
                  class="form-control"
                  placeholder="F. Nacimiento"
                  required
              >-->
              <datepicker
                name="fecha_nacmiento"
                v-model="input.fecha_nacimiento"
                input-class="form-control"
                :format="'yyyy-MM-dd'"
                :bootstrap-styling="true"
                :language="es"
                required
              ></datepicker>
              <label>
                Sexo
                <span class="text-danger">*</span>
              </label>
              <select
                v-model="input.cat_genero"
                class="form-control"
                placeholder="Grupo"
                required
              >
                <option
                  id="selectGeneroAlumno"
                  v-for="genero in listaGeneroAlumno"
                  v-bind:value="genero.id"
                  v-bind:key="genero.id"
                  >{{ genero.nombre }}</option
                >
              </select>
              <!--
                <select
                  id="inputServicioContratar"
                  v-model="input.sexo"
                  class="form-control"
                  placeholder="Servicio"
                  required
                >
                  <option value="Niño" selected>Niño</option>
                  <option value="Niña">Niña</option>
                </select>
              -->

              <label>Alergias</label>
              <input
                type="textarea"
                class="form-control"
                v-model="input.alergias"
                placeholder="Alergias"
              />

              <label>
                Grupo
                <span class="text-danger">*</span>
              </label>
              <select
                v-model="input.co_grupo"
                class="form-control"
                placeholder="Grupo"
                required
              >
                <option
                  v-for="grupo in listaGrupos"
                  v-bind:value="grupo.id"
                  v-bind:key="grupo.id"
                  >{{ grupo.nombre }}</option
                >
              </select>

              <div class="row">
                <div class="col-sm-6">
                  <label>
                    Hora Entrada
                    <small class="text-muted">(Pe. 08:00)</small>
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    v-model="input.hora_entrada"
                    class="form-control"
                    placeholder="H. Entrada"
                    required
                  />
                </div>
                <div class="col-sm-6">
                  <label>
                    Hora Salida
                    <small class="text-muted">(Pe. 20:00)</small>
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    v-model="input.hora_salida"
                    class="form-control"
                    placeholder="H. Salida"
                    required
                  />
                </div>
              </div>

              <label>
                Minutos de Gracia
                <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                v-model="input.minutos_gracia"
                class="form-control"
                placeholder="Min. Gracia"
                min="0"
                required
              />

              <label>
                F. de Inscripción
                <span class="text-danger">*</span>
              </label>
              <!--<input
                  type="date"
                   pattern="yyyy-MM-dd"
                  v-model="input.fecha_reinscripcion"
                  class="form-control"
                  placeholder="F. Reinscripcion"
                  required
              >-->
              <datepicker
                name="fecha_inscripcion"
                v-model="input.fecha_inscripcion"
                input-class="form-control"
                :bootstrap-styling="true"
                :language="es"
                required
              ></datepicker>

              <label>
                Costo Colegiatura
                <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                v-model="input.costo_colegiatura"
                class="form-control"
                placeholder="Costo Colegiatura"
                min="0"
                required
              />

              <label>
                Costo Inscripción
                <span class="text-danger">*</span>
              </label>
              <input
                type="number"
                v-model="input.costo_inscripcion"
                class="form-control"
                placeholder="Costo Inscripcion"
                min="0"
                required
              />

              <div class="form-group">
                <label for="inputFechaLimitePago">
                  Fecha Pago
                  <span class="text-danger">*</span>
                </label>
                <datepicker
                  id="inputFechaLimitePagoColegiatura"
                  v-model="input.fecha_limite_pago_mensualidad"
                  input-class="form-control"
                  :bootstrap-styling="true"
                  :language="es"
                  required
                ></datepicker>
              </div>
              <label>Nota</label>
              <input
                type="text"
                v-model="input.nota"
                class="form-control"
                placeholder="Nota"
              />
            </div>
          </div>
          <div class="modal-footer">
            <div v-if="operacion == 'INSERT'">
              <button class="btn btn-lg btn-primary" v-on:click="guardar()">
                Guardar
              </button>
            </div>
            <div v-else-if="operacion == 'UPDATE'">
              <button class="btn btn-lg btn-primary" v-on:click="modificar()">
                Modificar
              </button>
            </div>
            <button
              type="button"
              class="btn btn-lg btn-secondary"
              data-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- </form>-->

    <!-- ELIMINAR MODAL -->
    <div
      id="modal_eliminar_alumno"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      data-keyboard="false"
      data-backdrop="static"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Confirmar baja del alumno</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">            
                <h4><strong>{{ input.nombre }} {{ input.apellidos }}</strong></h4>
                <div class="form-group text-left">
                    <label for="fecha_baja">Fecha de baja</label>
                    <datepicker
                      name="fecha_baja"
                      v-model="fechaBaja"
                      input-class="form-control"
                      :format="'yyyy-MM-dd'"
                      :bootstrap-styling="true"
                      :language="es"                      
                  ></datepicker>
                </div>             
                <div class="form-group">
                  <textarea 
                        v-model="observacionesBaja"
                        class="form-control" 
                        placeholder="Observaciones"
                        rows="3">
                  </textarea>            
               </div>                  
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger"
              v-on:click="eliminar()"
              data-dismiss="modal"
            >
              Dar de Baja
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar por nombre.."
            v-model="criterioNombre"
            v-on:keyup.enter="buscarPorNombre()"
            aria-label="Buscar por nombre.."
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              v-on:click="buscarPorNombre()"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <th></th>
              <th class="text-left">Nombre</th>              
              <th>Grupo</th>
              <th>Entrada/salida</th>              
              <th>Adeudo</th>
              <th></th>
            </thead>
            <tr v-for="row in lista" :key="row.id">
              <td
                class="text-right"
                style="padding-left:2px;padding-right:2px;"
              >
                <!--src="row.foto == null ? (row.sexo == 'Niño' ? './../assets/avatar_niño.jpg':'./../assets/avatar_niña.jpg'):row.foto"-->
                <img
                  :src="row.foto"
                  width="50"
                  height="50"
                  v-on:click="subirFotoPerfil(row.id)"
                  alt="..."
                  title="Actualizar foto de perfil"
                  class="rounded-circle"
                  style="cursor:pointer"
                />
              </td>
              <td class="text-left" style="padding-left:0px;">
                <span                  
                  class="text-blue text-left pointer ml-2"
                  title="Ver el perfil del alumno"
                  v-on:click="verPerfil(row)"
                >
                  <span class="font-weight-bold">{{ row.nombre }}</span>
                  <span v-if="row.mostrar_nombre_carino"
                    >({{ row.nombre_carino }})</span
                  >
                  <!--<span class="text-danger">{{ row.adeuda ? `Adeuda $${formatPrice(row.total_adeudo)}` : "" }}</span>-->
                  <span class="text-danger">{{ row.adeuda ? `*` : "" }}</span>
                  <br/><span class="font-weight-normal hidden-xs ml-2 text-gray">{{ row.apellidos }}</span>                   
                  <br/><span class="font-weight-normal hidden-xs ml-2 text-dark">${{ formatPrice(row.costo_colegiatura) }} <span class="font-weight-normal hidden-xs text-gray">colegiatura</span></span>                                     
                  <!--<br v-if="row.adeuda" /><span v-if="row.adeuda" class="font-weight-bold ml-2 text-danger">${{ formatPrice(row.total_adeudo) }} <span class="font-weight-normal ">Adeuda</span></span>                                     -->
                  <br/>
                  <span v-if="row.hoy_cumpleanos" class="font-weight-normal hidden-xs ml-2" style="color:#D12693"> <i class="fa fa-birthday-cake " ></i> Cumpleaños hoy 🎉</span> 
                  <span v-else-if="row.mes_cumpleanos" class="font-weight-normal hidden-xs ml-2" style="color:#D12693" ><i class="fa fa-birthday-cake" ></i> Mes de Cumpleaños</span> 
                </span>
              </td>              
              <td>
                <span
                  :style="row.color ? 'background-color:' + row.color : ''"
                  class="badge badge-info text-wrap"
                  >{{ row.nombre_grupo }}</span
                >
              </td>
              <td>{{ row.hora_entrada_format }} - {{row.hora_salida_format}} </td>              
              <td class="text-center ">
                 <span v-if="row.adeuda" class="text-danger font-weight-bold pointer"  v-on:click="verPerfil(row)" >${{ formatPrice(row.total_adeudo) }}</span> 
                 <i v-else class="fa fa-check text-green" />
              </td>
              <td>
                <div class="btn-group" v-if="!row.adeuda">
                  <button
                    type="button"
                    class="btn btn-link text-gray"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-ellipsis-v"></i>
                  </button>
                  <div class="dropdown-menu bg-light">
                    <button
                      class="dropdown-item"
                      v-on:click="cambiarSucursal(row)"
                      title="Cambiar de sucursal."
                    >
                      <i class="fas fa-exchange-alt"></i>Cambiar de sucursal
                    </button>
                    <button
                      class="dropdown-item text-danger"
                      v-on:click="select(row, 'DELETE')"
                      title="Dar de baja el alumno."
                    >
                      <i class="fas fa-user-minus"></i> Iniciar Baja
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </table>
         <!-- Mensajes para la busqueda y carga-->
          <div v-if="criterioNombre != '' && lista.length == 0" class="mx-auto">
            <p class="text-muted ">Ningún resultado</p>
          </div>
          <div
            v-if="criterioNombre == '' && lista.length == 0 && !loader"
            class="mx-auto"
          >
            <p class="text-muted ">Oprime ENTER para listar todo</p>
          </div>
          <div v-if="loader" class="mx-auto">
            <Loader :loading="loader" :mini="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../controller/CatAlumnoController.js"></script>

<style scoped></style>
