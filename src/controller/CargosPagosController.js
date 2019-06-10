
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";

export default {
  name: "cargos-pagos",  
  props: ['idalumno'],
  data() {
    return {
      uriTempPagos: "http://localhost:5000/pagos",
      uriTempCargos: "http://localhost:5000/cargos",      
      usuarioSesion: {},
      sesion: {},      
      item: AlumnoModel,
      listaCargosAlumnos: [],
      listaCargos: [],
      listaPagos: [],
      listaSeleccionSalida: [],
      loadFunctionCargosAlumno:null,
      loadFunctionCatCargos:null,      
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente de pagos y cargos ");    
    this.sesion = this.$session.get("usuario_sesion");     

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    
    this.loadFunctionCargosAlumno = function() {
      this.$http
        .get(
          this.uriTempCargos +"/" +this.idalumno,            
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("====  " + JSON.stringify(this.response));
            if (this.response != null) {
              this.listaCargosAlumnos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    //Catalogos de cargos
    this.loadFunctionCatCargos = function() {
      this.listaCargos = [];
      this.$http
        .get(
          this.uriTempCargos,                         
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
              this.listaCargos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };
    this.loadFunctionCargosAlumno();
    this.loadFunctionCatCargos();
  },
  methods: {
    iniciarAgregarCargo() {
      console.log("iniciar agregar cargo ");
      
    },    
  },  
};