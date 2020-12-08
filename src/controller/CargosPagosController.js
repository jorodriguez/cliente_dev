
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import Popup from './Popup'
import Datepicker from 'vuejs-datepicker';
import CONSTANTES from "../helpers/Constantes";
import { getUsuarioSesion } from '../helpers/Sesion';
import ReenviarComprobantePago from '../components_utils/ReenviarComprobantePago';


export default {
  name: "cargos-pagos",
  components: {
    Popup, Datepicker,ReenviarComprobantePago
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
        descuento_total: 0,
        cat_forma_pago: { id: -1, nombre: "", permite_factura: false },
        identificador_factura: "",
        nota_pago: ""
      },
      cargoSeleccionado: { fecha: null, cargo: 0, total_pago: 0, nota: '' },
      noOptionDescuento: { id: -1, nombre: " NA ", descuento_decimal: 0.0 },
      escribir_folio_factura: false,
      existen_montos_facturables: false,
      total_cargos: 0,
      total_pagos: 0,
      total_adeuda: 0,
      seleccionTodos: false,
      usuarioSesion: {},
      item: AlumnoModel,
      alumno: null,
      listaCargosAlumnos: [],
      listaCargosAlumnosSeleccionados:[],
      listaCargos: [],
      listaPagos: [],
      listaDescuentos: [],
      listaSeleccionSalida: [],
      listaPagosCargo: [],
      listaFormasPago: [],
      listaMesesAdeuda: [],
      loadFunctionCargosAlumno: null,
      loadFunctionCatCargos: null,
      loadFunctionActualizarCargoGeneral: null,
      loadFunctionMesesAdeuda: null,
      motivo_eliminacion: "",
      loader_reenvio:false,
      mensaje_reenvio:""
    };
  },
  mounted() {
    console.log("iniciando el componente de pagos y cargos ");

    this.usuarioSesion = getUsuarioSesion();
    this.loadFunctionCargosAlumno = function () {
      this.get(
        URL.CARGOS_BASE + "/" + this.idalumno,

        (result) => {
          if (result.data != null) {
            this.listaCargosAlumnos = result.data;
          }
        }
      );
    };

    //Catalogos de cargos
    this.loadFunctionCatCargos = function () {
      this.listaCargos = [];
      this.get(
        URL.CARGOS_BASE,

        (result) => {
          console.log("Consulta del catalogo de cargos" + result.data);
          if (result.data != null) {
            this.listaCargos = result.data;
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

          result => {
            console.log("Consulta del catalogo de formas pago" + result.data);
            if (result.data != null) {
              this.listaFormasPago = result.data;
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

  },
  watch: {
    idalumno: function (newId, oldId) {
      console.log(`Observador para cambios de valor del id de alumno ${newId} - ${oldId}`);
      this.loadFunctionCargosAlumno();
    }
  },
  methods: {
    async iniciarAgregarCargo() {
      console.log("iniciar agregar cargo ");
      this.cargo.cat_cargo = { id: -1, nombre: "", descripcion: "", precio: 0, escribir_cantidad: false, seleccionar_fecha: false };
      this.cargo.cantidad = 1;
      this.cargo.monto = 1;
      this.cargo.nota = '';
      this.cargo.fecha_cargo = undefined;
      this.mensaje = "";
      this.cargo.total_cargo = 0;

      await this.get(
        URL.ALUMNOS_BASE + "/id/" + this.idalumno,

        (result) => {
          this.alumno = result.data;
          console.log("==== >>" + JSON.stringify(this.alumno));
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

      let id_cargo_mes = CONSTANTES.ID_CARGO_MENSUALIDAD;
      //cargar mensualidades si se selecciono la mensualidad
      if (this.cargo.cat_cargo.id == id_cargo_mes) {
        this.cargo.monto = this.alumno.costo_colegiatura;
        if (this.listaMesesAdeuda.length == 0) {
          this.loadFunctionMesesAdeuda();
        }
      } else {
        if (this.cargo.cat_cargo.id == CONSTANTES.ID_CARGO_INCRIPCION) {
          this.cargo.monto = this.alumno.costo_inscripcion;
        }
      }
    },
    onChangeMensualidad() {
      if (this.cargo.mes_seleccionado.cargo_registrado) {
        this.$notificacion.warn("Cargo ya fué registrado", "El cargo para el mes seleccionado ya fue registrado.");
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
        && (this.cargo.fecha_cargo == undefined
          || this.cargo.fecha_cargo == '' || this.cargo.fecha_cargo == null)) {
        this.$notificacion.error('Seleccione el mes al cual corresponde el cargo de mensualidad.', '');
        return;
      }

      console.log("Fecha seleccionada " + JSON.stringify(this.cargo.fecha_cargo));

      if (this.cargo.cat_cargo.escribir_cantidad
        && this.cargo.cantidad == undefined || this.cargo.cantidad == '') {
        this.$notificacion.error('Escriba la cantidad del cargo.', '');
        return;
      }

      if (this.cargo.cantidad <= 0) {
        this.$notificacion.error('La cantidad no debe ser cero ó negativo.', '');
        return;
      }

      if (this.cargo.cat_cargo.escribir_monto
        && (this.cargo.monto == undefined || this.cargo.monto == '' && this.cargo.monto == null)) {
        this.$notificacion.error('Escriba el monto.', '');
        return;
      }

      if (this.cargo.cat_cargo.escribir_monto && this.cargo.monto <= 0) {
        this.$notificacion.error('El monto no debe ser cero ó negativo.', '');
        return;
      }

      console.log("invocar");
      this.cargo.genero = this.usuarioSesion.id;
      this.cargo.id_alumno = this.idalumno;

      this.post(
        URL.CARGO_REGISTRAR,
        this.cargo,

        (result) => {
          if (result.data != null) {
            this.$notificacion.info("Se agrego el cargo", "");
            this.seleccionTodos = false;
            $("#modal_cargo").modal("hide");
            this.listaMesesAdeuda = [];
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
      this.pago.identificador_pago = "";
      this.pago.descuento_total = 0;
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
            element.total_original = Number(element.total);
            //this.total_cargos = this.total_cargos + Number(element.total); //el total de deudas            
            this.total_cargos = this.total_cargos + Number(element.total); //el total de deudas            
            element.cat_descuento = this.noOptionDescuento;
            element.descuento_decimal = 0.0;
            element.descuento = 0.0;
            
            this.listaCargosAlumnosSeleccionados.push(Object.assign({}, element));
          }
        }
        this.pago.pago_total = this.total_cargos;

        this.loadFunctionCatFormasPago();
        this.loadDescuentos();

        $('#modal_pago').modal('show');

      } else {
        this.$notificacion.info("Seleccione al menos un cargo", "");
      }
    },
    cancelarEfectuarPago(){
      console.log("Cancelar agregar pago");
      this.listaCargosAlumnosSeleccionados=[];
      $('#modal_pago').modal('hide');
  /*    for (var i = 0; i < this.listaCargosAlumnos.length; i++) {
        var element = this.listaCargosAlumnos[i];
        if (element.checked && element.cat_descuento != -1) {          
          element.cat_descuento = this.noOptionDescuento;
          console.log("this.pago.descuento_total  " + this.pago.descuento_total);
        }
      }
*/
    },
    reacalcularTotales() {
      var pass = true;
      for (var i = 0; i < this.listaCargosAlumnosSeleccionados.length; i++) {
        var element = this.listaCargosAlumnosSeleccionados[i];
        if (element.checked) {
          if (element.pago == undefined || element.pago == null || element.pago <= 0) {
            pass = false;
            break;
          }
        }
      }

      if (pass) {
        this.pago.pago_total = Number(0);
        this.pago.descuento_total = Number(0);
        for (var i = 0; i < this.listaCargosAlumnosSeleccionados.length; i++) {
          var element = this.listaCargosAlumnosSeleccionados[i];
          if (element.checked && element.pago != null) {
            this.pago.pago_total = this.pago.pago_total + Number(element.pago);
            this.pago.descuento_total = this.pago.descuento_total + Number(element.descuento);
            console.log("this.pago.descuento_total  " + this.pago.descuento_total);
          }
        }

        this.tota_adeuda = this.total_cargos - (this.pago.descuento_total + this.pago.pago_total);

      }
    },
    reacalcularTotalDescuento(row) {
      console.log("Recalcular descuento " + JSON.stringify(row));
      //row.descuento_decimal = row.descuento
      if (row.cat_descuento && row.cat_descuento.id == -1) {
        console.log("Regresar total  original");
        row.descuento = 0.0;
        row.total = row.total_original;
        row.pago = row.total;
        this.reacalcularTotales();
      }
      if (row.cat_descuento && row.cat_descuento.id != -1) {
        console.log("Recalcular el total con el descuento " + row.cat_descuento.descuento);
        row.descuento = (row.cat_descuento.descuento_decimal * row.total_original);
        row.total = (row.total_original - row.descuento);
        row.pago = row.total;
        this.reacalcularTotales();
      }
    },
    guardarPago() {

      console.log("=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>guardar pago <<<<<<<<<<<<<<<<<<<<<<<<<");
      console.log(" pago " + this.pago.pago_total + " total_calculado " + this.total_cargos);

      var pass = true;

      if (this.pago.cat_forma_pago.id == -1) {
        this.$notificacion.warn("Por favor seleccione la forma de pago", "Seleccione una forma de pago de la lista.");
        this.mensaje = ".";

        $("#selectFormaPago").focus();
        return;
      }
      if (this.pago.cat_forma_pago.permite_factura &&
        this.escribir_folio_factura &&
        this.existen_montos_facturables &&
        this.pago.identificador_factura == "") {
        //validar que escriban el folio       
        this.$notificacion.warn("Por favor escribe el folio de la factura", "Por favor escribe el folio de la factura.");
        $("#inputIdentificadorFactura").focus();
        return;
      } else {
        for (var i = 0; i < this.listaCargosAlumnosSeleccionados.length; i++) {
          var element = this.listaCargosAlumnosSeleccionados[i];
          if (element.checked) {
            if (element.pago == undefined || element.pago == null || element.pago <= 0) {
              pass = false;
              break;
            }
          }
        }

        if (!pass) {
          this.$notificacion.warn("Por favor revise las cantidades", "No pueden ir Ceros, Negativos ni espacios en blanco.");

        } else {

          var lista = this.listaCargosAlumnosSeleccionados
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

          //--Obtener los cargos con descuentos 
          var ids_cargos_descuento = "";
          var ids_descuentos_desglose = "";

          for(var i=0;i < this.listaCargosAlumnosSeleccionados.length;i++){
            let el = this.listaCargosAlumnosSeleccionados[i];
            if(el.checked &&  el.cat_descuento.id != -1){
              console.log(" cargo seleccion>  "+JSON.stringify(el));
            }
              
          }

          var listaCargosDescuentos = this.listaCargosAlumnosSeleccionados
          .filter(e => (e.checked && e.cat_descuento.id != -1))
          .map(e => {
            return {
              id_cargo: e.id_cargo_balance_alumno,
              id_descuento: e.cat_descuento.id              
            };
          });
          first = true;

          listaCargosDescuentos.forEach(element => {
            if (first) {
              ids_cargos_descuento += element.id_cargo;
              ids_descuentos_desglose += element.id_descuento;
              first = false;
            } else {
              ids_cargos_descuento += (',' + element.id_cargo);
              ids_descuentos_desglose += (',' + element.id_descuento);
            }
          });
          console.log(" = = = cargos descuentos > " + ids_cargos_descuento);
          console.log(" = = = descuentos > " + ids_descuentos_desglose);



          var objEnvio = {
            id_alumno: this.idalumno,
            pago: this.pago.pago_total,
            nota: this.pago.nota_pago,
            ids_cargos: ids_cargos,
            cargos_desglosados: cargos_desglosados,
            ids_cargos_descuento : ids_cargos_descuento,
            id_descuentos_desglose : ids_descuentos_desglose,
            cat_forma_pago: this.pago.cat_forma_pago.id,
            identificador_factura: this.pago.identificador_factura,                        
            identificador_pago : this.pago.identificador_pago,
            genero: this.usuarioSesion.id
          };

          this.post(
            URL.PAGOS_REGISTRAR,
            objEnvio,

            (result) => {
              if (result.data != null) {
                console.log("" + result.data);
                this.$notificacion.warn("Se agregó el pago ", "");
                this.seleccionTodos = false;
                this.loadFunctionCargosAlumno();
                this.loadFunctionActualizarCargoGeneral();
                this.listaCargosAlumnosSeleccionados=[];
                $("#modal_pago").modal("hide");
              }
            }
          );
        }
      }
    },
    verDetalleCargo(item) {

      console.log("Ver detalle cargo " + item.id_cargo_balance_alumno);

      this.cargoSeleccionado = item;
      this.get(
        URL.PAGOS_BASE + "/" + this.cargoSeleccionado.id_cargo_balance_alumno,
        result => {
          if (result.data != null) {
            console.log("" + JSON.stringify(result.data));
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
      } else {
        this.$notificacion.error("Seleccione al menos un cargo para eliminar", "");
      }
    },
    confirmarEliminacion() {
      if (this.motivo_eliminacion == "") {
        this.$notificacion.warn("Escribe el motivo de eliminación", "");
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

          result => {
            if (result.data != null) {
              this.$notificacion.info("Se elimino correctamente", "");
              this.seleccionTodos = false;
              this.loadFunctionCargosAlumno();
              this.loadFunctionActualizarCargoGeneral();
              this.loadFunctionMesesAdeuda();
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
    loadDescuentos() {
      console.log("Cargar lista de descuento");
      this.get(
        URL.CAT_DESCUENTOS + "/" + this.usuarioSesion.id_empresa,
        results => {
          console.log("Consulta de descuentos " + results.data);
          if (results.data != null) {
            this.listaDescuentos = results.data;
          }
        }
      );
    }   
  },
};

function existeSeleccionAlumno(lista) {
  return lista.some(function (e) {
    return e.checked;
  });
}