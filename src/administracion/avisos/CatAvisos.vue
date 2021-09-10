<template>
  <div class="catalogo_alumno">
    <h1>Avisos</h1>
    <div class="row ">
      <div class="col d-flex justify-content-start">
        <router-link to="/Administracion" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>      
        <Button type="button" class="btn btn-light btn-lg" v-on:click="iniciarNuevo()"
          >Nuevo</Button
        >      
        <Button
          type="button"
          class="btn btn-primary btn-lg"           
          v-on:click="iniciarEnvio()"          
          >Enviar
        </Button>        
      </div>
      <div class="col d-flex justify-content-end">
       <Button
          type="button"
          class="btn btn-link btn-lg"
          v-on:click="preview()"                    
          >Previsualizar
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
            <!--<vue-editor
              v-model="aviso.aviso"
              focus
              :disabled="loadingEnvio"
              placeholder="Escribe tu aviso.."
            ></vue-editor>-->
             <ckeditor v-model="aviso.aviso"  ></ckeditor>
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
          <h4>{{contactosDetalle.length}} contactos</h4>
           <div class="card overflow-auto" style="height:300px">            
                  <span
                    v-for="item in contactosDetalle"
                    :key="item.id_alumno_familiar"                                        
                  >
                    <tarjeta-contacto                      
                      :item="item"
                      mostrar_sucursal="true"
                    />
                  </span>                      
        </div>
      </div>
    </Popup>

    <Popup id="popup_informacion_envio" show_button_close="true" size="lg">
      <div slot="header">
        Información de envio 
      </div>
      <div slot="content">
        <h3>{{destinatariosEnvio && destinatariosEnvio.length}} contactos</h3>
        <div class="card">          
          <div class="overflow-auto" style="height:350px">
          <table class="table">
            <tbody v-for="(item, index) in destinatariosEnvio" :key="index">
              <tr>
                <td><span>{{ index }}</span></td>
                <td><span>{{ item.token ? 'si':'' }}</span></td>
                <td>
                <span>{{ item.nombre }}</span><br/>
                <span>                  
                {{ item.correo }}</span></td>                
                <td> {{item.sucursal}}</td>
                <td> {{item.grupo}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
      </div>
    </Popup>

     <Popup id="popup_confirmar_envio" show_button_close="true" size="md">
      <div slot="header">
        Confirmar Envio
      </div>
      <div slot="content">      

              <h4>{{aviso.para.length}} contactos</h4>                            
             
              <div class="card overflow-auto" style="height:300px">            
                  <span
                    v-for="item in aviso.para"
                    :key="item.id_alumno_familiar"                                        
                  >                  
                    <tarjeta-contacto                      
                      :item="item"        
                      mostrar_sucursal="true"
                    />
                 </span> 
              </div>         
       </div> 
      <div slot="footer">
          <button
                    class="btn btn-primary"
                    type="button"
                    @click="enviar()"
                    :disabled="loadingEnvio"
                  >
                   Enviar
          </button>
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

    <Popup id="popup_preview" size="lg" :show_button_close="true">
      <div slot="header">
        {{aviso.titulo}}
      </div>    
      <div slot="content" style="text-align: left;;color:#000">       
       <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >Correo</a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-profile-tab"
                  data-toggle="pill"
                  href="#pills-profile"
                  role="tab"
                  aria-controls="pills-profile"
                  aria-selected="false"                  
                >{{aviso.para.length}} Contactos</a>
              </li>
                 <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                  <span v-if="loadingPreview">Cargando..</span>        
                 <span v-else v-html="this.pagePreview"></span>
                 </div>
                  <div
                class="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
              >
              <h4>{{aviso.para.length}} contactos</h4>                            
             
              <div class="card overflow-auto" style="height:500px">            
                  <span
                    v-for="item in aviso.para"
                    :key="item.id_alumno_familiar"                                        
                  >                  
                    <tarjeta-contacto                      
                      :item="item"        
                      mostrar_sucursal="true"
                    />
                 </span> 
              </div>    
                  </div>

       </ul>
       
       
      </div>
      <div slot="footer">
       
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

import CKEditor from 'ckeditor4-vue';
Vue.use( CKEditor );

const TIPO = {TODAS_SUCURSALES:1,SUCURSAL:2,GRUPO:3,CONTACTO:4};


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
      destinatariosEnvio:[],
      mostrarLabels: true,
      rowDetalle: null,
      loadingEnvio: false,
      pagePreview:"",
      loadingPreview:false,
      editorConfig: {
					toolbar: [		            
						[ 'Styles', 'Format', 'Font', 'FontSize' ],
						[ 'Bold', 'Italic' ],
            [ 'paragraph' ,'colors','document'],
						[ 'Undo', 'Redo' ],
            						
					]
				},
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
      if(this.enProcesoCaptura()){
        $("#popup_nuevo").modal("show");
      }      
    },
    seleccionarPara() {
      //this.cargarContactos();
      this.obtenerFiltros();

      $("#popup_para").modal("show");
    },
    iniciarEnvio(preview) {      
      let arrayPara = [];
      let arraySend = [];

      this.contactosSeleccionados.forEach(ele => {
         let cont = this.obtenerContactoPorTipo(ele);
         arraySend = arraySend.concat(cont);
      });
     
      /*arrayPara.forEach(ele => {        
        arraySend.push({
          id_familiad:ele.id_familiar,
          nombre:ele.nombre_familiar,
          id_alumno_familiar:ele.id_alumno_familiar,
          correo:ele.correo,
          id_sucursal:ele.id_sucursal
        });
      }); */     
      this.aviso.para = this.contactosSeleccionados;
      this.aviso.etiqueta = this.contactosSeleccionados;
      this.aviso.enviar = true;
      if (!validarDatosAviso(this.aviso)) {
        console.log("No paso la validacion");
        return false;
      }
      
      $(preview ? "#popup_preview" :"#popup_confirmar_envio").modal("show");
      return true;
    },
    async enviar() {
      console.log("Insertar");       
     
      this.aviso.id_empresa = this.usuarioSesion.id_empresa;
      this.aviso.genero = this.usuarioSesion.id;
      this.loadingEnvio = true;
      console.log(this.aviso);      
      $("#popup_confirmar_envio").modal("hide");      
      this.post(URL.AVISOS, this.aviso, result => {
        let respuesta = result.body;
        let informacionEnvio = respuesta ? respuesta.informacionEnvio : null;
        this.loadingEnvio = false;
        console.log(JSON.stringify(informacionEnvio));
        if (informacionEnvio && informacionEnvio.envioCorreo) {
          this.destinatariosEnvio = informacionEnvio.destinatarios;
          console.log(this.destinatariosEnvio);
          if (this.destinatariosEnvio) {
            $("#popup_informacion_envio").modal("show");
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
     
     this.contactosDetalle = this.obtenerContactoPorTipo(row);
      
      $("#popup_detalle").modal("show");
    },
    obtenerContactoPorTipo(tag){
      let array =[];

      switch (tag.tipo) {
        case TIPO.TODAS_SUCURSALES:
              array = this.contactos;
          break;
        case TIPO.SUCURSAL:
          array = this.contactos.filter(ele => ele.id_sucursal == tag.id);          
          break;
        case TIPO.GRUPO:
            array = this.contactos.filter(ele => tag.id == ele.id_grupo && tag.id_sucursal == ele.id_sucursal);
          break;
       case TIPO.CONTACTO:
            array = this.contactos.filter(ele => tag.id == ele.id_alumno_familiar);
          break;
        default:
          break;
      } 

      return array;
      
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
            id_empresa:this.usuarioSesion.id_empresa,
            id_sucursal:id_sucursal,
            id_grupo:id_grupo,
            nombreMostrar:nombreMostrar,
            descripcion:descripcion,            
            tipo:tipo,
            genero:this.usuarioSesion.id
        });
    },
    preview(){
        let placeholder="___PLACEHOLDER___";
        this.loadingPreview = true;
        //$("#popup_preview").modal("show");
        if(this.iniciarEnvio(true)){       
            this.get(URL.AVISOS + "_preview/"+placeholder , result => {        
            if (result.data != null) {          
              let html = result.data;          
              this.pagePreview = `${html}`.replace(placeholder,`${this.aviso.aviso}`); 
              this.loadingPreview = false;          
            }
          });
      }
    },
    enProcesoCaptura(){
      return this.contactosSeleccionados.length > 0 || this.aviso.titulo || this.aviso.aviso;
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
