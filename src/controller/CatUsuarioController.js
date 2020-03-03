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
import * as moment from 'moment';
import CONSTANTES  from '../helpers/Constantes'

export default {
  name: "cat-usuario",
  mixins: [operacionesApi],
  components: {
    VueGoodTable, Datepicker, VueTimepicker, Popup, Loader
  },
  data() {
    return {
      usuario: UsuarioModel,
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      listaUsuario: [],
      es: es,
      registrarCorreo: false,
      TABLE_CONFIG: TABLE_CONFIG,
      loader: false,
      contador: 0,
      rangoHora: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      columnasUsuario: [
        { label: "Id", field: "id", hidden: true },
        { label: "Foto", field: "foto", hidden: true },
        { label: "Nombre", field: "nombre" },
        { label: "Correo", field: "correo" },
        { label: "Hora Entrada", field: "hora_entrada" },
        { label: "Hora Salida", field: "hora_salida" },
        { label: "acceso sistema", field: "acceso_sistema" ,hidden:true},
        { label: "nuevo ingreso", field: "nuevo_ingreso" ,hidden:true},
        { label: "", field: "botones" }
      ]
    };
  },
  mounted() {
    console.log("iniciando el componente usuario ");

    this.usuarioSesion = getUsuarioSesion();
    this.init();
    this.usuario = new UsuarioModel(); 
  },
  methods: {
    init() {
      console.log("Init");
      this.loader = true;
      this.get(URL.USUARIO_BASE + "/" + this.usuarioSesion.co_sucursal,
        (result) => {
          // console.log("Consulta " + JSON.stringify(result.body));
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
      console.log(JSON.stringify(this.usuario));
      if (!validarDatosUsuario(this.usuario)) {
        console.log("No paso la validacion");
        return;
      }

      this.usuario.hora_entrada = moment({hour:this.usuario.hora_entrada.HH,minute:this.usuario.hora_entrada.mm}).format('H:mm');
      this.usuario.hora_salida = moment({hour:this.usuario.hora_salida.HH,minute:this.usuario.hora_salida.mm}).format('H:mm'); 
      console.log(`entrada ${this.usuario.hora_entrada} salida ${this.usuario.hora_entrada}`);
      this.usuario.co_sucursal = this.usuarioSesion.co_sucursal;
      this.usuario.genero = this.usuarioSesion.id;
      this.usuario.id_tipo_usuario = CONSTANTES.ID_TIPO_USUARIO_MAESTRA;

      this.post(URL.USUARIO_BASE,
        this.usuario,
        (result) => {
          console.log("this.response " + result.body);
          let respuesta = result.body;
          if(respuesta.estatus){
            this.init();            
            $("#popup_usuario").modal("hide");            
            this.$notificacion.info('Registro de usuario', 'Se registró el usuario.');
          }else{
            this.$notificacion.error('Mensaje',respuesta.mensaje);
          }                   
        }
      );
    },

    modificar() {
      console.log("Modificar el id " + this.usuario.nombre);

      if (!validarDatosUsuario(this.usuario)) {
        console.log("No paso la validacion");
        return;
      }

      this.usuario.co_sucursal = this.usuarioSesion.co_sucursal;
      this.usuario.genero = this.usuarioSesion.id;

    //this.put(URL.USUARIO_BASE + "/" + this.usuario.id,
    this.put(URL.USUARIO_BASE,
        this.usuario,
        (result) => {
          if (result != null) {
            console.log("" + JSON.stringify(result.body));
            let respuesta = result.body;
            if(respuesta.estatus){
              this.$notificacion.info('Modificación de usuario', 'Se actualizarón los datos del usuario.');
              this.init();            
              $("#popup_usuario").modal("hide");                          
            }else{
              this.$notificacion.error('Mensaje',respuesta.mensaje);
            }              
            
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
      if (operacion == 'EDIT') {
        $("#popup_usuario").modal("show");
      }
      if (operacion == 'DELETE') {
        //validar si no esta en asistencia

        //this.$notificacion.warn('Baja de usuario', 'No es posible dar de baja el alumno por motivos de deuda activa.');
        $("#popup_eliminar_usuario").modal("show");
      }
      if(operacion === 'ACCESO_SISTEMA'){
        $("#popup_acceso").modal("show");
      }
    },
    verDetalle(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      //$("#popup_eliminar_usuario").modal("show");
      //this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    },
    validarHoras(eventData) {
      //console.log("HOra entrada "+ JSON.stringify(this.usuario.hora_entrada)+" SALIDA "+JSON.stringify(this.usuario.hora_salida));
      let horaEntrada = moment({hour:this.usuario.hora_entrada.HH,minute:this.usuario.hora_entrada.mm});
      let horaSalida = moment({hour:this.usuario.hora_salida.HH,minute:this.usuario.hora_salida.mm});
      console.log(` ${horaEntrada} salida ${horaSalida}`);
      if (horaSalida <= horaEntrada) {
        Vue.prototype.$notificacion.error('Hora de entrada y salida', 'La hora de entrada es menos a la hora de salida.');
        return false;
      }
    }

  }
};