<template>
  <span>
  
    <button type="button" class="btn btn-primary btn-lg" v-on:click="nuevo()">Nuevo</button>    
      <div slot="header">Usuario</div>
      <div slot="content">
        <div class="container text-left">          
          <div class="form-group">
            <label for="nombreInput">
               
              <span class="text-danger">*</span>
            </label>            
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
        
        <button class="btn btn-primary" @click="guardar()" v-if="operacion == 'INSERT'">
          <Loader :loading="loader" :mini="true" />Guardar
        </button>
      </div>
    
  </span>
</template>

<script  >
import Datepicker from "vuejs-datepicker";
import URL from "../../helpers/Urls";
import { operacionesApi } from "../../helpers/OperacionesApi";
import { en, es } from "vuejs-datepicker/dist/locale";
import { getUsuarioSesion } from "../../helpers/Sesion";
import VueTimepicker from "vue2-timepicker";
import { AvisoModel, AvisoBuilder } from "../../models/AvisoModel";
import { VueGoodTable } from "vue-good-table";
import TABLE_CONFIG from "../../helpers/DatatableConfig";
import Popup from "../../controller/Popup";
import Loader from "../../components_utils/Loader";
import { validarDatosAviso } from "../../helpers/AvisoValidacion";
import * as moment from "moment";
import CONSTANTES from "../../helpers/Constantes";

export default {
  name: "nuevo-aviso",
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
      aviso: UsuarioModel,      
      usuarioMemento: UsuarioModel,
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      es: es,      
      loader: false,
      contador: 0,      
    };
  },
  mounted() {
    console.log("iniciando el componente aviso ");
    this.usuarioSesion = getUsuarioSesion();
    this.init();
  },
  methods: {
    init() {},
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.usuario = new UsuarioModel();      
      $("#popup_aviso").modal("show");
    },
    async guardar() {
      console.log("Insertar");

      console.log(JSON.stringify(this.aviso));
      if (!validarDatosAviso(this.usuario)) {
        console.log("No paso la validacion");
        return;
      }      
      this.aviso.co_empresa = this.usuarioSesion.co_empresa;
      this.aviso.genero = this.usuarioSesion.id;     

      this.post(URL.AVISOS, this.aviso, result => {
        console.log("this.response " + result.body);
        let respuesta = result.body;
        if (respuesta.estatus) {
          this.metodo_refrescar();
          $("#popup_aviso").modal("hide");
          this.$notificacion.info(
            "Registro de aviso",
            "Se registró el aviso."
          );
        } else {
          this.$notificacion.error("Mensaje", respuesta.mensaje);
        }
      });
    } 
  }
};
</script>

<style scoped>
</style>
