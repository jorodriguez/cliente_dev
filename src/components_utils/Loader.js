
import Vue from "vue";

//type='grow' || 'border'
//<Loader loading="load"/>
//<Loader loading="load" type="grow" mini="true"/>

export default {
  name: "Loader", 
  template: `
    <div v-if="loading" :class="clase ? clase : 'text-info'">
      <div :class="type ? ('spinner-'+type) : 'spinner-border' ${this.mini ? 'spinner-border-sm':''}" role="status">
        <span class="sr-only">Cargando...</span>
      </div>
    </div>
     `,  
    props: ["loading","mini","type","clase"],
    data() {
        return {  }
    },
    mounted(){
      
    }
};


    