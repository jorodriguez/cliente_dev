
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { VueGoodTable } from 'vue-good-table';
import Datepicker from 'vuejs-datepicker';
import COLUMNS_TABLE_ASISTENCIA_MENSUAL_ALUMNO  from "../helpers/DatatableConfigAsistenciaMensualAlumno";
import TABLE_CONFIG from "../helpers/DatatableConfig";
//import ReporteAsistenciaMensualAlumnoComponentController from '../';
//import GraficaCalendarioAsistencia from '../componentes_generales/CalendarioAsistenciaComponente';
//import Popup from './Popup'

export default {
  name: "reporte-asistencia-mensuaul-alumno",
  components: {
    Datepicker,VueGoodTable //,Popup
  },
  mixins:[operacionesApi],
  data() {
    return {      
      usuarioSesion: {},
      sesion: {}, 
      fecha:Date,
      listaAsistencia: [],                                    
      alumno_seleccionado:null,
      columnas:COLUMNS_TABLE_ASISTENCIA_MENSUAL_ALUMNO,
      TABLE_CONFIG:TABLE_CONFIG,
      mensaje: "",
      loading:Boolean,
      loadFunction:null
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de asistencia ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      //this.$router.push("/");
      this.mensaje = "Expiró su sesión";
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    //this.fecha = new Date();
    this.TABLE_CONFIG.PAGINATION_OPTIONS.perPage = 50;

    this.loadFunction = ()=> {
      console.log("invocando el api "+this.usuarioSesion.co_sucursal);
      console.log(" "+URL.ASISTENCIA_MENSUAL_ALUMNO + this.usuarioSesion.co_sucursal);
      this.loading = true;
      this.get(
        URL.ASISTENCIA_MENSUAL_ALUMNO + this.usuarioSesion.co_sucursal,
        this.sesion.token,
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
     
  }   
};
