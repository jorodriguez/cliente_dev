<template>
  <div class="catalogo_alumno">
    <h1>Avisos</h1>
    <div class="row">
      <div class="col-1">
        <router-link to="/Administracion" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>
      <div class="col-1">
        <Button type="button" class="btn btn-light btn-lg" v-on:click="iniciarNuevo()"
          >Nuevo</Button
        >
      </div>
      <div class="col-1">
        <Button
          type="button"
          class="btn btn-primary btn-lg"
          v-on:click="enviar()"
          :disabled="loadingEnvio"
          >Enviar
        </Button>
      </div>
    </div>
    <Loader :loading="loader" />
    <Loader :loading="loadingEnvio" type="grow" mini="true" />

    <div class="card">
      <div class="card-body">
        <div class="form-group row">
          <label
            @click="
              () => {
                this.mostrarLabels = !this.mostrarLabels;
              }
            "
            for="staticEmail"
            class="col-sm-1 col-form-label"
            >Para</label
          >
          <div class="col">
            <tags-input
              element-id="tags"
              discard-search-text="Descargar resultados"
              placeholder="Escribe un @ para sucursales y grupos ó un nombre "
              v-model="contactosSeleccionados"
              :existing-tags="contactosTags"
              id-field="id"
              text-field="nombre"
              typeahead-style="dropdown"
              :typeahead="true"
              @tag-added="onTagAdded"
              @tag-removed="onTagRemoved"              
              :readonly="loadingEnvio"
            >
              <template v-slot:selected-tag="{ tag, index, removeTag }">
                <span @click="verDetalle(tag)">{{ tag.nombreMostrar }}</span
                ><br />
                <span
                  @click="verDetalle(tag)"
                  class="text-white "                  
                  style="font-size:9px;"
                >
                    <i>{{ tag.descripcion }}</i>
                </span>              
                
                <a
                  v-show="true"
                  href="#"
                  class="tags-input-remove"
                  @click.prevent="removeTag(index)"
                ></a>               
              </template>
            </tags-input>

            <!--
              <div v-else class="d-flex justify-content-start form-control" >
                 <span v-for="item in contactos" :key="item.id_alumno_familiar">
                      <span v-if="item.seleccionado" class="badge badge-primary">{{item.nombre_familiar}}</span>
                  </span>
              </div>
              -->
          </div>          
        </div>

        <div class="form-group row">
          <label for="staticEmail" class="col-sm-1 col-form-label"
            >Titulo</label
          >
          <div class="col">
            <input
              type="text"
              class="form-control"
              id="staticEmail"
              placeholder="Titulo"
              v-model="aviso.titulo"
              :readonly="loadingEnvio"
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <vue-editor
              v-model="aviso.aviso"
              focus
              :disabled="loadingEnvio"
              placeholder="Escribe tu aviso.."
            ></vue-editor>
          </div>
        </div>
      </div>
    </div>
<!--
    <h4>
      <a
        class="btn btn-link"
        data-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Historial ({{ contador }})
      </a>
    </h4>
    <div class="collapse" id="collapseExample">
      <div class="card">
        <div class="card-body">
          <vue-good-table
            :columns="columnas"
            :rows="historial"
            :line-numbers="false"
            :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
            :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
            :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
            :groupOptions="{ enabled: false }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'titulo'">
              <div class="d-flex flex-row-reverse bd-highlight">          
                <div class="p-2 bd-highlight small"> {{props.row.enviado ? `enviado ${props.row.fecha_envio}`:'No enviado'}} </div>                
              </div>                
                <h4>{{ props.row.titulo }}</h4>                
               
              </span>
              <span v-else-if="props.column.field == 'botones'"> </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>
-->     

    <!-- DETALLE -->
    <Popup id="popup_detalle" show_button_close="true" size="sm">
      <div slot="header">
        {{ this.rowDetalle ? `${this.rowDetalle.nombreMostrar}` : "" }}
        <span class="text-muted">{{ this.rowDetalle ? `${this.rowDetalle.descripcion}` : "" }}</span>
      </div>
      <div slot="content">
        <div class="card overflow-auto" style="height:300px">            
                  <span
                    v-for="item in contactosDetalle"
                    :key="item.id_alumno_familiar"                                        
                  >
                    <tarjeta-contacto                      
                      :item="item"
                      
                    />
                  </span>            
          
        </div>
      </div>
    </Popup>

    <Popup id="popup_envio" show_button_close="true" size="md">
      <div slot="header">
        Envio del aviso
      </div>
      <div slot="content">
        <div class="card">
          Se detectaron algunos correos rechazados
          <table>
            <tbody v-for="(item, index) in correosRechazadosEnvio" :key="index">
              <tr>
                <td>{{ item }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Popup>

    <Popup id="popup_preview" show_button_close="true" size="lg">
      <div slot="header">
        preview
      </div>
      <div slot="content">
        <div class="card">
          
          </div>        
        
      </div>
    </Popup>

    <Popup id="popup_nuevo" show_button_close="true" size="md">
      <div slot="header">
        Atención
      </div>
      <div slot="content">
        <div class="card">
            Se han detectado datos escritos, si procedes <strong>perderas estos datos</strong><br/>
            <span><strong>¿Confirmas que deseas continuar?</strong></span>
        </div>                
      </div>
      <div slot="footer">
          <button
                    class="btn btn-primary"
                    type="button"
                    @click="nuevo()"
                  >
                    Aceptar
          </button>
      </div>
    </Popup>

  </div>
</template>

//https://github.com/davidroyer/vue2-editor //https://www.vue2editor.com/
<script>
import Datepicker from "vuejs-datepicker";
import URL from "../../helpers/Urls";
import { operacionesApi } from "../../helpers/OperacionesApi";
import { en, es } from "vuejs-datepicker/dist/locale";
import { getUsuarioSesion } from "../../helpers/Sesion";
import VueTimepicker from "vue2-timepicker";
import { AvisoModel, AvisoBuilder } from "../../models/AvisoModel";
import { VueGoodTable } from "vue-good-table";
import TABLE_CONFIG from "../../helpers/DatatableConfig";
import Popup from "../../controller/Popup";
import Loader from "../../components_utils/Loader";
import { validarDatosAviso } from "../../helpers/AvisoValidacion";
import * as moment from "moment";
import CONSTANTES from "../../helpers/Constantes";
import { VueEditor, Quill } from "vue2-editor";
import AvatarAlumno from "../../components_utils/AvatarAlumno";
import TarjetaContacto from "@/administracion/avisos/fragmentos/TarjetaContacto";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import Vue from "vue";
//require("@voerro/vue-tagsinput/dist/style.css");
require("../../../static/css/styleAutocompleteContactos.css");
Vue.component("tags-input", VoerroTagsInput);

const TIPO = {TODAS_SUCURSALES:"TODAS_SUCURSALES",SUCURSAL:"SUCURSAL",GRUPO:"GRUPO",CONTACTO:"CONTACTO"};


export default {
  name: "catalogo-avisos",
  mixins: [operacionesApi],
  components: {
    VueGoodTable,
    Datepicker,
    VueTimepicker,
    Popup,
    Loader,
    AvatarAlumno,
    TarjetaContacto,
    VueEditor,
    VoerroTagsInput,
    TarjetaContacto
  },
  data() {
    return {
      aviso: AvisoModel,
      avisoMemento: AvisoModel,
      avisoPreview: AvisoModel,
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      es: es,
      TIPO:TIPO,
      TABLE_CONFIG: TABLE_CONFIG,
      loader: false,
      loaderContactos: false,
      contador: 0,
      content: "",
      historial: [],
      contactos: [],
      contactosSeleccionados: [],
      contactosDetalle: [],
      contactosRespaldo: [],
      contactosTags: [],
      listaSucursales: [],
      listaGrupos: [],
      listaGruposFiltados: [],
      correosRechazadosEnvio: [],
      mostrarLabels: true,
      rowDetalle: null,
      loadingEnvio: false,
      columnas: [
        { label: "Id", field: "id", hidden: true },
        { label: "Empresa", field: "empresa", hidden: true },
        { label: "Fecha", field: "fecha", hidden: true },
        { label: "para", field: "para", hidden: true },
        { label: "etiquetas", field: "etiquetas", hidden: true },
        { label: "", field: "titulo", hidden: false },
        { label: "aviso", field: "aviso", hidden: true },
        { label: "nota_interna", field: "nota_interna", hidden: true },
        { label: "fecha_genero", field: "fecha_genero", hidden: true },
        { label: "Usuario", field: "usuario_genero", hidden: true },
        { label: "", field: "botones", hidden: true }
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
      this.cargarContactos();
      this.nuevo();
    },
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.limpiarPara();
      this.aviso = new AvisoModel();
      $("#popup_nuevo").modal("hide");      
    },
    limpiarPara() {
      this.contactos.forEach(element => {
        element.seleccionado = false;
        element.visible = true;
      });
      this.contactosSeleccionados = [];
    },
    iniciarNuevo(){
      if(this.contactosSeleccionados.length > 0 || this.aviso.titulo || this.aviso.aviso){
        $("#popup_nuevo").modal("show");
      }      
    },
    seleccionarPara() {
      //this.cargarContactos();
      this.obtenerFiltros();

      $("#popup_para").modal("show");
    },

    async enviar() {
      console.log("Insertar");
      let arrayPara = [];
      
      this.contactosSeleccionados.forEach(ele => {
        arrayPara.push({
          id_familiar: ele.id_familiar,
          id_alumno_familiar: ele.id_alumno_familiar,
          correo: ele.correo
        });
      });
     
      this.aviso.para = arrayPara;
      this.aviso.enviar = true;
      if (!validarDatosAviso(this.aviso)) {
        console.log("No paso la validacion");
        return;
      }
      this.aviso.id_empresa = this.usuarioSesion.co_empresa || 1;
      this.aviso.genero = this.usuarioSesion.id;
      this.loadingEnvio = true;
      this.post(URL.AVISOS, this.aviso, result => {
        let respuesta = result.body;
        let informacionEnvio = respuesta ? respuesta.informacionEnvio : null;
        this.loadingEnvio = false;
        if (informacionEnvio && informacionEnvio.enviado) {
          this.correosRechazadosEnvio = informacionEnvio.mensaje.rejected || [];
          if (this.correosRechazadosEnvio.length > 0) {
            $("#popup_envio").modal("show");
          }
          this.init();
          this.$notificacion.info("Aviso ", "Enviado correctamente.");
        } else {
          this.$notificacion.error("Mensaje", result.mensaje);
        }
      });
    },

    modificar() {
      if (!validarDatosUsuario(this.usuario)) {
        console.log("No paso la validacion");
        return;
      }

      this.usuario.genero = this.usuarioSesion.id;

      this.put(URL.AVISOS, this.aviso, result => {
        if (result != null) {
          if (result.status == 200) {
            this.$notificacion.info(
              "Modificación de aviso",
              "Se actualizarón los datos del aviso."
            );
            this.init();
            $("#popup_aviso").modal("hide");
          } else {
            this.$notificacion.error("Mensaje", result.body.mensaje);
          }
        }
      });
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
      console.log(
        "fila seleccionada " +
          rowSelect.nombre_alumno +
          " selec " +
          rowSelect.seleccionado
      );
      if (operacion === "ADD") {
        rowSelect.seleccionado = true;
        rowSelect.visible = false;
        this.contactosSeleccionados.push(rowSelect);
      } else {
        let pos = this.contactosSeleccionados.indexOf(rowSelect);
        rowSelect.seleccionado = false;
        rowSelect.visible = true;
        this.contactosSeleccionados.splice(pos, 1);
      }
    },
    seleccionarTodos() {
      this.contactos.forEach(element => {
        if (element.visible) {
          element.seleccionado = true;
          element.visible = false;
          this.contactosSeleccionados.push(element);
        }
      });
    },
    removerTodos() {
      this.contactosSeleccionados = [];
      this.contactos.forEach(element => {
        element.seleccionado = false;
        element.visible = true;
      });
    },
    verDetalle(row) {
      this.rowDetalle = row;
      console.log(JSON.stringify(row));
      this.contactosDetalle = [];
     
      this.contactos.forEach(contacto => {
          if(row.tipo === TIPO.TODAS_SUCURSALES ){
                this.contactosDetalle.push(contacto);
                console.log("toda");
          }
          if(row.tipo === TIPO.SUCURSAL && row.id == contacto.id_sucursal){
            console.log("SUC");
            //aqui filtrar todos
              this.contactosDetalle.push(contacto);
          }          
          if(row.tipo === TIPO.GRUPO && row.id == contacto.id_grupo && row.id_sucursal == contacto.id_sucursal){
            console.log("grupo");
                 this.contactosDetalle.push(contacto);
          } 
          if(row.tipo === TIPO.CONTACTO && row.id == contacto.id_alumno_familiar){
               this.contactosDetalle.push(contacto);               
          }
      });
      
      $("#popup_detalle").modal("show");
    },
    onTagAdded(slug) {
      console.log(`Tag added: ${JSON.stringify(slug)}`);
      slug.seleccionado = true;
      slug.visible = false;
    },
    onTagRemoved(slug) {
      console.log(`Tag removed: ${slug}`);
      slug.seleccionado = false;
      slug.visible = true;
    },
    cargarContactos() {
      this.loaderContactos = true;
      if (!this.contactos.length > 0) {
        this.get(
          URL.AVISOS +
            "/contactos/" +
            JSON.stringify(this.usuarioSesion.sucursales),
          result => {
            this.loader = false;
            this.loaderContactos = false;
            if (result.body != null) {
              this.contactos = result.body || [];              
              this.completarCargaAutocomplete();
            }
          }
        );
      }      
    },
    completarCargaAutocomplete(){
       
      this.obtenerFiltros();       

       const nombresSucursales = this.listaSucursales.map(e=>e.nombre);

       this.agregarTag(-1,"@Todas mis sucursales",-1,"@Todas mis sucursales",`${nombresSucursales}`,-1,TIPO.TODAS_SUCURSALES);
 
        //agregar sucursal por sucursal
        this.listaSucursales.forEach(suc=>{
             this.agregarTag(suc.id,'@'+suc.nombre,suc.id,suc.nombre,"",-1,TIPO.SUCURSAL);
        });
        
        //Agregar grupos        
        this.listaGrupos.forEach(grupo =>{
          this.agregarTag(grupo.id,'@'+grupo.nombre +' '+grupo.sucursal,grupo.id_sucursal,grupo.nombre,grupo.sucursal,grupo.id,TIPO.GRUPO);
        });

         this.contactos.forEach(ele =>{
          this.agregarTag(ele.id_alumno_familiar,ele.nombre_familiar,ele.id_sucursal,ele.nombre_familiar,ele.sucursal,ele.id_grupo,TIPO.CONTACTO);
        });

    },
    agregarTag(id,nombre,id_sucursal,nombreMostrar,descripcion,id_grupo,tipo){
      this.contactosTags.push({
            id:id,
            nombre:nombre,            
            id_sucursal:id_sucursal,
            nombreMostrar:nombreMostrar,
            descripcion:descripcion,
            id_grupo:id_grupo,
            tipo:tipo
        });
    },
    preview(){

    },
    obtenerFiltros() {
      if (this.listaSucursales.length == 0) {
        let todasSucursales = [];
        //todasSucursales.push(this.sucursalDefault);

        this.contactos.filter(function(item) {
          let i = todasSucursales.findIndex(x => x.id == item.id_sucursal);
          if (i <= -1) {
            todasSucursales.push({
              id: item.id_sucursal,
              nombre: item.sucursal,
              color: item.color_sucursal,
              visible: true
            });
          }
        });

        this.listaSucursales = todasSucursales;

        let todosGrupos = [];
        //todosGrupos.push(this.grupoDefault);
        this.contactos.filter(function(item) {  
          let i = todosGrupos.findIndex(
            x => x.id == item.id_grupo && x.id_sucursal == item.id_sucursal
          );
          if (i <= -1) {
            todosGrupos.push({
              id: item.id_grupo,
              id_sucursal: item.id_sucursal,
              nombre: item.nombre_grupo,
              sucursal: item.sucursal,
              color: item.color_grupo,
              visible: false
            });
          }
        });
        this.listaGrupos = todosGrupos;
      }      
    }, 
    cargarHistorial(){
        this.loader = true;
         this.get(URL.AVISOS + "/" + this.usuarioSesion.id, result => {
        this.loader = false;
        if (result.body != null) {
          this.historial = result.body || [];
          this.contador = this.historial.length;
        }
      });
    }
  }
};
</script>

<style>
.divScoll {
  margin-top: 10px;
  height: 400px;
  width: 100%;
  overflow: auto;
}

.contentDivScroll {
  height: 800px;
}

.pointer {
  cursor: pointer;
}



</style>
