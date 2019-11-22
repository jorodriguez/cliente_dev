
<template>
  <div id="app">
    <span style="aligng:left">
      <MonitorRed></MonitorRed>
    </span>
    
    <button
      id="id_notificador_principal"
      type="button"
      class="btn btn-link btn-small hide"
      data-toggle="modal"
      data-target="#detalle_notificacion_principal"
    >
      <!--<span class="spinner-border" > </span>  -->
      <span id="texto_notificador_principal"></span>
    </button>
   <!--
        <router-link to="/CatAlumno" class="dash-nav-item">Alumnos</router-link>
        <router-link to="/Asistencia" class="dash-nav-item">Asistencias</router-link>
        <router-link to="/ReporteAsistencias" class="dash-nav-item">Lista Asistencias</router-link>
      --> 
    

     <!-- <MenuPrincipal></MenuPrincipal>-->
    
    <router-view />

    <!-- app principal -->
    <Popup id="detalle_notificacion_principal" size="md" show_button_close="true">
      <div slot="header">
        <p id="encabezado_notificador_principal"></p>
      </div>
      <div slot="content">
        <div class="row">
          <div class="container overflow-auto">
            <div id="cuerpo_notificador_principal"></div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>

    <!-- popup de expiracion de sesion -->
    <Popup id="popup_expiracion_sesion" size="md" show_button_close="false">
      <div slot="header">
        <p id="id_header_popup_expiracion_sesion"></p>
      </div>
      <div slot="content">
        <div class="row">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-5 text-right">
                <i class="fas fa-user-clock fa-5x"></i>
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
/*
$(function () {
  $('[data-toggle="popover"]').popover()
})
;*/
import Popup from "./controller/Popup";
import MenuPrincipal from "./components/navBar";
import MonitorRed from "./componentes_generales/MonitorRed";

export default {
  components: {
    Popup,MenuPrincipal,MonitorRed
  },
  name: "App",
  methods: {
    signout() {
      console.log("Signout ");
      this.$session.clear();
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
  color: #2c3e50;
  margin-top: 10px;
}
</style>
