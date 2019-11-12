
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import Datepicker from 'vuejs-datepicker';
import { GChart } from "vue-google-charts";

const options = {
  title: "Red Sox Attendance",
  height: 350,
  calendar: {
    dayOfWeekLabel: {
      fontName: "Times-Roman",
      fontSize: 12,
      color: "#1a8763",
      bold: true,
      italic: true
    },
    dayOfWeekRightSpace: 10,
    daysOfWeek: "DLMMJVS"
  }
};

export default {
  name: "calendario-asistencia-alumno",  
  components:{
    GChart,Datepicker
  },
  mixins:[operacionesApi],
  template:`<span>
              <div class="spinner-grow spinner-grow-sm" role="status" v-if="loading">
                  <span class="sr-only">Cargando...</span>
              </div>              
              <datepicker :highlighted="fechasAsistencias" :inline="true"></datepicker>
              <!--<GChart 
                :settings="{ packages: ['corechart', 'calendar'] }" 
                type="Calendar"                 
                :data="chartData" 
                :options="chartOptions" />-->
              {{idalumno}}
            </span>`,
  props: ['idalumno'],
  data() {
    return {                    
      columns: [
        { type: "date", id: "Date" },
        { type: "number", id: "Won/Loss" }
      ],     
      chartData: [
        
      ],      
      chartOptions: {
        /*chart: {
          title: "Red Sox Attendance",
          height: 350,
        }*/
      },
      fechasAsistencias:[],
      lista:[],
      loading: false, 
      load:null,
      numero_mes:"",
      mensaje: "",
      sesion:null,
      usuarioSesion:null
    };
  },
  mounted() {
    console.log("iniciando el componente grafica de asistencia alumno ");        
    this.sesion = this.$session.get("usuario_sesion");
       
    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    
    if(!this.idalumno){
        console.log("No existe la propiedad de idalumno");
        
    }
    this.loading = true;
     this.load = ()=> {
      this.get(
        //URL.ASISTENCIA_REPORTE_POR_ALUMNO +`/${this.idalumno}/${this.numero_mes}`,
        URL.ASISTENCIA_REPORTE_POR_ALUMNO +`${this.idalumno}`,
        this.sesion.token,
        (result) => {                      
          if (result.data != null) {
            this.lista = result.data; 
            this.fechasAsistencias = convertToDataGraphic(this.lista);           
            this.loading = false;
          }
        }
      );    
     };   
     this.load();
  },
  methods: {
      
  },  
};

function convertToDataGraphic(lista){
  if(lista ==null || lista==undefined){
    return [];
  }

  var retorno =  [];
  //retorno.push(['Dia','valor']);
  
  lista.forEach(e => {
      retorno.push(new Date(e.anio,e.mes,e.dia));
  });
    
  return retorno;
}