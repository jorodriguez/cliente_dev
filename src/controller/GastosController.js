
import Vue from "vue";
import Datepicker from 'vuejs-datepicker';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "gastos",
  mixins: [operacionesApi],
  props: ['idalumno', 'requiere_factura'],
  components: {
    Datepicker,
    VueGoodTable
  },
  data() {
    return {
      uriTempGastos: URL.GASTOS_BASE,
      uriTempHistoricoGastos: URL.HISTORICO_GASTOS,
      uriTempTiposGasto: URL.TIPOS_GASTO,
      uriTempFormasPagos: URL.FORMAS_PAGO_BASE,
      gasto: {
        cat_tipo_gasto: -1,
        co_forma_pago: -1,
        fecha: (new Date()),
        gasto: 0,
        observaciones: ""
      },
      listaGastos: [],
      listaTiposGasto: [],
      listaFormasPago: [],
      listaGastosMensuales: [],
      mes_seleccionado: { mes_anio: '', anio_mes: '', suma: -1 },
      operacion: '',
      disabledDates: {
        from: new Date(Date.now() + 8640000)
      },
      usuarioSesion: {},
      //sesion: {},      
      response: "",
      mensaje: "",
    };
  },
  mounted() {
    console.log("iniciando el componente de gastos");


this.usuarioSesion = getUsuarioSesion();
    this.loadFunctionGastos = function (anio_mes) {
      this.get(
        this.uriTempGastos + "/" + this.usuarioSesion.co_sucursal + "/" + anio_mes,
        
        (result) => {
          this.response = result.data;
          if (this.response != null) {
            this.listaGastos = this.response;
          }
        }
      );
    };

    this.loadFunctionCargarListaTiposGasto = function () {

      this.get(
        this.uriTempTiposGasto,
        
        (result) => {
          if (result.data != null) {
            this.listaTiposGasto = result.data;
          }
        }
      );
    };

    this.loadFunctionCatFormasPago = function () {
      this.listaFormasPago = [];

      this.get(
        this.uriTempFormasPagos,
        
        (result) => {
          if (result.data != null) {
            this.listaFormasPago = result.data;
          }
        }
      );
    };

    this.loadFunctionGastosMensuales = function () {
      this.get(
        this.uriTempHistoricoGastos + "/" + this.usuarioSesion.co_sucursal,
        
        (result) => {
          this.response = result.data;
          if (this.response != null) {
            this.listaGastosMensuales = this.response;
            if (this.listaGastosMensuales != null && this.listaGastosMensuales.length > 0) {
              this.mes_seleccionado = this.listaGastosMensuales[0];
              this.loadFunctionGastos(this.mes_seleccionado.anio_mes);
            }
          }
        }
      );
    };
    this.loadFunctionGastosMensuales();
    this.loadFunctionCargarListaTiposGasto();
    this.loadFunctionCatFormasPago();

  },
  methods: {
    iniciarAgregarGasto() {
      console.log("iniciar agregar gasto");
      this.gasto = {
        cat_tipo_gasto: -1,
        co_forma_pago: -1,
        fecha: (new Date()),
        gasto: 0,
        observaciones: ""
      };
      //this.mensaje = "";
      this.operacion = 'INSERT';
      $('#modal_gasto').modal('show');

    },
    guardarGasto() {
      console.log("guardar gasto");
      if (this.gasto.cat_tipo_gasto == -1 ||
        this.gasto.co_forma_pago == -1 ||
        this.gasto.fecha == null || this.gasto.fecha == '' ||
        this.gasto.gasto == 0 || this.gasto.gasto == ''
      ) {
       // this.mensaje = 'Escriba los datos requeridos.';
        this.$notificacion.error('Datos requeridos', 'Escriba los datos requeridos.');
        return;
      }

      this.gasto.genero = this.usuarioSesion.id;
      this.gasto.co_sucursal = this.usuarioSesion.co_sucursal;
      if (this.operacion == 'INSERT') {

        this.post(
          this.uriTempGastos,
          this.gasto,
          
          (result) => {
            this.response = result.data;
            if (this.response != null) {
              console.log("" + this.response);
              //this.mensaje = "Se agrego el gasto.";
              this.$notificacion.info('Registro', 'Se registró un nuevo gasto.');
              $("#modal_gasto").modal("hide");
              this.loadFunctionGastosMensuales();
            }
          }
        );
      } else {

        this.put(
          this.uriTempGastos,
          this.gasto,
          
          (result) => {
            this.response = result.data;
            if (this.response != null) {
              console.log("" + this.response);
              //this.mensaje = "Se modifico el gasto.";
              this.$notificacion.info('Modificación', 'Se modificó el registro.');
              $("#modal_gasto").modal("hide");
              this.loadFunctionGastosMensuales();
            }
          }
        );
      }
    },
    verDetalleMesSeleccionado() {
      console.log(" ver mes seleccionado ");
      if (this.mes_seleccionado.anio_mes != '') {
        this.loadFunctionGastos(this.mes_seleccionado.anio_mes);
      }
    },
    guardarTipoGasto() {
      console.log(" guardar tipo de gasto ");

    },
    seleccionarGasto(item, operacion) {
      console.log("seleccionar gasto " + item);
      this.operacion = operacion;
      this.gasto = item;
      if (this.operacion == 'DELETE') {
        $("#modal_eliminar").modal("show");
      } else {
        $("#modal_gasto").modal("show");
      }
    },
    confirmarEliminar() {
      console.log("confirmar eliminar gasto");
      this.gasto.genero = this.usuarioSesion.id;
      this.gasto.co_sucursal = this.usuarioSesion.co_sucursal;

      this.remove(
        this.uriTempGastos + "/" + this.gasto.id,
        
        (result) => {
          this.response = result.data;
          if (this.response != null) {
            console.log("" + this.response);
            //this.mensaje = "Se agrego el gasto.";
            this.$notificacion.info('Eliminacion del gasto', 'Se eliminó el gasto.');
            $("#modal_eliminar").modal("hide");
            this.loadFunctionGastosMensuales();
          }
        }
      );
    }
  },
};