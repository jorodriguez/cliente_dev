<template >
  <nav   
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light "    
    style="background-color:powderblue;"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!-- Toggler -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#sidenav-collapse-main"
        aria-controls="sidenav-main"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Brand -->
      <router-link to="/Principal" class="navbar-brand pt-0">
        <img src="../assets/magic.jpeg" class="rounded-lg" width="150" height="150" />
      </router-link>

      <!-- User -->
      <ul class="nav align-items-center d-md-none">
        <li class="nav-item dropdown">
          <a
            class="nav-link nav-link-icon"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="ni ni-bell-55"></i>
          </a>
          <div
            class="dropdown-menu dropdown-menu-arrow dropdown-menu-right"
            aria-labelledby="navbar-default_dropdown_1"
          >
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link"
            href="#"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <!--<img alt="Image placeholder" src="./assets/img/theme/team-1-800x800.jpg-->
              </span>
            </div>
          </a>
          <div class="dropdown-menu dropdown-menu-arrow dropdown-menu-right">
            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome!</h6>
            </div>

            <div class="dropdown-divider"></div>
            <a href="#!" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </div>
        </li>
      </ul>
      <!-- Collapse -->
      <div class="collapse navbar-collapse" id="sidenav-collapse-main">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <img src="../assets/magic.jpeg" class="rounded-lg" width="90" height="100" />
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                data-toggle="collapse"
                data-target="#sidenav-collapse-main"
                aria-controls="sidenav-main"
                aria-expanded="false"
                aria-label="Toggle sidenav"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <!--
        <form class="mt-4 mb-3 d-md-none">
          <div class="input-group input-group-rounded input-group-merge">
            <input
              type="search"
              class="form-control form-control-rounded form-control-prepended"
              placeholder="Search"
              aria-label="Search"
            />
            <div class="input-group-prepend">
              <div class="input-group-text">
                <span class="fa fa-search"></span>
              </div>
            </div>
          </div>
        </form>-->
        <!-- Navigation -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/CatAlumno" class="nav-link">
              <i class="fa fa-list-ul text-purple"></i> Alumnos
            </router-link>
            <!--<a class="nav-link" href="./examples/icons.html">
              <i class="ni ni-planet text-blue"></i> Icons
            </a>-->
          </li>
          <li class="nav-item">
            <router-link to="/Asistencia" class="nav-link">
              <i class="fa fa-child text-blue"></i> Entrada de Alumnos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Principal" class="nav-link">
              <i class="fa fa-home text-purple"></i> Salida Alumnos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/Gastos" class="nav-link">
              <i class="fa fa-cash-register text-blue"></i> Gastos
            </router-link>
          </li>
        </ul>
        <!-- Divider -->
        <hr class="my-3" />
        <!-- Heading -->
        <h6 class="navbar-heading text-muted"></h6>

        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <router-link
              to="/AsistenciasUsuarios"
              class="btn btn-block btn-danger"
              style="background-color:#ea0075"
            >Asistencia/Miss</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item active active-pro">
            <a class="nav-link" href="./examples/upgrade.html">
              <i class="ni ni-send text-dark"></i> V.0.1
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import CONSTANTES from "../helpers/Constantes";
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "menu-principal",
  components: {},
  data() {
    return {      
      usuarioSesion: null,      
      revisarSesionPromise: null,
      revisarSesion: null
    };
  },
  mounted() {
    console.log("iniciando el template de menu");
    this.usuarioSesion = getUsuarioSesion() ;
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
       this.usuarioSesion = {};
      this.mostrarmenu = false;
      this.$session.clear();
      this.$router.push("/");      
    });

    this.revisarSesion();*/
  },
  methods: {
    
  }
};
</script>
<style scoped>
</style>

