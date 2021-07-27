/* eslint-disable vue/no-parsing-error */
/* eslint-disable vue/valid-v-bind */
<template>
  <div>
    <h1>Lista de Asistencia </h1>            
    <small>{{usuarioSesion.nombre_sucursal}}</small>     
    <div class="text-left">      
      <router-link to="/AsistenciaUsuarioRh" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
    </div>
    
     <div class="row">
          <div class="col">
            <div class="float-right">
              <datepicker
                name="fecha"
                v-model="fechaInicio"
                input-class="form-control"
                @selected="cambiarFecha"
                format="MM/dd/yyyy"
                :value="fechaInicio"
              ></datepicker>
            </div>
          </div>
          <div class="col">
            <div class="float-right">
              <datepicker
                name="fecha"
                v-model="fechaFin"
                input-class="form-control"
                format="MM/dd/yyyy"
                :value="fechaFin"
                @selected="cambiarFecha"
              ></datepicker>
            </div>
          </div>
           <div class="col">
             <button
            type="button"
            class="btn btn-primary "
            :disabled="this.loading"
            v-on:click="cargarLista()"
          >Cargar</button>
           </div>
       </div>   
    
     <div v-if="loading" class="h4">
          <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Cargando...</span>
          </div>
        </div>

    <div class="row" v-for="(item, index) in lista" :key="index">    
    <h2>{{item.dia_id}} : {{item.name_day}}</h2>    
    <table class="table table-sm table-striped" >    
        <tr>
            <!-- <th>Fecha</th>-->
            <th class=" d-flex align-items-start">Nombre</th>
            <th>H. Entrada</th>
            <th>H. Salida</th>
            
       </tr>
        <tr v-for="(dia,idx) in item.asistencias" :key="idx">
          <!-- <td> {{dia.fecha}}</td>-->
          <td align="left"> {{dia.nombre.toUpperCase()}}</td>
          <td> {{dia.hora_entrada}}</td>
          <td> {{dia.hora_salida}}</td>
        </tr>
    </table>
  
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
     console.log("iniciando el componente reporte de asistencia de usuarios de rh");    
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
