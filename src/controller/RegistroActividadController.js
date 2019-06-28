
import SesionHelper from "../helpers/SesionHelper";
import ActividadModel from "../models/ActividadModel";

export default {
  name: "Actividad",
  data() {
    return {
      usuarioSesion: {},
      sesion: {},
      response: "",
      actividad: ActividadModel,
      actividadSelecionada: {},
      listaActividades: [],
      listaTipoActividad: [],
      listaAlumnos: [],
      listaGrupos:[],
      loadFunction: null,
      loadFunctionAlumnos: null,
      
      uriTemp: "http://localhost:5000/actividad/catalogo_actividad",      
      uriTempAlumnos: "http://localhost:5000/alumnos",      
      uriTempAsistencia: "http://localhost:5000/asistencia",
           
           
      /*uriTemp: "https://api-ambiente-desarrollo.herokuapp.com/actividad/catalogo_actividad",
      uriTempAlumnos: "https://api-ambiente-desarrollo.herokuapp.com/alumnos",
      uriTempAsistencia: "https://api-ambiente-desarrollo.herokuapp.com/asistencia",     
      */

     /* uriTemp: "https://api-ambiente-produccion.herokuapp.com/actividad/catalogo_actividad",
      uriTempAlumnos: "https://api-ambiente-produccion.herokuapp.com/alumnos",
      uriTempAsistencia: "https://api-ambiente-produccion.herokuapp.com/asistencia",     
      */
    };
  },
  //FIXME: SESION
  mounted() {
    console.log("iniciando el componente ");

    //this.usuarioSesion = SesionHelper.mySesion.getSesion().usuario;
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    
    this.loadFunction = function() {
      this.$http
        .get(this.uriTemp, {
          headers: {
            "x-access-token": this.sesion.token
          }
        }).then(
          result => {
            this.response = result.data;
            console.log("Consulta de actividades" + this.response);
            if (this.response != null) {
              if (this.response.length > 0) {
                this.listaActividades = this.response[0].catalogo_actividades;
                console.log("  ===  " + JSON.stringify(this.listaActividades));                
              }
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
    continuar() {
      console.log("continuar ");
      
    }
  }
};