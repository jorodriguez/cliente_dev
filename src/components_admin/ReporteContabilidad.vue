<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="text-muted h4">Reporte de cobranza</h5>
        <div class="form-row">
          <label for="inputFechaInicio">Fecha inicio</label>
          <datepicker
            id="inputFechaInicio"
            v-model="fecha_inicio"
            input-class="form-control"
            :bootstrap-styling="true"
            :language="es"            
            required
          ></datepicker>

          <label for="inputFechaFin">Fecha fin</label>
          <datepicker
            id="inputFechafin"
            v-model="fecha_fin"
            input-class="form-control"
            :bootstrap-styling="true"
            :language="es"            
            required
          ></datepicker>

          <button @click="consultarCobranza()" 
            class="btn btn-primary"
            :disabled="loader"
          >            
            Consultar</button>     
        </div>
        <div class="row">
          <div class="col-md-10"></div>
          <div class="col-md-2">
            <div class="btn-group" role="group" aria-label="Basic example">
              <download-excel
                v-if="lista != []"
                class="btn btn-success btn-sm"
                :data="lista"
                :fields="columnExport"
                :worksheet="nombre_libro"
                :name="nombre_reporte+'.xls'"
              >
                <i class="fas fa-download" /> XLS
              </download-excel>
              <download-excel
                v-if="lista != []"
                class="btn btn-secondary btn-sm"
                :data="lista"
                :fields="columnExport"
                :worksheet="nombre_libro"
                :name="nombre_reporte+'.csv'"
              >
                <i class="fas fa-download" /> CSV
              </download-excel>
            </div>
          </div>
        </div>

         <Loader :loading="loader" :mini="true" /> 

        <vue-good-table
          :columns="columns"
          :rows="lista"
          :line-numbers="true"
          :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
          :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
        >
          <!--
          <template slot="table-row" slot-scope="props">                       
            
            <span v-else-if="props.column.field == 'alumno'">
              <span>{{ props.row.alumno }}</span>
            </span>
            <span v-else>{{props.formattedRow[props.column.field]}}</span>
            
          </template>
          -->
          <div slot="selected-row-actions"></div>
        </vue-good-table>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import AlumnoModel from "../models/AlumnoModel";
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import { VueGoodTable } from "vue-good-table";
import Popup from "./../controller/Popup";
import TABLE_CONFIG from "../helpers/DatatableConfig";
import { getUsuarioSesion } from "../helpers/Sesion";
import Datepicker from "vuejs-datepicker";
import { en, es } from "vuejs-datepicker/dist/locale";
import Loader from "../components_utils/Loader";

export default {
  name: "ReporteContabilidad",
  components: {
    Datepicker,
    VueGoodTable,
    Popup,
    Loader
  },
  mixins: [operacionesApi],
  data() {
    return {
      usuarioSesion: {},
      fecha_inicio: null,
      fecha_fin: null,
      lista: [],
      es: es,
      loader:false,
      nombre_reporte: "reporte.xls",
      nombre_libro: "libro1",
      TABLE_CONFIG: TABLE_CONFIG,
      columnExport: {},
      columnsExportCobranza: {
        sucursal: "sucursal",
        alumno: "alumno",
        fecha: "fecha_cargo",
        concepto: "concepto",
        cargo: "cargo",
        pago_abono: "pago_abono",
        saldo_por_concepto: "saldo_por_concepto",
        saldo_por_alumno: "saldo_por_alumno"
      },
      columnsCobranza: [
        {
          label: "Sucursal",
          field: "sucursal",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          label: "Alumno",
          field: "alumno",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          label: "Fecha",
          field: "fecha_cargo",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          label: "Concepto",
          field: "concepto",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          label: "Cargo",
          field: "cargo",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          label: "Pago",
          field: "pago_abono",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        },
        {
          label: "Saldo por concepto",
          field: "saldo_por_concepto",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        }/*,
        {
          label: "Saldo por alumno",
          field: "saldo_por_alumno",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        }*/
        /*{
          label: "Saldo por sucursal",
          field: "saldo_por_sucursal",
          filterable: true,
          thClass: "text-center",
          tdClass: "text-center"
        }*/
      ],
      columns: []
    };
  },
  mounted() {
    console.log("######iniciando el componente reporte contabilidad ");

    this.usuarioSesion = getUsuarioSesion();
    console.log("Admin " + JSON.stringify(this.usuarioSesion));
    console.log(
      "ACCESO A " + this.usuarioSesion.contador_sucursales + " sucursales"
    );
    this.fecha_inicio = new Date();
    this.fecha_fin = new Date();
    this.TABLE_CONFIG.PAGINATION_OPTIONS.perPage = 100;
  },
  methods: {
    init(row) {},
    consultarCobranza() {
      this.nombre_reporte = `Reporte de Cobranza`;
      this.nombre_libro = `Cobranza`;
      this.columnExport = this.columnsExportCobranza;
      this.columns = this.columnsCobranza;
      console.log("fecha inicio " + this.fecha_inicio);
      console.log("fecha fin " + this.fecha_fin);
      
      this.loader = true;
      this.put(
        URL.REPORTE_CONBRANZA,
        {
          id_usuario: this.usuarioSesion.id,
          fecha_inicio: this.fecha_inicio,
          fecha_fin: this.fecha_fin
        },
        result => {
          console.log("Reporte cobranza " + result.data);
          if (result.data != null) {
            this.lista = result.data;
            this.loader = false;
          }
        }
      );
    }
  }
};
</script>