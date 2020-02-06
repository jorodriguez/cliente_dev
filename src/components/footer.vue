<template >
  <span v-if="mostrarmenu">
    <!-- Footer -->
    <footer class="footer">
      <div class="row align-items-center justify-content-xl-between">
        <div class="col-xl-6">
          <div class="copyright text-center text-xl-left text-muted">
            &copy; 2018
            <a
              href="https://www.creative-tim.com"
              class="font-weight-bold ml-1"
              target="_blank"
            >Creative Tim</a>
          </div>
        </div>
        <div class="col-xl-6">
          <ul class="nav nav-footer justify-content-center justify-content-xl-end">
            <li class="nav-item">
              <a href="https://www.creative-tim.com" class="nav-link" target="_blank">Creative Tim</a>
            </li>
            <li class="nav-item">
              <a
                href="https://www.creative-tim.com/presentation"
                class="nav-link"
                target="_blank"
              >About Us</a>
            </li>
            <li class="nav-item">
              <a href="http://blog.creative-tim.com" class="nav-link" target="_blank">Blog</a>
            </li>
            <li class="nav-item">
              <a
                href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                class="nav-link"
                target="_blank"
              >MIT License</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
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

