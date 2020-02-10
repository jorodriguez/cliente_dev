<template >

    <!--<div class="bg-gradient-primary pb-6 pt-4 pt-md-2" > </div>-->
      <!-- Header -->
    <!--<div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style="min-height: 100px; background-image: url(../assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">-->
    <div class="header pb-2 pt-5 pt-lg-4 d-flex align-items-center" style="min-height: 80px; background-image: url(../assets/img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <!-- Mask -->
      <!--<span class="mask bg-gradient-default opacity-8"></span>-->
      <span class="mask bg-primary opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <!--<h1 class="display-6 text-white">Hello Jesse</h1>
            <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
            <a href="#!" class="btn btn-info">Edit profile</a>-->
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import CONSTANTES from "../helpers/Constantes";
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "sidebar-principal",
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
    this.mostrarmenu= (getUsuarioSesion() != null);    
  },
  methods: {}
};
</script>
<style scoped>
</style>

