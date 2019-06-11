
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";

export default {
  name: "cargos-pagos",
  props: ['idalumno'],
  data() {
    return {
      uriTempPagos: "http://localhost:5000/pagos",
      uriTempCargos: "http://localhost:5000/cargos",
      cargo: {
        cantidad: 1,
        cat_cargo: -1
      },
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      listaCargosAlumnos: [],
      listaCargos: [],
      listaPagos: [],
      listaSeleccionSalida: [],
      loadFunctionCargosAlumno: null,
      loadFunctionCatCargos: null,
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente de pagos y cargos ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    this.loadFunctionCargosAlumno = function () {
      this.$http
        .get(
          this.uriTempCargos + "/" + this.idalumno,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("====  " + JSON.stringify(this.response));
            if (this.response != null) {
              this.listaCargosAlumnos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    //Catalogos de cargos
    this.loadFunctionCatCargos = function () {
      this.listaCargos = [];
      this.$http
        .get(
          this.uriTempCargos,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            this.response = result.data;
            console.log("Consulta " + this.response);
            if (this.response != null) {
              this.listaCargos = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };
    this.loadFunctionCargosAlumno();
    this.loadFunctionCatCargos();
  },
  methods: {
    iniciarAgregarCargo() {
      console.log("iniciar agregar cargo ");
      $('#modal_cargo').modal('show');
    },
    guardarCargo() {
      console.log("guardar cargos");
      if (this.cargo.cat_cargo == 0) {
        console.log("cargo");
        this.mensaje = 'Seleccione el cargo..';
        return;
      }

      if (this.cargo.cantidad == '' || this.cargo.cantidad == 0) {
        this.mensaje = 'Escriba la cantidad del cargo..';
        return;
      }

      console.log("invok");
      this.cargo.genero = this.usuarioSesion.id;
      this.cargo.id_alumno = this.idalumno;
      
      this.$http
        .post(this.uriTempCargos+"/registrar", this.cargo, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.mensaje = "Se agrego el familiar.";

              $("#modal_cargo").modal("hide");
              this.loadFunctionCargosAlumno();
              
            }
          },
          error => {
            console.error(error);
          }
        );

    }
  },
};