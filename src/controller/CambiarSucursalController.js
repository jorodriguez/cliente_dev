
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";

import {getUsuarioSesion } from '../helpers/Sesion'

export default {
  name: "cambiar-alumno-sucursal",
  mixins: [operacionesApi],
  data() {
    return {
      usuarioSesion: {},
      //sesion: {},
      listaSucursal: [],
      sucursal_seleccionada: { id: -1, nombre: "" },
      alumno: AlumnoModel,
      response: "",
      mensaje: "",
      loadFunction: null
    };
  },
  mounted() {
    console.log("iniciando el componente de cambio de sucursal ");
 

this.usuarioSesion = getUsuarioSesion();

    let id_alumno = this.$route.params.id_alumno;

    if (id_alumno == undefined) {
      console.log("No se recibe ningun id de alumno ");
      this.$router.push("/cat_alumno");

    } else {

      //cargar informacion del alumno

      this.get(
        URL.ALUMNOS_BASE + "/id/" + id_alumno,
        
        (result) => {
          this.alumno = result.data;
          this.loadFunction();
        }
      );
      this.loadFunction = function () {

        this.get(
          URL.SUCURSAL_BASE,
          
          (result) => {
            this.response = result.data;
            console.log("Consulta " + JSON.stringify(this.response));
            console.log("alumni " + JSON.stringify(this.alumno));
            if (this.response != null) {
              this.listaSucursal = this.response.filter(row => row.id != this.alumno.co_sucursal);
              console.log("Consulta " + JSON.stringify(this.listaSucursal));
            }
          }
        );
      };
    }
  },
  methods: {
    iniciarCambioSucursal() {      
      if (this.sucursal_seleccionada == null || this.sucursal_seleccionada == undefined || this.sucursal_seleccionada.id == -1) {        
        this.$notificacion.info("Selecciona la sucursal destino", "Es requerida la sucursal destino.");
        $("#id_sucursal_destino").focus();
      } else {
        $("#modal_confirmar_cambio_sucursal").modal("show");
      }

    },
    confirmarCambioSucursal() {

      this.put(
        URL.CAMBIO_SUCURSAL_BASE + "/" + this.alumno.id,
        {
          id_sucursal_origen: this.alumno.co_sucursal,
          id_sucursal_destino: this.sucursal_seleccionada.id,
          genero: this.usuarioSesion.id
        },
        
        (result) => {
          this.response = result.data;          
          if (this.response != 0) {
            console.log("Se cambio de sucursal sin problemas ");
            this.mensaje = "Se realizó el cambio de sucursal del Alumno(a) " + this.alumno.nombre + " " + this.alumno.apellidos
              + ", de " + this.alumno.nombre_sucursal + " a " + this.sucursal_seleccionada.nombre + ".";
              
          } else {
            console.log("Existieron problemas para cambiar de sucursal ");
            this.mensaje = `Existió un error al intentar realizar el cambio de sucursal, por favor contacta al equipo de soporte para notificar este detalle.`;
          }
          $("#modal_mensaje").modal("show");
        }
      );
      
    }
  }
};