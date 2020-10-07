
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
import { getUsuarioSesion, token } from '../helpers/Sesion';

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
      fecha_inicio: Date,
      fecha_fin: Date,
      listaAsistenciaSucursal: [],
      listaAsistenciaUsuario: [],
      usuario_seleccionado: null,
      columnas: COLUMNS_TABLE_ASISTENCIA_SUCURSAL,
      columnasUsuario: COLUMNS_TABLE_ASISTENCIA_USUARIO_DETALLE,
      TABLE_CONFIG: TABLE_CONFIG,
      mensaje: "",
      loading: false
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
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.listaAsistenciaSucursal = result.data;
          }
          this.loading = false;
        });
    },
    loadFunctionAsistenciaUsuario() {
      console.log(" " + URL.ASISTENCIA_USUARIO_REPORTE_USUARIO_RANGO_FECHA);
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
    }
  }
};
