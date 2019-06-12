
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import { isRegExp } from "util";
import { timingSafeEqual } from "crypto";


export default {
  name: "cargos-pagos",
  props: ['idalumno'],

  data() {
    return {
      /*uriTempPagos: "http://localhost:5000/pagos",
      uriTempCargos: "http://localhost:5000/cargos",*/
      uriTempPagos: "https://app-restexpres.herokuapp.com/pagos",
      uriTempCargos: "https://app-restexpres.herokuapp.com/cargos",      
      cargo: {
        cantidad: 1,
        cat_cargo: -1
      },
      pago: {
        pago_total: 0
      },
      cargoSeleccionado: { fecha: null, cargo: 0, total_pago: 0, nota: '' },
      total_cargos: 0,
      total_pagos: 0,
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      listaCargosAlumnos: [],
      listaCargos: [],
      listaPagos: [],
      listaSeleccionSalida: [],
      listaPagosCargo: [],
      loadFunctionCargosAlumno: null,
      loadFunctionCatCargos: null,
      loadFunctionActualizarCargoGeneral: null,
      mensajeToast: null,
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente de pagos y cargos ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    this.loadFunctionCargosAlumno = function () {
      this.$http
        .get(
          this.uriTempCargos + "/" + this.idalumno,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("====  " + JSON.stringify(this.response));
            if (this.response != null) {
              this.listaCargosAlumnos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    //Catalogos de cargos
    this.loadFunctionCatCargos = function () {
      this.listaCargos = [];
      this.$http
        .get(
          this.uriTempCargos,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("Consulta " + this.response);
            if (this.response != null) {
              this.listaCargos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionActualizarCargoGeneral = function () {
      this.$root.$emit('actualizacionPorCargoEvent', 'ACTUALIZAR');
    }

    this.mensajeToast = mensaje => {
      $("#toast_msg").text(mensaje);
      $("#toast_id").toast("show");
    };

    this.loadFunctionCargosAlumno();
    this.loadFunctionCatCargos();
  },
  methods: {
    iniciarAgregarCargo() {
      console.log("iniciar agregar cargo ");
      this.cargo.cat_cargo = -1;
      this.cargo.cantidad = 1;
      this.cargo.nota = '';
      this.mensaje = "";
      $('#modal_cargo').modal('show');
    },
    guardarCargo() {
      console.log("guardar cargos");
      if (this.cargo.cat_cargo == -1) {
        console.log("cargo");
        this.mensaje = 'Seleccione el cargo..';
        return;
      }

      if (this.cargo.cantidad == '' || this.cargo.cantidad == -1) {
        this.mensaje = 'Escriba la cantidad del cargo..';
        return;
      }

      console.log("invok");
      this.cargo.genero = this.usuarioSesion.id;
      this.cargo.id_alumno = this.idalumno;

      this.$http
        .post(this.uriTempCargos + "/registrar", this.cargo, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.mensaje = "Se agrego el cargo.";

              $("#modal_cargo").modal("hide");
              this.loadFunctionCargosAlumno();
              this.loadFunctionActualizarCargoGeneral();
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    iniciarAgregarPago() {
      console.log("iniciar agregar pago ");
      this.pago.pago_total = Number(0);
      this.total_cargos = Number(0);
      this.pago.nota_pago = '';

      this.mensaje = "";
      const existeSeleccionAlumno = () => {
        return this.listaCargosAlumnos.some(function (e) {
          return e.checked;
        });
      }

      if (existeSeleccionAlumno()) {
        for (var i = 0; i < this.listaCargosAlumnos.length; i++) {
          var element = this.listaCargosAlumnos[i];
          if (element.checked) {
            element.pago = Number(element.total);
            this.total_cargos = this.total_cargos + Number(element.total); //el total de deudas
          }
        }
        this.pago.pago_total = this.total_cargos;
        //this.total_pagos = this.total_cargos;

        $('#modal_pago').modal('show');

      } else {
        this.mensaje = "Seleccione al menos un cargo";
      }
    },
    reacalcularTotales() {
      var pass = true;
      for (var i = 0; i < this.listaCargosAlumnos.length; i++) {
        var element = this.listaCargosAlumnos[i];
        if (element.checked) {
          if (element.pago == undefined || element.pago == null || element.pago <= 0) {
            pass = false;
            break;
          }
        }
      }

      if (pass) {
        this.pago.pago_total = Number(0);
        for (var i = 0; i < this.listaCargosAlumnos.length; i++) {
          var element = this.listaCargosAlumnos[i];
          if (element.checked && element.pago != null) {
            this.pago.pago_total = this.pago.pago_total + Number(element.pago);
          }
        }
      }
    },
    guardarPago() {
      console.log(" pago " + this.pago.pago_total + " total_calculado " + this.total_cargos);
      this.mensaje = "";
      var pass = true;

      for (var i = 0; i < this.listaCargosAlumnos.length; i++) {
        var element = this.listaCargosAlumnos[i];
        if (element.checked) {
          if (element.pago == undefined || element.pago == null || element.pago <= 0) {
            pass = false;
            break;
          }
        }
      }

      if (!pass) {
        this.mensaje = "Por favor revise las cantidades, No pueden ir Ceros,Negativos ni espacios en blanco.";
      } else {
        //realizar pago
        this.mensaje = "Procede ";

        var lista = this.listaCargosAlumnos
          .filter(e => e.checked)
          .map(e => {
            return {
              id_cargo_balance: e.id_cargo_balance_alumno,
              pago: e.pago
            };
          });

        console.log("  ==> " + JSON.stringify(lista));

        var ids_cargos = "";
        var cargos_desglosados = "";

        var first = true;

        lista.forEach(element => {
          if (first) {
            ids_cargos += element.id_cargo_balance;
            cargos_desglosados += element.pago;
            first = false;
          } else {
            ids_cargos += (',' + element.id_cargo_balance);
            cargos_desglosados += (',' + element.pago);
          }
        });

        console.log(" = = = > " + ids_cargos);
        console.log(" = = = > " + cargos_desglosados);

        var objEnvio = {
          id_alumno: this.idalumno,
          pago: this.pago.pago_total,
          nota: this.pago.nota_pago,
          ids_cargos: ids_cargos,
          cargos_desglosados: cargos_desglosados,
          genero: this.usuarioSesion.id
        };

        this.$http
          .post(this.uriTempPagos + "/registrar", objEnvio, {
            headers: {
              "x-access-token": this.sesion.token
            }
          })
          .then(
            result => {
              this.response = result.data;

              if (this.response != null) {
                console.log("" + this.response);
                this.mensaje = "Se agrego el pago .";

                this.loadFunctionCargosAlumno();
                this.loadFunctionActualizarCargoGeneral();
                $("#modal_pago").modal("hide");
              }
            },
            error => {
              console.error(error);
            }
          );
      }

    },
    verDetalleCargo(item) {

      console.log("Ver detalle cargo " + item.id_cargo_balance_alumno);
      console.log(JSON.stringify(item));

      this.cargoSeleccionado = item;
      console.log("this.cargoSeleccionado.id_cargo_balance_alumno " + this.cargoSeleccionado.id_cargo_balance_alumno);

      this.$http
        .get(this.uriTempPagos + "/" + this.cargoSeleccionado.id_cargo_balance_alumno, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + JSON.stringify(this.response));
              this.listaPagosCargo = result.data;
              $("#modal_detalle_cargo").modal("show");
            }
          },
          error => {
            console.error(error);
          }
        );


    }
  },
};