<template>
  <div class="catalogo_alumno">
    <h1>Avisos ({{ contador }})</h1>
    <div class="row">
      <div class="col-1">
        <router-link to="/Administracion" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>
      <div class="col-1">
        <Button
          type="button"
          class="btn btn-primary btn-lg"
          v-on:click="nuevo()"
          >Nuevo</Button
        >
      </div>
    </div>
    <Loader :loading="loader" />

    <div class="card">
      <div class="card-body">
       
          <div class="form-group row">
            <label @click="()=>{this.mostrarLabels=!this.mostrarLabels}"  
            for="staticEmail" class="col-sm-1 col-form-label"
              >Para</label
            >
            <div class="col-10">
            <!--
              <input
                type="text"
                class="form-control"
                id="staticEmail"
                v-model="aviso.para"
                v-if="!mostrarLabels"
              />-->
              <tags-input element-id="tags"
    v-model="contactosSeleccionados"
    :existing-tags="contactos"
    id-field="id_alumno_familiar" 
    text-field="nombre_familiar"
    typeahead-style="dropdown"
    :typeahead="true"></tags-input>
    {{contactosSeleccionados}}
    
    <!--
              <div v-else class="d-flex justify-content-start form-control" >
                 <span v-for="item in contactos" :key="item.id_alumno_familiar">
                      <span v-if="item.seleccionado" class="badge badge-primary">{{item.nombre_familiar}}</span>
                  </span>
              </div>
              -->
            </div>
            <Button
              for="staticEmail"
              @click="seleccionarPara()"
              class="col-sm-1 btn btn-link"
              >+
            </Button>
          </div>
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-1 col-form-label"
              >Titulo</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="staticEmail"
                placeholder="titulo"
                v-model="aviso.titulo"
              />
            </div>
          </div>
          <div class="form-group row">
            <vue-editor
              v-model="aviso.aviso"
              focus
              placeholder="Escribe tu aviso.."
            ></vue-editor>
          </div>
     
      </div>
    </div>

    <h4>
      <a
        class="btn btn-link"
        data-toggle="collapse"
        href="#collapseExample"
        role="button"
        aria-expanded="false"
        aria-controls="collapseExample"
      >
        Ver Historial
      </a>
    </h4>
    <div class="collapse" id="collapseExample">
      <div class="card">
        <div class="card-body">
          <vue-good-table
            :columns="columnas"
            :rows="historial"
            :line-numbers="true"
            :search-options="TABLE_CONFIG.SEARCH_OPTIONS"
            :pagination-options="TABLE_CONFIG.PAGINATION_OPTIONS"
            :selectOptions="TABLE_CONFIG.NO_SELECT_OPTIONS"
            :groupOptions="{ enabled: false }"
          >
            <template slot="table-row" slot-scope="props">
              <span v-if="props.column.field == 'titulo'">
                <span>{{ props.row.titulo }} </span>
                <span class="small">{{ props.row.nota_interna }} </span>
              </span>
              <span v-else-if="props.column.field == 'botones'"> </span>
              <span v-else>{{ props.formattedRow[props.column.field] }}</span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </div>

    <!-- Para -->
    <Popup id="popup_para" show_button_close="true" size="lg">
      <div slot="header">Directorio</div>
      <div slot="content" style="min-height:300px">
        
          <div class="card">
            <div class="card-body row">
              <div class="col-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="buscar"
                  id="buscar"
                />
                <ul class="nav nav-justified" id="pills-tab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      id="pills-todos-tab"
                      data-toggle="pill"
                      href="#pills-todos"
                      role="tab"
                      aria-controls="pills-todos"
                      aria-selected="true"
                      >Todos</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="pills-sucursal-tab"
                      data-toggle="pill"
                      href="#pills-sucursal"
                      role="tab"
                      aria-controls="pills-sucursal"
                      aria-selected="false"
                      >Sucursal</a
                    >
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      id="pills-grupos-tab"
                      data-toggle="pill"
                      href="#pills-grupos"
                      role="tab"
                      aria-controls="pills-grupos"
                      aria-selected="false"
                      >Grupos</a
                    >
                  </li>
                </ul>
                <!-- contenido tabs-->
                <div class="tab-content" id="pills-tabContent">
                  <div
                    class="tab-pane fade show active"
                    id="pills-todos"
                    role="tabpanel"
                    aria-labelledby="pills-todos-tab"
                  >
                    <div class="card">
                      <div class="card-body">
                        <p v-if="loaderContactos">cargando..</p>
                        <div
                          class="d-flex justify-content-end align-items-start"
                          style="height:12px"
                        >
                          <button
                            class="btn btn-link btn-sm"
                            type="button"
                            @click="seleccionarTodos()"
                          >
                            Seleccionar todos
                          </button>
                          <div class="dropdown">
                            <button
                              class="btn btn-link btn-sm dropdown-toggle"
                              type="button"
                              id="dropdownMenu2"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              Nombre
                            </button>
                            <div
                              class="dropdown-menu"
                              aria-labelledby="dropdownMenu2"
                            >
                              <button class="dropdown-item" type="button">
                                Grupo
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class=" divScoll">
                          <span
                            v-for="item in contactos"
                            :key="item.id_alumno_familiar"
                          >
                            <div
                              class="row  pb-1 pt-1 border d-flex align-items-center contentDivScoll"
                              @click="seleccionar(item)"
                              v-if="!item.seleccionado"
                            >
                              <div class="col-2 ">
                                <img
                                  :src="item.foto"
                                  width="50"
                                  height="50"
                                  alt=".."
                                  class="rounded-circle"
                                />
                              </div>
                              <div class="col-10 pl-4 text-left">
                                <small class="font-weight-bold">{{
                                  item.nombre_familiar
                                }}</small
                                ><br />
                                <small
                                  >{{ item.parentesco }} de
                                  {{ item.nombre_alumno }}</small
                                ><br />
                                <small>{{ item.correo }}</small>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade show"
                    id="pills-sucursal"
                    role="tabpanel"
                    aria-labelledby="pills-sucursal-tab"
                  >
                    <div class="card">
                      <div class="card-body">
                        sucursal
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade show"
                    id="pills-grupos"
                    role="tabpanel"
                    aria-labelledby="pills-grupos-tab"
                  >
                    <div class="card">
                      <div class="card-body">
                        grupo
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- detalle-->
              <div class="col-6">
                <div class="card">
                  Selecciòn
                  <div class=" divScoll">
                    <span
                      v-for="item in contactos"
                      :key="item.id_alumno_familiar"
                    >
                      <div
                        class="row pb-1 pt-1 border d-flex align-items-center contentDivScoll"
                        @click="seleccionar(item)"
                        v-if="item.seleccionado"
                      >
                        <div class="col-2 ">
                          <img
                            :src="item.foto"
                            width="50"
                            height="50"
                            alt=".."
                            class="rounded-circle"
                          />
                        </div>
                        <div class="col-10 pl-4 text-left">
                          <small class="font-weight-bold">{{
                            item.nombre_familiar
                          }}</small
                          ><br />
                          <small
                            >{{ item.parentesco }} de
                            {{ item.nombre_alumno }}</small
                          ><br />
                          <small>{{ item.correo }}</small>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
      </div>
      <div slot="footer">
        <button class="btn btn-primary" @click="aceptarSeleccion()">
          Agregar
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
import VoerroTagsInput from '@voerro/vue-tagsinput';
import Vue from "vue";
require('@voerro/vue-tagsinput/dist/style.css');
Vue.component('tags-input', VoerroTagsInput);

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
    VueEditor,
    VoerroTagsInput
  },
  data() {
    return {
      aviso: AvisoModel,
      avisoMemento: AvisoModel,
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",     
      es: es,
      TABLE_CONFIG: TABLE_CONFIG,
      loader: false,
      loaderContactos: false,
      contador: 0,
      content: "",
      historial:[],
      contactos: [],
      contactosSeleccionados: [],
      contactosRespaldo:[],
      contactosTags:[],
      mostrarLabels:true,
      columnas: [
        { label: "Id", field: "id", hidden: true },
        { label: "Empresa", field: "empresa", hidden: true },
        { label: "Fecha", field: "fecha", hidden: true },
        { label: "para", field: "para", hidden: true },
        { label: "etiquetas", field: "etiquetas", hidden: true },
        { label: "titulo", field: "titulo", hidden: true },
        { label: "aviso", field: "aviso", hidden: true },
        { label: "nota_interna", field: "nota_interna", hidden: true },
        { label: "fecha_genero", field: "fecha_genero", hidden: true },
        { label: "Usuario", field: "usuario_genero", hidden: true }
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
      this.get(URL.AVISOS + "/" + this.usuarioSesion.id, result => {
        this.loader = false;
        if (result.body != null) {
          this.historial = result.body || [];
          this.contador = this.historial.length;
        }
      });
      this.cargarContactos();
    },
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.aviso = new AvisoModel();
      //$("#popup_aviso").modal("show");
    },

    seleccionarPara() {
      this.cargarContactos();
      $("#popup_para").modal("show");
    },
    async guardar() {
      console.log("Insertar");
      if (!validarDatosAviso(this.aviso)) {
        console.log("No paso la validacion");
        return;
      }
      this.usuario.genero = this.usuarioSesion.id;
      this.post(URL.AVISOS, this.aviso, result => {
        let respuesta = result.body;
        if (respuesta.estatus) {
          this.init();
          //$("#popup_aviso").modal("hide");
          this.$notificacion.info("Aviso ", "Se registró el aviso.");
        } else {
          this.$notificacion.error("Mensaje", respuesta.mensaje);
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
          let respuesta = result.body;
          if (respuesta.estatus) {
            this.$notificacion.info(
              "Modificación de aviso",
              "Se actualizarón los datos del aviso."
            );
            this.init();
            $("#popup_aviso").modal("hide");
          } else {
            this.$notificacion.error("Mensaje", respuesta.mensaje);
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
    seleccionar(rowSelect) {
      console.log(
        "fila seleccionada " +
          rowSelect.nombre_alumno +
          " selec " +
          rowSelect.seleccionado
      );
      rowSelect.seleccionado = !rowSelect.seleccionado;     
      
    },
    seleccionarTodos() {      
      this.contactos.forEach(element => {
        element.seleccionado = true;
      });
    },
    aceptarSeleccion(){
      this.contactos.forEach(element => {
        if(element.seleccionado){
          this.aviso.para = this.aviso.para+','+element.correo;
        }
      });
    },
    cargarContactos() {
      this.loaderContactos = true;
      if(!this.contactos.length > 0){     
      this.get(
        URL.AVISOS +
          "/contactos/" +
          JSON.stringify(this.usuarioSesion.sucursales),
        result => {
          this.loader = false;
          this.loaderContactos = false;
          if (result.body != null) {
            this.contactos = result.body || [];            
            /*this.contactos.forEach(element => {
                this.contactosTags.push({id: element.id_alumno_familiar,name:element.nombre_familiar ,value: element });
            });*/
          }
        }
      );
      }
    }
  }
};
</script>

<style scoped>

.divScoll {
  margin-top: 10px;
  height: 400px;
  width: 100%;
  overflow: auto;
}

.contentDivScroll {
  height: 800px;
}

</style>
