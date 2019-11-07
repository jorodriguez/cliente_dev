
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { VueGoodTable } from 'vue-good-table';
import Datepicker from 'vuejs-datepicker';
import COLUMNS_TABLE_ASISTENCIA  from "../helpers/DatatableConfigAsistencias";
import TABLE_CONFIG from "../helpers/DatatableConfig";

export default {
  name: "reporte-asistencia",
  components: {
    Datepicker,VueGoodTable
  },
  mixins:[operacionesApi],
  data() {
    return {      
      usuarioSesion: {},
      sesion: {}, 
      fecha:Date,
      listaAsistencia: [],                                    
      alumno_seleccionado:{},
      columnas:COLUMNS_TABLE_ASISTENCIA,
      TABLE_CONFIG:TABLE_CONFIG,
      mensaje: "",
      loading:Boolean
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de asistencia ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      //this.$router.push("/");
      this.mensaje = "Expiró su sesión";
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
    this.fecha = new Date();
    this.loadFunction = function () {
      this.loading = true;
      this.get(
        URL.ASISTENCIA_REPORTE + this.usuarioSesion.co_sucursal+"/"+fecha,
        this.sesion.token,
        (result) => {
          this.response = result.data;
          console.log("Consulta " + this.response);
          if (this.response != null) {
            this.lista = this.response;                        
          }
          this.loading = true;
        });    
    };
   // this.loadFunction();
    
  },
  methods: {
    onRowClick(params) {
      console.log(JSON.stringify(params));
      //this.alumno_seleccionado = params.row ;
      
    },
    onSearch(params) {
      console.log(JSON.stringify(params));      
    },
    selectAll(selected, selectedRows) {
      
    },
    selectionChanged(params) {
      this.rowSelection = params.selectedRows;
      console.log("Seleccion");      
    },
  }   
};