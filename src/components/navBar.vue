<template >
  <nav v-if="mostrarmenu" class="navbar navbar-expand-lg fixed-top bg-info">
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
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <!--<input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        -->
      </form>
    </div>
  </nav>
</template>

<script>


import CONSTANTES from "../helpers/Constantes";


export default {
  name: "menu-principal",
  components: {},
  data() {
    return {
      usuarioSesion: {},
      mostrarmenu: Boolean,
      revisarSesion: null
    };
  },
  mounted() {
    console.log("iniciando el template de menu");

    this.revisarSesion = () => {
      this.sesion = this.$session.get("usuario_sesion");
      this.mostrarmenu = true;
      if (!this.sesion || !this.sesion.usuario) {
        console.log("No tiene sesion");
        this.mostrarmenu = false;
      }
    };

    this.$root.$on(CONSTANTES.EVENTO_LOGIN, text => {
      console.log("ACTUALIZACION POR LOGIN OK "+text);
      this.revisarSesion();
    });
     this.revisarSesion();
  },
  methods: {}
};
</script>
<style scoped>
</style>

