
import Vue from "vue";
import AvatarAlumno from "./AvatarAlumno";

export default {
  name: "item-alumno", 
  components:{
    AvatarAlumno
  },
  template: `
          <small 
              :style="color === undefined ? '':'background-color:'+color " 
              :class="clase === undefined ? 'badge badge-pill badge-info border border-white' : ('badge badge-pill border border-white badge-'+clase)" 
               @click="onclick()">
              <AvatarAlumno :url="foto"/>
              <span > {{texto}}</span>
              <slot name="cuerpo">              
                <!-- Cuerpo del badge -->
              </slot>              
          </small>       
    `,  
    props:{
          clase:String,
          foto:String,
          texto:String,
          seleccion:Function,
          value: Object,
          color:String
        },
    data() {
        return { seleccionado:false }
    },
    mounted(){
        //metodos de inicio


    },
    methods: {
      onclick(){
        if(this.seleccion !== undefined){
          this.seleccion(this.value);
        }        
        this.seleccionado = !this.seleccionado;;
      }
    },
};


    