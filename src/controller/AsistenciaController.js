
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import ItemCapsulaAlumno from "../components_utils/ItemCapsulaAlumno";

export default {
  name: "Asistencia",
  mixins: [operacionesApi],
  components:{ItemCapsulaAlumno},
  data() {
    return {
      usuarioSesion: {},
      sesion: {},
      item: AlumnoModel,
      lista: [],
      listaSeleccion: [],
      listaRecibidos: [],
      listaSeleccionSalida: [],
      listaFiltroGrupos: [],
      grupoSeleccionado: { id: -1, nombre: '' },
      grupoDefault: { id: -1, nombre: 'Todos' },
      response: "",      
    };
  },
  mounted() {
    console.log("iniciando el componente de asistencia ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    //this.usuarioSesion = this.$session.get("usuario_sesion");
    this.loadFunction = function () {
      console.log("Invocando LoadFuncion");
      this.get(
        URL.ASISTENCIA_POR_RECIBIR + this.usuarioSesion.co_sucursal,
        this.sesion.token,
        (result) => {
          console.log("resultado "+JSON.stringify(result))
          this.response = result.data;
          console.log("Consulta " + this.response);
          if (this.response != null) {
            this.lista = this.response;
            this.filtrarAlumnosPorGrupo(this.grupoDefault);
            this.actualizarComboFiltro();
          }
        });

    };

    //Funcion get alumnos salida
    this.loadFunctionAlumnosSalida = function () {
      this.listaRecibidos = [];

      this.get(URL.ASISTENCIA_RECIBIDOS + this.usuarioSesion.co_sucursal,
        this.sesion.token,
        (result) => {
          this.response = result.data;
          console.log("Consulta " + this.response);
          if (this.response != null) {
            this.listaRecibidos = this.response;
          }
        }
      );

    };

    this.actualizarComboFiltro = () => {
      var resArr = [];
      this.lista.filter(function (item) {
        var i = resArr.findIndex(x => x.nombre == item.nombre_grupo);
        if (i <= -1) {
          resArr.push({ id: item.co_grupo, nombre: item.nombre_grupo });
        }
        return null;
      });
      this.listaFiltroGrupos = resArr;
      console.log("Grupos filtrados " + JSON.stringify(this.listaFiltroGrupos));
    };

    this.loadFunction();
    this.loadFunctionAlumnosSalida();
  },
  methods: {
    addToList(itemSelected) {
      console.log("Add ");
      this.listaSeleccion.push(itemSelected);
      var pos = this.lista.indexOf(itemSelected);
      var elementoEliminado = this.lista.splice(pos, 1);      
    },
    removeToList(itemSelected) {
      console.log("Remove " + itemSelected.nombre);

      var pos = this.listaSeleccion.indexOf(itemSelected);

      var elemento = this.listaSeleccion[pos];

      console.log("esta en la pos " + pos + " el elemento " + elemento.nombre);
      this.lista.push(elemento);

      this.listaSeleccion.splice(pos, 1);

      this.filtrarAlumnosPorGrupo(this.grupoSeleccionado);
    },
    registrarEntrada() {
      console.log("registrando entrada");
      if (this.listaSeleccion.length > 0) {
        var ids = [];

        for (var i = 0; i < this.listaSeleccion.length; i++) {
          var elem = this.listaSeleccion[i];
          ids.push(elem.id);
        }

        this.post(
          URL.ASISTENCIA_ENTRADA_ALUMNOS,
          { ids: ids, genero: this.usuarioSesion.id },
          this.sesion.token,
          (result) => {
            this.response = result.data;
            console.log("insertados " + this.response);
            if (this.response != null) {
              this.lista = this.response;
              this.$notificacion.info("Registro de entrada", "Se registro la entrada.");              
              this.loadFunction();
              this.loadFunctionAlumnosSalida();
              this.listaSeleccion = [];
              this.listaSeleccionSalida = [];
            }
          }
        );

      } else {        
        this.$notificacion.warn("Seleccione al menos un alumno", "");              
      }
    },
    addToListSalida(itemSelected) {
      this.listaSeleccionSalida.push(itemSelected);
      var pos = this.listaRecibidos.indexOf(itemSelected);
      var elementoEliminado = this.listaRecibidos.splice(pos, 1);      
    },
    removeToListSalida(itemSelected) {
      console.log("Remove en lista de salida" + itemSelected.nombre);

      var pos = this.listaSeleccionSalida.indexOf(itemSelected);

      var elemento = this.listaSeleccionSalida[pos];

      console.log("esta en la pos " + pos + " el elemento " + elemento.nombre);
      this.listaRecibidos.push(elemento);

      this.listaSeleccionSalida.splice(pos, 1);
    },
    registrarSalida() {
      console.log("Registrar salida");

      if (this.listaSeleccionSalida.length > 0) {
        var listaSalida = [];

        for (var i = 0; i < this.listaSeleccionSalida.length; i++) {
          var elem = this.listaSeleccionSalida[i];
          listaSalida.push({ id: elem.id, calcular_horas_extra: elem.calcular_horas_extra });
        }

        this.post(
          URL.ASISTENCIA_SALIDA_ALUMNOS,
          { listaSalida: listaSalida, genero: this.usuarioSesion.id },
          this.sesion.token,
          (result) => {
            this.response = result.data;
            if (this.response != null) {
              this.lista = this.response;              
              this.$notificacion.info("Registro de salida", "Se registro la salida de los alumnos.");              
              console.log("Se registro la salida");
              this.loadFunction();
              this.loadFunctionAlumnosSalida();
              this.listaSeleccionSalida = [];
              this.listaSeleccion = [];
            }
          }
        );
      } else {        
        this.$notificacion.warn("Seleccione al menos un alumno", "");              
      }
    },
    filtrarAlumnosPorGrupo(grupoItem) {
      console.log("Grupo selecionado " + JSON.stringify(grupoItem));

      this.grupoSeleccionado = grupoItem;

      if (this.grupoSeleccionado.id == -1) {
        console.log("sinfiltro");
        if(this.lista != null && this.lista != undefined && this.lista != []){
          this.lista.forEach(element => {
            element.visible = true;
          });
        }        
      } else {
        console.log("Filtrar por grupo " + grupoItem.nombre);
        this.lista.forEach(element => {
          if (element.co_grupo == grupoItem.id) {
            element.visible = true;
          } else {
            element.visible = false;
          }
        });

      }
    },
  }
};