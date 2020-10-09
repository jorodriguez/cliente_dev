
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { VueGoodTable } from 'vue-good-table';
import Datepicker from 'vuejs-datepicker';
import COLUMNS_TABLE_ASISTENCIA_SUCURSAL from "../helpers/DatatableConfigAsistenciasSucursal";
import COLUMNS_TABLE_ASISTENCIA_USUARIO_DETALLE from "../helpers/DatatableConfigAsistenciaUsuarioDetalle";
import Popup from '../controller/Popup'
import TABLE_CONFIG from "../helpers/DatatableConfig";
//import GraficaCalendarioAsistencia from '../componentes_generales/CalendarioAsistenciaComponente';
import { getUsuarioSesion,getSesion, token } from '../helpers/Sesion';

export default {
  name: "reporte-asistencia-usuario-rango",
  components: {
    Datepicker, VueGoodTable, Popup
  },
  mixins: [operacionesApi],
  data() {
    return {
      usuarioSesion: {},
      //sesion: {}, 
      anio_seleccionado:0,
      quincena_seleccionada:{},
      fecha_inicio: Date,
      fecha_fin: Date,
      listaAsistenciaSucursal: [],
      listaAsistenciaUsuario: [],
      listaAnios: [],
      listaQuincenas: [],
      usuario_seleccionado: null,
      columnas: COLUMNS_TABLE_ASISTENCIA_SUCURSAL,
      columnasUsuario: COLUMNS_TABLE_ASISTENCIA_USUARIO_DETALLE,
      TABLE_CONFIG: TABLE_CONFIG,
      mensaje: "",
      loading: false,
      sesion:null
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de asistencia ");   
    this.usuarioSesion = getUsuarioSesion();    
    this.init();
  },
  methods: {
    init() {
      this.fecha_inicio = new Date();
      this.fecha_fin = new Date();
      this.TABLE_CONFIG.PAGINATION_OPTIONS.perPage = 50;
      this.cargarFiltroAnios();
    },
    cambiarFechaInicio() {
      this.$nextTick(() => {
        console.log(this.fecha_inicio)
      });
    },
    cambiarFechaFin() {
      this.$nextTick(() => {
        console.log(this.fecha_fin)
      });
    },
    cargarRegistros() {
      this.loadFunctionAsistenciaSuc();
    },
    verDetalleUsuario(item) {
      //cargar detalle de las faltas por usuario 
      this.usuario_seleccionado = item;
      this.loadFunctionAsistenciaUsuario();
      $("#popup_detalle_asistencia").modal("show");

    },
    loadFunctionAsistenciaSuc() {
      console.log(" " + URL.ASISTENCIA_USUARIO_REPORTE_SUC_RANGO_FECHA);
      this.loading = true;
      this.get(
        URL.ASISTENCIA_USUARIO_REPORTE_SUC_RANGO_FECHA + this.usuarioSesion.co_sucursal + "/" + this.fecha_inicio + "/" + this.fecha_fin,

        (result) => {
          console.log("Consulta " + JSON.stringify(result.data));
          if (result.data != null) {
            this.listaAsistenciaSucursal = result.data;
          }
          this.loading = false;
        });
    },
    loadFunctionAsistenciaUsuario() {
      console.log(" " + URL.ASISTENCIA_USUARIO_REPORTE_USUARIO_RANGO_FECHA);

      this.listaAsistenciaUsuario = [];

      if(this.quincena_seleccionada == {} && this.anio_seleccionado ==0){
        return;
      }

      this.loading = true;
      this.get(
        URL.ASISTENCIA_USUARIO_REPORTE_USUARIO_RANGO_FECHA + this.usuario_seleccionado.id + "/" + this.fecha_inicio + "/" + this.fecha_fin,

        (result) => {
          console.log("Consulta " + JSON.stringify(result.data));
          if (result.data != null) {
            this.listaAsistenciaUsuario = result.data;
          }
          this.loading = false;
        });
    },
    cargarFiltroAnios(){
      console.log(" cargarFiltroAnios" +`${URL.ASISTENCIA_USUARIO_REPORTE_FILTRO_ANIOS}/${this.usuarioSesion.id_empresa}`);
      
      this.get(
      `${URL.ASISTENCIA_USUARIO_REPORTE_FILTRO_ANIOS}/${this.usuarioSesion.id_empresa}`,
        (result) => {
          console.log("Consulta " + JSON.stringify(result.data));
          if (result.data != null) {
            this.listaAnios = result.data;
          }
          this.loading = false;
        });
    },
    cargarFiltroQuincenas(){
      console.log(" cargarFiltroQuincenas" +`${URL.ASISTENCIA_USUARIO_REPORTE_FILTRO_QUINCENAS}/${this.usuarioSesion.id_empresa}/${this.anio_seleccionado}`);
      this.listaQuincenas = [];
      if(this.anio_seleccionado == 0){
        return;
      }
      this.get(
        `${URL.ASISTENCIA_USUARIO_REPORTE_FILTRO_QUINCENAS}/${this.usuarioSesion.id_empresa}/${this.anio_seleccionado.numero_anio}`,
        (result) => {
          console.log("Consulta " + JSON.stringify(result.data));
          if (result.data != null) {
            let ind = 1;
            let lista = result.data;
            let thus=this;
            lista.forEach(function(item) {              
              thus.listaQuincenas.push({  index:(ind++),
                                          numero_quincena:1,
                                          nombre_mes:item.nombre_mes,
                                          primer_dia_quincencena:item.primer_dia_mes, 
                                          ultimo_dia_quincencena:item.quinceavo_dia_mes,
                                          numero_primer_dia_quincena:item.numero_primer_dia_mes,                                          
                                          numero_ultimo_dia_quincena:item.numero_quinceavo_dia_mes
                                        });
              thus.listaQuincenas.push({  index:(ind++),
                                          numero_quincena:2,
                                          nombre_mes:item.nombre_mes,
                                          primer_dia_quincencena:item.quinceavo_dia_mes, 
                                          ultimo_dia_quincencena:item.ultimo_dia_mes,
                                          numero_primer_dia_quincena:item.numero_quinceavo_dia_mes,                                          
                                          numero_ultimo_dia_quincena:item.numero_ultimo_dia_mes
                                        });
            });            
          }
          this.loading = false;
        });
    },
    cargarFechasQuincena(){
      console.log("Seleccion de fechas "+JSON.stringify(this.quincena_seleccionada));
      if(this.quincena_seleccionada != {}){
        this.fecha_inicio =  this.quincena_seleccionada.primer_dia_quincencena;
        this.fecha_fin =  this.quincena_seleccionada.ultimo_dia_quincencena;
      }        
    }
  }
};
