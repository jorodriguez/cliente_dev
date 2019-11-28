
import Vue from "vue";

export default {
  name: "Loader", 
  template: `
    <div v-if="loading" class="h4">
      <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>
     `,  
    props: ["loading"],
    data() {
        return {  }
    },
    mounted(){
        //metodos de inicio
    }
};


    