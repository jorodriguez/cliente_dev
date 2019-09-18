import Vue from "vue";
import URL from "../helpers/Urls";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Popup from './Popup'
import RecordatorioPago from './RecordatorioPago'
import TABLE_CONFIG from "../helpers/DatatableConfig";
import { operacionesApi } from "../helpers/OperacionesApi";
import { castNumMonthToSpanish } from "../helpers/UtilsDate";

export default {
  name: "ReporteMensualidades",
  components: {
    VueGoodTable,
    Popup,
    RecordatorioPago
  },
  mixins: [operacionesApi],
  data() {
    return {
      uriTemp: URL.REPORTE_MENSUALIDADES, //"http://localhost:5000/reporte_mensualidades",     
      listaSucursales: [],
      listaCargos: [],
      listaCargosResp: [],
      rowSelection: [],
      listaCorreosEnviarRecordatorio: [],
      listaMeses: [],
      usuarioSesion: {},
      mes_seleccionado: null,
      pago_seleccionado : null,
      sesion: {},
      sucursal_seleccionada: { id_sucursal: 0, nombre: "" },
      loadFunctionReporteContadoresMesSucursal: null,
      loadFunctionReporteMensualidadesSucursal: null,
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
      columnsCargos: [
        {
          label: 'Id',
          field: 'id',
          hidden: true
        },
        {
          label: 'Alumno',
          field: 'nombre_alumno',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Fecha Pago',
          field: 'fecha_pago',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM Do yy',
          thClass: 'text-center',
          tdClass: 'text-center',
          filterable: true,
        },
        {
          label: 'Pago',
          field: 'pago',
          thClass: 'text-center',
          tdClass: 'text-center',
          filterable: true,
        },

        {
          label: 'Cargo',
          field: 'cargo',
          type: 'number',
          thClass: 'text-center',
          tdClass: 'text-center',
          filterable: true,
        },
        {
          label: 'Factura',
          field: 'identificador_factura',
          thClass: 'text-center',
          tdClass: 'text-center',
          filterable: true,
        },
        {
          label: '',
          field: 'pagado',
          type: 'boolean',
          width: '50px',
          thClass: 'text-center',
          tdClass: 'text-center',
          filterable: true,
          filterOptions: {
            filterDropdownItems: [
              { value: 'false', text: 'Pagado' },
              { value: 'true', text: 'Adeuda' },
            ]
          }
        },
        {
          label: 'Correos',
          field: 'correos',
          hidden: true,
          filterable: false,
        },
        {
          label: 'nombre_padres',
          field: 'nombre_padres',
          hidden: true,
          filterable: false,
        },
        {
          label: 'tokens',
          field: 'tokens',
          hidden: true,
          filterable: false,
        }
      ]
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de mensualidades ");
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

    //para mostrar las sucursales
    this.loadFunctionReporteContadoresSucursalesMesActual= function () {
      this.get(
        this.uriTemp,
        this.sesion.token,
        result => {
          console.log("Consulta cargos por sucursal" + result.data);
          if (result.data != null) {
            this.listaSucursales = result.data;               
            if(this.listaSucursales != null && this.listaSucursales.length > 0){
              if(this.mes_seleccionado == null){
                this.mes_seleccionado = this.listaSucursales[0].anio_mes;
              }           
            } 
          }
        }
      );
    };


    this.loadFunctionReporteMensualidadesSucursal = function (id_sucursal) {
      console.log("sucr "+id_sucursal+" mes "+this.mes_seleccionado);
      this.get(
        this.uriTemp + "/" + id_sucursal+"/"+this.mes_seleccionado,
        this.sesion.token,
        (result) => {
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.listaCargos = result.data;

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
          this.sesion.token,
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

    this.loadFunctionReporteContadoresMesSucursal = function(id_sucursal)  {
      this.get(
        this.uriTemp + "/" + id_sucursal,
        this.sesion.token,
        result => {
          console.log("Consulta meses con adeudo" + result.data);
          if (result.data != null) {
            this.listaMeses = result.data;          
          }
        }
      );
    };

    this.loadFunctionReporteContadoresSucursalesMesActual();
  },
  methods: {
    async verListaMensualidadesFacturadas(row_sucursal) {
      console.log("row sucursal " + JSON.stringify(row_sucursal));
      this.sucursal_seleccionada = row_sucursal;      
      await this.loadFunctionReporteContadoresMesSucursal(this.sucursal_seleccionada.id_sucursal);            
      await this.loadFunctionReporteMensualidadesSucursal(this.sucursal_seleccionada.id_sucursal);     
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
    formatNumeroMes(num_mes){
      return castNumMonthToSpanish(num_mes).es;
    },
    cambiarMes() {
      this.loadFunctionReporteMensualidadesSucursal(this.sucursal_seleccionada.id_sucursal);
    },
    verCargosPorMes(row){
      this.mes_seleccionado = row.anio_mes;
      this.loadFunctionReporteMensualidadesSucursal(this.sucursal_seleccionada.id_sucursal);
    },
    onRowClick(params) {
      console.log(JSON.stringify(params));
      this.pago_seleccionado = params.row ;
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
        this.sesion.token,
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