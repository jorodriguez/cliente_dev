
<template>
  <div id="app">
    <notifications group="notificacion_principal"></notifications>

    <span class="text-left">
      <MonitorRed></MonitorRed>
    </span>
    <router-view />
  </div>
</template>

<script>
import Popup from "./controller/Popup";
import MonitorRed from "./componentes_generales/MonitorRed";
import { usuarioSesion, clearSesion } from "./helpers/Sesion";

export default {
  components: {
    Popup,   
    MonitorRed
  },
  name: "App",
  methods: {
    signout() {
      console.log("Signout ");
      //this.$session.clear();
      clearSesion();
      $("#popup_expiracion_sesion").modal("hide");
      this.$router.push("/");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50; */
}
</style>
