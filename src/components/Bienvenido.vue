
<template>
  <span id="bienvenido">
    <MenuSidebar></MenuSidebar>
    <div class="main-content">
      <MenuEncabezado />
      <Header />
      <div class="container-fluid">
        <div class="col-xl-12 mb-12 mb-xl-0">
          <vue-page-transition name="fade-in-up">          
          <router-view />
          </vue-page-transition>
        </div>
      </div>
    </div>    

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

