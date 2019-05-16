<template>
  <div class="principal container">
    <div class="panel">
      <h2>Bienvenido</h2>(
      <small>{{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}</small>)
    </div>

    <div class="panel">
      <router-link to="/CatAlumno" class="btn btn-lg btn-success btn-block">Ver Catalogo Alumnos</router-link>
      <br>
      <router-link to="/Asistencia" class="btn btn-lg btn-success btn-block">Asistencias</router-link>
      <br>
      <button class="btn btn-lg btn-danger btn-block" v-on:click="signout()">Salir</button>
    </div>
  </div>
</template>
<script>
import SesionHelper from "../helpers/SesionHelper";

export default {
  name: "Principal",
  data() {
    return {
      usuarioSesion: {},
      response: ""
    };
  },
  //FIXME: SESION
  mounted() {
    console.log("iniciando el componente ");

    //this.usuarioSesion = SesionHelper.mySesion.getSesion().usuario;
    var sesion = this.$session.get("usuario_sesion");

    if (!sesion || !sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = sesion.usuario;
  },
  methods: {
    signout() {
      console.log("Signout ");
      this.$session.clear();
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
