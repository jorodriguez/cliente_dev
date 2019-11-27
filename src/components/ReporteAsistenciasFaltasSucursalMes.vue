<template>
  <div>
    <h1>Lista de Faltas Mensual</h1>      
      (<small>{{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}</small>)
    <div class="text-left">      
      <router-link to="/Asistencia" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
    </div>
    <ReporteAsistenciasFaltasSucursalMesComponent />
  </div>
</template>

<script >
import Vue from "vue";
import ReporteAsistenciasFaltasSucursalMesComponent from "./ReporteAsistenciasFaltasSucursalMesComponent";

export default {
  name: "ReporteAsistencia",
  components: {
    ReporteAsistenciasFaltasSucursalMesComponent
  },
  props: {},
  data() {
    return {sesion:null,usuarioSesion:{}};
  },
  mounted() {
    console.log("Iniciando el componente");
     console.log("iniciando el componente reporte de asistencia por sucursal mensual ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      //this.$router.push("/");      
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
  },
  methods: {}
};
</script>
