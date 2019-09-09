import Vue from "vue";
import URL from "../helpers/Urls";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Popup from './Popup'
import RecordatorioPago from './RecordatorioPago'
import TABLE_CONFIG from "../helpers/DatatableConfig";
import { throwStatement } from "babel-types";

export default {
  name: "ReporteMensualidades",
  components: {
    VueGoodTable,
    Popup,
    RecordatorioPago
  },
  data() {
    return {
      uriTemp: URL.REPORTE_MENSUALIDADES, //"http://localhost:5000/reporte_mensualidades",     
      listaSucursales: [],
      listaCargos: [],
      listaCargosResp: [],
      rowSelection: [],
      listaCorreosEnviarRecordatorio: [],
      usuarioSesion: {},
      sesion: {},
      sucursal_seleccionada: { id_sucursal: 0, nombre: "" },
      loadFunctionReporteMensualidades: null,
      loadFunctionReporteMensualidadesSucursales: null,
      filtrarCargos: null,
      verTodosCargos: false,
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
          label: 'Fecha',
          field: 'fecha_pago',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM Do yy',
          thClass: 'text-center',
          tdClass: 'text-center',
          filterable: true,
        },
        {
          label: 'Pagos',
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

    this.loadFunctionReporteMensualidades = function (id_sucursal) {
      this.$http
        .get(
          this.uriTemp + "/" + id_sucursal,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            console.log("Consulta " + result.data);
            if (result.data != null) {
              this.listaCargos = result.data;
              this.listaCargosResp = result.data;
              this.filtrarCargos();
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionReporteMensualidadesSucursales = function () {
      this.$http
        .get(
          this.uriTemp,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            console.log("Consulta cargos por sucursal" + result.data);
            if (result.data != null) {
              this.listaSucursales = result.data;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.filtrarCargos = () => {

      if (this.verTodosCargos) {
        this.listaCargos = this.listaCargosResp;
      } else {
        //this.listaCargos = this.listaCargosResp.filter(row => row.pagado == true);
      }

    };


    this.loadFunctionReporteMensualidadesSucursales();
  },
  methods: {
    verListaMensualidadesFacturadas(row_sucursal) {
      console.log("row sucursal " + JSON.stringify(row_sucursal));
      this.sucursal_seleccionada = row_sucursal;
      this.loadFunctionReporteMensualidades(row_sucursal.id_sucursal);

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

    onRowClick(params) {
      console.log(JSON.stringify(params));
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
      //console.log("Seleccion " + JSON.stringify(this.rowSelection[0]));
    },
    confirmarEnvio() {
      console.log("Seleccion " + this.rowSelection);
      this.$http
      .get(
        URL.INFO_CONFIGURACION,
        {
          headers: {
            "x-access-token": this.sesion.token
          }
        }
      )
      .then(
        result => {          
          if (result.data != null) {            
            this.texto_recordatorio = result.data.mensaje_recordatorio_pago;
          }
        },
        error => {
          console.error(error);
        }
      );

      //this.rowSelection.map(obj=> ({ ...obj, opt: 'false' }))     

      $("#confirmarRecordatorioEnvioRecibo").modal("show");

    },
    enviarRecordatorio(){
      //this.rowSelection.
      //$("#confirmarRecordatorioEnvioRecibo").modal("show");
    },
    procesarListaCorreo(lista){

        return lista!=null ? lista.join(","):"";
    }
  }
};