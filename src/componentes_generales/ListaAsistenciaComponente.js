
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { VueGoodTable } from 'vue-good-table';
import COLUMNS_TABLE_ASISTENCIA_ALUMNO  from "../helpers/DatatableAlumnoAsistencia";
import TABLE_CONFIG from "../helpers/DatatableConfig";
import { GChart } from "vue-google-charts";

export default {
  name: "lista-asistencia-alumno",
  components: {
    VueGoodTable
  },
  mixins: [operacionesApi],
  template: `<span>
              <div class="spinner-grow spinner-grow-sm" role="status" v-if="loading">
                  <span class="sr-only">Cargando...</span>
                  <vue-good-table
                  :columns="columnas"
                  :rows="lista"
                  :line-numbers="false"
                  @on-row-click="onRowClick"
                  @on-search="onSearch"
                  :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
                  :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
                  @on-selected-rows-change="selectionChanged"
                  :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"                  
                >
                </vue-good-table>
              </div>            
             </span>`,
  props: ['idalumno'],
  data() {
    return {          
      columnas:COLUMNS_TABLE_ASISTENCIA_ALUMNO,
      TABLE_CONFIG:TABLE_CONFIG, 
      lista: [],      
      loading: false,
      load: null,
      numero_mes: "",
      mensaje: "",
      sesion: null,
      usuarioSesion: null
    };
  },
  mounted() {
    console.log("iniciando el componente lista de asistencia alumno ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    if (!this.idalumno) {
      console.log("No existe la propiedad de idalumno");

    }
    this.loading = true;
    this.load = () => {
      this.get(        
        URL.ASISTENCIA_REPORTE_POR_ALUMNO + `${this.idalumno}`,
        this.sesion.token,
        (result) => {
          if (result.data != null) {
            this.lista = result.data;                        
            this.loading = false;
          }
        }
      );
    };
    this.load();
  },
  methods: {
    changedMonth(data) {
      console.log("Cambio de mes " + data);
    },    
    onRowClick(params) {
      console.log(JSON.stringify(params));
        
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
  },
};


  