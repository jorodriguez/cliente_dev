
import Vue from "vue";
import Datepicker from 'vuejs-datepicker';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import URL from "../helpers/Urls";

export default {
  name: "repote-gastos",
  props: [],
  components: {
    Datepicker,
    VueGoodTable
  }, 
  data() {
    return {
      
      uriTempReporteGastos: URL.REPORTE_GASTOS, //"http://localhost:5000/reporte_gastos",
      uriTempReporteGastosGlobal: URL.REPORTE_GASTOS_GLOBAL, //"http://localhost:5000/reporte_gastos_global",            
      
     
      /*uriTempReporteGastos: "https://api-ambiente-desarrollo.herokuapp.com/reporte_gastos",
      uriTempReporteGastosGlobal: "https://api-ambiente-desarrollo.herokuapp.com/reporte_gastos_global",            
*/
      
     /*uriTempReporteGastos: "https://api-ambiente-produccion.herokuapp.com/reporte_gastos",
      uriTempReporteGastosGlobal: "https://api-ambiente-produccion.herokuapp.com/reporte_gastos_global",            
      */
     
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
      /*columns: [
          {label:"Fecha",field:"fecha", type: 'date',dateInputFormat: 'YYYY-MM-DD',dateOutputFormat: 'DD-MMM-YY',sortable: true},
          {label:"Gasto",
                field:` 
                <button v-on:click="seleccionarGasto(row,'UPDATE')" type="button" class="btn btn-link">
                <span class="small">{{row.nombre_tipo_gasto}}</span>
                </button>`,type: 'string',sortable: true},
          {label:"Tipo de Pago",field:"nombre_tipo_pago",type: 'string',sortable: true},          
      ]*/
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
      this.$http
        .get(
          this.uriTempReporteGastos,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {            
            if (result.data != null) {
              this.listaGastosPorSucursal =result.data;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionReporteGastosPorSucursalTrend = function (id_sucursal) {
      this.$http
        .get(
          this.uriTempReporteGastos+"/"+id_sucursal,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {                      
            if (result.data != null) {
              this.listaGastosPorSucursalTrendMensual = result.data ;
              if(this.listaGastosPorSucursalTrendMensual  != null && this.listaGastosPorSucursalTrendMensual.length > 0){
                this.mes_seleccionado = this.listaGastosPorSucursalTrendMensual[0];
                this.loadFunctionReporteGastosTipoYSucursal(id_sucursal,this.mes_seleccionado.anio_mes);
              }
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionReporteGastosTipoYSucursal = function (id_sucursal,mes_anio) {
      this.listaFormasPago = [];
      
        this.$http
          .get(            
            this.uriTempReporteGastos+"/"+id_sucursal+"/"+mes_anio,
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          )
          .then(
            result => {                            
              if (result.data != null) {
                this.listaGastosPorSucursalTipo = result.data;                
              }
            },
            error => {
              console.error(error);
            }
          );      
    };

    this.loadFunctionGastosGlobal = function () {
      this.$http
        .get(
          this.uriTempReporteGastosGlobal,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            if (this.response != null) {
              this.listaGastosGlobal = this.response;              
            }
          },
          error => {
            console.error(error);
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