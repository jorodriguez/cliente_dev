
import Vue from "vue";
import Datepicker from 'vuejs-datepicker';

export default {
  name: "gastos",
  props: ['idalumno', 'requiere_factura'],
  components: {
    Datepicker
  }, 
  data() {
    return {
      uriTempGastos: "http://localhost:5000/gastos",
      uriTempTiposGasto: "http://localhost:5000/tipos_gasto",
      uriTempFormasPagos: "http://localhost:5000/formas_pagos",

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
      operacion: '',
      usuarioSesion: {},
      sesion: {},
      mensajeToast: null,
      response: "",
      mensaje: ""
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

    this.loadFunctionGastos = function () {
      this.$http
        .get(
          this.uriTempGastos + "/" + this.usuarioSesion.co_sucursal,
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

    this.mensajeToast = mensaje => {
      $("#toast_msg").text(mensaje);
      $("#toast_id").toast("show");
    };

    this.loadFunctionGastos();
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
                this.loadFunctionGastos();
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.$http
          .put(this.uriTempGastos + "/" + this.gasto.id, this.gasto, {
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
                this.loadFunctionGastos();
              }
            },
            error => {
              console.error(error);
            }
          );
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
        .delete(this.uriTempGastos, this.gasto.id, {
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
              this.loadFunctionGastos();
            }
          },
          error => {
            console.error(error);
          }
        );

    }
  },
};