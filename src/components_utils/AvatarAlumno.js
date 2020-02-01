
import Vue from "vue";

export default {
  name: "avatar-alumno", 
  template: `
        <img
          :src="url"
          width="35"
          height="35"
          alt=".."
          class="rounded-circle"
        />    
    `,  
    props: ["url"],
    data() {
        return {  }
    },
    mounted(){
        //metodos de inicio
    }
};


    