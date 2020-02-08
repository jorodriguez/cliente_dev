
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import SignoutComponent from "./SignoutComponent";
import ReporteMensualidades from "../components_admin/ReporteMensualidades";
//import AlumnosCargos from "../components_admin/AlumnosCargos";
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import { VueGoodTable } from 'vue-good-table';
import Popup from './Popup'
import TABLE_CONFIG from "../helpers/DatatableConfig";

export default {
  name: "ReporteDeudas",
  components: {
    SignoutComponent,
    ReporteMensualidades,    
    VueGoodTable,
    Popup
  },
  mixins: [operacionesApi],
  data() {
    return {
      uriTempBalanceSucursal: URL.BALANCE_SUCURSAL, // "http://localhost:5000/balance_sucursal",
      uriTempBalanceAlumnosSucursal: URL.BALANCE_ALUMNO_SUCURSAL, // "http://localhost:5000/balance_alumnos_sucursal",
      uriTempBalanceCrecimiento: URL.BALANCE_CRECIMIENTO, //"http://localhost:5000/balance_crecimiento",
      uriTempBalanceCrecimientoAlumnos: URL.BALANCE_CRECIMIENTO_ALUMNOS, // "http://localhost:5000/balance_crecimiento_alumnos",
      uriTempBalanceCrecimientoGlobal: URL.BALANCE_CRECIMIENTO_GLOBAL, // "http://localhost:5000/balance_crecimiento_global",
      uriTempBalanceCrecimientoMensualSucursal: URL.BALANCE_CRECIMIENTO_MENSUAL, // "http://localhost:5000/balance_crecimiento_mensual",
      uriTempMesesActivos: URL.MESES_ACTIVOS, // "http://localhost:5000/meses_activos",
      uriTempBalanceAlumnoCrecimientoMensualSucursal: URL.ALUMNOS_BALANCE_CRECIMIENTO_MENSUAL_SUCURSAL, //"http://localhost:5000/alumnos_balance_crecimiento_mensual_sucursal",      
      uriTempGastosMesActual: URL.REPORTE_GASTO_MES_ACTUAL,// "http://localhost:5000/reporte_gastos_mes_actual",      
      uriTempIngresoMenosGastos: URL.REPORTE_INGRESO_MENOS_GASTO_MENSUAL, //"http://localhost:5000/reporte_ingreso_menos_gasto_mensual",
      usuarioSesion: {},
      sesion: {},
      gasto_mensual: 0,
      item: AlumnoModel,
      id_sucursal_seleccionada: -1,
      sucursal_seleccionada: { id_sucursal: -1, nombre: '' },
      sucursal_seleccionada_crecimiento: { id_sucursal: -1, nombre: '' },
      listaBalanceSucursal: [],
      listaBalanceCrecimiento: [],
      listaBalancesAlumnosPorSucursal: [],
      listaBalancesAlumnosNuevosPorSucursal: [],
      listaMesesActivos: [],
      listaCrecimientoGlobal: [],
      listaCrecimientoMensualSucursal: [],
      reporteIngresoMenosGastos: null,
      alumno_seleccionado: { id: 0, nombre: "" },
      response: "",
      mensaje: "",
      TABLE_CONFIG: TABLE_CONFIG,  
      /*columnsAlumnos: [
        {
          label: 'Id',
          field: 'id',
          hidden: true
        },
        {
          label: '',
          field: 'foto',
          filterable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Alumno',
          field: 'nombre',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Apellidos',
          field: 'apellidos',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Adeuda',
          field: 'total_adeudo',                   
        },
        {
          label:"cargos",
          field:"cargos_array"
        },
        
        {
          label: 'Adeuda',
          field: 'adeuda',         
          hidden: true
        },
          
      ]*/
      columnsAlumnos: [
        {
          label: 'Id',
          field: 'id',
          hidden: true
        },
        {
          label: '',
          field: 'foto',
          filterable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Alumno',
          field: 'nombre',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Apellidos',
          field: 'apellidos',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },      
        {
          label:"Adeuda",
          field:"cargos_array",
          
        },
        {
          label: 'Total',
          field: 'total_adeudo',                   
        },
        
        {
          label: 'Adeuda',
          field: 'adeuda',         
          hidden: true
        },
          
      ]
    };
  },
  mounted() {
    console.log("iniciando el componente reporte deudas ");
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

    this.loadFunctionBalanceSucursal = function () {
      this.get(
        this.uriTempBalanceSucursal,
        this.sesion.token,
        (result) => {
          console.log("Consulta " + result.data);          
          if (result.data != null) {
            this.listaBalanceSucursal = result.data;
          }
        }
      );      
    };

    this.loadFunctionBalancesAlumnosPorSucursal = function () {

      if (this.id_sucursal_seleccionada != -1) {

        this.get(
          this.uriTempBalanceAlumnosSucursal + "/" + this.id_sucursal_seleccionada,
          this.sesion.token,
          (result) => {
            console.log("Consulta " + result.data);
            if (result.data != null) {
              console.log(JSON.stringify(result.data[0]));
              this.listaBalancesAlumnosPorSucursal = result.data;
            }
          }
        );        
      } else {
        this.mensaje = "Por favor seleccione una sucursal.";
      }
    };

    this.loadFunctionBalanceCrecimiento = function () {

      this.get(
        this.uriTempBalanceCrecimiento,
        this.sesion.token,
        (result) => {
          console.log("Consulta balance crecimiento " + result.data);
          if (result.data != null) {
            this.listaBalanceCrecimiento = result.data;
          }
        }
      );
      
    };

    this.loadFunctionBalanceCrecimientoAlumnosPorSucursal = function (id_sucursal) {
      console.log("Id sucursal " + id_sucursal);
      if (id_sucursal != null && id_sucursal != undefined) {

        this.get(
          this.uriTempBalanceCrecimientoAlumnos + "/" + id_sucursal,
          this.sesion.token,
          (result) => {
            console.log("Consulta " + result.data);
            if (result.data != null) {
              this.listaBalancesAlumnosNuevosPorSucursal = result.data;
            }
          }
        );
      
      } else {
        this.mensaje = "Por favor seleccione una sucursal.";
      }
    };

    this.loadFunctionCrecimientoGlobal = function () {

      this.get(
        this.uriTempBalanceCrecimientoGlobal,
        this.sesion.token,
        (result) => {
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.listaCrecimientoGlobal = result.data;
          }
        }
      );
    };


    this.loadFunctionCrecimientoMensualSucursal = function (id_sucursal) {
      if (id_sucursal != null && id_sucursal != undefined) {

        this.get(
          this.uriTempBalanceCrecimientoMensualSucursal + "/" + id_sucursal,
          this.sesion.token,
          (result) => {
            console.log("MMMMESUAL " + result.data);
            if (result.data != null) {
              this.listaCrecimientoMensualSucursal = result.data;
            }
          }
        );
      } else {
        this.mensaje = "Por favor seleccione una sucursal.";
      }
    };


    this.loadFunctionAlumnosCrecmientoMensualSucursal = function (id_sucursal, mes_anio) {
      if (id_sucursal != null && id_sucursal != undefined
        || mes_anio != null && mes_anio != undefined
      ) {
        this.get(
          this.uriTempBalanceAlumnoCrecimientoMensualSucursal + '/' + id_sucursal + '/' + mes_anio,
          this.sesion.token,
          result => {
            console.log("Consulta " + result.data);
            if (result.data != null) {
              this.listaBalancesAlumnosNuevosPorSucursal = result.data;
            }
          }
        );
      } else {
        this.mensaje = "Por favor seleccione una sucursal y un mes.";
      }
    };

    this.loadFunctionMesesActivos = function () {
      this.get(
        this.uriTempMesesActivos,
        this.sesion.token,
        (result) => {
          console.log("Consulta meses activos " + result.data);
          if (result.data != null) {
            this.listaMesesActivos = result.data;
          }
        }
      );
    };


    this.loadFunctionGastoMensual = function () {
      this.get(
        this.uriTempGastosMesActual,
        this.sesion.token,
        (result) => {
          console.log("Consulta " + JSON.stringify(result.data));
          if (result.data != null && result.data.length > 0) {
            this.gasto_mensual = result.data[0].gasto_mes_actual;

          }
        }
      );
    };

    this.loadFunctionBalanceSucursal();
    this.loadFunctionBalanceCrecimiento();
    this.loadFunctionCrecimientoGlobal();
    this.loadFunctionGastoMensual();

  },
  methods: {
    verDetalleDeudasSucursal(row) {
      this.sucursal_seleccionada = row;
      console.log("===== "+JSON.stringify(this.sucursal_seleccionada));
      this.id_sucursal_seleccionada = row.id;
      this.loadFunctionBalancesAlumnosPorSucursal();
    },
    verDetalleCrecimientoSucursal(row) {
      this.sucursal_seleccionada_crecimiento = row;
      this.loadFunctionBalanceCrecimientoAlumnosPorSucursal(row.id);
      this.loadFunctionCrecimientoMensualSucursal(row.id);
    },
    verCrecimientoGlobal() {
      this.loadFunctionCrecimientoGlobal();
      //$("#modal_crecimiento_global").modal("show");
      this.$router.push("/CrecimientoGlobal");
    },
    verAlumnosCrecimientoMensualSucursal(rowMes) {
      console.log("Seleccion " + rowMes.mes_anio);
      this.loadFunctionAlumnosCrecmientoMensualSucursal(this.sucursal_seleccionada_crecimiento.id, rowMes.mes_anio);
    },
    verDetalleAlumno(alumno) {
      this.alumno_seleccionado = alumno;
      console.log("" + JSON.stringify(this.alumno_seleccionado));

      $("#modal_alumno").modal("show");
    },
    verPerfil(row) {
      console.log("fila seleccionada " + row.nombre);
      this.$router.push({ name: "PerfilAlumno", params: { id: row.id } });
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    signout() {
      console.log("Signout ");
      this.$session.clear();
      this.$router.push("/");
    },
  
  }
};