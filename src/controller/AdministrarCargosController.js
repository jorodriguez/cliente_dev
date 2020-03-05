import Vue from "vue";
import URL from "../helpers/Urls";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import Popup from './Popup'
import TABLE_CONFIG from "../helpers/DatatableConfig";
import { operacionesApi } from "../helpers/OperacionesApi";
import {getUsuarioSesion} from '../helpers/Sesion';

export default {
  name: "AlumnosCargos",
  components: {
    VueGoodTable,
    Popup    
  },
  mixins: [operacionesApi],
  data() {
    return {      
      listaSucursales: [],     
      listaAlumnosCargos : [],
      listaCargos:[],
      usuarioSesion: {},     
      sesion: {},
      sucursal_seleccionada: { id_sucursal: 0, nombre: "" },
      loadFunctionSucursal: null,
      loadFunctionAlumnosSucursal: null,        
      
      response: "",
      mensaje: "",
      TABLE_CONFIG: TABLE_CONFIG,     
      columnsAlumnos: [
        {
          label: 'Id',
          field: 'id',
          hidden: true
        },
        {
          label: '',
          field: 'foto',
          filterable: false,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Alumno',
          field: 'nombre_alumno',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'Apellidos',
          field: 'apellidos',         
          hidden: true
        },
        {
          label: 'Grupo',
          field: 'grupo',        
          thClass: 'text-center',
          tdClass: 'text-center',           
          filterable: true
        },
        {
          label: 'Total Cargos',
          field: 'total_cargos_no_pagados',
          filterable: true,
          thClass: 'text-center',
          tdClass: 'text-center',
        },
        {
          label: 'json_array',
          field: 'json_array',
          filterable: false,
          hidden: true
        }       
      ]
    };
  },
  mounted() {
    console.log("iniciando el componente alumnos ");
    this.usuarioSesion = getUsuarioSesion();

    //para mostrar las sucursales
    this.loadFunctionSucursal= function () {
      this.get(
        URL.SUCURSAL_BASE,        
        result => {
          console.log("Consulta sucursales" + result.data);
          if (result.data != null) {
            this.listaSucursales = result.data;                         
          }
        }
      );
    };

    this.loadFunctionAlumnosSucursal = function (id_sucursal) {
      console.log("sucr "+id_sucursal);
      this.get(
        URL.SUCURSAL_BASE + "/" + id_sucursal+"/cargos",
        
        (result) => {
          console.log("Alumnos de sucusal " + result.data);
          if (result.data != null) {
            this.listaAlumnosCargos = result.data;

          }
        }
      );
    };

     this.loadFunctionSucursal();
  },
  methods: {
    verListaAlumnosSucursal(row_sucursal) {
      console.log("row sucursal " + JSON.stringify(row_sucursal));
      this.sucursal_seleccionada = row_sucursal;      
      this.loadFunctionAlumnosSucursal(this.sucursal_seleccionada.id);
      
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },    
    onRowClick(params) {
      console.log(JSON.stringify(params));
     
      // params.row - row object 
      // params.pageIndex - index of this row on the current page.
      // params.selected - if selection is enabled this argument 
      // indicates selected or not
      // params.event - click event
    },
    onSearch(params) {
      console.log(JSON.stringify(params));
      // params.searchTerm - term being searched for
      // params.rowCount - number of rows that match search
    },
    selectAll(selected, selectedRows) {
      // do what you want here
      //console.log("Seleccion de Todos " + selected);
      //console.log(JSON.stringify(selectedRows));      
      //console.log("Seleccion "+JSON.stringify(selected));      
    },

    selectionChanged(params) {
    
      this.rowSelection = params.selectedRows;
      console.log("Seleccion");
      //console.log("Seleccion " + JSON.stringify(this.rowSelection[0]));
    },

  }
};