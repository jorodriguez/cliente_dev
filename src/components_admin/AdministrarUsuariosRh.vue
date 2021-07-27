<template>
  <div>
    <div class="card">
      <div class="card-body">       
        <h5>Usuarios</h5>
          <div class="row">
             <div
                v-for="row in listaSucursales"
                :key="row.id"
                class="col-xl-3 col-sm-4 py-2 mx-auto"
              >
                    
                <SucursalCard    
                  @click="cargarListaUsuariosSucursal(row.id_sucursal)"              
                  :class_color="row.class_color"
                  titulo
                  :nombre="row.nombre_sucursal"
                  :foto="row.foto"
                  icono_etiqueta="fa fa-user"
                  etiqueta=""
                  descripcion
                >
                  <div slot="contenido">
                                         
                  </div>
                </SucursalCard>   
                          
              </div>
            </div>

     <Loader :loading="loading" :mini="true" /> 
     <vue-good-table
          :columns="columnas"
          :rows="lista"
          :line-numbers="true"
          @on-row-click="onRowClick"          
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
          @on-selected-rows-change="selectionChanged"
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
          @on-select-all="selectAll"
          :groupOptions="{
  	          enabled: false,               
          }"
        >      
         <template slot="table-row" slot-scope="props">  
          <span v-if="props.column.field == 'fecha_baja'">                 
              <span :class="props.row.eliminado ?  'text-danger':'text-success'" >{{props.row.fecha_baja}}</span>            
          </span>  
           <!--<span v-else-if="props.column.field == 'motivo_baja'">           
              <span v-if="props.row.eliminado" class="text-danger" >{{props.row.motivo_baja}}</span>            
          </span>  -->
          <span v-else-if="props.column.field == 'eliminado'">           
              <span v-if="props.row.eliminado" class="text-danger" >{{props.row.eliminado ? 'SI':''}}</span>            
          </span>  
          </template>
      </vue-good-table>
      
        <Popup id="visibleUsurioReporte" show_button_close="true">
          <div slot="header">Confirmación</div>
          <div slot="content">
            <div class="row">
              <div class="container">
              ¿En realidad desea no ver el usuario en el reporte?
              </div>
            </div>
          </div>
          <div slot="footer"></div>
        </Popup>
      </div>
    </div>
  </div>
</template>


<script >
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { VueGoodTable } from 'vue-good-table';
import TABLE_CONFIG from "../helpers/DatatableConfig";
import Datepicker from 'vuejs-datepicker';
import SucursalCard from './fragmentos/SucursalCard';
import {getUsuarioSesion} from '../helpers/Sesion';
import Loader from "../components_utils/Loader";

export default {
  name: "AdministrarUsuriosRh",
  components: {
    Datepicker,VueGoodTable,SucursalCard,Loader
  },
  mixins:[operacionesApi],  
  props: {},
  data() {
    return {
      sesion:null,    
      lista:[],
      listaSucursales:[],
      sucursalSeleccionada:null,
      loading:false,
      usuarioSesion:{},
      TABLE_CONFIG:TABLE_CONFIG,
      columnas:[        
        {          
          label: 'Id',
          field: 'id',
          hidden: true
        },
        {          
          label: 'Nombre',
          field: 'nombre',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        }, 
        {          
          label: 'Correo',
          field: 'correo',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center'          
        }, 
       
        {          
          label: 'Gerente',
          field: 'permiso_gerente',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        }, 
        {          
          label: 'Tipo',
          field: 'tipo',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        }, 
        {          
          label: 'H. Entrada',
          field: 'hora_entrada',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },  
        {          
          label: 'H. Salida',
          field: 'hora_salida',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        }, 
        {          
          label: 'F. Baja',
          field: 'fecha_baja',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        }, 
        {          
          label: 'Motivo',
          field: 'motivo_baja',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        }, 
        {          
          label: 'Baja',
          field: 'eliminado',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
          hidden:false
        }, 
        {          
          label: 'Acceso sistema',
          field: 'acceso_sistema',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
                  }, 
         {          
          label: 'Mensual',
          field: 'sueldo_mensual',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',          
        }, 
          {          
          label: 'Quincenal',
          field: 'sueldo_quincenal',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',          
        }, 
        {          
          label: 'Visible Reporte',
          field: 'visible_reporte',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',          
        }, 
      ]       
    }  
  },
  mounted() {    
     console.log("iniciando el componente reporte de asistencia de usuarios de rh");    
     this.usuarioSesion = getUsuarioSesion();     
     this.init();
  },
  methods: {
    init (){
       this.cargarUsuarioSucursal();
    },
    cargarUsuarioSucursal(){
     this.loader = false;
     this.get( URL.SUCURSAL_USUARIO + "/" + this.usuarioSesion.id,
          results => {
            if (results.data != null) {
              this.loader = false;
              this.listaSucursales = results.data;
            }
          }
        );
    },
    cargarListaUsuariosSucursal(id_sucursal){
      this.loading = true;
      this.get(
        URL.USUARIOS_RH +id_sucursal,                
        (result) => {          
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.lista = result.data;                        
          }
          this.loading = false;
        });
    },   
    selectionChanged(){

    },
    onRowClick(){
      
    },
    selectAll(selected, selectedRows) {
      
    },
  }
};
</script>
