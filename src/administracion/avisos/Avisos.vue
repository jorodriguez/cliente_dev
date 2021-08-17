<template>
  <div class="catalogo_alumno">
    <h1>Avisos ({{contador}})</h1>
    <small>{{usuarioSesion.nombre_sucursal}}</small> 
    <div class="row">
      <div class="col-1">
        <router-link to="/Administracion" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>        
      </div>
      <div class="col-1">        
        <!--<PopupNuevoUsuario :metodo_refrescar="init"></PopupNuevoUsuario>-->
      </div>
    
    </div>   
    <Loader :loading="loader" />
    <br/>
    
    <div class="card">
      <div class="card-body">
        <vue-good-table
          :columns="columnas"
          :rows="lista"
          :line-numbers="true"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
          :groupOptions="{enabled: false}"
        >
          <template slot="table-row" slot-scope="props">                        
            <span v-if="props.column.field == 'aviso'">
              <span >{{props.row.aviso}} </span>
            </span>
            <span v-else-if="props.column.field == 'botones'">              
              
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
          </template>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import URL from "../../helpers/Urls";
import { operacionesApi } from "../../helpers/OperacionesApi";
import { en, es } from 'vuejs-datepicker/dist/locale'
import { getUsuarioSesion } from '../../helpers/Sesion';
import VueTimepicker from 'vue2-timepicker'
import { AvisoModel, AvisoBuilder } from '../../models/AvisoModel';
import { VueGoodTable } from 'vue-good-table';
import TABLE_CONFIG from "../../helpers/DatatableConfig";
import Popup from "../../controller/Popup";
import Loader from "../../components_utils/Loader";
import { validarDatosAviso } from '../../helpers/AvisoValidacion';
import * as moment from 'moment';
import CONSTANTES  from '../../helpers/Constantes'

export default {
  name: "catalogo-avisos",
  mixins: [operacionesApi],
  components: {
    VueGoodTable, Datepicker, VueTimepicker, Popup, Loader
  },
  data() {
    return {
      aviso: AvisoModel,
      avisoMemento: AvisoModel,      
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      lista: [],
      es: es,      
      TABLE_CONFIG: TABLE_CONFIG,
      loader: false,
      contador: 0,      
      columnas: [
        { label: "Id", field: "id", hidden: true },
        { label: "Empresa", field: "empresa", hidden: true },
        { label: "Fecha", field: "fecha" },
        { label: "para", field: "para" },
        { label: "etiquetas", field: "etiquetas" },
        { label: "titulo", field: "titulo" },
        { label: "aviso", field: "aviso" },
        { label: "nota_interna", field: "nota_interna"},
        { label: "fecha_genero", field: "fecha_genero"},
        { label: "Usuario", field: "usuario_genero" }
      ]
    };
  },
  mounted() {
    console.log("iniciando el componente usuario ");

    this.usuarioSesion = getUsuarioSesion();
    this.init();
    this.aviso = new AvisoModel(); 
  },
  methods: {
    init() {      
      this.loader = true;
      this.get(URL.AVISOS + "/" + this.usuarioSesion.id,
        (result) => {          
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
      this.aviso = new AvisoModel();          
      //$("#popup_aviso").modal("show");
    },
    async guardar() {
      console.log("Insertar");            
      if (!validarDatosAviso(this.aviso)) {
        console.log("No paso la validacion");        
        return;
      }     
      this.usuario.genero = this.usuarioSesion.id;      
      this.post(URL.AVISOS,
        this.aviso,
        (result) => {          
          let respuesta = result.body;
          if(respuesta.estatus){
            this.init();            
            //$("#popup_aviso").modal("hide");            
            this.$notificacion.info('Aviso ', 'Se registró el aviso.');
          }else{
            this.$notificacion.error('Mensaje',respuesta.mensaje);
          }                   
        }
      );
    },

    modificar() {      
      if (!validarDatosUsuario(this.usuario)) {
        console.log("No paso la validacion");
        return;
      }
      
      this.usuario.genero = this.usuarioSesion.id;

    this.put(URL.AVISOS,
        this.aviso,
        (result) => {
          if (result != null) {            
            let respuesta = result.body;
            if(respuesta.estatus){
              this.$notificacion.info('Modificación de aviso', 'Se actualizarón los datos del aviso.');
              this.init();            
              $("#popup_aviso").modal("hide");                          
            }else{
              this.$notificacion.error('Mensaje',respuesta.mensaje);
            }              
            
          }
        }
      );

    },
    eliminar() {            
      /*
      const datosBaja = {
        ids_
      }genero = this.usuarioSesion.id;
      
      this.put(URL.AVISO + "/" + this.usuario.id,
        this.datosBaja,
        (result) => {
          let respuesta = result.body;
            if(respuesta.estatus){
              this.$notificacion.error('Eliminación ', 'Se eliminó el aviso.');
              $("#popup_baja").modal("hide");
              this.init();
            }else{
              this.$notificacion.error('Mensaje',respuesta.mensaje);
            }          
        }
      );*/
    },
    seleccionar(rowSelect, operacion) {
      console.log("fila seleccionada " + rowSelect.adeuda);
      this.operacion = operacion;
      
      this.usuario = Object.assign({}, rowSelect);      

      if (this.operacion == 'EDIT') { 
        $("#popup_aviso").modal("show");
      }
      if (this.operacion == 'DELETE') {        
        
        //this.datosBaja = {motivo_baja:"",fecha_baja:new Date()};        
        $("#popup_baja").modal("show");
      }      
    },
    verDetalle(rowSelect) {
      console.log("fila seleccionada " + rowSelect.empresa);     

    }   

  }
};
</script>

<style scoped>
</style>
