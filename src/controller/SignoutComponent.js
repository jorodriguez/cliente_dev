
import Vue from "vue";

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
  props: [''],
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

    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
  },
  methods: {
    signout() {
      console.log("Signout ");
      this.$session.clear();
      this.$router.push("/");
    },
  }
};