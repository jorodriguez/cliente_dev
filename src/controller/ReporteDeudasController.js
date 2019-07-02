
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import SignoutComponent from "./SignoutComponent";

export default {
  name: "ReporteDeudas",
  components: {
    SignoutComponent
  },
  data() {
    return {
      uriTempBalanceSucursal: "http://localhost:5000/balance_sucursal",
      uriTempBalanceAlumnosSucursal: "http://localhost:5000/balance_alumnos_sucursal",
      uriTempBalanceCrecimiento: "http://localhost:5000/balance_crecimiento",
      uriTempMesesActivos: "http://localhost:5000/meses_activos",
      
      //uriTemp:'https://api-ambiente-desarrollo.herokuapp.com/reporte_deudas',
      //uriTemp:'https://api-ambiente-produccion.herokuapp.com/reporte_deudas',
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      id_sucursal_seleccionada: -1,
      sucursal_seleccionada : {id_sucursal: -1,nombre:''},
      listaBalanceSucursal: [],
      listaBalanceCrecimiento:[],
      listaBalancesAlumnosPorSucursal: [],
      listaMesesActivos: [],      
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

    if(!this.usuarioSesion.permiso_gerente){
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
      }else{
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

  },
  methods: {
    verDetalleDeudasSucursal(row){        
        this.sucursal_seleccionada =  row;
        this.id_sucursal_seleccionada = row.id;
        this.loadFunctionBalancesAlumnosPorSucursal();   
    },
    verDetalleCrecimientoSucursal(row){
      this.sucursal_seleccionada =  row;
      this.id_sucursal_seleccionada = row.id;
      this.loadFunctionBalancesAlumnosPorSucursal();   
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
     }

  }
};