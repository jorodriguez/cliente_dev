
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { VueGoodTable } from 'vue-good-table';
import Datepicker from 'vuejs-datepicker';
import COLUMNS_TABLE_ASISTENCIA_SUCURSAL  from "../helpers/DatatableConfigAsistenciasSucursal";
import TABLE_CONFIG from "../helpers/DatatableConfig";
//import GraficaCalendarioAsistencia from '../componentes_generales/CalendarioAsistenciaComponente';

export default {
  name: "reporte-asistencia-usuario-rango",
  components: {
    Datepicker,VueGoodTable
  },
  mixins:[operacionesApi],
  data() {
    return {      
      usuarioSesion: {},
      sesion: {}, 
      fecha_inicio:Date,
      fecha_fin:Date,
      listaAsistenciaSucursal: [],                                    
      usuario_seleccionado:{},
      columnas:COLUMNS_TABLE_ASISTENCIA_SUCURSAL,
      TABLE_CONFIG:TABLE_CONFIG,
      mensaje: "",
      loading:Boolean,
      loadFunctionAsistenciaSuc:null
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de asistencia ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");      
      this.mensaje = "Expiró su sesión";
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    this.fecha_inicio = new Date();
    this.fecha_fin = new Date();
    this.TABLE_CONFIG.PAGINATION_OPTIONS.perPage = 50;

    this.loadFunctionAsistenciaSuc = ()=> {      
      console.log(" "+URL.ASISTENCIA_USUARIO_REPORTE_SUC_RANGO_FECHA);
      this.loading = true;
      this.get(
        URL.ASISTENCIA_USUARIO_REPORTE_SUC_RANGO_FECHA + this.usuarioSesion.co_sucursal+"/"+this.fecha_inicio+"/"+this.fecha_fin,
        this.sesion.token,
        (result) => {          
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.listaAsistenciaSucursal = result.data;                        
          }
          this.loading = false;
        });    
    };

    //this.loadFunctionAsistenciaSuc();
    
  },
  methods: {
    cambiarFechaInicio(){
         this.$nextTick(() => {
           console.log(this.fecha_inicio)           
         });        
    },
    cambiarFechaFin(){
      this.$nextTick(() => {
        console.log(this.fecha_fin)        
      });        
    },
    cargarRegistros(){
      this.loadFunctionAsistenciaSuc();
    },
    verDetalleUsuario(item){
        //cargar detalle de las faltas por usuario 
    }   
  }   
};
