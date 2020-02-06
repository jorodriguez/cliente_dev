<template >
  <!-- Navbar -->
  <nav v-if="mostrarmenu" class="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
    <div class="bg-gradient-primary pb-6 pt-4 pt-md-2"> </div>
    <div class="container-fluid">
      <!-- Brand -->
      <a class="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block" href="./index.html">-</a>
      <div class="collapse navbar-collapse justify-content-end" id="navigation">
        <div class="nav navbar-nav mr-auto">        
          <div class="dropdown mr-1">
            <a href="#" class="dropdown-toggle "  id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-offset="10,20">
              <i class="nc-icon nc-planet"></i>
              <span class="badge badge-pill badge-warning text-white">5</span>
              
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuOffset">
              <a class="dropdown-item" href="#">Notification 1</a>
              <a class="dropdown-item" href="#">Notification 2</a>
              <a class="dropdown-item" href="#">Notification 3</a>
              <a class="dropdown-item" href="#">Notification 4</a>              
            </div>
          </div>          
        </div>
      </div>

      <!-- User -->
      <ul class="navbar-nav align-items-center d-none d-md-flex">
        <li class="nav-item dropdown">
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
                <span class="mb-0 text-sm font-weight-bold">{{usuarioSesion.nombre}}</span>
                <p class="text-sm">{{usuarioSesion.nombre_sucursal}}</p>
              </div>
              
              <div class="media-body ml-2 d-none d-lg-block">
                <button class="btn btn-danger btn-sm" @click="signout()"><i class="fa fa-sign-out-alt"></i></button>
              </div>
     
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>
            <a href="./examples/profile.html" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </a>
            <a href="./examples/profile.html" class="dropdown-item">
              <i class="ni ni-settings-gear-65"></i>
              <span>Settings</span>
            </a>
            <a href="./examples/profile.html" class="dropdown-item">
              <i class="ni ni-calendar-grid-58"></i>
              <span>Activity</span>
            </a>
            <a href="./examples/profile.html" class="dropdown-item">
              <i class="ni ni-support-16"></i>
              <span>Support</span>
            </a>
            <div class="dropdown-divider"></div>
            <a href="#!" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import CONSTANTES from "../helpers/Constantes";
import IndicadorMensualidades from "../indicadores/IndicadorMensualidades";

export default {
  name: "sidebar-principal",
  components: { IndicadorMensualidades },
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
    this.mostrarmenu=false;
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

    this.revisarSesion();
  },
  methods: {
    signout() {
      console.log("Signout ");
      this.usuarioSesion = {};
      this.mostrarmenu = false;
      this.$session.clear();
      this.$root.$emit("LOGOUT", "LOGOUT");
      this.$router.push("/");
    }
  }
};
</script>
<style scoped>
</style>

