
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { VueGoodTable } from 'vue-good-table';
import Datepicker from 'vuejs-datepicker';
import COLUMNS_TABLE_ASISTENCIA_MES  from "../helpers/DatatableConfigAsistenciaSucursalMes";
import TABLE_CONFIG from "../helpers/DatatableConfig";
//import GraficaCalendarioAsistencia from '../componentes_generales/CalendarioAsistenciaComponente';
import Popup from './Popup'
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "reporte-asistencia-sucursal-mes",
  components: {
    Datepicker,VueGoodTable ,Popup //,GraficaCalendarioAsistencia
  },
  mixins:[operacionesApi],
  data() {
    return {      
      usuarioSesion: {},
      //sesion: {}, 
      fecha:Date,
      listaAsistencia: [],                                    
      alumno_seleccionado:null,
      columnas:COLUMNS_TABLE_ASISTENCIA_MES,
      TABLE_CONFIG:TABLE_CONFIG,
      mensaje: "",
      loading:Boolean,
      loadFunction:null
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de asistencia ");
        this.usuarioSesion = getUsuarioSesion();

    this.TABLE_CONFIG.PAGINATION_OPTIONS.perPage = 50;

    this.loadFunction = ()=> {
      console.log("invocando el api "+this.usuarioSesion.co_sucursal);
      console.log(" "+URL.ASISTENCIA_REPORTE_MES_SUCURSAL + this.usuarioSesion.co_sucursal);
      this.loading = true;
      this.get(
        URL.ASISTENCIA_REPORTE_MES_SUCURSAL + this.usuarioSesion.co_sucursal,
        
        (result) => {          
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.listaAsistencia = result.data;                        
          }
          this.loading = false;
        });    
    };

    this.loadFunction();
    
  },
  methods: {
    cambiarFecha(){
         this.$nextTick(() => {
           console.log(this.fecha)
           this.loadFunction();
         });        
    },
    seleccionarAlumno(item){
        this.alumno_seleccionado = item;
        $("#grafica_asistencia_mes").modal("show");
    },
    
  }   
};
