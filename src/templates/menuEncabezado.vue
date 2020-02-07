<template >
  <!-- Navbar -->
  <nav class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
    <div class="container-fluid">
      <!-- Brand -->
      <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="#">User prof</a>
      <!-- Form -->
      <div class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
        <div class="form-group mb-0"></div>
      </div>
     
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
                <!--<img alt="Image placeholder" src="./assets/img/theme/team-4-800x800.jpg" />-->
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-xs font-weight-bold">{{usuarioSesion.nombre}}</span>
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
import { getUsuarioSesion, clearSesion } from "../helpers/Sesion";

export default {
  name: "sidebar-principal",
  components: { IndicadorMensualidades },
  data() {
    return {
      usuarioSesion: {},
      revisarSesionPromise: null,
      revisarSesion: null
    };
  },
  mounted() {
    console.log("iniciando el template de menu");
    this.usuarioSesion = getUsuarioSesion();
    /*this.mostrarmenu=false;
    this.sesion = this.$session.get("usuario_sesion");
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
      this.usuarioSesion = {};
      this.mostrarmenu = false;      
      this.$session.clear();
      this.$router.push("/");      
    });

    this.revisarSesion();*/
  },
  methods: {
    signout() {
      console.log("Signout ");
      this.usuarioSesion = null;
      //this.$session.clear();
      clearSesion();
      this.$root.$emit("LOGOUT", "LOGOUT");
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
</style>

