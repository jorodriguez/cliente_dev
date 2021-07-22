<template>
  <div>
    <h1>Usuarios ({{ lista != [] ? lista.length:0}})</h1>
    <small>{{usuarioSesion.nombre_sucursal}}</small>
    <div class="text-left">
      <router-link to="/principal" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>      
    </div>
    <br />    
     <!-- DESACTIVAR USUARIO -->
    

    <div class="card">
      <div class="card-body">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Buscar por nombre.."
            v-model="criterioNombre"
            v-on:keyup.enter="buscarPorNombre()"
            aria-label="Buscar por nombre.."
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" v-on:click="buscarPorNombre()">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

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
           <span v-else-if="props.column.field == 'motivo_baja'">           
              <span v-if="props.row.eliminado" class="text-danger" >{{props.row.motivo_baja}}</span>            
          </span>  
          <span v-else-if="props.column.field == 'eliminado'">           
              <span v-if="props.row.eliminado" class="text-danger" >{{props.row.eliminado ? 'SI':''}}</span>            
          </span>  
          </template>
      </vue-good-table>
      
     
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
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "ReporteAsistenciaUsuarioRh",
  components: {
    Datepicker,VueGoodTable
  },
  mixins:[operacionesApi],  
  props: {},
  data() {
    return {
      sesion:null,
      fechaInicio:Date,
      fechaFin: Date,
      lista:[],
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
          label: 'Registro',
          field: 'fecha_registro',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
          hidden:true
        }, 
        {          
          label: 'Primer Asistencia',
          field: 'primer_asistencia',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        }, 
        {          
          label: 'Ùltima Asistencia',
          field: 'ultima_asistencia',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        }, 
        {          
          label: 'No. Asistencias en el rango',
          field: 'asistencias',
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
        
      ]       
    }  
  },
  mounted() {    
     console.log("iniciando el componente admin");    
     this.usuarioSesion = getUsuarioSesion();
     this.fechaInicio = new Date();
     this.fechaFin = new Date();
     this.init();
  },
  methods: {
    init (){
       
    },
    cargarLista(){
      this.loading = true;
      this.get(
        URL.REPORTE_ASISTENCIA_RH + this.usuarioSesion.co_sucursal+"/"+this.fechaInicio+"/"+this.fechaFin,                
        (result) => {          
          console.log("Consulta " + result.data);
          if (result.data != null) {
            this.lista = result.data;                        
          }
          this.loading = false;
        });
    },
     cambiarFecha(){
         this.$nextTick(() => {
           console.log(this.fechaInicio);           
           console.log(this.fechaFin);          
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


<style scoped>
</style>
