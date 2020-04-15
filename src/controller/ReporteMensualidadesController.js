import Vue from "vue";
import URL from "../helpers/Urls";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Popup from './Popup'
import RecordatorioPago from './RecordatorioPago'
import TABLE_CONFIG from "../helpers/DatatableConfig";
import { operacionesApi } from "../helpers/OperacionesApi";
import { castNumMonthToSpanish } from "../helpers/UtilsDate";
import { getUsuarioSesion } from '../helpers/Sesion';
import CeldaMesMensualidad from '../components_admin/fragmentos/CeldaMesMensualidad';
import SucursalCard from '../components_admin/fragmentos/SucursalCard';
import Loader from "../components_utils/Loader";

export default {
  name: "ReporteMensualidades",
  components: {
    VueGoodTable,
    Popup,
    Loader,
    RecordatorioPago,
    CeldaMesMensualidad, SucursalCard
  },
  mixins: [operacionesApi],
  data() {
    return {
      uriTemp: URL.REPORTE_MENSUALIDADES,
      listaSucursales: [],
      listaCargos: [],
      listaCargosResp: [],
      listaFiltroAnios: [],
      rowSelection: [],
      listaCorreosEnviarRecordatorio: [],
      listaMeses: [],
      usuarioSesion: {},
      anio_seleccionado: null,
      mes_seleccionado: null,
      pago_seleccionado: null,
      sucursal_seleccionada: { id_sucursal: 0, nombre: "" },
      loadFunctionReporteContadoresMesSucursal: null,
      loadFunctionReporteMensualidadesSucursal: null,
      loadFunctionCargaListaMensualidadPorSucursal: null,
      loadFunctionFiltroAnios: null,
      loadFunctionMeses: null,
      enviarRecordatorioFunction: null,
      filtrarCargos: null,
      verTodosCargos: false,
      respuesta: "",
      isLoading: false,
      estatus_respuesta: false,
      response: "",
      mensaje: "",
      TABLE_CONFIG: TABLE_CONFIG,
      texto_recordatorio: "",
      mostrar_mes: false,
      mostrar_monto: true,
      mostrar_pagado: false,
      mostrar_adeuda: false,
      nombre_reporte: "reporte.xls",
      nombre_libro: 'libro1',
      sumasMeses: {
        enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0,
        junio: 0, julio: 0, agosto: 0, septiembre: 0,
        octubre: 0, noviembre: 0, diciembre: 0,
      },
      sumaTotalPagadoMeses: {
        enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0,
        junio: 0, julio: 0, agosto: 0, septiembre: 0,
        octubre: 0, noviembre: 0, diciembre: 0,
      },
      sumaTotalDescuentosMeses: {
        enero: 0, febrero: 0, marzo: 0, abril: 0, mayo: 0,
        junio: 0, julio: 0, agosto: 0, septiembre: 0,
        octubre: 0, noviembre: 0, diciembre: 0,
      },
      columnExport: {
        sucursal: "sucursal",
        alumno: "alumno",
        enero: {
          field: 'enero', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_ene: "porcentaje_enero",
        descuento_ene: {
          field: 'enero', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_ene: {
          field: 'enero', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        febrero: {
          field: 'febrero', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_feb: "porcentaje_febrero",
        descuento_feb: {
          field: 'febrero', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_feb: {
          field: 'febrero', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        marzo: {
          field: 'marzo', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_mar: "porcentaje_marzo",
        descuento_mar: {
          field: 'marzo', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_mar: {
          field: 'marzo', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },

        abril: {
          field: 'abril', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_abr: "porcentaje_abril",
        descuento_abr: {
          field: 'abril', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_abr: {
          field: 'abril', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        mayo: {
          field: 'mayo', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_may: "porcentaje_mayo",
        descuento_may: {
          field: 'mayo', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_may: {
          field: 'mayo', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        junio: {
          field: 'junio', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_jun: "porcentaje_junio",
        descuento_jun: {
          field: 'junio', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_jun: {
          field: 'junio', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        julio: {
          field: 'julio', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_jul: "porcentaje_julio",
        descuento_jul: {
          field: 'julio', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_jul: {
          field: 'julio', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        agosto: {
          field: 'agosto', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_ago: "porcentaje_agosto",
        descuento_ago: {
          field: 'agosto', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_ago: {
          field: 'agosto', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        septiembre: {
          field: 'septiembre', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_sep: "porcentaje_septiembre",
        descuento_sep: {
          field: 'septiembre', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_sep: {
          field: 'septiembre', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        octubre: {
          field: 'octubre', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_oct: "porcentaje_octubre",
        descuento_oct: {
          field: 'octubre', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_oct: {
          field: 'octubre', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        noviembre: {
          field: 'noviembre', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_nov: "porcentaje_noviembre",
        descuento_nov: {
          field: 'noviembre', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_nov: {
          field: 'noviembre', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        },
        diciembre: {
          field: 'diciembre', callback: (value) => {
            return this.obtenerValorCargo(value);
          }
        },
        porc_mens_dic: "porcentaje_diciembre",
        descuento_dic: {
          field: 'diciembre', callback: (value) => {
            return this.obtenerValorDescuento(value);
          }
        },
        importe_dic: {
          field: 'diciembre', callback: (value) => {
            return value != null ? value.total_pagado : 0;
          }
        }

      },
      columnsCargos: [
        {
          id: -1,
          label: 'Id',
          field: 'id',
          hidden: true
        },
        {
          id: -1,
          label: 'Alumno',
          field: 'alumno',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          id: 1,
          label: 'Ene',
          field: 'enero',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: '% Men.',
          field: 'porcentaje_enero',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Desc.',
          field: 'descuento_enero',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Importe',
          field: 'importe_enero',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          id: 2,
          label: 'Feb',
          field: 'febrero',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_febrero', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_febrero', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_febrero', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 3,
          label: 'Mar',
          field: 'marzo',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Mensualidad', field: 'porcentaje_marzo', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_marzo', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_marzo', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 4,
          label: 'Abr',
          field: 'abril',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Mensualidad', field: 'porcentaje_abril', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_abril', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_abril', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 5,
          label: 'May',
          field: 'mayo',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_mayo', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_mayo', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_mayo', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        {
          id: 6,
          label: 'Jun',
          field: 'junio',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_junio', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_junio', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_junio', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 7,
          label: 'Jul',
          field: 'julio',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_julio', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_julio', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_julio', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 8,
          label: 'Ago',
          field: 'agosto',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_agosto', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_agosto', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_agosto', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 9,
          label: 'Sept',
          field: 'septiembre',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_septiembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_septiembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_septiembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 10,
          label: 'Oct',
          field: 'octubre',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_octubre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_octubre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_octubre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 11,
          label: 'Nov',
          field: 'noviembre',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_noviembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_noviembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_noviembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },

        {
          id: 12,
          label: 'Dic',
          field: 'diciembre',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        { label: '% Men.', field: 'porcentaje_diciembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Desc.', field: 'descuento_diciembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },
        { label: 'Importe', field: 'importe_diciembre', filterable: true, thClass: 'text-center', tdClass: 'text-center' },


      ]
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de mensualidades ");

    this.usuarioSesion = getUsuarioSesion();

    //para mostrar las sucursales
    this.loadFunctionSucursalesAsignadas = function () {

      console.log("@@loadFunctionSucursalesAsignadas usuario " + this.usuarioSesion.id);
      this.get(
        URL.SUCURSAL_USUARIO_ASIGNADAS + "/" + this.usuarioSesion.id,
        result => {
          console.log("Consulta cargos por sucursal" + result.data);
          if (result.data != null) {
            this.listaSucursales = result.data;
            if (this.listaSucursales != null && this.listaSucursales.length > 0) {
              /*if (this.mes_seleccionado == null) {
                this.mes_seleccionado = this.listaSucursales[0].anio_mes;
              }*/
            }
          }
        }
      );
    };


    this.loadFunctionReporteMensualidadesSucursal = (id_sucursal) => {
      console.log("@@loadFunctionReporteMensualidadesSucursal");
      console.log("sucr " + id_sucursal + " mes " + this.anio_seleccionado);
      this.isLoading = true;
      this.get(
        this.uriTemp + "/" + id_sucursal + "/" + this.anio_seleccionado,
        (result) => {
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.listaCargos = result.data;
            this.calcularOperaciones();
            this.isLoading = false;
          }
        }
      );
    };

    this.enviarRecordatorioFunction = function (id_alumno, nombre_padres) {

      $("#cuerpo_notificador_principal").append("<span id='spiner_" + id_alumno + "' class='spinner-border'/> <span id='msg_send_" + id_alumno + "' >Enviando a " + nombre_padres + "</span>");

      if (id_alumno == null) {
        $("#msg_send_" + id_alumno).append("<span class='exclamation-triangle text-danger'>No Enviado debido a un error en la validación previa</span><br/>");
        $("#spiner_" + id_alumno).remove();
      } else {
        let respuesta = "";
        let estatus_respuesta = false;

        this.put(
          URL.ENVIAR_RECORDATORIO_PAGO_ALUMNO + "/" + id_alumno,
          {
            nota: this.texto_recordatorio,
            nota_escrita: true //poner un checkbox
          },

          (result) => {
            if (result.data != null) {
              console.log(JSON.stringify(result.data));
              respuesta = result.data.respuesta;
              estatus_respuesta = result.data.estatus;

              $("#msg_send_" + id_alumno).append("<i class='" + (estatus_respuesta == true ? "fas fa-check text-primary" : "exclamation-triangle  text-danger") + "' > " + respuesta + "</i><br/>");
              $("#spiner_" + id_alumno).remove();
            } else {
              $("#msg_send_" + id_alumno).append("<i class='exclamation-triangle text-danger'>Error</i><br/>");
              $("#spiner_" + id_alumno).remove();
            }
          }
        );
      };
    }

    this.loadFunctionCargaListaMensualidadPorSucursal = () => {
      console.log("@@loadFunctionFiltroAnio " + this.sucursal_seleccionada.id);
      this.get(
        URL.CARGOS_BASE + "/filtro_anios/" + this.sucursal_seleccionada.id,
        result => {
          console.log("Consulta filtro años por sucursal" + result.data);
          if (result.data != null) {
            this.listaFiltroAnios = result.data;
            if (this.listaFiltroAnios != null && this.listaFiltroAnios.length > 0) {
              if (this.anio_seleccionado == null) {
                this.anio_seleccionado = this.listaFiltroAnios[0].anio;
                console.log("Año seleccionado " + this.anio_seleccionado);
              }

              this.loadFunctionReporteMensualidadesSucursal(this.sucursal_seleccionada.id);

            }
          }
        }
      );
    };

    this.loadFunctionSucursalesAsignadas();
  },
  methods: {

    verListaMensualidadesFacturadas(row_sucursal) {
      console.log("row sucursal " + JSON.stringify(row_sucursal));
      this.sucursal_seleccionada = row_sucursal;
      this.nombre_reporte = this.sucursal_seleccionada.nombre;
      this.nombre_libro =this.sucursal_seleccionada.nombre;
      this.loadFunctionCargaListaMensualidadPorSucursal();

    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    toggleTodosCargos() {
      console.log("Ver todos los cargos " + this.verTodosCargos);
      this.verTodosCargos = !this.verTodosCargos;
      this.filtrarCargos();
    },
    formatNumeroMes(num_mes) {
      return castNumMonthToSpanish(num_mes).es;
    },
    cambiarAnio() {
      //this.anio_seleccionado = row;
      this.loadFunctionReporteMensualidadesSucursal(this.sucursal_seleccionada.id);
    },
    obtenerValorCargo(valor) {
      if (valor != null && valor.cargo) {
        return valor.cargo;
      } else { return 0; }
    },
    obtenerValorDescuento(valor) {
      if (valor != null && valor.descuento) {
        return valor.descuento;
      } else { return 0; }
    },
    obtenerValorTotalPagado(valor) {
      if (valor != null && valor.total_pagado) {
        return valor.total_pagado;
      } else { return 0; }
    },
    calcularOperaciones() {
      this.sumasMeses.enero = 0;
      this.sumasMeses.febrero = 0;
      this.sumasMeses.marzo = 0;
      this.sumasMeses.abril = 0;
      this.sumasMeses.mayo = 0;
      this.sumasMeses.junio = 0;
      this.sumasMeses.julio = 0;
      this.sumasMeses.agosto = 0;
      this.sumasMeses.septiembre = 0;
      this.sumasMeses.octubre = 0;
      this.sumasMeses.noviembre = 0;
      this.sumasMeses.diciembre = 0;


      for (let i = 0; i < this.listaCargos.length; i++) {
        let el = this.listaCargos[i];
        this.sumasMeses.enero += this.obtenerValorCargo(el.enero);
        this.sumasMeses.febrero += this.obtenerValorCargo(el.febrero);
        this.sumasMeses.marzo += this.obtenerValorCargo(el.marzo);
        this.sumasMeses.abril += this.obtenerValorCargo(el.abril);
        this.sumasMeses.mayo += this.obtenerValorCargo(el.mayo);
        this.sumasMeses.junio += this.obtenerValorCargo(el.junio);
        this.sumasMeses.julio += this.obtenerValorCargo(el.julio);
        this.sumasMeses.agosto += this.obtenerValorCargo(el.agosto);
        this.sumasMeses.septiembre += this.obtenerValorCargo(el.septiembre);
        this.sumasMeses.octubre += this.obtenerValorCargo(el.octubre);
        this.sumasMeses.noviembre += this.obtenerValorCargo(el.noviembre);
        this.sumasMeses.diciembre += this.obtenerValorCargo(el.diciembre);
        //console.log(JSON.stringify((el.enero != null && el.enero.cargo) ? el.enero.cargo : 0));
      }
      for (let i = 0; i < this.listaCargos.length; i++) {
        let el = this.listaCargos[i];
        el.porcentaje_enero = 
            this.sumasMeses.enero ?
            this.formatPrice((this.obtenerValorCargo(el.enero) / this.sumasMeses.enero) * 100):0;

        el.porcentaje_febrero = 
            this.sumasMeses.febrero ?
            this.formatPrice((this.obtenerValorCargo(el.febrero) / this.sumasMeses.febrero) * 100):0;
        el.porcentaje_marzo = 
          this.sumasMeses.marzo ?
          this.formatPrice((this.obtenerValorCargo(el.marzo) / this.sumasMeses.marzo) * 100):0;
        el.porcentaje_abril = 
            this.sumasMeses.abril ?
            this.formatPrice((this.obtenerValorCargo(el.abril) / this.sumasMeses.abril) * 100):0;
        el.porcentaje_mayo = 
            this.sumasMeses.mayo ?
             this.formatPrice((this.obtenerValorCargo(el.abril) / this.sumasMeses.mayo) * 100):0;
        el.porcentaje_junio = 
          this.sumasMeses.junio ?
          this.formatPrice((this.obtenerValorCargo(el.junio) / this.sumasMeses.junio) * 100):0;
        el.porcentaje_julio = 
        this.sumasMeses.julio ?
          this.formatPrice((this.obtenerValorCargo(el.abril) / this.sumasMeses.julio) * 100):0;
        el.porcentaje_agosto =
          this.sumasMeses.agosto ?
         this.formatPrice((this.obtenerValorCargo(el.abril) / this.sumasMeses.agosto) * 100):0;
        el.porcentaje_septiembre = 
         this.sumasMeses.septiembre ?
        this.formatPrice((this.obtenerValorCargo(el.abril) / this.sumasMeses.septiembre) * 100):0;
        el.porcentaje_octubre =
        this.sumasMeses.octubre ? 
         this.formatPrice((this.obtenerValorCargo(el.abril) / this.sumasMeses.octubre) * 100):0;
        el.porcentaje_noviembre =
          this.sumasMeses.noviembre ? 
         this.formatPrice((this.obtenerValorCargo(el.abril) / this.sumasMeses.noviembre) * 100):0;
        el.porcentaje_diciembre =
          this.sumasMeses.diciembre ?
         this.formatPrice((this.obtenerValorCargo(el.abril) / this.sumasMeses.diciembre) * 100):0;
      }

      //-----

      this.calcularOperacionesTotalPagado();
      this.calcularOperacionesTotalDescuentosMeses();
    },
    calcularOperacionesTotalPagado() {
      this.sumaTotalPagadoMeses.enero = 0;
      this.sumaTotalPagadoMeses.febrero = 0;
      this.sumaTotalPagadoMeses.marzo = 0;
      this.sumaTotalPagadoMeses.abril = 0;
      this.sumaTotalPagadoMeses.mayo = 0;
      this.sumaTotalPagadoMeses.junio = 0;
      this.sumaTotalPagadoMeses.julio = 0;
      this.sumaTotalPagadoMeses.agosto = 0;
      this.sumaTotalPagadoMeses.septiembre = 0;
      this.sumaTotalPagadoMeses.octubre = 0;
      this.sumaTotalPagadoMeses.noviembre = 0;
      this.sumaTotalPagadoMeses.diciembre = 0;


      for (let i = 0; i < this.listaCargos.length; i++) {
        let el = this.listaCargos[i];
        this.sumaTotalPagadoMeses.enero += this.obtenerValorTotalPagado(el.enero);
        this.sumaTotalPagadoMeses.febrero += this.obtenerValorTotalPagado(el.febrero);
        this.sumaTotalPagadoMeses.marzo += this.obtenerValorTotalPagado(el.marzo);
        this.sumaTotalPagadoMeses.abril += this.obtenerValorTotalPagado(el.abril);
        this.sumaTotalPagadoMeses.mayo += this.obtenerValorTotalPagado(el.mayo);
        this.sumaTotalPagadoMeses.junio += this.obtenerValorTotalPagado(el.junio);
        this.sumaTotalPagadoMeses.julio += this.obtenerValorTotalPagado(el.julio);
        this.sumaTotalPagadoMeses.agosto += this.obtenerValorTotalPagado(el.agosto);
        this.sumaTotalPagadoMeses.septiembre += this.obtenerValorTotalPagado(el.septiembre);
        this.sumaTotalPagadoMeses.octubre += this.obtenerValorTotalPagado(el.octubre);
        this.sumaTotalPagadoMeses.noviembre += this.obtenerValorTotalPagado(el.noviembre);
        this.sumaTotalPagadoMeses.diciembre += this.obtenerValorTotalPagado(el.diciembre);       
      }     
    },
    calcularOperacionesTotalDescuentosMeses() {
      this.sumaTotalDescuentosMeses.enero = 0;
      this.sumaTotalDescuentosMeses.febrero = 0;
      this.sumaTotalDescuentosMeses.marzo = 0;
      this.sumaTotalDescuentosMeses.abril = 0;
      this.sumaTotalDescuentosMeses.mayo = 0;
      this.sumaTotalDescuentosMeses.junio = 0;
      this.sumaTotalDescuentosMeses.julio = 0;
      this.sumaTotalDescuentosMeses.agosto = 0;
      this.sumaTotalDescuentosMeses.septiembre = 0;
      this.sumaTotalDescuentosMeses.octubre = 0;
      this.sumaTotalDescuentosMeses.noviembre = 0;
      this.sumaTotalDescuentosMeses.diciembre = 0;


      for (let i = 0; i < this.listaCargos.length; i++) {
        let el = this.listaCargos[i];
        this.sumaTotalDescuentosMeses.enero += this.obtenerValorDescuento(el.enero);
        this.sumaTotalDescuentosMeses.febrero += this.obtenerValorDescuento(el.febrero);
        this.sumaTotalDescuentosMeses.marzo += this.obtenerValorDescuento(el.marzo);
        this.sumaTotalDescuentosMeses.abril += this.obtenerValorDescuento(el.abril);
        this.sumaTotalDescuentosMeses.mayo += this.obtenerValorDescuento(el.mayo);
        this.sumaTotalDescuentosMeses.junio += this.obtenerValorDescuento(el.junio);
        this.sumaTotalDescuentosMeses.julio += this.obtenerValorDescuento(el.julio);
        this.sumaTotalDescuentosMeses.agosto += this.obtenerValorDescuento(el.agosto);
        this.sumaTotalDescuentosMeses.septiembre += this.obtenerValorDescuento(el.septiembre);
        this.sumaTotalDescuentosMeses.octubre += this.obtenerValorDescuento(el.octubre);
        this.sumaTotalDescuentosMeses.noviembre += this.obtenerValorDescuento(el.noviembre);
        this.sumaTotalDescuentosMeses.diciembre += this.obtenerValorDescuento(el.diciembre);       
      }     
    },
    filtrarPorMes(concepto,mes){
      for (let i = 0; i < this.listaCargos.length; i++) {
        let valor= this.listaCargos[i];

        console.log("--- "+JSON.stringify(valor));
      }
    },
    onRowClick(params) {
      console.log(JSON.stringify(params));
      this.pago_seleccionado = params.row;
      $("#detallePago").modal("show");
      // params.row - row object 
      // params.pageIndex - index of this row on the current page.
      // params.selected - if selection is enabled this argument 
      // indicates selected or not
      // params.event - click event
    },
    onSearch(params) {
      console.log(JSON.stringify(params));
      // params.searchTerm - term being searched for
      // params.rowCount - number of rows that match search
    },
    selectAll(selected, selectedRows) {
      // do what you want here
      //console.log("Seleccion de Todos " + selected);
      //console.log(JSON.stringify(selectedRows));      
      //console.log("Seleccion "+JSON.stringify(selected));      
    },

    selectionChanged(params) {
      /*    params.selectedRows.filter(e=>e.vgtSelected).forEach(e=>{        
               if(e.pagado){
                 e.vgtSelected = false;
               }
          });      
    */
      this.rowSelection = params.selectedRows;
      console.log("Seleccion");
      //console.log("Seleccion " + JSON.stringify(this.rowSelection[0]));
    },
    iniciarEnvio() {
      console.log("Seleccion " + this.rowSelection);
      this.mensaje = "";
      this.get(
        URL.INFO_CONFIGURACION,

        result => {
          if (result.data != null) {
            this.texto_recordatorio = result.data.mensaje_recordatorio_pago;
          }
        }
      );
      //this.rowSelection.map(obj=> ({ ...obj, opt: 'false' }))     

      $("#confirmarRecordatorioEnvioRecibo").modal("show");

    },
    enviarRecordatorio() {

      console.log("" + JSON.stringify(this.rowSelection));
      this.mensaje = "";

      if (this.texto_recordatorio == "" || this.texto_recordatorio == null) {
        this.mensaje = "La nota de recordatorio es requerida";
        return;
      }

      let count = this.rowSelection.filter(e => e.correos != null).length;
      if (count == 0) {
        this.mensaje = "No existen registros con direcciones de correos registradas.";
      } else {
        let that = this;
        $('#id_notificador_principal').removeClass("hide");
        $('#texto_notificador_principal').empty();
        $('#texto_notificador_principal').append("<p>Enviando Avisos</p>");
        $("#encabezado_notificador_principal").text("Enviando Avisos ");
        this.rowSelection.filter(e => e.correos != null).forEach(function (element) {
          //this.rowSelection.forEach(function (element) {
          console.log(element);
          console.log(" enviando " + element.id_alumno);
          setTimeout(function () { }, 5000);
          that.enviarRecordatorioFunction(element.id_alumno, element.nombres_padres);
        });
        $("#confirmarRecordatorioEnvioRecibo").modal("hide");
      }

    },
    procesarListaCorreo(lista) {

      return lista != null ? lista.join(",") : "X";
    }
  }
};