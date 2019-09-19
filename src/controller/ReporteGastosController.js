
import Vue from "vue";
import Datepicker from 'vuejs-datepicker';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";

export default {
  name: "repote-gastos",
  props: [],
  components: {
    Datepicker,
    VueGoodTable
  }, 
  mixins:[operacionesApi],  
  data() {
    return {      
      uriTempReporteGastos: URL.REPORTE_GASTOS, //"http://localhost:5000/reporte_gastos",
      uriTempReporteGastosGlobal: URL.REPORTE_GASTOS_GLOBAL, //"http://localhost:5000/reporte_gastos_global",            
      listaGastosPorSucursal: [],            
      listaGastosPorSucursalTrendMensual :[],
      listaGastosPorSucursalTipo:[],
      listaGastosGlobal:[],
      sucursal_seleccionada:{id_sucursal:-1,nombre:""},      
      mes_seleccionado:{mes_anio:'',anio_mes:'',suma:-1},
      operacion: '',
      disabledDates: {
        from : new Date(Date.now() + 8640000)
      },
      usuarioSesion: {},
      sesion: {},
      mensajeToast: null,
      response: "",
      mensaje: "",      
    };
  },
  mounted() {
    console.log("iniciando el componente de reporte de gastos ");

    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    if (!this.usuarioSesion.permiso_gerente) {
      this.$router.push("/");
      return;
    }

    this.loadFunctionReporteGastos = function () {
      this.get(
        this.uriTempReporteGastos,
        this.sesion.token,
        result => {            
          if (result.data != null) {
            this.listaGastosPorSucursal =result.data;
          }
        }
      );
    };

    this.loadFunctionReporteGastosPorSucursalTrend = function (id_sucursal) {

      this.get(
        this.uriTempReporteGastos+"/"+id_sucursal,
        this.sesion.token,
        result => {                      
          if (result.data != null) {
            this.listaGastosPorSucursalTrendMensual = result.data ;
            if(this.listaGastosPorSucursalTrendMensual  != null && this.listaGastosPorSucursalTrendMensual.length > 0){
              this.mes_seleccionado = this.listaGastosPorSucursalTrendMensual[0];
              this.loadFunctionReporteGastosTipoYSucursal(id_sucursal,this.mes_seleccionado.anio_mes);
            }
          }
        }
      );
    };

    this.loadFunctionReporteGastosTipoYSucursal = function (id_sucursal,mes_anio) {
      this.listaFormasPago = [];
  
      this.get(
        this.uriTempReporteGastos+"/"+id_sucursal+"/"+mes_anio,
        this.sesion.token,
        (result) => {                            
          if (result.data != null) {
            this.listaGastosPorSucursalTipo = result.data;                
          }
        }
      );
    };

    this.loadFunctionGastosGlobal = function () {
      this.get(
        this.uriTempReporteGastosGlobal,
        this.sesion.token,
        (result) => {
          this.response = result.data;
          if (this.response != null) {
            this.listaGastosGlobal = this.response;              
          }
        } 
      );
    };

    this.mensajeToast = mensaje => {
      $("#toast_msg").text(mensaje);
      $("#toast_id").toast("show");
    };

    //this.loadFunctionGastos();
    this.loadFunctionReporteGastos();

  },
  methods: {    
    verDetalleSucursal(row){
      this.sucursal_seleccionada = row;
      this.loadFunctionReporteGastosPorSucursalTrend(row.id_sucursal);
    },   
    verGastosPorMes(row){
      this.mes_seleccionado = row;

      this.loadFunctionReporteGastosTipoYSucursal(this.sucursal_seleccionada.id_sucursal ,this.mes_seleccionado.anio_mes);
    },
    verGastosGlobal(){     
      
      this.loadFunctionGastosGlobal();
      $("#modal_detallado").modal("show");
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
  },
};