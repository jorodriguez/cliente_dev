<template >
  <span v-if="mostrarmenu">
    <nav class="navbar navbar-expand-lg fixed-top rounded shadow-sm">
      <a class="navbar-brand mr-auto mr-lg-0" href="#">Magic</a>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Dashboard
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Notifications</a>
          </li> 
          <li class="nav-item">
            <a class="nav-link" href="#">Profile</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Switch account</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="dropdown01"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Settings</a>
            <div class="dropdown-menu" aria-labelledby="dropdown01">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <!--<input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          -->
        </form>
      </div>
    </nav>

<!-- posible template
https://github.com/ColorlibHQ/gentelella -->

    <!-- Sidebar -->
    <!--<div class="bg-light border-right" id="sidebar-wrapper">
      <div class="sidebar-heading">Start Bootstrap</div>
      <div class="list-group list-group-flush">
        <a href="#" class="list-group-item list-group-item-action bg-light">Dashboard</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Shortcuts</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Overview</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Events</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Profile</a>
        <a href="#" class="list-group-item list-group-item-action bg-light">Status</a>
      </div>
    </div>-->
    <!-- /#sidebar-wrapper -->
  </span>
</template>

<script>
import CONSTANTES from "../helpers/Constantes";

export default {
  name: "menu-principal",
  components: {},
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

    this.revisarSesionPromise = function() {
      this.sesion = this.$session.get("usuario_sesion");
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
      this.mostrarmenu = false;
    });

    this.revisarSesion();
  },
  methods: {}
};
</script>
<style scoped>
</style>

