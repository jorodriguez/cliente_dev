<template>
<div class="catalogo_alumno">
    <h1>Comunicados</h1>
    <div class="row ">
        <div class="col d-flex justify-content-start">
            <router-link to="/Administracion" class="btn btn-secondary btn-lg">
                <i class="fas fa-arrow-circle-left text-gray"></i>
            </router-link>
            <Button type="button" class="btn btn-light btn-lg" v-on:click="iniciarNuevo()">Nuevo</Button>
            <!--<Button type="button" class="btn btn-primary btn-lg" v-on:click="iniciarEnvio()">Enviar
            </Button>-->
            <Button type="button" class="btn btn-primary btn-lg" :disabled="loadingEnvio"  v-on:click="preview()">
Enviar 
            </Button>
        </div>
        <div class="col d-flex justify-content-end">
            <Button type="button" class="btn btn-link btn-lg" v-on:click="preview()">Previsualizar
            </Button>
        </div>
    </div>
    <Loader :loading="loader" />
    <Loader :loading="loadingEnvio" type="grow" mini="true" />

    <div class="card">
        <div class="card-body">
            <div class="form-group row">
                <label @click="
              () => {
                this.mostrarLabels = !this.mostrarLabels;
              }" for="staticEmail" class="col-sm-1 col-form-label">Para</label>
                <div class="col">
                    <tags-input element-id="tags"
                                discard-search-text="Resultados" 
                                placeholder="Escribe un @ para sucursales y grupos ó un nombre de familiar" 
                                v-model="contactosSeleccionados" 
                                :existing-tags="contactosTags" 
                                id-field="id" 
                                text-field="nombre" 
                                typeahead-style="dropdown"                                 
                                :typeahead-max-results="15"
                                :only-existing-tags="true"                                
                                :typeahead="true"
                                @tag-added="onTagAdded"
                                @tag-removed="onTagRemoved" 
                                :disabled="loadingEnvio"
                                :readonly="loadingEnvio">
                        <template v-slot:selected-tag="{ tag, index, removeTag }" >
                            <i v-if="tag.tipo == TIPO.TODAS_SUCURSALES" class="fa fa-users" :style="`color:${loadingEnvio ? 'gray':'red'}; font-size:16px;`" aria-hidden="true"></i>
                            <i v-else-if="tag.tipo == TIPO.SUCURSAL" class="fa fa-users" :style="`color:${loadingEnvio ? 'gray':'blue'}; font-size:16px;`" aria-hidden="true"></i>
                            <i v-else-if="tag.tipo == TIPO.GRUPO" class="fa fa-users" :style="`color:${loadingEnvio ? 'gray':'yellow'};font-size:16px;`" aria-hidden="true"></i>
                            <i v-else-if="tag.tipo == TIPO.CONTACTO" class="fa fa-user" style="`color:${loadingEnvio ? 'gray':'gray'};font-size:16px;`" aria-hidden="true"></i>
                            <span @click="verDetalle(tag)" style="cursor:pointer" >{{ tag.nombre_mostrar }}</span><br />
                            <span @click="verDetalle(tag)" style="cursor:pointer" :class="`estilo-tag-${tag.tipo}`">
                                <i style="padding-top:2px;">{{ tag.descripcion }}</i>
                            </span>
                          
                            <a v-show="true" href="#" class="tags-input-remove" @click.prevent="removeTag(index)"></a>
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
                <label for="staticEmail" class="col-sm-1 col-form-label">Titulo</label>
                <div class="col">
                    <input type="text" class="form-control" :disabled="loadingEnvio" id="staticEmail" placeholder="Titulo" v-model="aviso.titulo" :readonly="loadingEnvio" />
                </div>
            </div>
            <div class="form-group row">
                <div class="col">
                    <vue-editor
                        v-model="aviso.aviso"
                        focus
                        :style="`background-color:${loadingEnvio ? 'gray':'white'}`"
                        :disabled="loadingEnvio"
                        placeholder="Escribe tu aviso.."
                        ></vue-editor>
                    <!--<ckeditor v-model="aviso.aviso" :config="editorConfig"  ></ckeditor>-->
           <!--         <div class="quill-editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
  </div>-->
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
  <div id="popup_detalle" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
       <div class="modal-header">                    
            {{ this.rowDetalle ? `${this.rowDetalle.nombre_mostrar} ` : "" }}
                    <span class="text-muted">{{
                        this.rowDetalle ? ` ${this.rowDetalle.descripcion}` : ""          
                }}</span>                        
         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" v-if="this.rowDetalle">            
            <div class="card card-body">
            <div class="overflow-auto" style="height:350px" >
                <div :class="`row hover  pb-1 pt-1 border d-flex align-items-center ${(index % 2 == 0) ? 'bg-light':''}`" v-for="(item,index) in JSON.parse(this.rowDetalle.contactos)" :key="index" >
                    <div :class="`col-2  text-center `">
                        <small class="font-weight-bold text-gray" style="font-size:15px;">{{ ++index }}</small>
                    </div>
                    <div class="col pl-4 text-left">
                        <small class="font-weight-normal" style="font-size:15px;">{{ item.nombre }}</small><br />
                        <small class="text-gray h5">{{ item.correo }}</small>
                        <br v-if="item.celular" />
                        <small v-if="item.celular" class="text-muted">{{ item.celular }}</small>
                        <br v-if="item.token"/>
                         <span v-if="item.token" style="font-size:10px;" class="badge  badge-info">
                            <i  class="fa fa-mobile" aria-hidden="true"></i> 
                            App
                         </span>                                               
                    </div>
                </div>
                </div>
            
            </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>        
      </div>
    </div>
  </div>
</div>

    <!--<Popup id="popup_detalle" show_button_close="true" size="sm">
        <div slot="header">
            {{ this.rowDetalle ? `${this.rowDetalle.nombre_mostrar}` : "" }}
            <span class="text-muted">{{
          this.rowDetalle ? `${this.rowDetalle.descripcion}` : ""
        }}</span>
        </div>
        <div slot="content" v-if="this.rowDetalle">            
            <div class="overflow-auto" style="height:350px" >
                <div :class="`row  pb-1 pt-1 border d-flex align-items-center ${(index % 2 == 0) ? 'bg-light':''}`" v-for="(item,index) in JSON.parse(this.rowDetalle.contactos)" :key="index" >
                    <div :class="`col-1  text-left `">
                        <small class="font-weight-bold text-gray" style="font-size:15px;">{{ ++index }}</small>
                    </div>
                    <div class="col pl-4 text-left">
                        <small class="font-weight-bold" style="font-size:15px;">{{ item.nombre }}</small><br />
                        <small class="text-primary h5">{{ item.correo }}</small>
                        <br v-if="item.celular" />
                        <small v-if="item.celular" class="text-muted">{{ item.celular }}</small>
                        <br v-if="item.token"/>
                         <span v-if="item.token" style="font-size:10px;" class="badge  badge-info">
                            <i  class="fa fa-mobile" aria-hidden="true"></i> 
                            App
                         </span>                       
                        
                    </div>
                </div>
            </div>
        </div>
    </Popup>-->


    <Popup id="popup_informacion_envio"  size="sm">
        <div slot="header">
            Información de envio
        </div>
        <div slot="content">

             <span v-if="loadingEnvio">
                 <img src="../../assets/mail-send.gif" class="rounded-lg" width="235" height="110" />
            </span>

            <span v-if="mostrarEnvioCorrecto">
                <img src="../../assets/done.gif" class="rounded-lg" width="235" height="110" />
            </span>

            <span v-if="mostrarErrorEnvio" class="alert alert-danger">
                Sucedió un error al intentar enviar el correo, contacta el equipo de desarrollo.
            </span>


            <div class="row d-flex justify-content-center " v-if="mostrarEnvioCorrecto">
                <a v-if="mostrarEnvioCorrecto" class="btn btn-link" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                    <h5>Enviado a {{ destinatariosEnvio && destinatariosEnvio.length }} contacto{{ destinatariosEnvio && destinatariosEnvio.length > 1 ? 's':'' }}</h5>
                </a>            
            <div class="collapse w-100" id="collapseExample">
            <div class="card ">
                <div class="overflow-auto" style="height:250px;">
                    <table class="table table-striped text-left ">
                        <tbody v-for="(item, index) in destinatariosEnvio" :key="index">
                            <tr>
                                <td style="width:20px">
                                    <span>{{ ++index }}</span>
                                </td>
                                <!--<td>                                                                        
                                    <span v-if="item.token" style="font-size:10px;" class="badge  badge-info">
                                        <i  class="fa fa-mobile" aria-hidden="true"></i>                                     
                                    </span>  
                                </td>-->
                                <td>
                                    <span>{{ item.nombre }}</span><br />
                                    <span> {{ item.correo }}</span>
                                </td>
                                <!--<td>{{ item.sucursal }}</td>
                                <td>{{ item.grupo }}</td>-->
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>
          <div slot="footer">
            <button class="btn btn-link btn-block" type="button" @click="cerrarPopupEnvio" >
                Cerrar
            </button>
          </div>
    </Popup>

    <Popup id="popup_confirmar_envio" show_button_close="true" size="md">
        <div slot="header">
            Confirmar Envio
        </div>
        <div slot="content">
            <h4>{{ aviso.para.length }} contactos</h4>

            <div class="card overflow-auto" style="height:300px">
                <span v-for="item in aviso.para" class="text-left" :key="item.id_alumno_familiar">
                    <tarjeta-contacto :item="item" mostrar_sucursal="true" />
                </span>
            </div>
        </div>
        <div slot="footer">
            <button class="btn btn-primary" type="button" @click="enviar()" :disabled="loadingEnvio">
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
                Se han detectado datos escritos, si procedes
                <strong>perderas estos datos</strong><br />
                <span><strong>¿Confirmas que deseas continuar?</strong></span>
            </div>
        </div>
        <div slot="footer">
            <button class="btn btn-primary" type="button" @click="nuevo()">
                Aceptar
            </button>
        </div>
    </Popup>

    <Popup id="popup_preview" size="lg" :show_button_close="true">
        <div slot="header">
            {{ aviso.titulo }}
        </div>
        <div slot="content" style="text-align:left;padding:0px">
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                        Comunicado
                    </a>
                    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                        {{ `(${contadorContactos}) ${contadorContactos == 1 ? 'Contacto':'Contactos' }` }}
                    </a>
                </div>
            </nav>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="card overflow-auto" style="height:500px">
                        <span v-if="loadingPreview">Cargando..</span>
                        <span v-else v-html="this.pagePreview"></span>
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div v-if="this.aviso.para" class="card overflow-auto" style="height:500px">
                        <span v-html="this.tableContactosPreview" />
                    </div>
                </div>
            </div>
        </div>
        <div slot="footer">
          <button class="btn btn-primary" type="button" @click="enviar()" :disabled="loadingEnvio">
                Enviar
            </button>
        </div>
    </Popup>
</div>
</template>

//https://github.com/davidroyer/vue2-editor //https://www.vue2editor.com/

<script>
import Datepicker from "vuejs-datepicker";
import URL from "../../helpers/Urls";
import {
    operacionesApi
} from "../../helpers/OperacionesApi";
import {
    en,
    es
} from "vuejs-datepicker/dist/locale";
import {
    getUsuarioSesion
} from "../../helpers/Sesion";
import VueTimepicker from "vue2-timepicker";
import {
    AvisoModel,
    AvisoBuilder
} from "../../models/AvisoModel";
import {
    VueGoodTable
} from "vue-good-table";
import TABLE_CONFIG from "../../helpers/DatatableConfig";
import Popup from "../../controller/Popup";
import Loader from "../../components_utils/Loader";
import {
    validarDatosAviso
} from "../../helpers/AvisoValidacion";
import * as moment from "moment";
import CONSTANTES from "../../helpers/Constantes";
import {
    VueEditor,
    Quill
} from "vue2-editor";

import AvatarAlumno from "../../components_utils/AvatarAlumno";
import TarjetaContacto from "@/administracion/avisos/fragmentos/TarjetaContacto";
import VoerroTagsInput from "@voerro/vue-tagsinput";
import Vue from "vue";
//require("@voerro/vue-tagsinput/dist/style.css");
require("../../../static/css/styleAutocompleteContactos.css");
Vue.component("tags-input", VoerroTagsInput);

//import CKEditor from "ckeditor4-vue";
//Vue.use(CKEditor);

const TIPO = {
    TODAS_SUCURSALES: 1,
    SUCURSAL: 2,
    GRUPO: 3,
    CONTACTO: 4
};

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
        TarjetaContacto,

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
            TIPO: TIPO,
            TABLE_CONFIG: TABLE_CONFIG,
            loader: false,
            loaderContactos: false,
            contador: 0,
            contadorContactos: 0,
            content: "",
            historial: [],
            contactos: [],
            contactosPreview: [],
            contactosSeleccionados: [],
            contactosDetalle: [],
            contactosRespaldo: [],
            contactosTags: [],
            listaSucursales: [],
            listaGrupos: [],
            listaGruposFiltados: [],
            destinatariosEnvio: [],
            mostrarLabels: true,
            rowDetalle: null,
            loadingEnvio: false,
            pagePreview: "",
            loadingPreview: false,
            tableContactosPreview: "",            
            editorConfig: {
                /*toolbar: [
                    ["Styles", "Format", "Font", "FontSize"],
                    ["Bold", "Italic"],
                    ["paragraph", "colors", "document"],
                    ["Undo", "Redo"]
                ],*/
                easyimage_toolbar:[ 'EasyImageAlignLeft', 'EasyImageAlignCenter', 'EasyImageAlignRight' ]
            },
            mostrarErrorEnvio:false,
            mostrarEnvioCorrecto:false,
            columnas: [{
                    label: "Id",
                    field: "id",
                    hidden: true
                },
                {
                    label: "Empresa",
                    field: "empresa",
                    hidden: true
                },
                {
                    label: "Fecha",
                    field: "fecha",
                    hidden: true
                },
                {
                    label: "para",
                    field: "para",
                    hidden: true
                },
                {
                    label: "etiquetas",
                    field: "etiquetas",
                    hidden: true
                },
                {
                    label: "",
                    field: "titulo",
                    hidden: false
                },
                {
                    label: "aviso",
                    field: "aviso",
                    hidden: true
                },
                {
                    label: "nota_interna",
                    field: "nota_interna",
                    hidden: true
                },
                {
                    label: "fecha_genero",
                    field: "fecha_genero",
                    hidden: true
                },
                {
                    label: "Usuario",
                    field: "usuario_genero",
                    hidden: true
                },
                {
                    label: "",
                    field: "botones",
                    hidden: true
                }
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
        iniciarNuevo() {
            if (this.enProcesoCaptura()) {
                $("#popup_nuevo").modal("show");
            }
        },
        seleccionarPara() {

            $("#popup_para").modal("show");
        },
        iniciarEnvio(preview) {
            this.aviso.para = this.contactosSeleccionados;
            //this.aviso.etiqueta = this.contactosSeleccionados;
            this.aviso.enviar = true;
            if (!validarDatosAviso(this.aviso)) {
                console.log("No paso la validacion");
                return false;
            }

            this.contadorContactos  =0;
            if (preview) {
                let otrosContactos = [];
                this.tableContactosPreview = '<div class="card" >';
                this.contactosSeleccionados.forEach((e, ind) => {
                    const contactos = Array.isArray(e.contactos) ? e.contactos : JSON.parse(e.contactos || []);                                                         
                    this.contadorContactos += contactos.length || 0;
                    switch (e.tipo) {
                        case TIPO.TODAS_SUCURSALES:                               
                                //this.contadorContactos += todosContactos.length || 0;
                                this.tableContactosPreview += this.crearSecionContactoPreview("Todos los contactos",contactos,"todos");            
                            break;
                        case TIPO.CONTACTO:
                             otrosContactos = otrosContactos.concat(contactos);                             
                            break;
                        case TIPO.GRUPO:
                        case TIPO.SUCURSAL:
                            //this.contadorContactos += contactos.length || 0;
                            this.tableContactosPreview += this.crearSecionContactoPreview(e.nombre,contactos,ind);
                            break;
                    }
                });
                if(otrosContactos.length > 0){
                    //this.contadorContactos += otrosContactos.length || 0;
                    this.tableContactosPreview += this.crearSecionContactoPreview("Otros contactos seleccionados",otrosContactos,"otros");    
                }                
                this.tableContactosPreview += '</div>';
            }

            $(preview ? "#popup_preview" : "#popup_confirmar_envio").modal("show");
          //  $("#popup_preview").modal("show");
            return true;
        },

        crearSecionContactoPreview(nombre,lista,ind){
                         let html = '';
                          const fin = lista.length - 1;
                            html += `<div class="row bg-light pointer"  
                                                                data-toggle="collapse" 
                                                                href="#collapseExample_${ind}" 
                                                                role="button" 
                                                                aria-expanded="true" 
                                                                aria-controls="collapseExample_${ind}" >
                                                    <div class='col'>
                                                        <a class="btn btn-link text-primary">
                                                                ${nombre}</a>                                            
                                                    </div>                                                                  
                                                    <div class="col d-flex justify-content-end">
                                                           <button type="button" class="btn bg-light">
                                                                 <span class="badge badge-primary" style="font-size:15px">${fin+1}</span>                                                                
                                                           </button>                                                          
                                                    </div>
                                      </div>

                                                    `;

                            let insertarLinea = true;
                            let cont = 0;
                            html += `<div class=" collapse show " id="collapseExample_${ind}">
                                                  <div class='card-body'> `;
                            lista.sort((val, val2) =>  val.nombre - val2.nombre);
                            lista.forEach((con, index) => {
                                if (insertarLinea) {
                                    html+= `<div class="row " >`;
                                    insertarLinea = false;
                                }
                                html += `                            
                                  <div class="col-4 pb-2 text-left">
                                      <div class="media">
                                        <div class="media-body border-bottom">
                                          <h6 class="mt-0 mb-1">${con.nombre}</h6>
                                          <small class="text-primary small" >${con.correo}</small>                                                                                                 
                                          ${con.token ? `
                                                <br/>
                                                <span style="font-size:10px;" class="badge  badge-info">
                                                    <i  class="fa fa-mobile" aria-hidden="true"></i> 
                                                    App 
                                                </span> 
                                                <span style="font-size:10px;" class="text-primary">
                                                    ${con.celular ? con.celular:""}
                                                </span>
                                          `:'<br/><br/>'} 
                                        </div>      
                                      </div>                                        
                                  </div>                                        
                                  `;
                                cont++;
                                if (cont == 3 || index == fin) {
                                    insertarLinea = true;
                                    cont = 0;
                                    html += `</div>`;
                                }
                            });
                            html += '</div></div>';
        return html;
        },
        cerrarPopupEnvio(){
            $("#popup_informacion_envio").modal("hide");
        },
        async enviar() {
            console.log("Insertar");
            const listaParaEnvio = this.aviso.para.map(e=> {return {...e,contactos:[]}});
            this.aviso.para = listaParaEnvio;
            this.aviso.etiqueta = listaParaEnvio;
            this.aviso.id_empresa = this.usuarioSesion.id_empresa;
            this.aviso.genero = this.usuarioSesion.id;
            this.loadingEnvio = true;
            console.log(this.aviso);
            this.mostrarEnvioCorrecto = false;
            this.mostrarErrorEnvio = false;

            //$("#popup_confirmar_envio").modal("hide");
            $("#popup_preview").modal("hide");            
            $("#popup_informacion_envio").modal("show");

            const result = await this.postAsync(URL.AVISOS, this.aviso);

            console.log("======================");
            console.log(JSON.stringify(result));
            
            this.loadingEnvio = false;
           
           const informacionEnvio = result.informacionEnvio || {};

           

           if(informacionEnvio.error){
               this.$notificacion.error("Mensaje","Hubó un error al enviar el aviso");
               this.mostrarErrorEnvio = true;
               return;
           }

            if (informacionEnvio && informacionEnvio.envioCorreo) {
                    this.destinatariosEnvio = informacionEnvio.destinatarios;                    
                    if (this.destinatariosEnvio) {                        
                        this.destinatariosEnvio.sort((val, val2) =>  val.nombre - val2.nombre);
                        //$("#popup_informacion_envio").modal("show");
                        this.mostrarEnvioCorrecto = true;
                    }
                    this.init();
                    this.$notificacion.info("Aviso ", "Enviado correctamente.");
                } else {
                    console.log(JSON.stringify(result));
                    this.mostrarErrorEnvio = true;
                    this.$notificacion.error("Mensaje","Hubó un error al enviar el aviso");
                }

            
            
            /*this.post(URL.AVISOS, this.aviso, result => {
                let respuesta = result.body;
                let informacionEnvio = respuesta ? respuesta.informacionEnvio : null;
                this.loadingEnvio = false;
                console.log(JSON.stringify(informacionEnvio));
                if (informacionEnvio && informacionEnvio.envioCorreo) {
                    this.destinatariosEnvio = informacionEnvio.destinatarios;                    
                    if (this.destinatariosEnvio) {
                        //console.log(this.destinatariosEnvio);
                        this.destinatariosEnvio.sort((val, val2) =>  val.nombre - val2.nombre);
                        $("#popup_informacion_envio").modal("show");
                    }
                    this.init();
                    this.$notificacion.info("Aviso ", "Enviado correctamente.");
                } else {
                    this.$notificacion.error("Mensaje", result.mensaje);
                }
            });
            */
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

        },
        verDetalle(row) {
            this.rowDetalle = row;
            console.log(JSON.stringify(row));
            this.contactosDetalle = [];

            this.contactosDetalle = JSON.parse(this.rowDetalle.contactos) || [];

            $("#popup_detalle").modal("show");
        },
        obtenerContactoPorTipo(tag) {
            let array = [];

            switch (tag.tipo) {
                case TIPO.TODAS_SUCURSALES:
                    array = this.contactos;
                    break;
                case TIPO.SUCURSAL:
                    array = this.contactos.filter(ele => ele.id_sucursal == tag.id);
                    break;
                case TIPO.GRUPO:
                    array = this.contactos.filter(
                        ele => tag.id == ele.id_grupo && tag.id_sucursal == ele.id_sucursal
                    );
                    break;
                case TIPO.CONTACTO:
                    array = this.contactos.filter(
                        ele => tag.id == ele.id_alumno_familiar
                    );
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
            //if (!this.contactos.length > 0) {        
            this.get(
                URL.AVISOS +
                "/tags/" + this.usuarioSesion.id,
                result => {
                    this.loader = false;
                    this.loaderContactos = false;
                    if (result.body != null) {
                        //this.contactos = result.body || [];
                        this.contactosTags = result.body || [];
                        //let todos = this.contactosTags.filter(e=> e.tipo == TIPO.CONTACTO);
                         let listasContactosArray = this.contactosTags.filter(e=> e.tipo == TIPO.CONTACTO);
                         let todosContactos = [];
                         listasContactosArray.forEach(e=>{
                                    todosContactos = todosContactos.concat(JSON.parse(e.contactos) || []);
                           });                        
                        this.contactosTags.push({id:this.usuarioSesion.id_empresa,
                                                nombre:'@Todos',
                                                id_empresa:this.usuarioSesion.id_empresa,
                                                id_sucursal:-1,
                                                nombre_mostrar:"Todos los contactos",
                                                descripcion:`${todosContactos.length} contactos`,
                                                id_grupo:-1,
                                                tipo:TIPO.TODAS_SUCURSALES,
                                                contador_contactos:todosContactos.length,
                                                contactos: todosContactos || []});
                        //this.completarCargaAutocomplete();
                    }
                }
            );
            /*this.get(
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
            );*/
            //}
        },
        
        preview() {
            let placeholder = "___PLACEHOLDER___";
            this.loadingPreview = true;
            //$("#popup_preview").modal("show");
            if (this.iniciarEnvio(true)) {
                this.get(URL.AVISOS + "_preview/" + placeholder, result => {
                    if (result.data != null) {
                        let html = result.data;
                        this.pagePreview = `${html}`.replace(
                            placeholder,
                            `${this.aviso.aviso}`
                        );
                        this.loadingPreview = false;
                    }
                });
            }
        },
        enProcesoCaptura() {
            return (
                this.contactosSeleccionados.length > 0 ||
                this.aviso.titulo ||
                this.aviso.aviso
            );
        },
        cargarHistorial() {
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

/*empresa*/
.estilo-tag-1 {
    background-color: "#E86842";
    color: "#fff";
}

/*sucursal*/
.estilo-tag-2 {
    background-color: "#3FB84E";
    color: "#fff";
}

/*grupo*/
.estilo-tag-3 {
    background-color: "#3FA6B8";
    color: "#fff";
}

/*contacto*/
.estilo-tag-3 {
    background-color: "#20D1E9";
    color: "#fff";
}

.pointer {cursor: pointer;}
</style>
