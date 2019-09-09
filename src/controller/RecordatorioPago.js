
import Vue from "vue";

import URL from "../helpers/Urls";

export default {
  name: "enviar-recordatorio-pago",  
  template:`<button class="btn btn-primary" v-on:click="enviar()" > 
                <span  v-if="loading" class="spinner-border spinner-border-sm"></span>
                 Enviar  
           </button>`,
  props: ['id_alumno'],
  data() {
    return {      
      //uriTempBalance: "http://localhost:5000/balance",           
      //uriTempBalance: "https://api-ambiente-desarrollo.herokuapp.com/balance",            
      //uriTempBalance: "https://api-ambiente-produccion.herokuapp.com/balance",            
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
    this.sesion = this.$session.get("usuario_sesion");       
    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    /*this.$root.$on('actualizacionPorCargoEvent', (text) => {
      console.log("ACTUALIZACION POR CARGO NUEVO");
      this.loadFunctionBalanceAlumno();
    });*/
        
  },
  methods: {
      enviar(){                  
        this.loading = true;
          this.$http
          .get(
            URL.ENVIAR_RECORDATORIO_PAGO_ALUMNO+"/"+this.id_alumno,
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          )
          .then(
            result => {          
              console.log("result.data "+JSON.stringify(result.data));
              if (result.data != null) {                           
                this.respuesta = result.data.respuesta;
                this.estatus = result.data.estatus;
                this.loading = false;
              }
            },
            error => {
              console.error(error);
              this.loading = false;
            }
          );

      }
  },  
};