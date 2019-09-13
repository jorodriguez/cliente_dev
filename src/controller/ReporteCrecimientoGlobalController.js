
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import SignoutComponent from "./SignoutComponent";
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";

export default {
  name: "CrecimientoGlobal",
  components: {
    SignoutComponent,
  },
  mixins:[operacionesApi],
  data() {
    return {
      uriTempBalanceCrecimientoGlobal: URL.BALANCE_CRECIMIENTO_GLOBAL, //"http://localhost:5000/balance_crecimiento_global",
      uriTempBalanceAlumnosIngreso: URL.ALUMNOS_CRECIMIENTO_MES, // "http://localhost:5000/alumnos_crecimiento_mes",
      usuarioSesion: {},
      sesion: {},
      mes_seleccionado: {},
      listaCrecimientoGlobal: [],
      listaNuevosAlumno: [],
      alumno_seleccionado: { id: 0, nombre: "" },
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente reporte crecimiento global ");
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

    this.loadFunctionAlumnosCrecimiento = function () {
      if (this.mes_seleccionado != null
        || this.mes_seleccionado.numero_anio != null
        || this.mes_seleccionado.numero_mes != null) {

          this.get(
            this.uriTempBalanceAlumnosIngreso + "/" + this.mes_seleccionado.numero_anio + "/" + this.mes_seleccionado.numero_mes,
            this.sesion.token,
            result => {
              console.log("Consulta " + result.data);
              if (result.data != null) {
                this.listaNuevosAlumno = result.data;                
              }
            }
          );
      };
    }
    this.loadFunctionCrecimientoGlobal();

  },
  methods: {
    verPerfil(row) {
      console.log("fila seleccionada " + row.nombre);
      this.$router.push({ name: "PerfilAlumno", params: { id: row.id } });
    },
    verAlumnosMes(row) {
      this.mes_seleccionado = row;
      console.log(" mes  "+JSON.stringify(this.mes_seleccionado));
      this.loadFunctionAlumnosCrecimiento();
      $("#modal_alumnos").modal("show");
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