<template>
  <span>
    <Loader :loading="loader" />
    <button
      type="button"
      class="btn btn-outline-primary btn-sm"
      title="Modificar registro"
      v-on:click="seleccionar('EDIT')"
      :disabled="loader_edit"
    >
      <Loader :loading="loader_edit" :mini="true" />
      <i class="fas fa-edit"></i>
    </button>
    <button
      type="button"
      class="btn btn-outline-danger btn-sm"
      :title="'Eliminar registro de la maestra '"
      v-on:click="seleccionar('DELETE')"
      :disabled="loader_eliminar"
    >
      <Loader :loading="loader_eliminar" :mini="true" />
      <i class="fas fa-trash-alt"></i>
    </button>

    <Popup :id="'popup_usuario_'+id_popup_edit" :show_button_close="false" size="md">
      <div slot="header">Usuario</div>
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
          <div class="form-group">
            <label for="correoInput">
              Correo
              <span class="text-primary">(opcional)</span>
            </label>
            <input
              id="correoInput"
              type="email"
              v-model="usuario.correo"
              class="form-control"
              placeholder="micorreo@ejemplo.com"
            />
          </div>

          <div class="form-group">
            <label for="sueldoMensualInput">
              Sueldo Mensual
              <span class="text-danger">*</span>
            </label>
            <input
              id="sueldoMensualInput"
              type="number"
              v-model="usuario.sueldo_mensual"
              class="form-control"
              placeholder="Sueldo mensual"
              required
            />             
          </div>

          <div class="row">
            <div class="col">
              <label>
                Hora Entrada
                <span class="text-danger">*</span>
              </label>
              <vue-timepicker
                v-model="usuario.hora_entrada"
                :minute-interval="15"
                :hour-range="[[7, 20]]"
                :hide-disabled-hours="true"
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
              <vue-timepicker
                v-model="usuario.hora_salida"
                :min="usuario.hora_entrada"
                :minute-interval="15"
                :hour-range="[[7, 20]]"
                :hide-disabled-hours="true"
                hour-label="hora"
                minute-label="minuto"
                format="HH:mm"
                placeholder="00:00"
              ></vue-timepicker>
            </div>
          </div>
          <!--</ValidationObserver>-->
        </div>
      </div>
      <div slot="footer">
        <button
          class="btn btn-secondary"
          @click="cancelar()"
          v-if="operacion == 'EDIT' || operacion == 'INSERT'"
        >Cerrar</button>
        <button class="btn btn-primary" @click="guardar()" v-if="operacion == 'INSERT'">Guardar</button>
        <button
          class="btn btn-primary"
          @click="modificar()"
          v-if="operacion == 'EDIT'"
          :disabled="loader_edit"
        >
          <Loader :loading="loader_edit" :mini="true" />Modificar
        </button>
      </div>
    </Popup>

    <Popup :id="'popup_baja_'+id_popup_baja" show_button_close="true" size="md">
      <div slot="header">Acceso al Sistema</div>
      <div slot="content">
        <div class="container text-left">
          <p class="text-danger">
            Con la siguiente acción se desactivara todo acceso y uso en el sistema de
            <strong>{{usuario.nombre}}</strong>.
          </p>
          <label>
            Fecha de Baja
            <span class="text-danger">*</span>
          </label>
          <datepicker
            name="fechaBaja"
            v-model="datosBaja.fecha_baja"
            input-class="form-control"
            :disabled-dates="{from:new Date()}"
            :bootstrap-styling="true"
            :language="es"
            required
          ></datepicker>
          <div class="form-group">
            <label>Escriba algúna observación</label>
            <textarea class="form-control" v-model="datosBaja.motivo_baja" rows="3"></textarea>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-danger" :disabled="loader_eliminar" @click="eliminar()">
          <Loader :loading="loader_eliminar" :mini="true" />Confirmar Baja
        </button>
      </div>
    </Popup>
  </span>
</template>

<script  >
import Datepicker from "vuejs-datepicker";
import URL from "../../helpers/Urls";
import { operacionesApi } from "../../helpers/OperacionesApi";
import { en, es } from "vuejs-datepicker/dist/locale";
import { getUsuarioSesion } from "../../helpers/Sesion";
import VueTimepicker from "vue2-timepicker";
import { UsuarioModel, UsuarioBuilder } from "../../models/UsuarioModel";
import { VueGoodTable } from "vue-good-table";
import TABLE_CONFIG from "../../helpers/DatatableConfig";
import Popup from "../../controller/Popup";
import Loader from "../../components_utils/Loader";
import { validarDatosUsuario } from "../../helpers/UsuarioValidacion";
import * as moment from "moment";
import CONSTANTES from "../../helpers/Constantes";

export default {
  name: "opciones-usuario",
  mixins: [operacionesApi],
  props: ["usuario_value", "metodo_refrescar", "id_usuario", "buscar"],
  components: {
    Datepicker,
    VueTimepicker,
    Popup,
    Loader
  },
  data() {
    return {
      usuario: UsuarioModel,
      usuarioMemento: UsuarioModel,
      datosBaja: { motivo_baja: "", fecha_baja: null },
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      es: es,
      registrarCorreo: false,
      TABLE_CONFIG: TABLE_CONFIG,
      loader_eliminar: false,
      loader_edit: false,
      loader: false,
      contador: 0,
      rangoHora: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      id_popup_baja: "",
      id_popup_edit: ""
    };
  },
  mounted() {
    console.log("iniciando el componente usuario ");
    this.usuarioSesion = getUsuarioSesion();
    this.init();
  },
  methods: {
    init() {
      console.log("Init " + JSON.stringify(this.usuario_value));
      this.id_popup_baja = this.nombreRandom();
      this.id_popup_edit = this.nombreRandom();

      if (this.usuario_value == null || this.usuario_value == undefined) {
        this.usuario = new UsuarioModel();
      } else {
        this.usuario = Object.assign({}, this.usuario_value);
      }
    },

    buscarId() {
      this.loader = true;
      this.get(URL.USUARIO_BUSCAR_ID + "/" + this.id_usuario, result => {
        console.log("Consulta " + JSON.stringify(result.body));
        this.loader = false;
        if (result.body != null) {
          this.usuario = result.body;
        }
      });
    },
    modificar() {
      console.log("Modificar el id " + this.usuario.nombre);

      if (!validarDatosUsuario(this.usuario)) {
        console.log("No paso la validacion");
        return;
      }

      this.usuario.co_sucursal = this.usuarioSesion.co_sucursal;
      this.usuario.genero = this.usuarioSesion.id;

      this.loader_edit = true;

      //this.put(URL.USUARIO_BASE + "/" + this.usuario.id,
      this.put(URL.USUARIO_BASE, this.usuario, result => {
        if (result != null) {
          console.log("" + JSON.stringify(result.body));
          let respuesta = result.body;
          if (respuesta.estatus) {
            this.$notificacion.info(
              "Modificación de usuario",
              "Se actualizarón los datos del usuario."
            );
            //this.init();
            this.loader_edit = false;
            $("#popup_usuario_" + this.id_popup_edit).modal("hide");
            this.metodo_refrescar();
          } else {
            this.$notificacion.error("Mensaje", respuesta.mensaje);
          }
        }
      });
    },
    eliminar() {
      console.log("Modificar el id " + this.usuario.id);

      if (
        this.datosBaja.fecha_baja == null ||
        this.datosBaja.fecha_baja == undefined
      ) {
        this.$notificacion.error(
          "Fecha de baja",
          "Seleccione una fecha de baja"
        );
        return;
      }

      this.datosBaja.genero = this.usuarioSesion.id;
      this.loader_eliminar = true;
      this.put(
        URL.USUARIO_BASE + "/" + this.usuario.id,
        this.datosBaja,
        result => {
          let respuesta = result.body;
          if (respuesta.estatus) {
            this.$notificacion.error(
              "Registro de Baja de usuario",
              "Se registro la baja de usuario " + this.usuario.nombre + "."
            );
            this.loader_eliminar = false;
            $("#popup_baja_" + this.id_popup_baja).modal("hide");
            //this.init();
            this.metodo_refrescar();
          } else {
            this.$notificacion.error("Mensaje", respuesta.mensaje);
          }
        }
      );
    },
    seleccionar(operacion) {
      console.log("fila seleccionada " + this.usuario);
      this.operacion = operacion;

      //this.usuario = Object.assign({}, this.usuario_value);

      this.usuarioMemento = Object.assign({}, this.usuario);

      if (this.operacion == "EDIT") {
        if (this.buscar == true) {
          this.buscarId();
        }

        $("#popup_usuario_" + this.id_popup_edit).modal("show");
      }
      if (this.operacion == "DELETE") {
        //validar si no esta en asistencia

        this.datosBaja = { motivo_baja: "", fecha_baja: new Date() };

        //this.$notificacion.warn('Baja de usuario', 'No es posible dar de baja el alumno por motivos de deuda activa.');
        $("#popup_baja_" + this.id_popup_baja).modal("show");
      }
      if (this.operacion === "ACCESO_SISTEMA") {
        $("#popup_acceso").modal("show");
      }
    },
    cancelar() {
      if (this.operacion == "EDIT" || this.operacion == "INSERT") {
        this.usuario = this.usuarioMemento;
        $("#popup_usuario_" + this.id_popup_edit).modal("hide");
      }
      if (this.operacion == "DELETE") {
        $("#popup_baja_" + this.id_popup_baja).modal("hide");
      }
      if (this.operacion === "ACCESO_SISTEMA") {
        $("#popup_acceso").modal("hide");
      }
    },
    verDetalle(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      //$("#popup_eliminar_usuario").modal("show");
      //this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    },
    validarHoras(eventData) {
      let horaEntrada = moment({
        hour: this.usuario.hora_entrada.HH,
        minute: this.usuario.hora_entrada.mm
      });
      let horaSalida = moment({
        hour: this.usuario.hora_salida.HH,
        minute: this.usuario.hora_salida.mm
      });
      console.log(` ${horaEntrada} salida ${horaSalida}`);
      if (horaSalida <= horaEntrada) {
        Vue.prototype.$notificacion.error(
          "Hora de entrada y salida",
          "La hora de entrada es menos a la hora de salida."
        );
        return false;
      }
    },
    nombreRandom() {
      return Math.random()
        .toString(36)
        .substring(7);
    }
  }
};
</script>

<style scoped>
</style>
