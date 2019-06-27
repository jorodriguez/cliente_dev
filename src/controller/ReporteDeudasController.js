
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";

export default {
  name: "Asistencia",
  data() {
    return {  
      uriTemp: "http://localhost:5000/asistencia",       
      //uriTemp:'https://api-ambiente-desarrollo.herokuapp.com/asistencia',
      //uriTemp:'https://api-ambiente-produccion.herokuapp.com/asistencia',
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      lista: [],
      listaSeleccion: [],     
      listaSeleccionSalida: [],
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente reporte deudas ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    
    this.loadFunction = function() {
      this.$http
        .get(
          this.uriTemp +
            "/alumnos_por_recibidos" +
            "/" +
            this.usuarioSesion.co_sucursal,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("Consulta " + this.response);
            if (this.response != null) {
              this.lista = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };   
    this.loadFunction();
   
  },
  methods: {

   }  
};