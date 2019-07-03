
export default {
  name: "Login",
  props: {
    loading: { type: Boolean }
  },
  data() {
    return {
      input: {
        correo: "",
        password: "",
        mensajeToast: null
      },
      response: "",
      uriTemp: "http://localhost:5000/auth/login"
    
      //uriTemp: "https://api-ambiente-desarrollo.herokuapp.com/auth/login"
      //uriTemp: "https://api-ambiente-produccion.herokuapp.com/auth/login"
    };
  },
  mounted() {
    console.log("iniciando login ");
    this.$session.clear();
    //toast
    this.mensajeToast = mensaje => {
      $("#toast_msg").text(mensaje);
      $("#toast_id").toast("show");
    };
  },
  methods: {
    login() {
      console.log("login con rest ");

      if (!this.input.correo || !this.input.password) {
        this.mensajeToast("Escribe tu usuario y tu clave.");
        return;
      }

      var data = { correo: this.input.correo, password: this.input.password };

      this.$http.post(this.uriTemp, data).then(
        result => {
          console.log("En el login");
          this.response = result.data;
          if (this.response.auth) {
            this.$session.set("usuario_sesion", this.response);
            this.$session.set("jwt", this.response.token);
            console.log("JSON "+JSON.stringify(this.response));
            if(this.response.usuario.permiso_gerente){
              this.$router.replace({ path: "/ReporteAdmin" });
            }else{
              this.$router.replace({ path: "/principal" });
            }
            
          } else {
            this.mensajeToast("No se encuentra el usuario..");
            this.response = "No se encuentra el usuario..";
          }
        },
        error => { //FIXME: modificar la contestacion del API
          //console.log(JSON.stringify(error));
          if (!error.auth) {
            this.mensajeToast("El usuario o la clave son incorrectas.");
          }
          //this.response = error;
        }
      );
    }
  }
};
