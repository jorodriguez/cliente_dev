
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { VueGoodTable } from 'vue-good-table';
import Datepicker from 'vuejs-datepicker';
import COLUMNS_TABLE_ASISTENCIA  from "../helpers/DatatableConfigAsistencias";
import TABLE_CONFIG from "../helpers/DatatableConfig";
import GraficaCalendarioAsistencia from '../componentes_generales/CalendarioAsistenciaComponente';
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "reporte-asistencia",
  components: {
    Datepicker,VueGoodTable,GraficaCalendarioAsistencia
  },
  mixins:[operacionesApi],
  data() {
    return {      
      usuarioSesion: {},
     // sesion: {}, 
      fecha:Date,
      listaAsistencia: [],                                    
      alumno_seleccionado:{},
      columnas:COLUMNS_TABLE_ASISTENCIA,
      TABLE_CONFIG:TABLE_CONFIG,
      mensaje: "",
      loading:Boolean,
      loadFunction:null
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de asistencia ");
    
    this.usuarioSesion = getUsuarioSesion();
    this.fecha = new Date();
    this.TABLE_CONFIG.PAGINATION_OPTIONS.perPage = 50;

    this.loadFunction = ()=> {
      console.log("invocando el api "+this.usuarioSesion.co_sucursal+"  "+this.fecha);
      console.log(" "+URL.ASISTENCIA_REPORTE + this.usuarioSesion.co_sucursal+"/"+this.fecha);
      this.loading = true;
      this.get(
        URL.ASISTENCIA_REPORTE + this.usuarioSesion.co_sucursal+"/"+this.fecha,
        
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
    onRowClick(params) {
      console.log(JSON.stringify(params));
      //this.alumno_seleccionado = params.row ;
      
    },
    onSearch(params) {
      console.log(JSON.stringify(params));      
    },
    selectAll(selected, selectedRows) {
      
    },
    selectionChanged(params) {
      this.rowSelection = params.selectedRows;
      console.log("Seleccion");      
    },
  }   
};
