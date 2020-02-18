
<template>
  <div id="app">
    <notifications group="notificacion_principal"></notifications>

    <span class="text-left">
      <MonitorRed></MonitorRed>
    </span>
     <transition name="component-fade" mode="out-in">
    <router-view />
     </transition>
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
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
