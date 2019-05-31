import router from "@/router/index";
import AlumnoModel from "../models/AlumnoModel";
import FormatoModel from "../models/FormatoModel";

export default {
  name: "PerfilAlumno",
  data() {
    return {
      id: 0,
      alumno: AlumnoModel,      
      listaGrupos: [],
      display: true,
      uriTemp: "https://app-restexpres.herokuapp.com/alumnos",
      uriTempGrupos: "https://app-restexpres.herokuapp.com/grupos",
      //uriTemp: "http://localhost:5000/alumnos",
      //uriTempGrupos: "http://localhost:5000/grupos",
      response: "",
      mensaje: "",
      sesion: {},
      usuarioSesion: {}
    };
  },
  mounted() {
    console.log("iniciando el componente Perfil alumno");

    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }

    this.usuarioSesion = this.sesion.usuario;

    this.id = this.$route.params.id;

    if (this.id == undefined) {
      this.display = false;
      console.log("No se recibe ningun id de alumno ");
    } else {
      this.$http
        .get(this.uriTemp + "/id/" + this.id, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.alumno = result.data;
          },
          error => {
            console.error(error);
          }
        );
      //grupos
      //traer grupos

      this.$http
        .get(this.uriTempGrupos, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;
            if (this.response != null) {
              this.listaGrupos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    }
  },
  methods: {
    //FIXME : pasar al servicio
    modificar() {
      console.log("Modificar el id " + this.alumno.id);
      this.$http
        .put(this.uriTemp + "/" + this.alumno.id, {alumno:this.alumno,formato:this.formato}, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.mensaje = "Se actualizaron los datos del alumno.";
            }
          },
          error => {
            console.error(error);
          }
        );
    }
  }
};