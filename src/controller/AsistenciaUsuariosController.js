
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import Popup from './Popup'
import { VueGoodTable } from 'vue-good-table';
import COLUMNS_TABLE_ASISTENCIA_USUARIO_ENTRADA  from "../helpers/DatatableConfigAsistenciasUsuariosEntrada";
import COLUMNS_TABLE_ASISTENCIA_USUARIO_SALIDA  from "../helpers/DatatableConfigAsistenciasUsuariosSalida";
import TABLE_CONFIG from "../helpers/DatatableConfig";
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "AsistenciaUsuarios",
  components:{
      Popup,VueGoodTable
  },
  mixins: [operacionesApi],
  data() {
    return {
      usuarioSesion: {},
      //sesion: {},
      usuarioSeleccionado: {},
      usuarioAsistenciaSeleccionado: {},
      listaPorEntrar: [],                      
      listaPorSalir: [],
      response: "",
      operacion:"",      
      comentario:"",
      loaderPorEntrar:false,
      loaderPorSalir:false,
      TABLE_CONFIG:TABLE_CONFIG,
      COLUMNAS_ENTRADA: COLUMNS_TABLE_ASISTENCIA_USUARIO_ENTRADA,
      COLUMNAS_SALIDA: COLUMNS_TABLE_ASISTENCIA_USUARIO_SALIDA,
    };
  },
  mounted() {
    console.log("iniciando el componente de asistencia de usuarios ");
   
   this.usuarioSesion = getUsuarioSesion();
    this.TABLE_CONFIG.PAGINATION_OPTIONS.perPage = 50;

    this.loadFunctionPorEntrar = function () {
      this.loaderPorEntrar = true;
      this.get(
        URL.ASISTENCIA_USUARIO_POR_ENTRAR + this.usuarioSesion.co_sucursal,
        
        (result) => {          
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.listaPorEntrar = result.data;      
            this.loaderPorEntrar = false;      
          }
        });
    };

    this.loadFunctionPorSalir = function () {
      this.loaderPorSalir = true;
      this.get(
        URL.ASISTENCIA_USUARIO_POR_SALIR + this.usuarioSesion.co_sucursal,
        
        (result) => {          
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.listaPorSalir = result.data;      
            this.loaderPorSalir = false;      
            console.log(JSON.stringify(this.listaPorSalir));
          }
        });
    };

    this.loadFunctionPorEntrar();
    this.loadFunctionPorSalir();
  },
  methods: {
    seleccionarUsuario(item){
        this.usuarioSeleccionado = item;
        this.comentario = '';
        this.operacion = "ENTRADA";        
        $("#popup_entrada").modal("show");

    },  
    registrarEntrada() {
      console.log("registrando entrada");
        this.post(
          URL.ASISTENCIA_USUARIO_ENTRADA,
          { id:this.usuarioSeleccionado.id,comentario_entrada:this.comentario, genero: this.usuarioSesion.id },
          
          (result) => {            
            console.log("insertados " + result.data);
            if (result.data != null) {
              this.lista = result.data;              
              this.$notificacion.info("Entrada", "Se registró la entrada.");
              $("#popup_entrada").modal("hide");
              this.loadFunctionPorEntrar();
              this.loadFunctionPorSalir();              
            }
          }
        );    
    },
    seleccionarUsuarioAsistencia(item){
      this.usuarioAsistenciaSeleccionado = item;
      this.comentario = '';
      this.operacion = 'SALIDA';      
      $("#popup_salida").modal("show");
    },

    registrarSalida() {
      
      console.log("Registrar salida");
      this.post(
        URL.ASISTENCIA_USUARIO_SALIDA,
        { id_asistencia:this.usuarioAsistenciaSeleccionado.id,comentario_salida:this.comentario, genero: this.usuarioSesion.id },
        
        (result) => {            
          console.log("insertados " + result.data);
          if (result.data != null) {
            this.lista = result.data;            
            this.$notificacion.info("Salida", "Se registró la salida.");
            $("#popup_salida").modal("hide");
            this.loadFunctionPorEntrar();
            this.loadFunctionPorSalir();              
          }
        }
      );    
    },   
  }
};