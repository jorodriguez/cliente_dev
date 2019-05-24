<template>
  <div class="perfil container">
    <div class="alert alert-info">{{mensaje}}</div>
    <div v-if="display==true" class="text-left">
      <div class="text-left">
        <router-link :to="{ name: 'CatAlumno', params: {} }">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>

      <div class="row center">
        <div class="col text-left">
          <img
            src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
            alt
            class="rounded-circle"
            width="75"
            height="75"
          >
          <p>
            {{alumno.nombre}}
            {{alumno.apellidos}}
          </p>
        </div>
        <div class="col text-right">DATA</div>
        <div class="w-100"></div>
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
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-contact"
                  role="tab"
                  aria-controls="pills-contact"
                  aria-selected="false"
                >Papá/Mamá</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-contact-tab"
                  data-toggle="pill"
                  href="#pills-familiar"
                  role="tab"
                  aria-controls="pills-familiar"
                  aria-selected="false"
                >Familiares</a>
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
                    v-model="alumno.formato_inscripcion.servicio_contratar"
                    class="form-control"
                    placeholder="Servicio"
                    required
                    autofocus
                  >
                    <option value="Guarderia" selected>Guardería</option>
                    <option value="Estancia">Estancia</option>
                    <option value="Kinder">Kinder</option>
                    <option value="Curso">Curso / Taller</option>
                    <option value="Curso">Taller</option>
                    <option value="Kinder">Kinder</option>
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
              <div
                class="tab-pane fade"
                id="pills-contact"
                role="tabpanel"
                aria-labelledby="pills-contact-tab"
              >
                <!-- DATOS DE FAMILIA -->
                <div class="form-group">
                  <label for="inputNombreMadre">Nombre de la Madre</label>
                  <input
                    id="inputNombreMadre"
                    type="text"
                    v-model="alumno.madre.nombre"
                    class="form-control"
                    placeholder="Nombre de la Madre"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="inputCelular">Celular</label>
                  <input
                    id="inputCelular"
                    type="text"
                    v-model="alumno.madre.celular"
                    class="form-control"
                    placeholder="Numero de celular"
                  >
                </div>
                <div class="form-group">
                  <label for="inputFechaNacimiento">Fecha Nacimiento</label>
                  <input
                    id="inputFechaNacimiento"
                    type="date"
                    v-model="alumno.madre.fecha_nacimiento"
                    class="form-control"
                    placeholder="Fecha de Nacimiento"
                  >
                </div>
                <div class="form-group">
                  <label for="inputCorreoMadre">Correo</label>
                  <input
                    id="inputCorreoMadre"
                    type="email"
                    v-model="alumno.madre.correo"
                    class="form-control"
                    placeholder="Correo electronico"
                  >
                </div>
                <div class="form-group hidden d-none">
                  <label for="inputCorreo">Password</label>
                  <input
                    id="inputPasswordMadre"
                    type="password"
                    v-model="alumno.madre.password"
                    class="form-control"
                    visible="false"
                    placeholder="Password"
                  >
                </div>
                <div class="form-group hidden">
                  <label for="inputReligion">Réligion</label>
                  <input
                    id="inputReligion"
                    type="text"
                    v-model="alumno.madre.religion"
                    class="form-control"
                    placeholder="Religion"
                  >
                </div>

                <!-- PADRE -->
                <div class="form-group">
                  <label for="inputNombrePadre">Nombre del Padre</label>
                  <input
                    id="inputNombrePadre"
                    type="text"
                    v-model="alumno.padre.nombre"
                    class="form-control"
                    placeholder="Nombre del padre"
                    required
                  >
                </div>

                <div class="form-group">
                  <label for="inputCelularPadre">Celular</label>
                  <input
                    id="inputCelularPadre"
                    type="text"
                    v-model="alumno.padre.celular"
                    class="form-control"
                    placeholder="Celular"
                  >
                </div>
                <div class="form-group">
                  <label for="inputFechaNacimientoPadre">Fecha Nacimiento</label>
                  <input
                    id="inputFechaNacimientoPadre"
                    type="date"
                    v-model="alumno.padre.fecha_nacimiento"
                    class="form-control"
                    placeholder="Fecha de Nacimiento"
                  >
                </div>
                <div class="form-group">
                  <label for="inputCorreoPadre">Correo</label>
                  <input
                    id="inputCorreoPadre"
                    type="email"
                    v-model="alumno.padre.correo"
                    class="form-control"
                    placeholder="Correo"
                  >
                </div>
                <div class="form-group hidden d-none">
                  <label for="inputPasswordPadre">Password</label>
                  <input
                    id="inputPasswordPadre"
                    type="email"
                    v-model="alumno.padre.correo"
                    class="form-control"
                    placeholder="Password"
                  >
                </div>
                <div class="form-group hidden">
                  <label for="inputReligionPadre">Religion</label>
                  <input
                    id="inputReligionPadre"
                    type="text"
                    v-model="alumno.padre.religion"
                    class="form-control"
                    placeholder="Religion"
                  >
                </div>

                <!-- DATOS DE FAMILIA -->
              </div>
            </div>
            <button type="button" class="btn btn-lg btn-primary" v-on:click="modificar()">Guardar</button>
            </form>
          </div>
        
      </div>
      <div class="alert alert-info">{{mensaje}}</div>
    </div>

    <!-- EN CASO DE NO ENVIAR EL ID -->
    <div class="alert alert-warning" v-else-if="display==false">Es necesario seleccionar un alumno</div>
  </div>
</template>

<script>
import router from "@/router/index";
import AlumnoModel from "../models/AlumnoModel";
import FormatoModel from "../models/FormatoModel";

export default {
  name: "PerfilAlumno",
  data() {
    return {
      id: 0,
      alumno: AlumnoModel,
      listaGrupos: [],
      display: true,
      //uriTemp: "https://app-restexpres.herokuapp.com/alumnos",
      //uriTempGrupos: "https://app-restexpres.herokuapp.com/grupos",
      uriTemp: "http://localhost:5000/alumnos",
      uriTempGrupos: "http://localhost:5000/grupos",
      response: "",
      mensaje: "",
      sesion: {},
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

    if (this.id == undefined) {
      this.display = false;
      console.log("No se recibe ningun id de alumno ");
    } else {
      this.$http
        .get(this.uriTemp + "/id/" + this.id, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.alumno = result.data;
            if (this.alumno.padre == null) this.alumno.padre = {};

            if (this.alumno.madre == null) this.alumno.madre = {};

            if (this.alumno.formato_inscripcion == null)
              this.alumno.formato_inscripcion = {};
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
    }
  },
  methods: {
    //FIXME : pasar al servicio
    modificar() {
      console.log("Modificar el id " + this.alumno.id);
      this.mensaje = JSON.stringify(this.alumno);

      this.alumno.genero = this.usuarioSesion.id;

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
    }
  }
};
</script>

<style scoped>
</style>
