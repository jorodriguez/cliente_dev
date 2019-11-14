<template>
  <div id="asistencia_alumno_seleccionado">
    <ListaAsistenciaComponente idalumno=""></ListaAsistenciaComponente>
  </div>
</template>

<script >
import ListaAsistenciaComponente from "./ListaAsistenciaComponente";
export default {
  name: "asistencia-alumno-seleccionado",
  components: {
    ListaAsistenciaComponente
  },
  data() {
    
  }
};
</script>


<style scoped>
.tachado {
  text-decoration: line-through;
}
</style>
