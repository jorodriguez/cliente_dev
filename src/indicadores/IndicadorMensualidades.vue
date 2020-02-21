<template>
  <div>
    <a
      class="nav-link pr-0"
      href="#"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="mostrarListaMensualidades()"      
      title="Mensualidades pendientes de pagar"
    >
      <small class="text-white text-wrap" style="width:50px;">
        <strong>Mensualidades Pendientes</strong>
      </small>
      <small class="badge badge-pill badge-warning align-top" >       
        {{sucItem.existen_mensualidades_vencidas ? contador : 0}}
      </small>
    </a>

    <Popup id="popup_indicador" size="lg" :show_button_close="true">
      <div slot="header">
        <p>Mensualidades Pendientes</p>
      </div>
      <!-- :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"-->
      <div slot="content">
        <div class="text-center">
          <div class="container text-center">
            <h2>{{sucItem.nombre_sucursal}}</h2>
             <Loader :loading="loader" :mini="false" />
          
          <!--  max-height="400px"
              :fixed-header="true"-->
            <vue-good-table
              :columns="columnas"
              :rows="listaMensualidades"
              :line-numbers="false"              
              
              :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
              :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
              :groupOptions="{        enabled: false   }"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field == 'nombre_cargo'">
                    <span >{{props.row.nombre_cargo}}</span>  
                    <span >{{props.row.texto_ayuda}}</span>                    
                </span>
                <span v-else-if="props.column.field == 'total_pagado'">
                    <span class="text-primary"><strong>${{props.row.total_pagado}}</strong></span>  
                </span>
                <span v-else-if="props.column.field == 'total'">
                    <span class="text-danger"><strong>${{props.row.total}}</strong></span>  
                </span>
                <span v-else-if="props.column.field == 'botones'">
                  <button class="btn btn-primary"  @click="verPerfil(props.row)" >Pagar</button>                  
                  <!--<router-link :to="'/PerfilAlumno/'+props.row.id_alumno">Pagar</router-link>-->
                </span>
                <span v-else>{{props.formattedRow[props.column.field]}}</span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
      <div slot="footer">
        
      </div>
    </Popup>
        
  </div>
</template>

<script>
import Popup from "../controller/Popup";
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import Loader from "../components_utils/Loader";
import { getUsuarioSesion, token } from "../helpers/Sesion";
import TABLE_CONFIG from "../helpers/DatatableConfig";
import { VueGoodTable } from "vue-good-table";

export default {
  name: "indicadores-mensualidad-vencer",
  mixins: [operacionesApi],
  components: {
    Popup,
    VueGoodTable,
    Loader
  },
  data() {
    return {
      listaMensualidades: [],
      loader: false,
      obtenerIndicadorMensualidad: null,
      usuarioSesion: null,
      contador: 0,
      sucItem:null,      
      TABLE_CONFIG: TABLE_CONFIG,
      columnas: [
        {
          label: "Id",
          field: "id_alumno",
          hidden: true
        },        
        {
          label: "Alumno",
          field: "nombre_alumno"
        },
        {
          label: "Concepto",
          field: "nombre_cargo"
        },
        {
          label: "Pagado",
          field: "total_pagado"
        },
        {
          label: "Adeudo",
          field: "total",
          type:'number'
        },    

        {
          label: "cargo",
          field: "cargo",
          hidden: true
        },
        {
          label: "Fecha Límite",
          field: "fecha_limite_pago_mensualidad",          
        },
        {
          label: "cantidad",
          field: "cantidad",
          hidden: true
        },

        {
          label: "texto_ayuda",
          field: "texto_ayuda",
          hidden: true
        },
        {
          label: "nota",
          field: "nota",
          hidden: true
        },
        {
          label: "",
          field: "botones",          
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
      this.listaMensualidades=[];
      this.get(
        URL.MENSUALIDAD_VENCE_SEMANA_ACTUAL + this.usuarioSesion.co_sucursal,
        results => {
          console.log(
            " MENSUALIDADADES A VENCER  " + JSON.stringify(results.body)
          );
          if (results.body != null) {
            this.loader = false;
            let resultado = results.body;
            this.sucItem = resultado[0] || null;
            if (this.sucItem != null) {
              this.listaMensualidades = this.sucItem.mensualidades_vencidas || [];
              this.contador = this.sucItem.mensualidades_vencidas.length || 0;
            }
          }
        }
      );
    };
    this.obtenerIndicadorMensualidad();
  },
  methods: {
    mostrarListaMensualidades() {
      this.obtenerIndicadorMensualidad();
      $("#popup_indicador").appendTo("#bienvenido").modal("show");      
      //$("#popup_indicador").modal("show");      
    },
    cerrarPopup(){
      //$('#popup_indicador').rem
    },
     verPerfil(rowSelect){
      console.log("Ver perfil para pago id = "+rowSelect.id_alumno );
      $("#popup_indicador").modal("hide");      
      this.$router.push({ name: "PerfilAlumno", params: { id: rowSelect.id_alumno } });
  }
  }, 
};
</script>