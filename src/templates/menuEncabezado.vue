<template >
  <!-- Navbar -->
  <nav id="navbar-main" class="navbar navbar-top navbar-expand-md navbar-dark fixed-top">
    <div class="container-fluid">
      <!-- Brand -->
      <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="#"></a>
      <!-- Form -->
      <div class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
        <div class="form-group mb-0"></div>
      </div>

      <!--  notificaciones -->

      <div class="nav-item dropdown">
        <a
          class="nav-link pr-0"
          href="#"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <IndicadorMensualidades />          
        </a>
        <!--
          <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Notificaciones</h6>
            </div>
            <a class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>Mi Perfil</span>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="signout()">
              <i class="fa fa-sign-out-alt"></i>
              <span class="text-red">Salir</span>
            </a>
          </div>
        -->
      </div>

      <!-- notificaciones -->

      <!-- User -->
      <div class="navbar-nav align-items-center d-none d-md-flex">
        <div class="nav-item dropdown">
          <a
            class="nav-link pr-0"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <i class="fa fa-2x fa-smile-wink"></i>
                <!--<img alt="Image placeholder" src="./assets/img/theme/team-4-800x800.jpg" />-->
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-xs font-weight-bold">
                  <Loader :loading="loader"/>
                   {{usuarioSesion.nombre}}
                  </span>
                <p class="text-xs">{{usuarioSesion.nombre_sucursal}}</p>
              </div>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Hola!</h6>
            </div>
            <a class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>Mi Perfil</span>
            </a>
            <CambioSucursal />
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" @click="signout()">
              <i class="fa fa-sign-out-alt"></i>
              <span class="text-red">Salir</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import CONSTANTES from "../helpers/Constantes";
import IndicadorMensualidades from "../indicadores/IndicadorMensualidades";
import CambioSucursal from "./CambioSucursal";
import { getUsuarioSesion, clearSesion } from "../helpers/Sesion";
import Loader from '../components_utils/Loader';

export default {
  name: "sidebar-principal",
  components: { IndicadorMensualidades, CambioSucursal },
  data() {
    return {
      usuarioSesion: {},
      revisarSesionPromise: null,
      revisarSesion: null,
      loader:false
    };
  },
  mounted() {
    console.log("iniciando el template de menu");
    this.usuarioSesion = getUsuarioSesion();
    this.$root.$on("CAMBIO_SUCURSAL", text => {
      console.log("CAMBIO_SUCURSAL en MENU ENCABEZADO");
      let message = text;
      this.loader=true;
      this.usuarioSesion = getUsuarioSesion();
      this.init();            
    });
  },
  methods: {
    init() {
      this.loader=false;
    },
    signout() {
      console.log("Signout ");
      this.usuarioSesion = null;
      //this.$session.clear();
      clearSesion();
      this.$root.$emit("LOGOUT", "LOGOUT");
      this.$router.push("/Login");
    }
  }
};
</script>
<style scoped>
</style>

