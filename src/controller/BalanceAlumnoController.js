
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";

export default {
  name: "balance-alumno",  
  mixins:[operacionesApi],
  template:'<span> {{ balanceAlumno.total_adeudo }} </span>',
  props: ['idalumno'],
  data() {
    return {      
      balanceAlumno : {total_adeudo:0},
      usuarioSesion: {},
      sesion: {},              
      loadFunctionBalanceAlumno:null,     
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente balance de alumnos complemento de perfil ");    
    console.log(" == > alumnos "+this.idalumno);
    this.sesion = this.$session.get("usuario_sesion");
       
    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    
    this.loadFunctionBalanceAlumno = function() {

      this.get(
        URL.BALANCE_BASE +"/" +this.idalumno,
        this.sesion.token,
        (result) => {
          this.response = result.data;            
          if (this.response != null) {
            this.balanceAlumno = this.response;
          }
        }
      );
    
    };    

    this.$root.$on('actualizacionPorCargoEvent', (text) => {
      console.log("ACTUALIZACION POR CARGO NUEVO");
      this.loadFunctionBalanceAlumno();
    });
    this.loadFunctionBalanceAlumno();
  },
  methods: {
      
  },  
};