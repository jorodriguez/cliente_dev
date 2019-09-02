
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import { isRegExp } from "util";
import { timingSafeEqual } from "crypto";

import URL from "../helpers/Urls";


export default {
  name: "cargos-pagos",
  props: ['idalumno','requiere_factura'],

  data() {
    return {
     // uriTempPagos: "http://localhost:5000/pagos",
     // uriTempFormasPagos: "http://localhost:5000/formas_pagos",
    //  uriTempCargos: "http://localhost:5000/cargos",
    

      /*uriTempPagos: "https://api-ambiente-desarrollo.herokuapp.com/pagos",
      uriTempFormasPagos: "https://api-ambiente-desarrollo.herokuapp.com/formas_pagos",
      uriTempCargos: "https://api-ambiente-desarrollo.herokuapp.com/cargos",      
      */
/*
      uriTempPagos: "https://api-ambiente-produccion.herokuapp.com/pagos",
      uriTempFormasPagos: "https://api-ambiente-produccion.herokuapp.com/formas_pagos",
      uriTempCargos: "https://api-ambiente-produccion.herokuapp.com/cargos", 
  */    
      cargo: {
        cantidad: 1,
        cat_cargo: {id:-1,nombre:"",descripcion:"",precio:0,escribir_cantidad:false},        
        total_cargo:0
      },      
      pago: {
        pago_total: 0,
        cat_forma_pago: {id:-1,nombre:"",permite_factura:false},        
        identificador_factura:"",
        nota_pago:""
      },
      cargoSeleccionado: { fecha: null, cargo: 0, total_pago: 0, nota: '' },
      escribir_folio_factura:false,
      existen_montos_facturables:false,
      total_cargos: 0,
      total_pagos: 0,
      seleccionTodos: false,
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      listaCargosAlumnos: [],
      listaCargos: [],
      listaPagos: [],
      listaSeleccionSalida: [],
      listaPagosCargo: [],
      listaFormasPago: [],
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
          //this.uriTempCargos + "/" + this.idalumno,
          URL.CARGOS_BASE + "/" + this.idalumno,
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
          //this.uriTempCargos,
          URL.CARGOS_BASE,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("Consulta del catalogo de cargos" + this.response);
            if (this.response != null) {
              this.listaCargos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionCatFormasPago = function () {
      this.listaFormasPago = [];
      if (this.listaFormasPago.length == 0) {
        console.log("Iniciando consulta de formas pago");
        this.$http
          .get(            
            //this.uriTempFormasPagos,
            URL.FORMAS_PAGO_BASE,
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          )
          .then(
            result => {
              this.response = result.data;
              console.log("Consulta del catalogo de formas pago" + this.response);
              if (this.response != null) {
                this.listaFormasPago = this.response;
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        console.log("La lista de formas de pago ya esta cargada ");
      }
    };

    this.loadFunctionActualizarCargoGeneral = function () {
      this.$root.$emit('actualizacionPorCargoEvent', 'ACTUALIZAR');
    }

    this.mensajeToast = mensaje => {
      $("#toast_msg").text(mensaje);
      $("#toast_id").toast("show");
    };

    this.loadFunctionCargosAlumno();
    //this.loadFunctionCatCargos();
  },
  methods: {
    iniciarAgregarCargo() {
      console.log("iniciar agregar cargo ");
      this.cargo.cat_cargo = {id:-1,nombre:"",descripcion:"",precio:0,escribir_cantidad:false};
      this.cargo.cantidad = 1;
      this.cargo.nota = '';
      this.mensaje = "";
      this.cargo.total_cargo = 0;
      this.loadFunctionCatCargos();
      $('#modal_cargo').modal('show');
    },
    calcularTotalCargo(){       
        if(!this.cargo.cat_cargo.escribir_cantidad){
          this.cargo.cantidad = 1;
        }
        this.cargo.total_cargo = this.cargo.cantidad * this.cargo.cat_cargo.precio;
    },
    guardarCargo() {
      console.log("guardar cargos");
      if (this.cargo.cat_cargo.id == -1) {
        console.log("cargo");
        this.mensaje = 'Seleccione el cargo..';
        return;
      }

      if (this.cargo.cantidad == '' ) {
        this.mensaje = 'Escriba la cantidad del cargo..';
        return;
      }

      if (this.cargo.cantidad <= 0 ) {
        this.mensaje = 'La cantidad no debe ser cero ó negativo..';
        return;
      }

      console.log("invok");
      this.cargo.genero = this.usuarioSesion.id;
      this.cargo.id_alumno = this.idalumno;

      this.$http
        .post(
          //this.uriTempCargos + "/registrar", this.cargo, {
          URL.CARGO_REGISTRAR , this.cargo, {
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
              this.seleccionTodos = false;
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
      this.pago.cat_forma_pago =  {id:-1,nombre:"",permite_factura:false};
      this.pago.identificador_factura = "";
      this.facturado = false;

      this.mensaje = "";
      const existeSeleccionAlumno = () => {
        return this.listaCargosAlumnos.some(function (e) {
          return e.checked;
        });
      }

      const montos_facturables = () => {
        return this.listaCargosAlumnos.some(function (e) {          
          return (e.checked && e.es_facturable);
        });
      }

      this.existen_montos_facturables = montos_facturables();

      if (existeSeleccionAlumno()) {
        for (var i = 0; i < this.listaCargosAlumnos.length; i++) {
          var element = this.listaCargosAlumnos[i];
          if (element.checked) {
            element.pago = Number(element.total);
            this.total_cargos = this.total_cargos + Number(element.total); //el total de deudas
          }
        }
        this.pago.pago_total = this.total_cargos;
        
        this.loadFunctionCatFormasPago();

        $('#modal_pago').modal('show');

      } else {
        this.mensajeToast("Seleccione al menos un cargo");
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
     
      if (this.pago.cat_forma_pago.id == -1) {

        this.mensaje = "Por favor seleccione la forma de pago.";       
        $("#selectFormaPago").focus();
        return;
      }
      
      console.log("permit "+JSON.stringify(this.pago.cat_forma_pago));

      if(this.pago.cat_forma_pago.permite_factura && 
          this.escribir_folio_factura &&
          this.existen_montos_facturables &&
          this.pago.identificador_factura == ""){
        //validar que escriban el folio
        this.mensaje = "Por favor escribe el folio de la factura";
        $("#inputIdentificadorFactura").focus();
        return;
      } else {
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
            cat_forma_pago: this.pago.cat_forma_pago.id,            
            identificador_factura : this.pago.identificador_factura,            
            ids_cargos: ids_cargos,
            cargos_desglosados: cargos_desglosados,
            genero: this.usuarioSesion.id
          };

          this.$http
            .post(
             // this.uriTempPagos + "/registrar", objEnvio, {
              URL.PAGOS_REGISTRAR , objEnvio, {
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
                  this.seleccionTodos = false;
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
      }

    },
    verDetalleCargo(item) {

      console.log("Ver detalle cargo " + item.id_cargo_balance_alumno);
      console.log(JSON.stringify(item));

      this.cargoSeleccionado = item;
      console.log("this.cargoSeleccionado.id_cargo_balance_alumno " + this.cargoSeleccionado.id_cargo_balance_alumno);

      this.$http
        .get(
          //this.uriTempPagos + "/" + this.cargoSeleccionado.id_cargo_balance_alumno, {
          URL.PAGOS_BASE + "/" + this.cargoSeleccionado.id_cargo_balance_alumno, {
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


    },
    seleccionarTodoPagos() {
      console.log("Toggle Seleccionar todos los cargos " + this.seleccionTodos);
      this.listaCargosAlumnos.forEach(element => {
        if(!element.pagado){
          element.checked = this.seleccionTodos;
        }
      });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
  },
};