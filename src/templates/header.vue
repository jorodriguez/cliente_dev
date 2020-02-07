<template >

    <div class="bg-gradient-primary pb-6 pt-4 pt-md-2"> </div>

</template>

<script>
import CONSTANTES from "../helpers/Constantes";
import {usuarioSesion,token} from '../helpers/Sesion';

export default {
  name: "sidebar-principal",
  data() {
    return {
      usuarioSesion: {},
      mostrarmenu: false,
      revisarSesionPromise: null,
      revisarSesion: null
    };
  },
  mounted() {
    console.log("iniciando el template de menu");
    this.mostrarmenu= (usuarioSesion != null);
    
    /*this.sesion = this.$session.get("usuario_sesion");
    this.usuarioSesion = this.sesion.usuario;
    this.revisarSesionPromise = function() {
      this.sesion = this.$session.get("usuario_sesion");
      this.usuarioSesion = this.sesion.usuario;
      var thus = this;
      return new Promise(function(resolve, reject) {
        if (!thus.sesion || !thus.sesion.usuario) {
          //reject(false);
          console.log("no hay sesion ");
        } else {
          let usuarioSesion =
            thus.sesion.usuario != null && thus.sesion.usuario != undefined;
          console.log("sesion ok " + usuarioSesion);
          resolve(usuarioSesion);
        }
      });
    };

    this.revisarSesion = function() {
      this.revisarSesionPromise()
        .then(enSesion => {
          console.log("USUARIO EN SESION " + enSesion);
          this.mostrarmenu = enSesion;
        })
        .catch(e => {
          console.log("USUARIO SIN SESION " + e);
          this.mostrarmenu = false;
        });
    };

    this.$root.$on("loginEnter", text => {
      console.log("loginEnter %%%%%%%%%%%%%%%%%%%%%%%%%%%%% " + text);
      this.revisarSesion();
    });

    this.$root.$on("LOGOUT", text => {
      console.log("LOGOUT %%%%%%%%%%%%%%%%%%%%%%%%%LOGOUT " + text);
      this.mostrarmenu = false;
    });

    this.revisarSesion();*/
  },
  methods: {}
};
</script>
<style scoped>
</style>

