
import Vue from "vue";

export default {
  name: "balance-alumno",  
  template:'<span> {{ balanceAlumno.total_adeudo }} </span>',
  props: ['idalumno'],
  data() {
    return {      
      uriTempBalance: "http://localhost:5000/balance",      
      //uriTempBalance: "https://api-ambiente-produccion.herokuapp.com/balance",            
      //uriTempBalance: "https://api-ambiente-desarrollo.herokuapp.com/balance",            
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
      this.$http
        .get(
          this.uriTempBalance +"/" +this.idalumno,            
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("BALANCE====  " + JSON.stringify(this.response));
            if (this.response != null) {
              this.balanceAlumno = this.response;
            }
          },
          error => {
            console.error(error);
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