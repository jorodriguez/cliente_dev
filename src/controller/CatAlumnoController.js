import AlumnoModel from "../models/AlumnoModel";
import Datepicker from 'vuejs-datepicker';

export default {
  name: "Alumno",
  components: {
    Datepicker
  }, 
  data() {
    return {
      input: AlumnoModel,
      response: "",
      usuarioSesion: {},
      sesion: {},
      operacion: "INSERT",
      criterioNombre:"",
      lista: [],
      listaRespaldo: [],
      listaGrupos: [],
      loadFunction: null,
      loadFunctionGrupos: null,
      mensaje :"",
      
      /*uriTemp: "http://localhost:5000/alumnos",
      uriTempGrupos: "http://localhost:5000/grupos"
      */
      
      /*uriTemp: "https://api-ambiente-desarrollo.herokuapp.com/alumnos",
      uriTempGrupos: "https://api-ambiente-desarrollo.herokuapp.com/grupos"      
      */

      uriTemp: "https://api-ambiente-produccion.herokuapp.com/alumnos",
      uriTempGrupos: "https://api-ambiente-produccion.herokuapp.com/grupos"      
  
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
              this.listaRespaldo = this.response;
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

    //validacion
    this.validacionGuardarFunction = ()=>{
        if(this.input==null){
          return false;        
        }else{          

          console.log("this.input.fecha_nacimiento "+this.input.fecha_nacimiento);
         
          if(this.input.nombre == ''){
            this.mensaje = "* Escribe un nombre";
            return false;
          }
          if(this.input.apellidos == ''){
            this.mensaje = "* Escribe un nombre";
            return false;
          }
          if(this.input.fecha_nacimiento == null || this.input.fecha_nacimiento==''){
            this.mensaje = "* Selecciona la fecha de nacimiento";
            return false;
          }

          if(this.input.sexo == ''){
            this.mensaje = "* Selecciona el sexo";
            return false;
          }                  

          if(this.input.co_grupo == 0 ){
            this.mensaje = "Selecciona un grupo";
            return false;
          }
         
          if(this.input.hora_entrada == null || this.input.hora_salida == null
              || this.input.hora_entrada == '' || this.input.hora_salida == ''){            
            this.mensaje = "* Selecciona la hora de entrada y salida";
            return false;
          }

         /* if(this.input.hora_entrada > this.input.hora_salida){
            this.mensaje = "* La hora de entrada es mayor a la hora de salida.";
            return false;
          }*/


          if(this.input.minutos_gracia == null || this.input.minutos_gracia == ''){
            this.mensaje = "* Escribe los minutos de gracia";
            return false;
          }
          
          if(this.input.costo_inscripcion == null || this.input.costo_inscripcion == ''){            
            this.mensaje = "* Escribe el costo de incripción";
            return false;
          }
                                         
          if(this.input.fecha_inscripcion == null || this.input.fecha_inscripcion == ''){
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
        fecha_inscripcion: null,
        foto: "",
        genero: 1
      };

      $("#modal_alumno").modal("show");
    },
    guardar() {
      //this.$http.get(process.env.ROOT_API+'/alumnos')
      console.log("Insertar");

      if(!this.validacionGuardarFunction()){
        console.log("No paso la validacion");
          return;
      }

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
            console.log("this.response "+this.response);
            this.mensaje = "Se agregó el alumno";
            this.loadFunction();
            $("#modal_alumno").modal("hide");
          },
          error => {
            console.error(error);
          }
        );
    },
    modificar() {
      console.log("Modificar el id " + this.input.id);

      if(!this.validacionGuardarFunction()){
        console.log("No paso la validacion");
        return;
      }

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
              $("#modal_alumno").modal("hide");
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
      console.log("fila seleccionada " + rowSelect.adeuda);
      this.operacion = operacion;
      this.input = rowSelect;
      this.mensaje="";      
      if(operacion=='DELETE' && this.input.adeuda){        
          this.mensaje = "No se puede eliminar por que tiene deudas.";
          return ;       
      }else{
        $("#modal_eliminar_alumno").modal("show");
        
      }
    },
    verPerfil(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    },
    buscarPorNombre(){
      console.log("Buscar por nombre "+this.criterioNombre);     
      if(this.criterio == ''){
          this.lista = this.listaRespaldo;
      }else{

      this.lista = this.listaRespaldo.filter(e=>e.nombre.toUpperCase().includes(this.criterioNombre.toUpperCase()));

      }     

    }
  }
};