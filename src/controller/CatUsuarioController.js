import Datepicker from 'vuejs-datepicker';
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import { en, es } from 'vuejs-datepicker/dist/locale'
import { getUsuarioSesion } from '../helpers/Sesion';
import VueTimepicker from 'vue2-timepicker'
import { UsuarioModel, UsuarioBuilder } from '../models/UsuarioModel';
import { VueGoodTable } from 'vue-good-table';
import TABLE_CONFIG from "../helpers/DatatableConfig";
import Popup from "../controller/Popup";
import Loader from "../components_utils/Loader";
import { validarDatosUsuario } from '../helpers/UsuarioValidacion';


export default {
  name: "cat-usuario",
  mixins: [operacionesApi],
  components: {
    VueGoodTable, Datepicker, VueTimepicker, Popup,Loader
  },  
  data() {
    return {
      usuario: UsuarioModel,
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      listaUsuario: [],
      es: es,
      TABLE_CONFIG: TABLE_CONFIG,
      loader : false,
      contador :0,
      columnasUsuario: [
        { label: "Id", field: "id", hidden: true },
        { label: "Foto", field: "foto", hidden: true },
        { label: "Nombre", field: "nombre" },
        { label: "Correo", field: "correo" }, 
        { label: "Hora Entrada", field: "hora_entrada" },
        { label: "Hora Salida", field: "hora_salida"},
        { label: "", field: "botones"}
      ]
    };
  },
  mounted() {
    console.log("iniciando el componente usuario ");

    this.usuarioSesion = getUsuarioSesion();
    this.init();
  },
  methods: {    
    init() {
      console.log("Init");
      this.loader = true;
      this.get(URL.USUARIO_BASE + "/" + this.usuarioSesion.co_sucursal,
        (result) => {
          console.log("Consulta " + JSON.stringify(result.body));
          this.loader = false;
          if (result.body != null) {
            this.listaUsuario = result.body || [];
            this.contador = this.listaUsuario.length;
          }
        });
    },
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.usuario = new UsuarioModel();
      $("#popup_usuario").modal("show");
    },
   async guardar() {
      console.log("Insertar");
      
      //const isValid = await this.$refs.observer.validate();      
      //if(!validarDatosUsuario(this.usuario) && !isValid){
        if(!validarDatosUsuario(this.usuario)){
        console.log("No paso la validacion");
        return;     
      }       
      

      this.usuario.co_sucursal = this.usuarioSesion.co_sucursal;
      this.usuario.genero = this.usuarioSesion.id;

      this.post(URL.USUARIO_BASE,
        this.usuario,
        (result) => {
          console.log("this.response " + result.body);
          this.$notificacion.info('Registro de usuario', 'Se registró el usuario.');
          this.init();
          $("#popup_usuario").modal("hide");
        }
      );
    },

    modificar() {
      console.log("Modificar el id " + this.usuario.id);

      /*if (!validacionDatosAlumno(this.input)) {
        console.log("No paso la validacion");
        return;
      }*/

      this.put(URL.USUARIO_BASE + "/" + this.usuario.id,
        this.usuario,
        (result) => {
          if (this.body != null) {
            console.log("" + result.body);
            this.$notificacion.info('Modificación de usuario', 'Se actualizarón los datos del usuario.');
            this.init();
            $("#popup_usuario").modal("hide");
          }
        }
      );

    },
    eliminar() {
      console.log("Modificar el id " + this.usuario.id);

      this.remove(URL.USUARIO_BASE + "/" + this.usuario.id,
        this.usuario,
        (result) => {
          console.log(" " + result.data);
          if (result.data != null) {
            console.log("" + result.data);
            this.$notificacion.error('Registro de Baja de usuario', 'Se registro la baja de usuario ' + this.usuario.nombre + '.');
            this.init();
          }
        }
      );

    },
    seleccionar(rowSelect, operacion) {
      console.log("fila seleccionada " + rowSelect.adeuda);
      this.operacion = operacion;
      this.usuario = rowSelect;
      if(operacion == 'EDIT'){
        $("#popup_usuario").modal("show");
      }
       if (operacion == 'DELETE') {        
         //validar si no esta en asistencia

         //this.$notificacion.warn('Baja de usuario', 'No es posible dar de baja el alumno por motivos de deuda activa.');
         $("#popup_eliminar_usuario").modal("show");
       } 
    },
    verDetalle(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      //$("#popup_eliminar_usuario").modal("show");
      //this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    },
    validarHoras(eventData){
      //console.log("HOra entrada "+ JSON.stringify(this.usuario.hora_entrada)+" SALIDA "+JSON.stringify(this.usuario.hora_salida));
      console.log();
    }
    
  }
};