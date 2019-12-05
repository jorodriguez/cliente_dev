
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import { operacionesApi } from "../helpers/OperacionesApi";
//import AlumnoApi from "./AlumnoApi";
import URL from "../helpers/Urls";
import Popup from './Popup'
import Datepicker from 'vuejs-datepicker';
import CONSTANTES from '../helpers/ConstantesHelp';

export default {
  name: "cargos-pagos",
  components: {
    Popup, Datepicker
  },
  props: ['idalumno', 'requiere_factura'],
  mixins: [operacionesApi],
  data() {
    return {
      cargo: {
        cantidad: 1,
        cat_cargo: { id: -1, nombre: "", descripcion: "", precio: 0, escribir_cantidad: false },
        total_cargo: 0
      },
      pago: {
        pago_total: 0,
        cat_forma_pago: { id: -1, nombre: "", permite_factura: false },
        identificador_factura: "",
        nota_pago: ""
      },
      cargoSeleccionado: { fecha: null, cargo: 0, total_pago: 0, nota: '' },
      escribir_folio_factura: false,
      existen_montos_facturables: false,
      total_cargos: 0,
      total_pagos: 0,
      seleccionTodos: false,
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      alumno: null,
      listaCargosAlumnos: [],
      listaCargos: [],
      listaPagos: [],
      listaSeleccionSalida: [],
      listaPagosCargo: [],
      listaFormasPago: [],
      listaMesesAdeuda: [],
      loadFunctionCargosAlumno: null,
      loadFunctionCatCargos: null,
      loadFunctionActualizarCargoGeneral: null,
      loadFunctionMesesAdeuda:null,
      response: "",
      mensaje: "",
      motivo_eliminacion: ""
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

      this.get(
        URL.CARGOS_BASE + "/" + this.idalumno,
        this.sesion.token,
        (result) => {
          this.response = result.data;
          console.log("====  " + JSON.stringify(this.response));
          if (this.response != null) {
            this.listaCargosAlumnos = this.response;
          }
        }
      );
    };

    //Catalogos de cargos
    this.loadFunctionCatCargos = function () {
      this.listaCargos = [];
      this.get(
        URL.CARGOS_BASE,
        this.sesion.token,
        (result) => {
          this.response = result.data;
          console.log("Consulta del catalogo de cargos" + this.response);
          if (this.response != null) {
            this.listaCargos = this.response;
          }
        }
      );
    };

    this.loadFunctionCatFormasPago = function () {
      this.listaFormasPago = [];
      if (this.listaFormasPago.length == 0) {
        console.log("Iniciando consulta de formas pago");

        this.get(
          URL.FORMAS_PAGO_BASE,
          this.sesion.token,
          result => {
            this.response = result.data;
            console.log("Consulta del catalogo de formas pago" + this.response);
            if (this.response != null) {
              this.listaFormasPago = this.response;
            }
          }
        );
      } else {
        console.log("La lista de formas de pago ya esta cargada ");
      }
    };


    this.loadFunctionMesesAdeuda = function () {
      console.log("Iniciando consulta de meses adeuda");

      this.get(
        URL.MESES_ADEUDA + this.idalumno,
        this.sesion.token,
        results => {
          console.log("Consulta de meses " + results.data);
          if (results.data != null) {
            this.listaMesesAdeuda = results.data;
          }
        }
      );
    };

    this.loadFunctionActualizarCargoGeneral = function () {
      this.$root.$emit('actualizacionPorCargoEvent', 'ACTUALIZAR');
    }

    this.loadFunctionCargosAlumno();
    //this.loadFunctionCatCargos();
  },
  methods: {
    iniciarAgregarCargo() {
      console.log("iniciar agregar cargo ");
      this.cargo.cat_cargo = { id: -1, nombre: "", descripcion: "", precio: 0, escribir_cantidad: false, seleccionar_fecha: false };
      this.cargo.cantidad = 1;
      this.cargo.monto = 1;
      this.cargo.nota = '';
      this.cargo.mes_seleccionado = undefined;
      this.mensaje = "";
      this.cargo.total_cargo = 0;
      /*
          AlumnoApi.getAlumnoById(
                    this.idalumno,
                    this.sesion.token,
                    result => {
                      this.alumno = result;
                    })*/

      this.get(
        URL.ALUMNOS_BASE + "/id/" + this.idalumno,
        this.sesion.token,
        (result) => {
          this.alumno = result.data;         
          console.log("==== >>"+JSON.stringify(this.alumno));
        }
      );


      this.loadFunctionCatCargos();
      //Cargar colegiatura e inscripcion del alumno seleccionado y asignarla al monto al cambiar el cargo

      $('#modal_cargo').modal('show');
    },
    onChangeCargo() {
      console.log("cargo.cat_cargo " + JSON.stringify(this.cargo.cat_cargo));
      if (!this.cargo.cat_cargo.escribir_cantidad) {
        this.cargo.cantidad = 1;
      }
      this.cargo.monto = this.cargo.cat_cargo.precio;
      this.calcularTotalCargo();

      console.log("????? "+JSON.stringify(CONSTANTES));
      //cargar mensualidades si se selecciono la mensualidad
      if (this.cargo.cat_cargo.id == CONSTANTES.ID_CARGO_MENSUALIDAD && this.listaMesesAdeuda == []) {
        this.cargo.monto = this.alumno.costo_colegiatura;
        this.loadFunctionMesesAdeuda();
      }
    },
    calcularTotalCargo() {
      console.log("recalcular total ");
      if (this.cargo.cantidad == undefined) {
        this.cargo.cantidad = 1;
      }

      if (this.cargo.monto == undefined) {
        this.cargo.monto = this.cargo.cat_cargo.precio;
      }

      this.cargo.total_cargo = (this.cargo.cantidad * this.cargo.monto);
      console.log("total calculado " + this.cargo.total_cargo);
      console.log("precio de cargo " + this.cargo.precio);
    },
    guardarCargo() {
      console.log("guardar cargos");
      if (this.cargo.cat_cargo.id == -1) {
        console.log("cargo");
        this.$notificacion.error('Seleccione el cargo', 'Seleccione un cargo de la lista.');
        return;
      }

      if (this.cargo.cat_cargo.seleccionar_fecha
        && (this.cargo.mes_seleccionado == undefined
          || this.cargo.mes_seleccionado == '' || this.cargo.mes_seleccionado == null)) {
        this.$notificacion.error('Seleccione un mes de la lista ..', '');
        return;
      }

      if (this.cargo.cat_cargo.escribir_cantidad
        && this.cargo.cantidad == undefined || this.cargo.cantidad == '') {
        this.$notificacion.error('Escriba la cantidad del cargo..', '');
        return;
      }

      if (this.cargo.cantidad <= 0) {
        this.$notificacion.error('La cantidad no debe ser cero ó negativo..', '');
        return;
      }

      if (this.cargo.cat_cargo.escribir_monto
        && (this.cargo.monto == undefined || this.cargo.monto == '' && this.cargo.monto == null)) {
        this.$notificacion.error('Escriba el monto..', '');
        return;
      }

      if (this.cargo.cat_cargo.escribir_monto && this.cargo.monto <= 0) {
        this.$notificacion.error('El monto no debe ser cero ó negativo..', '');
        return;
      }

      console.log("invocar");
      this.cargo.genero = this.usuarioSesion.id;
      this.cargo.id_alumno = this.idalumno;

      this.post(
        URL.CARGO_REGISTRAR,
        this.cargo,
        this.sesion.token,
        (result) => {
          this.response = result.data;

          if (this.response != null) {
            console.log("" + this.response);
            this.$notificacion.info("Se agrego el cargo", "");
            this.seleccionTodos = false;
            $("#modal_cargo").modal("hide");
            this.loadFunctionCargosAlumno();
            this.loadFunctionActualizarCargoGeneral();
          }
        }
      );
    },
    iniciarAgregarPago() {
      console.log("iniciar agregar pago ");
      this.pago.pago_total = Number(0);
      this.total_cargos = Number(0);
      this.pago.nota_pago = '';
      this.pago.cat_forma_pago = { id: -1, nombre: "", permite_factura: false };
      this.pago.identificador_factura = "";
      this.facturado = false;

      this.mensaje = "";


      const montos_facturables = () => {
        return this.listaCargosAlumnos.some(function (e) {
          return (e.checked && e.es_facturable);
        });
      }

      this.existen_montos_facturables = montos_facturables();

      if (existeSeleccionAlumno(this.listaCargosAlumnos)) {
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
        this.$notificacion.info("Seleccione al menos un cargo", "");
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
      if (this.pago.cat_forma_pago.permite_factura &&
        this.escribir_folio_factura &&
        this.existen_montos_facturables &&
        this.pago.identificador_factura == "") {
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
            identificador_factura: this.pago.identificador_factura,
            ids_cargos: ids_cargos,
            cargos_desglosados: cargos_desglosados,
            genero: this.usuarioSesion.id
          };

          this.post(
            URL.PAGOS_REGISTRAR,
            objEnvio,
            this.sesion.token,
            (result) => {
              this.response = result.data;
              if (this.response != null) {
                console.log("" + this.response);
                this.mensaje = "Se agrego el pago .";
                this.seleccionTodos = false;
                this.loadFunctionCargosAlumno();
                this.loadFunctionActualizarCargoGeneral();
                $("#modal_pago").modal("hide");
              }
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

      this.get(
        URL.PAGOS_BASE + "/" + this.cargoSeleccionado.id_cargo_balance_alumno,
        this.sesion.token,
        result => {
          this.response = result.data;
          if (this.response != null) {
            console.log("" + JSON.stringify(this.response));
            this.listaPagosCargo = result.data;
            $("#modal_detalle_cargo").modal("show");
          }
        }
      );
    },
    seleccionarTodoPagos() {

      console.log("Toggle Seleccionar todos los cargos " + this.seleccionTodos);

      this.listaCargosAlumnos.forEach(element => {
        if (!element.pagado) {
          element.checked = this.seleccionTodos;
        }
      });
    },
    iniciarEliminacionCargo() {
      if (existeSeleccionAlumno(this.listaCargosAlumnos)) {
        this.motivo_eliminacion = "";
        $("#eliminarCargoAlumno").modal("show");
      }
    },
    confirmarEliminacion() {
      if (this.motivo_eliminacion == "") {
        this.mensaje = "Escribe el motivo de eliminaciòn";
      } else {

        var lista = this.listaCargosAlumnos
          .filter(e => e.checked)
          .map(e => e.id_cargo_balance_alumno);
        console.log(JSON.stringify(lista));

        //ids, motivo,genero
        this.put(
          URL.CARGOS_BASE + "/" + this.idalumno,
          {
            ids: lista,
            motivo: this.motivo_eliminacion,
            genero: this.usuarioSesion.id
          },
          this.sesion.token,
          result => {
            this.response = result.data;
            if (this.response != null) {
              this.mensaje = "Se elimino correctamente";
              this.seleccionTodos = false;
              this.loadFunctionCargosAlumno();
              this.loadFunctionActualizarCargoGeneral();
              $("#eliminarCargoAlumno").modal("hide");
            }
          }
        );
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    onChangeMensualidad() {
      if (this.cargo.mes_seleccionado.cargo_registrado)
        this.mensaje = "El cargo ya fué registrado para este mes..";
      this.$notificacion.warn("Cargo ya fué registrado", "El cargo para el mes seleccionado ya fue registrado.");

    }
  },
};

function existeSeleccionAlumno(lista) {
  return lista.some(function (e) {
    return e.checked;
  });
}