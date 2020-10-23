
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
      nombre_reporte: "reporteAsistencias.xls",
      nombre_libro: "libro1",
      columnasFiltradas:{},
      columnsExport: {
        fecha:"fecha",
        alumno: "nombre_alumno",
        apellido:"apellido_alumno",        
        grupo:"nombre_grupo",   
        entro:"hora_entrada",
        salio:"hora_salida",  
        tiempo_dentro:"tiempo_dentro",
        //tiempo_extra:"tiempo",
        "Tiempo extra": {
          field: "tiempo",
          callback: (value) => {
            return `${value.includes('-') ? value:''}`;
          }
        },
        horario_entrada:"hora_entra",      
        horario_sale:"hora_sale"        

      },
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de asistencia ");
    
    this.usuarioSesion = getUsuarioSesion();
    this.fecha = new Date();
    this.TABLE_CONFIG.PAGINATION_OPTIONS.perPage = 50;   
    this.columnasFiltradas = this.columnsExport;
    this.init();    
  },
  methods: {
    init(){
      this.nombre_reporte = `Reporte de Asistencias del ${this.fecha}`;
      this.nombre_libro = `Asistencias`;     
      this.loadFunction();
    },
    loadFunction(){
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
    },
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
