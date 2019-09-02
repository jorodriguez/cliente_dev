
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import SignoutComponent from "./SignoutComponent";
import ReporteMensualidades from "../components_admin/ReporteMensualidades";
import URL from "../helpers/Urls";

export default {
  name: "ReporteDeudas",
  components: {
    SignoutComponent,
    ReporteMensualidades
  },
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
      uriTempGastosMesActual : URL.REPORTE_GASTO_MES_ACTUAL,// "http://localhost:5000/reporte_gastos_mes_actual",      
      uriTempIngresoMenosGastos : URL.REPORTE_INGRESO_MENOS_GASTO_MENSUAL, //"http://localhost:5000/reporte_ingreso_menos_gasto_mensual",
      

  /*    uriTempBalanceSucursal: "https://api-ambiente-desarrollo.herokuapp.com/balance_sucursal",
      uriTempBalanceAlumnosSucursal: "https://api-ambiente-desarrollo.herokuapp.com/balance_alumnos_sucursal",
      uriTempBalanceCrecimiento: "https://api-ambiente-desarrollo.herokuapp.com/balance_crecimiento",
      uriTempBalanceCrecimientoAlumnos: "https://api-ambiente-desarrollo.herokuapp.com/balance_crecimiento_alumnos",
      uriTempBalanceCrecimientoGlobal: "https://api-ambiente-desarrollo.herokuapp.com/balance_crecimiento_global",
      uriTempBalanceCrecimientoMensualSucursal: "https://api-ambiente-desarrollo.herokuapp.com/balance_crecimiento_mensual",
      uriTempMesesActivos: "https://api-ambiente-desarrollo.herokuapp.com/meses_activos",
      uriTempBalanceAlumnoCrecimientoMensualSucursal: "https://api-ambiente-desarrollo.herokuapp.com/alumnos_balance_crecimiento_mensual_sucursal",      
      uriTempGastosMesActual : "https://api-ambiente-desarrollo.herokuapp.com/reporte_gastos_mes_actual",     
*/

      /*uriTempBalanceSucursal: "https://api-ambiente-produccion.herokuapp.com/balance_sucursal",
      uriTempBalanceAlumnosSucursal: "https://api-ambiente-produccion.herokuapp.com/balance_alumnos_sucursal",
      uriTempBalanceCrecimiento: "https://api-ambiente-produccion.herokuapp.com/balance_crecimiento",
      uriTempBalanceCrecimientoAlumnos: "https://api-ambiente-produccion.herokuapp.com/balance_crecimiento_alumnos",
      uriTempBalanceCrecimientoGlobal: "https://api-ambiente-produccion.herokuapp.com/balance_crecimiento_global",
      uriTempBalanceCrecimientoMensualSucursal: "https://api-ambiente-produccion.herokuapp.com/balance_crecimiento_mensual",
      uriTempMesesActivos: "https://api-ambiente-produccion.herokuapp.com/meses_activos",
      uriTempBalanceAlumnoCrecimientoMensualSucursal: "https://api-ambiente-produccion.herokuapp.com/alumnos_balance_crecimiento_mensual_sucursal",      
      uriTempGastosMesActual : "https://api-ambiente-produccion.herokuapp.com/reporte_gastos_mes_actual",      
*/
      usuarioSesion: {},
      sesion: {},
      gasto_mensual : 0,
      item: AlumnoModel,
      id_sucursal_seleccionada: -1,
      sucursal_seleccionada: { id_sucursal: -1, nombre: '' },
      sucursal_seleccionada_crecimiento :{ id_sucursal: -1, nombre: '' },
      listaBalanceSucursal: [],
      listaBalanceCrecimiento: [],
      listaBalancesAlumnosPorSucursal: [],
      listaBalancesAlumnosNuevosPorSucursal: [],
      listaMesesActivos: [],
      listaCrecimientoGlobal: [],
      listaCrecimientoMensualSucursal:[],
      reporteIngresoMenosGastos : null,
      alumno_seleccionado : {id:0,nombre:""},
      response: "",
      mensaje: ""
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
      this.$http
        .get(
          this.uriTempBalanceSucursal,
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
              this.listaBalanceSucursal = result.data;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionBalancesAlumnosPorSucursal = function () {

      if (this.id_sucursal_seleccionada != -1) {
        this.$http
          .get(
            this.uriTempBalanceAlumnosSucursal + "/" + this.id_sucursal_seleccionada,
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
                this.listaBalancesAlumnosPorSucursal = result.data;                
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.mensaje = "Por favor seleccione una sucursal.";
      }
    };

    this.loadFunctionBalanceCrecimiento = function () {
      this.$http
        .get(
          this.uriTempBalanceCrecimiento,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            console.log("Consulta balance crecimiento " + result.data);
            if (result.data != null) {
              this.listaBalanceCrecimiento = result.data;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionBalanceCrecimientoAlumnosPorSucursal = function (id_sucursal) {
      console.log("Id sucursal "+id_sucursal);
      if (id_sucursal != null && id_sucursal != undefined) {
        this.$http
          .get(
            this.uriTempBalanceCrecimientoAlumnos + "/" + id_sucursal,
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
                this.listaBalancesAlumnosNuevosPorSucursal = result.data;                              
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.mensaje = "Por favor seleccione una sucursal.";
      }
    };



    this.loadFunctionCrecimientoGlobal = function () {
      this.$http
        .get(
          this.uriTempBalanceCrecimientoGlobal,
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
              this.listaCrecimientoGlobal = result.data;
            }
          },
          error => {
            console.error(error);
          }
        );
    };


    this.loadFunctionCrecimientoMensualSucursal = function (id_sucursal) {
      if (id_sucursal != null && id_sucursal != undefined) {
        this.$http
          .get(
            this.uriTempBalanceCrecimientoMensualSucursal + "/" + id_sucursal,
            {
              headers: {
                "x-access-token": this.sesion.token
              }
            }
          )
          .then(
            result => {
              console.log("MMMMESUAL " + result.data);
              if (result.data != null) {
                this.listaCrecimientoMensualSucursal = result.data;
                /*if(this.listaCrecimientoMensualSucursal.length > 0){                
                    this.loadReporteIngresosMenosGastos(id_sucursal,null);
                } */               
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.mensaje = "Por favor seleccione una sucursal.";
      }
    };


    this.loadFunctionAlumnosCrecmientoMensualSucursal = function (id_sucursal,mes_anio) {
      if (id_sucursal != null && id_sucursal != undefined
        || mes_anio != null && mes_anio != undefined
        ) {
        this.$http
          .get(
            this.uriTempBalanceAlumnoCrecimientoMensualSucursal+'/'+id_sucursal+'/'+mes_anio,
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
                this.listaBalancesAlumnosNuevosPorSucursal = result.data;
               // this.loadReporteIngresosMenosGastos(id_sucursal,mes_anio);
              }
            },
            error => {
              console.error(error);
            }
          );
      } else {
        this.mensaje = "Por favor seleccione una sucursal y un mes.";
      }
    };

    this.loadFunctionMesesActivos = function () {
      this.$http
        .get(
          this.uriTempMesesActivos,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            console.log("Consulta meses activos " + result.data);
            if (result.data != null) {
              this.listaMesesActivos = result.data;
            }
          },
          error => {
            console.error(error);
          }
        );
    };


    this.loadFunctionGastoMensual = function () {
      this.$http
        .get(
          this.uriTempGastosMesActual,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            console.log("Consulta " + JSON.stringify(result.data));
            if (result.data != null && result.data.length > 0) {
              this.gasto_mensual = result.data[0].gasto_mes_actual;
            
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    /*this.loadReporteIngresosMenosGastos = function (id_sucursal,mes) {
      this.$http
        .get(
          this.uriTempIngresoMenosGastos+"/"+id_sucursal+"/"+mes,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            console.log("reporteIngresoMenosGastos " + JSON.stringify(result.data));
            //if (result.data != null) {
              this.reporteIngresoMenosGastos = result.data;
            //}
          },
          error => {
            console.error(error);
          }
        );
    };*/

    this.loadFunctionBalanceSucursal();
    this.loadFunctionBalanceCrecimiento();
    this.loadFunctionCrecimientoGlobal();
    this.loadFunctionGastoMensual();
        
  },
  methods: {
    verDetalleDeudasSucursal(row) {
      this.sucursal_seleccionada = row;
      this.id_sucursal_seleccionada = row.id;
      this.loadFunctionBalancesAlumnosPorSucursal();
    },
    verDetalleCrecimientoSucursal(row) {
      this.sucursal_seleccionada_crecimiento = row;      
      this.loadFunctionBalanceCrecimientoAlumnosPorSucursal(row.id);
      this.loadFunctionCrecimientoMensualSucursal(row.id);                 
    },
    verCrecimientoGlobal(){      
      this.loadFunctionCrecimientoGlobal();
      //$("#modal_crecimiento_global").modal("show");
      this.$router.push("/CrecimientoGlobal");
    },
    verAlumnosCrecimientoMensualSucursal(rowMes){
      console.log("Seleccion "+rowMes.mes_anio);
        this.loadFunctionAlumnosCrecmientoMensualSucursal(this.sucursal_seleccionada_crecimiento.id,rowMes.mes_anio);
    },
    verDetalleAlumno(alumno){
      this.alumno_seleccionado = alumno;
      console.log(""+JSON.stringify(this.alumno_seleccionado));

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