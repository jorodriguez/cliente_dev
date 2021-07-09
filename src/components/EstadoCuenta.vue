<template>
  <Popup id="popup_preview" :show_button_close="false">
    <div slot="header">
      Estado de cuenta
      <strong>{{this.alumno.nombre}} {{this.alumno.apellidos}}</strong>
    </div>
    <div slot="content">
      <div class="row justify-content-md-center">       
      
      </div>
    </div>
    <div slot="footer">
      <button class="btn btn-secondary" v-on:click="()=>{  }">Cancelar</button>
      <button class="btn btn-primary" v-on:click="()=>{  }">Enviar </button>
    </div>
  </Popup>
</template>

<script>
import Popup from "../controller/Popup";
import { operacionesApi } from "../helpers/OperacionesApi";
import { getUsuarioSesion } from "../helpers/Sesion";
import { filtrarNombreAlumno } from "../helpers/FiltarUtils";
import URL from "../helpers/Urls";
import Vue from "vue";
import ItemCapsulaAlumno from "../components_utils/ItemCapsulaAlumno";

export default {
  components: {
    Popup,
    ItemCapsulaAlumno
  },
  mixins: [operacionesApi],
  name: "estado-cuenta",
  props:["idAlumno"],
  data() {
    return {
      id:0,
      resultado: {},
      usuarioSesion: {},
      criterioNombre: "",
      estadoCuenta: null,
      loading:false
    };
  },
  mounted() {
    //this.id = this.$route.params.id;
    //console.log("@ide recibido " + this.id);
    //this.cargarAlumno();
  },
  methods: {
    onInit() {
      this.usuarioSesion = getUsuarioSesion();     
    },

    cargarEstadoCuenta() {
      if (this.id != 0) {
        this.loading = true;
        this.get(
          URL.ESTADO_CUENTA + "/" + this.id,
          result => {
            this.response = result.data;            
            if (this.response != null) {
              this.estadoCuenta = this.response;              
              this.loading = false;
            }
          }
        );
      } 
    },
    cargarAlumno() {
      this.get(URL.ALUMNOS_BASE + "/id/" + this.id, result => {
        this.alumno = result.data;        
      });
    },
    seleccionarAlumno(row) {
      console.log("seleccion " + JSON.stringify(row));
      this.alumno = row;
    },

    buscarPorNombre() {
      console.log("Buscar por nombre " + this.criterioNombre);
      //this.lista = filtrarNombreAlumno(this.criterioNombre, this.listaAlumnos);
    }   
  }
};
</script>