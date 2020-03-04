
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "balance-alumno",  
  mixins:[operacionesApi],
  template:`
      <span> 
        {{ balanceAlumno.total_adeudo }} 
        <br/>
        <small class="text-muted" v-if="mostrarfecha">Paga {{balanceAlumno.fecha_limite_pago_mensualidad}}</small>
      </span>
      
      `,
  props: ['idalumno','mostrarfecha'],
  data() {
    return {      
      balanceAlumno : {total_adeudo:0},
      usuarioSesion: {},
      //sesion: {},              
      loadFunctionBalanceAlumno:null,        
    };
  },
  watch: {
    idalumno: function (newId, oldId) {
      console.log(`Observador para cambios de valor del id de alumno ${newId} - ${oldId}`);
      this.loadFunctionBalanceAlumno();
    }
  },
  mounted() {
    console.log("iniciando el componente balance de alumnos complemento de perfil ");    
    console.log(" == > alumnos "+this.idalumno);
  
   this.usuarioSesion = getUsuarioSesion();

    this.loadFunctionBalanceAlumno = function() {

      this.get(
        URL.BALANCE_BASE +"/" +this.idalumno,
        
        (result) => {          
          if (result.data != null) {
            this.balanceAlumno = result.data;
          }
        }
      );
    
    };    

    this.$root.$on('actualizacionPorCargoEvent', (text) => {
      console.log("ACTUALIZACION POR CARGO NUEVO");
      this.loadFunctionBalanceAlumno();
    });
    this.loadFunctionBalanceAlumno();
  },
  methods: {
      
  },  
};