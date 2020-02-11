<template>
  <span>
    <a
      class="nav-link pr-0"
      href="#"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="verLista()"
    >
      <small class="text-white">
        <strong>Pagos Pendientes</strong>
      </small>
      <small class="badge badge-pill badge-warning"> <Loader :loading="loader" /> {{contador}}</small>
    </a>

    <Popup id="popup_mensualidad" size="md" show_button_close="true">
      <div slot="header">
        <p>Mensualidades próximas a vencer</p>
      </div>
      <div slot="content">
        <div class="text-center">
          <div class="container text-center">
            <vue-good-table
              :columns="columnas"
              :rows="listaMensualidades"
              :line-numbers="true"
              :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
              :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
              :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
              :groupOptions="{
  	          enabled: false,               
          }"
            ></vue-good-table>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>
  </span>
</template>

<script>
import Popup from "../controller/Popup";
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import Loader  from "../components_utils/Loader";
import { getUsuarioSesion, token } from "../helpers/Sesion";
import TABLE_CONFIG from "../helpers/DatatableConfig";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "indicadores-mensualidad-vencer",
  mixins: [operacionesApi],
  components: {
    Popup,
    VueGoodTable,Loader
  },
  data() {
    return {
      listaMensualidades: [],
      loader: false,
      obtenerIndicadorMensualidad: null,
      usuarioSesion: null,
      contador:0,
      TABLE_CONFIG: TABLE_CONFIG,
      columnas: [
        {
          label: "Id",
          field: "id_sucursal",
          hidden: true
        },
        {
          label: "nombre_sucursal",
          field: "nombre_sucursal"          
        },
        {
          label: "mensualidades_vencidas",
          field: "mensualidades_vencidas",
          hidden:true
        },
        {
          label: "existen_mensualidades_vencidas",
          field: "existen_mensualidades_vencidas",
          hidden:true
        }
      ]
    };
  },
  mounted() {
    console.log("Inciando consulta de indicadores");

    this.usuarioSesion = getUsuarioSesion();

    this.obtenerIndicadorMensualidad = function() {
      console.log(
        "@obtenerIndicadorMensualidad " + this.usuarioSesion.co_sucursal
      );
      this.loader = true;
      this.get(
        URL.MENSUALIDAD_VENCE_SEMANA_ACTUAL + this.usuarioSesion.co_sucursal,
        results => {
          console.log(" MENSUALIDADADES A VENCER  " +JSON.stringify(results.body));
          if (results.body != null) {
            this.loader = false;
            this.listaMensualidades = results.body;
            let sucItem = this.listaMensualidades[0] || null;
            if(sucItem != null){
              this.contador = sucItem.mensualidades_vencidas.length;
            }            
          }
        }
      );
    };
    this.obtenerIndicadorMensualidad();
  },
  methods: {
    verLista() {
      $("#popup_mensualidad").modal("show");
    }
  }
};
</script>