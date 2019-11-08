<template>
  <div>   
      <div class="text-left">
      <router-link to="/principal" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
    </div>
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
