
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
      //uriTemp:'https://api-ambiente-desarrollo.herokuapp.com/reporte_deudas',
      //uriTemp:'https://api-ambiente-produccion.herokuapp.com/reporte_deudas',
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      id_sucursal_seleccionada: -1,
      listaBalanceSucursal: [],
      listaBalancesAlumnosPorSucursal: [],
      listaSeleccion: [],
      listaSeleccionSalida: [],
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


    this.loadFunctionBalanceSucursal();

  },
  methods: {
    verDetalleSucursal(id_sucursal){
        this.id_sucursal_seleccionada = id_sucursal;
        this.loadFunctionBalancesAlumnosPorSucursal();   
    },
    formatPrice(value) {
      let val = (value/1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
     }

  }
};