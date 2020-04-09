
import URL from "../helpers/Urls";
import CONSTANTES from "../helpers/Constantes";
import {setSession,setToken} from '../helpers/Sesion';
import {cargarSesion } from './LoginHelper';

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
    console.log("URL BASE " + URL.LOGIN);
    this.$session.clear();
    this.$root.$emit('LOGOUT', CONSTANTES.LOGOUT);

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
            cargarSesion(this.response)
            .then(path=>{
              console.log("PATH "+path);
              this.$router.push({ path: path });
            });
            /*
            setSession(this.response);
            setToken(this.response.token);           
           
            console.log("JSON " + JSON.stringify(this.response));
            if (this.response.usuario.permiso_gerente) {
              console.log("Mandar evento para admin");              
              //this.$root.$emit('loginEnter', CONSTANTES.EVENTO_LOGIN_ADMIN);
              this.$router.push({ path: "/ReporteAdmin" });
              //this.$router.replace({ path: "/ReporteAdmin" });              
            } else {
              console.log("Mandar evento para usuario general");              
              console.log("MENSAJE "+CONSTANTES.EVENTO_LOGIN);
              //this.$root.$emit('loginEnter', CONSTANTES.EVENTO_LOGIN);
              //this.$router.replace({ path: "/principal" });              
              this.$router.push({ path: "/principal" });
            }*/

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
