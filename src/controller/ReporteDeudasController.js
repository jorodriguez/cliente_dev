
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import SignoutComponent from "./SignoutComponent";

export default {
  name: "ReporteDeudas",
  components: {
    SignoutComponent,
  },
  data() {
    return {
      uriTempBalanceSucursal: "http://localhost:5000/balance_sucursal",
      uriTempBalanceAlumnosSucursal: "http://localhost:5000/balance_alumnos_sucursal",
      uriTempBalanceCrecimiento: "http://localhost:5000/balance_crecimiento",
      uriTempBalanceCrecimientoAlumnos: "http://localhost:5000/balance_crecimiento_alumnos",
      uriTempBalanceCrecimientoGlobal: "http://localhost:5000/balance_crecimiento_global",
      uriTempBalanceCrecimientoMensualSucursal: "http://localhost:5000/balance_crecimiento_mensual",
      uriTempMesesActivos: "http://localhost:5000/meses_activos",
      uriTempBalanceAlumnoCrecimientoMensualSucursal: "http://localhost:5000/alumnos_balance_crecimiento_mensual_sucursal",      

      //uriTemp:'https://api-ambiente-desarrollo.herokuapp.com/reporte_deudas',
      //uriTemp:'https://api-ambiente-produccion.herokuapp.com/reporte_deudas',
      usuarioSesion: {},
      sesion: {},
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
      alumno_seleccionado : {id:0,nombre:""},
      response: "",
      mensaje: ""
    };
  },
  mounted() {

    $('.popover-dismiss').popover({
      trigger: 'focus'
    });
  
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
              console.log("Consulta " + result.data);
              if (result.data != null) {
                this.listaCrecimientoMensualSucursal = result.data;
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

    this.loadFunctionBalanceSucursal();
    this.loadFunctionBalanceCrecimiento();
    this.loadFunctionCrecimientoGlobal();
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
      $("#modal_crecimiento_global").modal("show");
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