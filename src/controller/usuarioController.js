import Datepicker from 'vuejs-datepicker';
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import { en, es } from 'vuejs-datepicker/dist/locale'
import { getUsuarioSesion } from '../helpers/Sesion';
import { UsuarioModel, UsuarioBuilder } from '../models/UsuarioModel';


export default {
  name: "Usuario",
  components: {
    Datepicker
  },
  mixins: [operacionesApi],
  data() {
    return {
      usuario: UsuarioModel,
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      lista: []
    };
  },
  mounted() {
    console.log("iniciando el componente alumno ");

    this.usuarioSesion = getUsuarioSesion();
   
    this.init();
  },
  methods: {
    init() {
      this.get(URL.USUARIO_BASE + "/" + this.usuarioSesion.co_sucursal,
        (result) => {
          console.log("Consulta " + result.body);
          if (result.body != null) {
            this.lista = this.body;
          }
        });
    },
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.usuario = new UsuarioModel();
      $("#popup_usuario").modal("show");
    },
    guardar() {
      console.log("Insertar");
      /*if (!validacionDatos(this.input)) {        -
        console.log("No paso la validacion");
        return;
      }*/

      this.usuario.co_sucursal = this.usuarioSesion.co_sucursal;
      this.usuario.genero = this.usuarioSesion.id;

      this.post(URL.USUARIO_BASE,
        this.usuario,
        (result) => {          
          console.log("this.response " + this.body);          
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
            console.log("" + this.body);            
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
    select(rowSelect, operacion) {
      console.log("fila seleccionada " + rowSelect.adeuda);
      this.operacion = operacion;
      this.usuario = rowSelect;      
     /* if (operacion == 'DELETE') {        
        this.$notificacion.warn('Baja de usuario', 'No es posible dar de baja el alumno por motivos de deuda activa.');
        return;
      } else {*/
        $("#popup_eliminar_usuario").modal("show");
      //}
    },
    verDetalle(rowSelect) {
      console.log("fila seleccionada " + rowSelect.nombre);
      //$("#popup_eliminar_usuario").modal("show");
      //this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id } });
    }    
  }
};