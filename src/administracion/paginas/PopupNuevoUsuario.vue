<template>
  <span>
    <button type="button" class="btn btn-primary btn-lg" v-on:click="nuevo()">Nuevo</button>

    <Popup :id="'popup_usuario'" :show_button_close="true" size="md">
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
        
        <button class="btn btn-primary" @click="guardar()" v-if="operacion == 'INSERT'">
          <Loader :loading="loader" :mini="true" />Guardar
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
  props: ["metodo_refrescar"],
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
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      es: es,
      registrarCorreo: false,
      loader: false,
      contador: 0,
      rangoHora: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    };
  },
  mounted() {
    console.log("iniciando el componente usuario ");
    this.usuarioSesion = getUsuarioSesion();
    this.init();
  },
  methods: {
    init() {},
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.usuario = new UsuarioModel();
      this.usuario.hora_entrada = "";
      this.usuario.hora_salida = "";
      $("#popup_usuario").modal("show");
    },
    async guardar() {
      console.log("Insertar");

      console.log(JSON.stringify(this.usuario));
      if (!validarDatosUsuario(this.usuario)) {
        console.log("No paso la validacion");
        return;
      }
      console.log(
        `entrada ${this.usuario.hora_entrada} salida ${this.usuario.hora_entrada}`
      );
      this.usuario.co_sucursal = this.usuarioSesion.co_sucursal;
      this.usuario.genero = this.usuarioSesion.id;
      this.usuario.id_tipo_usuario = CONSTANTES.ID_TIPO_USUARIO_MAESTRA;

      this.post(URL.USUARIO_BASE, this.usuario, result => {
        console.log("this.response " + result.body);
        let respuesta = result.body;
        if (respuesta.estatus) {
          this.metodo_refrescar();
          $("#popup_usuario_" + this.usuario.id).modal("hide");
          this.$notificacion.info(
            "Registro de usuario",
            "Se registró el usuario."
          );
        } else {
          this.$notificacion.error("Mensaje", respuesta.mensaje);
        }
      });
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
    }
  }
};
</script>

<style scoped>
</style>
