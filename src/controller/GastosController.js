
import Vue from "vue";
import Datepicker from 'vuejs-datepicker';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
  name: "gastos",
  props: ['idalumno', 'requiere_factura'],
  components: {
    Datepicker,
    VueGoodTable
  }, 
  data() {
    return {
      uriTempGastos: "http://localhost:5000/gastos",
      uriTempHistoricoGastos: "http://localhost:5000/historico_gastos",      
      uriTempTiposGasto: "http://localhost:5000/tipos_gasto",
      uriTempFormasPagos: "http://localhost:5000/formas_pagos",
      

  /*    uriTempGastos: "https://api-ambiente-desarrollo.herokuapp.com/gastos",
      uriTempHistoricoGastos: "https://api-ambiente-desarrollo.herokuapp.com/historico_gastos",      
      uriTempTiposGasto: "https://api-ambiente-desarrollo.herokuapp.com/tipos_gasto",
      uriTempFormasPagos: "https://api-ambiente-desarrollo.herokuapp.com/formas_pagos",
*/
     /* uriTempGastos: "https://api-ambiente-produccion.herokuapp.com/gastos",
      uriTempHistoricoGastos: "https://api-ambiente-produccion.herokuapp.com/historico_gastos",      
      uriTempTiposGasto: "https://api-ambiente-produccion.herokuapp.com/tipos_gasto",
      uriTempFormasPagos: "https://api-ambiente-produccion.herokuapp.com/formas_pagos",
      */
      gasto: {
        cat_tipo_gasto: -1,
        co_forma_pago: -1,
        fecha: (new Date()),
        gasto: 0,
        observaciones: ""
      },
      listaGastos: [],
      listaTiposGasto: [],
      listaFormasPago:[],
      listaGastosMensuales:[],
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
    console.log("iniciando el componente de gastos");

    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    this.loadFunctionGastos = function (anio_mes) {
      this.$http
        .get(
          this.uriTempGastos + "/" + this.usuarioSesion.co_sucursal+"/"+anio_mes,
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
              this.listaGastos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionCargarListaTiposGasto = function () {
      this.$http
        .get(
          this.uriTempTiposGasto,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {                      
            if (result.data != null) {
              this.listaTiposGasto = result.data ;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionCatFormasPago = function () {
      this.listaFormasPago = [];
      
        this.$http
          .get(            
            this.uriTempFormasPagos,
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          )
          .then(
            result => {                            
              if (result.data != null) {
                this.listaFormasPago = result.data;
              }
            },
            error => {
              console.error(error);
            }
          );      
    };

    this.loadFunctionGastosMensuales = function () {
      this.$http
        .get(
          this.uriTempHistoricoGastos + "/" + this.usuarioSesion.co_sucursal,
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
              this.listaGastosMensuales = this.response;
              if(this.listaGastosMensuales  != null && this.listaGastosMensuales.length > 0){
                this.mes_seleccionado = this.listaGastosMensuales[0];
                this.loadFunctionGastos(this.mes_seleccionado.anio_mes);
              }
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
      this.mensaje= "";
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
        this.mensaje = 'Escriba los datos requeridos.';
        return;
      }

      this.gasto.genero = this.usuarioSesion.id;
      this.gasto.co_sucursal = this.usuarioSesion.co_sucursal;
      if (this.operacion == 'INSERT') {
        this.$http
          .post(this.uriTempGastos, this.gasto, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;
              if (this.response != null) {
                console.log("" + this.response);
                this.mensaje = "Se agrego el gasto.";
                $("#modal_gasto").modal("hide");                
                this.loadFunctionGastosMensuales();
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.$http
          .put(this.uriTempGastos, this.gasto, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;
              if (this.response != null) {
                console.log("" + this.response);
                this.mensaje = "Se modifico el gasto.";
                $("#modal_gasto").modal("hide");                
                this.loadFunctionGastosMensuales();
              }
            },
            error => {
              console.error(error);
            }
          );
      }
    },
    verDetalleMesSeleccionado(){
      console.log(" ver mes seleccionado ");
      if(this.mes_seleccionado.anio_mes != '' ){
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

      this.$http
        .delete(this.uriTempGastos+"/"+this.gasto.id, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;
            if (this.response != null) {
              console.log("" + this.response);
              this.mensaje = "Se agrego el gasto.";
              $("#modal_eliminar").modal("hide");              
              this.loadFunctionGastosMensuales();
            }
          },
          error => {
            console.error(error);
          }
        );

    }
  },
};