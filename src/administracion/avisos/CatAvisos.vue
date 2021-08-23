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
      <div class="col-1">
        <Button
          type="button"
          class="btn btn-primary btn-lg"
          v-on:click="enviar()"
          >Enviar</Button
        >
      </div>
    </div>
    <Loader :loading="loader" />

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
              placeholder="Escribe un nombre o apellido..."
              v-model="contactosSeleccionados"
              :existing-tags="contactos"
              id-field="id_alumno_familiar"
              text-field="nombre_familiar"
              typeahead-style="dropdown"
              :typeahead="true"
              @tag-added="onTagAdded"
              @tag-removed="onTagRemoved"
            >
              <template v-slot:selected-tag="{ tag, index, removeTag }">
                <img
                  :src="tag.foto"
                  width="30"
                  height="30"
                  alt=".."
                  class="rounded-circle"
                  @click="verDetalle(tag)"
                />
                <span @click="verDetalle(tag)">{{ tag.nombre_familiar }}</span
                ><br />
                <span
                  @click="verDetalle(tag)"
                  class="badge "
                  :style="`background:'${tag.color_sucursal}'`"
                >
                  <span @click="verDetalle(tag)">{{ tag.sucursal }}</span>                  
                </span>
                <span
                  @click="verDetalle(tag)"
                  class="badge "
                  :style="`background:'${tag.color_grupo}'`"
                >
                  <span @click="verDetalle(tag)">{{ tag.nombre_grupo }}</span>
                  <!--<span @click="verDetalle(tag)" style="font-size:7px;padding-top:0px">{{tag.sucursal}}</span>-->
                </span>
                <a
                  v-show="true"
                  href="#"
                  class="tags-input-remove"
                  @click.prevent="removeTag(index)"
                ></a>
              </template>
            </tags-input>
            <small id="emailHelp" class="form-text text-rigth text-muted">
              <a for="staticEmail" @click="seleccionarPara()" class="">+ </a>
              <a for="staticEmail" @click="limpiarPara()" class="btn btn-link"
                >D
              </a>
            </small>
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
            />
          </div>
        </div>
        <div class="form-group row">
          <div class="col">
            <vue-editor
              v-model="aviso.aviso"
              focus
              placeholder="Escribe tu aviso.."
            ></vue-editor>
          </div>
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
                placeholder="Buscar"
                id="buscar"
              />

              <!-- contenido -->

              <div class="card">
                <div class="card-bod">
                  <div
                    class="d-flex justify-content-end align-items-start"
                    style="height:12px"
                  >
                    <div class="dropdown">
                      <button
                        class="btn btn-link btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenu2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {{
                          this.sucursalSeleccionada &&
                            this.sucursalSeleccionada.nombre
                        }}
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenu2"
                      >
                        <button
                          v-for="suc in listaSucursales"
                          :key="suc.id"
                          class="dropdown-item"
                          type="button"
                          @click="seleccionarSucursal(suc, true)"
                        >
                          <span>{{ suc.nombre }}</span>
                        </button>
                      </div>
                    </div>
                    <!--Combo de grupos -->
                    <div class="dropdown">
                      <button
                        class="btn btn-link btn-sm dropdown-toggle"
                        type="button"
                        id="dropdownMenu2"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {{
                          this.grupoSeleccionado &&
                            this.grupoSeleccionado.nombre
                        }}
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenu2"
                      >
                        <span
                          v-for="(grupo, index) in listaGrupos"
                          :key="`${index}`"
                        >
                          <button
                            class="dropdown-item"
                            type="button"
                            v-if="grupo.visible"
                            @click="seleccionarGrupo(grupo)"
                          >
                            {{ grupo.nombre }}
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class=" divScoll">
                    <span
                      v-for="item in contactos"
                      :key="item.id_alumno_familiar"
                      class="pointer"
                    >
                      <tarjeta-contacto
                        @click="seleccionar(item, 'ADD')"
                        v-if="!item.seleccionado && item.visible"
                        :item="item"
                      />
                    </span>
                  </div>
                  <button
                    class="btn btn-block btn-primary"
                    type="button"
                    @click="seleccionarTodos()"
                  >
                    Seleccionar todos
                  </button>
                </div>
              </div>
            </div>

            <!-- detalle-->
            <div class="col-6">
              <div class="card">
                <br /><br />
                Selección
                <div
                  class="d-flex justify-content-end align-items-start"
                  style="height:12px"
                >
                  <button
                    class="btn btn-link btn-sm"
                    type="button"
                    @click="removerTodos()"
                  >
                    Remover todos
                  </button>
                </div>
                <div class="divScoll">
                  <span
                    v-for="item in contactosSeleccionados"
                    :key="item.id_alumno_familiar"
                    class="pointer"
                  >
                    <tarjeta-contacto
                      @click="seleccionar(item, 'REMOVE')"
                      :item="item"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>

    <!-- DETALLE -->
    <Popup id="popup_detalle" show_button_close="true" size="md">
      <div slot="header">
        {{ this.rowDetalle ? this.rowDetalle.nombre_familiar : "" }}
      </div>
      <div slot="content">
        <div class="card">
          <div v-if="this.rowDetalle" class="card-body row">
            <div class="col-4 ">
              <img
                :src="this.rowDetalle.foto"
                width="130"
                height="130"
                alt=".."
                class="rounded-circle"
              />
            </div>
            <div class="col-6 pl-4 text-left">
              <small class="font-weight-bold">{{
                this.rowDetalle.nombre_familiar
              }}</small
              ><br />
              <small
                >{{ this.rowDetalle.parentesco }} de
                {{ this.rowDetalle.nombre_alumno }}</small
              ><br />
              <small class="text-primary">{{ this.rowDetalle.correo }}</small>
              <br />
              <span
                class="badge badge-pill badge-light"
                :style="
                  `font-size:10px;padding-top:0px;background-color:${
                    this.rowDetalle.color_sucursal
                  }`
                "
                >{{ this.rowDetalle.sucursal }}</span
              >
              <span
                class="badge badge-pill badge-light"
                :style="
                  `font-size:10px;padding-top:0px;background-color:${
                    this.rowDetalle.color_grupo
                  }`
                "
                >{{ this.rowDetalle.nombre_grupo }}</span
              >
            </div>
          </div>
        </div>
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
require("@voerro/vue-tagsinput/dist/style.css");
Vue.component("tags-input", VoerroTagsInput);

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
      usuarioSesion: null,
      response: "",
      operacion: "INSERT",
      es: es,
      TABLE_CONFIG: TABLE_CONFIG,
      loader: false,
      loaderContactos: false,
      contador: 0,
      content: "",
      historial: [],
      contactos: [],
      contactosSeleccionados: [],
      contactosRespaldo: [],
      contactosTags: [],
      listaSucursales: [],
      listaGrupos: [],
      listaGruposFiltados: [],
      sucursalSeleccionada: undefined,
      sucursalDefault: { id: -1, nombre: "Todas las sucursales" },
      grupoSeleccionado: undefined,
      grupoDefault: { id: -1, nombre: "Todos los grupos" },
      mostrarLabels: true,
      rowDetalle: null,
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
      this.sucursalSeleccionada = this.sucursalDefault;
      this.grupoSeleccionado = this.grupoDefault;

      this.get(URL.AVISOS + "/" + this.usuarioSesion.id, result => {
        this.loader = false;
        if (result.body != null) {
          this.historial = result.body || [];
          this.contador = this.historial.length;
        }
      });
      this.cargarContactos();
      this.nuevo();
    },
    nuevo() {
      console.log("Nuevo");
      this.operacion = "INSERT";
      this.aviso = new AvisoModel();
      //$("#popup_aviso").modal("show");
    },
    limpiarPara() {
      this.contactos.forEach(element => {
        element.seleccionado = false;
        element.visible = true;
        this.contactosSeleccionados = [];
      });
    },
    seleccionarPara() {
      //this.cargarContactos();
      this.obtenerFiltros();

      $("#popup_para").modal("show");
    },

    async enviar() {
      console.log("Insertar");
      let correosPara = "";
      this.contactos.filter(function(item) {
        correosPara += item.correo;
      });

      this.aviso.para = correosPara;
      if (!validarDatosAviso(this.aviso)) {
        console.log("No paso la validacion");
        return;
      }
      this.aviso.id_empresa = this.usuarioSesion.co_empresa || 1;
      this.aviso.genero = this.usuarioSesion.id;
      this.post(URL.AVISOS, this.aviso, result => {
        let respuesta = result.body;
        if (respuesta.estatus) {
          // this.init();
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
              /*this.contactos.forEach(element => {
                this.contactosTags.push({id: element.id_alumno_familiar,name:element.nombre_familiar ,value: element });
            });*/
            }
          }
        );
      }
    },
    obtenerFiltros() {
      if (this.listaSucursales.length == 0) {
        let todasSucursales = [];
        todasSucursales.push(this.sucursalDefault);

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
        todosGrupos.push(this.grupoDefault);
        this.contactos.filter(function(item) {
          let i = todosGrupos.findIndex(
            x => x.id == item.id_grupo && x.id_sucursal == item.id_sucursal
          );
          if (i <= -1) {
            todosGrupos.push({
              id: item.id_grupo,
              id_sucursal: item.id_sucursal,
              nombre: item.nombre_grupo,
              color: item.color_grupo,
              visible: false
            });
          }
        });
        this.listaGrupos = todosGrupos;
      }
      this.seleccionarSucursal(this.sucursalDefault, true);
    },
    filtrarComboGruposPorSucursal(sucursal) {
      console.log(sucursal.nombre);

      this.sucursalSeleccionada = sucursal;

      this.listaGrupos.forEach(e => {
        e.visible = false;
        if (e.id_sucursal === sucursal.id) {
          e.visible = true;
        }
      });
    },

    seleccionarSucursal(sucursalSeleccionada, filtrarGrupos) {
      this.contactos.forEach(element => {
        element.visible = false;
        if (
          (element.id_sucursal === sucursalSeleccionada.id ||
            sucursalSeleccionada.id == this.sucursalDefault.id) &&
          !element.seleccionado
        ) {
          element.visible = true;
          //this.contactosSeleccionados.push(element);
        }
      });
      if (filtrarGrupos) {
        this.filtrarComboGruposPorSucursal(sucursalSeleccionada);
      }
      this.seleccionarGrupo(this.grupoDefault);
    },
    seleccionarGrupo(grupoSeleccionado) {
      if (grupoSeleccionado.id != this.grupoSeleccionado.id) {
        this.grupoSeleccionado = grupoSeleccionado;

        if (grupoSeleccionado.id == -1) {
          this.contactos.forEach(element => {
            element.visible = false;
            if (
              element.id_sucursal === this.sucursalSeleccionada.id &&
              !element.seleccionado
            ) {
              element.visible = true;
            }
          });
        } else {
          this.contactos.forEach(element => {
            element.visible = false;
            if (
              element.id_grupo === grupoSeleccionado.id &&
              element.id_sucursal == grupoSeleccionado.id_sucursal &&
              !element.seleccionado
            ) {
              //element.seleccionado = true;
              element.visible = true;
              //this.contactosSeleccionados.push(element);
            }
          });
        }
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

.pointer {
  cursor: pointer;
}
</style>
