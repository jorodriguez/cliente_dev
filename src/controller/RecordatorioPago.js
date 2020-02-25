
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "enviar-recordatorio-pago",  
  mixins:[operacionesApi],
  template:`<button class="btn btn-primary" v-on:click="enviar()" > 
                <span  v-if="loading" class="spinner-border spinner-border-sm"></span>
                 Enviar  
           </button>`,
  props: ['id_alumno'],
  data() {
    return {            
      balanceAlumno : {total_adeudo:0},
      usuarioSesion: {},
      sesion: {},              
      loadFunctionBalanceAlumno:null,     
      respuesta:"",
      estatus:false,
      loaging:false,
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente balance de alumnos complemento de perfil ");        
   
    this.usuarioSesion = getUsuarioSesion();
    /*this.$root.$on('actualizacionPorCargoEvent', (text) => {
      console.log("ACTUALIZACION POR CARGO NUEVO");
      this.loadFunctionBalanceAlumno();
    });*/
        
  },
  methods: {
      enviar(){                          
        this.loading = true;
        this.get(
          URL.ENVIAR_RECORDATORIO_PAGO_ALUMNO+"/"+this.id_alumno,
          
          (result) => {          
            console.log("result.data "+JSON.stringify(result.data));
            if (result.data != null) {                           
              this.respuesta = result.data.respuesta;
              this.estatus = result.data.estatus;
              this.loading = false;
            }
          }
        );
      }
  },  
};