
<template>
  <div id="app">
    <notifications group="notificacion_principal"></notifications>

    <span class="text-left">
      <MonitorRed></MonitorRed>
    </span>
     <vue-page-transition name="flip-x">
        <router-view />
     </vue-page-transition>

     <!-- popup de expiracion de sesion -->
    <Popup id="popup_expiracion_sesion" size="md" show_button_close="false">
      <div slot="header">
        <p id="id_header_popup_expiracion_sesion"></p>
      </div>
      <div slot="content">
        <div class="ro">
          <div class="cotainer">
            <div class="row justify-content-center">
              <div class="col-5 text-right">
                <i id=id_icono_popup_expiracion_sesion></i>
              </div>
              <div class="col text-left">
                <h2>
                  <p id="id_mensaje_popup_expiracion_sesion" />
                </h2>
                <h3>
                  <p id="id_mensaje_popup_expiracion_sesion"></p>
                </h3>
                <button type="button" class="btn btn-link" v-on:click="signout()">
                  <p v-on:click="signout()">Click aquí para iniciar sesión</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>    
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
