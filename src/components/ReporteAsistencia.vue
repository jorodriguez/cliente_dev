<template>
  <div>   
    hola
    <ReporteAsistenciaComponent/>
  </div>
</template>

<script >
import Vue from "vue";
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
