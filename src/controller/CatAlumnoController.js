import AlumnoModel from "../models/AlumnoModel";
import Datepicker from 'vuejs-datepicker';
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";

export default {
  name: "Alumno",
  components: {
    Datepicker
  },
  mixins: [operacionesApi],
  data() {
    return {
      input: AlumnoModel,
      response: "",
      usuarioSesion: {},
      sesion: {},
      operacion: "INSERT",
      criterioNombre: "",
      lista: [],
      listaRespaldo: [],
      listaGrupos: [],
      loadFunction: null,
      loadFunctionGrupos: null,
      mensaje: "",
    };
  },
  mounted() {
    console.log("iniciando el componente alumno ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    console.log("Cargando lista alumno");
    this.loadFunction = function () {
      this.get(URL.ALUMNOS_BASE + "/" + this.usuarioSesion.co_sucursal,
        this.sesion.token,
        (result) => {
          this.response = result.data;
          console.log("Consulta " + this.response);
          if (this.response != null) {
            this.lista = this.response;
            this.listaRespaldo = this.response;
          }
        });
    };
    //traer grupos
    console.log("process.env.URL_GRUPOS " + process.env.URL_GRUPOS);

    this.loadFunctionGrupos = function () {
      this.get(URL.GRUPOS_BASE,
        this.sesion.token,
        (result) => {
          this.response = result.data;
          console.log("Grupos " + this.response);
          if (this.response != null) {
            this.listaGrupos = this.response;
          }
        });
    };
    //validacion
    this.validacionGuardarFunction = () => {
      if (this.input == null) {
        return false;
      } else {

        console.log("this.input.fecha_nacimiento " + this.input.fecha_nacimiento);

        if (this.input.nombre == '') {
          this.mensaje = "* Escribe un nombre";
          return false;
        }
        if (this.input.apellidos == '') {
          this.mensaje = "* Escribe un nombre";
          return false;
        }
        if (this.input.fecha_nacimiento == null || this.input.fecha_nacimiento == '') {
          this.mensaje = "* Selecciona la fecha de nacimiento";
          return false;
        }

        if (this.input.sexo == '') {
          this.mensaje = "* Selecciona el sexo";
          return false;
        }

        if (this.input.co_grupo == 0) {
          this.mensaje = "Selecciona un grupo";
          return false;
        }

        if (this.input.hora_entrada == null || this.input.hora_salida == null
          || this.input.hora_entrada == '' || this.input.hora_salida == '') {
          this.mensaje = "* Selecciona la hora de entrada y salida";
          return false;
        }

        /* if(this.input.hora_entrada > this.input.hora_salida){
           this.mensaje = "* La hora de entrada es mayor a la hora de salida.";
           return false;
         }*/


        if (this.input.minutos_gracia == null || this.input.minutos_gracia == '') {
          this.mensaje = "* Escribe los minutos de gracia";
          return false;
        }

        if (this.input.costo_inscripcion == null || this.input.costo_inscripcion == '') {
          this.mensaje = "* Escribe el costo de incripción";
          return false;
        }

        if (this.input.fecha_inscripcion == null || this.input.fecha_inscripcion == '') {
          this.mensaje = "* Selecciona la fecha de inscripción";
          return false;
        }

        return true;
      }
    }

    this.loadFunction();
    this.loadFunctionGrupos();
  },
  methods: {
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.input = {
        id: 0,
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
        fecha_inscripcion: null,
        foto: "",
        genero: 1
      };

      $("#modal_alumno").modal("show");
    },
    guardar() {      
      console.log("Insertar");

      if (!this.validacionGuardarFunction()) {
        console.log("No paso la validacion");
        return;
      }

      this.input.co_sucursal = this.usuarioSesion.co_sucursal;
      this.input.genero = this.usuarioSesion.id;

      this.put(URL.ALUMNOS_BASE,
        this.input,
        this.sesion.token,
        (result) => {
          this.response = result.data;
          console.log("this.response " + this.response);
          this.mensaje = "Se agregó el alumno";
          this.loadFunction();
          $("#modal_alumno").modal("hide");
        }
      );
    },
    modificar() {
      console.log("Modificar el id " + this.input.id);

      if (!this.validacionGuardarFunction()) {
        console.log("No paso la validacion");
        return;
      }

      this.put(URL.ALUMNOS_BASE + "/" + this.input.id,
        this.input, 
        this.sesion.token,
        (result) => {
          this.response = result.data;
          if (this.response != null) {
            console.log("" + this.response);
            this.mensaje = "Se modificó el alumno";
            this.loadFunction();
            $("#modal_alumno").modal("hide");
          }
        }
      );
 
    },
    eliminar() {
      console.log("Modificar el id " + this.input.id);

      this.remove(URL.ALUMNOS_BASE + "/" + this.input.id,
        this.input, this.sesion.token,
        (result) => {
          this.response = result.data;
          if (this.response != null) {
            console.log("" + this.response);
            this.loadFunction();
          }
        }
      );

    },
    select(rowSelect, operacion) {
      console.log("fila seleccionada " + rowSelect.adeuda);
      this.operacion = operacion;
      this.input = rowSelect;
      this.mensaje = "";
      if (operacion == 'DELETE' && this.input.adeuda) {
        this.mensaje = "No se puede eliminar por que tiene deudas.";
        return;
      } else {
        $("#modal_eliminar_alumno").modal("show");

      }
    },
    verPerfil(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    },
    buscarPorNombre() {
      console.log("Buscar por nombre " + this.criterioNombre);
      if (this.criterio == '') {
        this.lista = this.listaRespaldo;
      } else {

        this.lista = this.listaRespaldo.filter(e => e.nombre.toUpperCase().includes(this.criterioNombre.toUpperCase()));

      }
    },
    cambiarSucursal(row) {
      this.$router.push({ name: "CambioSucursal", params: { id_alumno: row.id } });
    }
  }
};