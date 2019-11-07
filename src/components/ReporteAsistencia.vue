<template>
  <div>   
    hola
    <reporte-asistencia></reporte-asistencia>
  </div>
</template>

<script >

import ReporteAsistenciaComponent from './ReporteAsistenciaComponent';

export default {
  name: "ReporteAsistencia",
  components:{
    ReporteAsistenciaComponent
  },
  props: {
    
  },
  data() {
    return {
      
    };
  },
  mounted() {  
    console.log("Iniciando el componente");
  },
  methods: {
    
  }
};

</script>
