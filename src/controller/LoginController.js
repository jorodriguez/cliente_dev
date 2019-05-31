
export default {
    name: "Login",
    data() {
      return {
        input: {
          correo: "",
          password: "",
          mensajeToast:null
        },
        response: "",
        uriTemp: "https://app-restexpres.herokuapp.com/auth/login"
        //uriTemp: "http://localhost:5000/auth/login"
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
      async login() {
        console.log("login con rest ");
  
        if (!this.input.correo || !this.input.password) {
          this.mensajeToast("Escribe tu usuario y tu clave.");
          return;
        }
  
        var data = { correo: this.input.correo, password: this.input.password };
  
        await this.$http.post(this.uriTemp, data, { emulateJSON: true }).then(        
          result => {
            console.log("En el login");
            this.response = result.data;
            //this.mensajeToast(JSON.stringify(result));
            if (this.response.auth) {
              this.$session.set("usuario_sesion", this.response);
              this.$session.set("jwt", this.response.token);
              this.$router.push({ name: "PaginaPrincipal" });
            } else {
              this.mensajeToast("No se encuentra el usuario..");
              this.response = "No se encuentra el usuario..";
            }
          },
          error => { //FIXME: modificar la contestacion del API
            //console.log(JSON.stringify(error));
            if(!error.auth){
               this.mensajeToast("El usuario o la clave son incorrectas.");
            }          
            //this.response = error;
          }
        );
      }
    }
  };
  