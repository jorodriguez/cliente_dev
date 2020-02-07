import AlumnoModel from "../models/AlumnoModel";
import Datepicker from 'vuejs-datepicker';
import URL from "../helpers/Urls";
import {validacionDatosAlumno} from "../helpers/AlumnoValidacion";
import { operacionesApi } from "../helpers/OperacionesApi";
import {en, es} from 'vuejs-datepicker/dist/locale'
import {getUsuarioSesion} from '../helpers/Sesion';

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
      es:es,
      disableDaysFechaLimitePago:{days:[6,0],to: new Date()},
    };
  },
  mounted() {
    console.log("iniciando el componente alumno ");
   
    this.usuarioSesion = getUsuarioSesion();

    console.log("Cargando lista alumno");
    this.loadFunction = function () {
      this.get(URL.ALUMNOS_BASE + "/" + this.usuarioSesion.co_sucursal,
        
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
        
        (result) => {
          this.response = result.data;
          console.log("Grupos " + this.response);
          if (this.response != null) {
            this.listaGrupos = this.response;
          }
        });
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
        fecha_limite_pago:null,
        foto: "",
        genero: 1
      };

      $("#modal_alumno").modal("show");
    },
    guardar() {      
      console.log("Insertar");      
      if (!validacionDatosAlumno(this.input)) {
      //if(!validacionDatosAlumno(this.input)){
        console.log("No paso la validacion");
        return;
      }

      this.input.co_sucursal = this.usuarioSesion.co_sucursal;
      this.input.genero = this.usuarioSesion.id;

      this.post(URL.ALUMNOS_BASE,
        this.input,
        
        (result) => {
          this.response = result.data;
          console.log("this.response " + this.response);
          //this.mensaje = "Se agregó el alumno";
          this.$notificacion.info('Registro de alumno', 'Se registró el alumno.');
          this.loadFunction();
          $("#modal_alumno").modal("hide");
        }
      );
    },
    modificar() {
      console.log("Modificar el id " + this.input.id);

      //if (!this.validacionGuardarFunction()) {
      if(!validacionDatosAlumno(this.input)){ 
        console.log("No paso la validacion");
        return;
      }

      this.put(URL.ALUMNOS_BASE + "/" + this.input.id,
        this.input, 
        
        (result) => {
          this.response = result.data;
          if (this.response != null) {
            console.log("" + this.response);
            //this.mensaje = "Se modificó el alumno";
            this.$notificacion.info('Modificación de alumno', 'Se actualizarón los datos del alumno.');
            this.loadFunction();
            $("#modal_alumno").modal("hide");
          }
        }
      );
 
    },
    eliminar() {
      console.log("Modificar el id " + this.input.id);
      
      this.remove(URL.ALUMNOS_BASE + "/" + this.input.id,
        
        (result) => {      
          console.log(" "+result.data);    
          if ( result.data != null) {
            console.log("" +  result.data);
            this.$notificacion.error('Registro de Baja de alumno', 'Se registro la baja del alumno '+this.input.nombre+'.');
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
        //this.mensaje = "No se puede eliminar por que tiene deudas.";
        this.$notificacion.warn('Baja de alumno', 'No es posible dar de baja el alumno por motivos de deuda activa.');
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