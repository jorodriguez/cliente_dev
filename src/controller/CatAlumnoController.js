import AlumnoModel from "../models/AlumnoModel";

export default {
  name: "Alumno",
  data() {
    return {
      input: AlumnoModel,
      response: "",
      usuarioSesion: {},
      sesion: {},
      operacion: "INSERT",
      lista: [],
      listaGrupos: [],
      loadFunction: null,
      loadFunctionGrupos: null,
      //uriTemp: "http://localhost:5000/alumnos",
     // uriTempGrupos: "http://localhost:5000/grupos"
      uriTemp: "https://app-restexpres.herokuapp.com/alumnos",
      uriTempGrupos: "https://app-restexpres.herokuapp.com/grupos"
    };
  },
  mounted() {
    console.log("iniciando el componente alumno ");

    //console.log("SesionHelper.getSesion() "+JSON.stringify(SesionHelper)) ;

    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    console.log("Cargando lista alumno");
    this.loadFunction = function() {
      this.$http
        .get(this.uriTemp + "/" + this.usuarioSesion.co_sucursal, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;
            console.log("Consulta " + this.response);
            if (this.response != null) {
              this.lista = this.response;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    //traer grupos
    console.log("process.env.URL_GRUPOS " + process.env.URL_GRUPOS);
    this.loadFunctionGrupos = function() {
      this.$http
        .get(this.uriTempGrupos, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;
            console.log("Grupos " + this.response);
            if (this.response != null) {
              this.listaGrupos = this.response;
              // this.input.co_grupo =  (this.listaGrupos[0] || -1 );
            }
          },
          error => {
            console.error(error);
          }
        );
    };
    this.loadFunction();
    this.loadFunctionGrupos();
  },
  methods: {
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.input = {
        id: 0,
        //formato_inscripcion:FormatoModel,
        co_sucursal: 0,
        co_grupo: 0,
        nombre: "",
        apellidos: "",
        nombre_carino: "",
        sexo: "",
        nombre_grupo: "",
        nombre_sucursal: "",
        fecha_nacimiento: null,
        alergias: "",
        nota: "",
        hora_entrada: "",
        hora_salida: "",
        costo_inscripcion: "",
        costo_colegiatura: "",
        minutos_gracia: "",
        fecha_reinscripcion: null,
        foto: "",
        genero: 1
      };

      $("#modal_alumno").modal("show");
    },
    guardar() {
      //this.$http.get(process.env.ROOT_API+'/alumnos')
      console.log("Insertar");
      this.input.co_sucursal = this.usuarioSesion.co_sucursal;
      this.input.genero = this.usuarioSesion.id;

      this.$http
        .post(this.uriTemp, this.input, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;            
            this.mensaje = "Se agregó el alumno";
            this.loadFunction();
          },
          error => {
            console.error(error);
          }
        );
    },
    modificar() {
      console.log("Modificar el id " + this.input.id);
      this.$http
        .put(this.uriTemp + "/" + this.input.id, this.input, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.mensaje = "Se modificó el alumno";
              this.loadFunction();
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    eliminar() {
      console.log("Modificar el id " + this.input.id);
      this.$http
        .delete(this.uriTemp + "/" + this.input.id, {
          headers: {
            "x-access-token": this.sesion.token
          }
        })
        .then(
          result => {
            this.response = result.data;

            if (this.response != null) {
              console.log("" + this.response);
              this.loadFunction();
            }
          },
          error => {
            console.error(error);
          }
        );
    },
    select(rowSelect, operacion) {
      console.log("fila seleccionada " + rowSelect.nombre);
      this.operacion = operacion;
      this.input = rowSelect;
    },
    verPerfil(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    }
  }
};