
import Vue from "vue";
import {getUsuarioSesion,clearSesion} from '../helpers/Sesion';

export default {
  name: "boton-logout",  
  template: `<small class="font-weight-bold h6">
  {{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}
<button
    type="button"       
    class="btn btn-sm btn-warning"     
    v-on:click="signout()">
    <i class="fas fa-power-off" v-on:click="signout()"></i>
</button>
</small>`,
  //props: [''],
  data() {
    return {
      usuarioSesion: {},
      sesion: {},
      mensajeToast: null,
      response: ""
    };
  },
  mounted() {
    console.log("iniciando el componente singout ");

    this.usuarioSesion = getUsuarioSesion();
  },
  methods: {
    signout() {
      console.log("Signout ");      
      clearSesion();
      this.$router.push("/");
    },
  }
};