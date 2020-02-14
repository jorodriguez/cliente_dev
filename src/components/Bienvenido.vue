
<template>
  <span id="bienvenido">
    <MenuSidebar></MenuSidebar>
    <div class="main-content">
      <MenuEncabezado />
      <Header />
      <div class="container-fluid">
        <div class="col-xl-12 mb-12 mb-xl-0">
          <router-view />
        </div>
      </div>
    </div>

  <!-- app principal -->
  <!--
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
    </Popup>-->

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

  </span>
</template>

<script>
import Popup from "../controller/Popup";
import MenuEncabezado from "../templates/menuEncabezado";
import MenuSidebar from "../templates/menuSidebar";
import Header from "../templates/header";
import MonitorRed from "../componentes_generales/MonitorRed";
import { usuarioSesion, clearSesion } from "../helpers/Sesion";

export default {  
  components: {
    Popup,
    MenuSidebar,
    MenuEncabezado,
    Header,
    MonitorRed
  },
  name: "Bienvenido",
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

