
import URL from "../helpers/Urls";
import  CONSTANTES  from "../helpers/Constantes";


export default {
  name: "Login",
  props: {
    loading: true 
  },
  data() {
    return {
      input: {
        correo: "",
        password: "",
        mensajeToast: null
      },
      response: "",        
    };
  },
  mounted() {
    //console.log("iniciando login "+process.env.ROOT_API);
    console.log("URL BASE "+URL.LOGIN);
    this.$session.clear();

  },
  methods: {
    login() {
      console.log("login con rest ");

      if (!this.input.correo || !this.input.password) {
        //this.mensajeToast("Escribe tu usuario y tu clave.");
        this.$notificacion.error('Validación', 'Escribe tu usuario y clave de acceso.');
        return;
      }

      var data = { correo: this.input.correo, password: this.input.password };
      this.loading = true;
      this.$http.post(URL.LOGIN, data).then(
        result => {
          console.log("En el login");          
          this.response = result.data;
         this.loading = false;
          if (this.response.auth) {
            this.$session.set("usuario_sesion", this.response);
            this.$session.set("jwt", this.response.token);
            console.log("JSON "+JSON.stringify(this.response));
            if(this.response.usuario.permiso_gerente){
              console.log("Mandar evento para admin");                            
              this.$root.$emit('loginEnter',CONSTANTES.EVENTO_LOGIN_ADMIN);
              this.$router.replace({ path: "/ReporteAdmin" });              
            }else{
              console.log("Mandar evento para usuario general");                            
              this.$root.$emit('loginEnter',CONSTANTES.EVENTO_LOGIN);
              this.$router.replace({ path: "/principal" });              
            }
            
          } else {            
            this.$notificacion.error('Login', 'No se encuentra el usuario.');            
          }
        },
        error => { //FIXME: modificar la contestacion del API

          this.loading = false;
          //console.log(JSON.stringify(error));
          if (!error.auth) {
            this.$notificacion.error('Login', 'El usuario o la clave son incorrectas.');            
          }
          //this.response = error;
        }
      );
    }
  }
};
