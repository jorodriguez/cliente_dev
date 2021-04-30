<template>
  <Popup id="popup_foto_perfil" :show_button_close="false">
    <div slot="header">
      Foto de
      <strong>{{this.alumno.nombre}} {{this.alumno.apellidos}}</strong>
    </div>
    <div slot="content">
      <div class="row justify-content-md-center">
        <!--
        <div class="row">
          <div class="col-3">
            <table class="table text-left">
              <tr>
                <td>
                  <h4>{{this.alumno.nombre}} {{this.alumno.apellidos}}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>{{this.alumno.nombre_sucursal}}</h4>
                </td>
              </tr>
              <tr>
                <td>
                  <h4>{{this.alumno.nombre_grupo}}</h4>
                </td>
              </tr>
            </table>         
          </div>

          <div class="col-3">
            <div class="row">
              <div class="col">
                <div class="mx-auto">
                  <croppa
                    v-model="myCroppa"
                    canvas-color="transparent"
                    :initial-image="`${this.alumno.foto}`"
                    @init="onInit"
                    :width="200"
                    :height="200"
                    :quality="1"
                    :file-size-limit="(102400*5)"
                    prevent-white-space
                    :accept="'image/*'"
                    :placeholder="'Selecciona una nueva foto'"
                    :placeholder-font-size="12"
                    :placeholder-color="'#3E85CC'"
                    @file-type-mismatch="onFileTypeMismatch"
                    @file-size-exceed="onFileSizeExceed"
                  ></croppa>
                </div>
              </div>
              <div class="col">
                <div class="mx-auto">
                  <div
                    class="btn-group btn-group-sm mb-2 mx-auto"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      class="btn btn-light"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      @click="zoomOut()"
                    >
                      <i class="fa fa-search-minus" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-light"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      @click="flipX()"
                    >
                      <i class="fas fa-arrows-alt-h"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-light"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      @click="rotate()"
                    >
                      <i class="fas fa-redo"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-light"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      @click="flipY()"
                    >
                      <i class="fas fa-arrows-alt-v"></i>
                    </button>
                    <button
                      type="button"
                      class="btn btn-light"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      @click="zoomIn()"
                    >
                      <i class="fa fa-search-plus" aria-hidden="true"></i>
                    </button>
                  </div>

                  <div class="row">
                    <button
                      type="button"
                      class="btn btn-light btn-block"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      @click="generateImage(true)"
                    >Previsualizar</button>
                    <button
                      type="button"
                      class="btn btn-success btn-block"
                      data-toggle="button"
                      aria-pressed="false"
                      autocomplete="off"
                      @click="generateImage(false)"
                    >{{this.loadingUpload ? 'Actualizando foto..':'Actualizar foto'}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-3">
            <img
              style="border-radius:100px;width:200px;heigth:200px"
              class="mb-1"
              :src="alumno.foto"
            />
            <div class="mb-4">
              <ItemCapsulaAlumno :texto="alumno.nombre" :foto="alumno.foto" :color="alumno.color">
                <span slot="cuerpo">
                  <button type="button" class="btn btn-link btn-xs text-white">
                    <span class="badge badge-pill badge-danger">x</span>
                  </button>
                </span>
              </ItemCapsulaAlumno>
            </div>
          </div>
        </div>
        -->
      </div>
    </div>
    <div slot="footer">
      <button class="btn btn-secondary" v-on:click="cancelarModificarFechaPago()">Cancelar</button>
      <button class="btn btn-primary" v-on:click="modificarFechaLimitePago()">Seleccionar</button>
    </div>
  </Popup>
</template>


<script>
import Popup from "../controller/Popup";
import { operacionesApi } from "../helpers/OperacionesApi";
import { getUsuarioSesion } from "../helpers/Sesion";
import { filtrarNombreAlumno } from "../helpers/FiltarUtils";
import URL from "../helpers/Urls";
import Vue from "vue";
import ItemCapsulaAlumno from "../components_utils/ItemCapsulaAlumno";

import Croppa from "vue-croppa";
Vue.use(Croppa);
import "vue-croppa/dist/vue-croppa.css";
/* eslint-disable */
export default {
  components: {
    Popup,
    ItemCapsulaAlumno
  },
  mixins: [operacionesApi],
  name: "foto-perfil",
  props:["id"],
  data() {
    return {
      id: 0,
      resultado: {},
      usuarioSesion: {},
      criterioNombre: "",
      listaAlumnos: [],
      lista: [],
      alumno: { id: 0, nombre: "", foto: "" },
      myCroppa: {},
      imgUrl: "",
      cargaAlumno: false,
      loadingCatalogo: false,
      loadingUpload: false
    };
  },
  mounted() {
    //this.id = this.$route.params.id;
    //console.log("@ide recibido " + this.id);
    //this.cargarAlumno();
  },
  methods: {
    onInit() {
      this.usuarioSesion = getUsuarioSesion();

      this.myCroppa.addClipPlugin(function(ctx, x, y, w, h) {       
        console.log(x, y, w, h);
        ctx.beginPath();
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true);
        ctx.closePath();
      });
    },

    cargarCatalogoAlumnos() {
      if (this.listaAlumnos.length == 0) {
        this.loadingCatalogo = true;
        this.get(
          URL.ALUMNOS_BASE + "/" + this.usuarioSesion.co_sucursal,
          result => {
            this.response = result.data;
            console.log("Consulta " + JSON.stringify(this.response));
            if (this.response != null) {
              this.listaAlumnos = this.response;
              this.lista = this.response;
              this.loadingCatalogo = false;
            }
          }
        );
      } else {
        console.log("La lista ya se encuentra cargada");
      }
    },
    cargarAlumno() {
      this.get(URL.ALUMNOS_BASE + "/id/" + this.id, result => {
        this.alumno = result.data;
        this.loadingUpload = false;
      });
    },
    seleccionarAlumno(row) {
      console.log("seleccion " + JSON.stringify(row));
      this.alumno = row;
    },
    onFileTypeMismatch(file) {
      alert("Tipo de archivo invalido. Por favor seleccione jpeg ó png.");
    },
    onFileSizeExceed(file) {
      alert("Archivo excedido. Por favor seleccione un archivo menor a 500k.");
    },
    generateImage(preview) {
      console.log("Upload ");

      let url = this.myCroppa.generateDataUrl();
      if (!url) {
        alert("no image");
        return;
      }
      this.imgUrl = url;
      this.alumno.foto = url;

      if (!preview) {
        this.myCroppa.generateBlob(
          blob => {
            // write code to upload the cropped image file (a file is a blob)
            this.subir(blob);
          },
          "image/jpeg",
          0.7
        );
      }
    },
    subir(blob) {
      let data = new FormData();
      data.append("name", "image");
      data.append("image", blob);
      data.append("id_alumno", this.alumno.id);
      data.append("genero", this.usuarioSesion.id);
      this.loadingUpload = true;
      let thus = this;
      this.post(URL.IMAGEN_PERFIL, data, result => {
        console.log(JSON.stringify(result));
        let respuesta = result.data;
        if (respuesta != null) {
          thus.cargaAlumno();
          thus.$notificacion.info(
            "Actualización de la foto",
            "Se actualizó la foto de perfil del alumno."
          );
        } else {
          thus.$notificacion.error(
            "Error en lactualización de la foto",
            "Sucedió un error al tratar de actualizar la foto de perfil."
          );
        }
      });
    },
    buscarPorNombre() {
      console.log("Buscar por nombre " + this.criterioNombre);

      this.lista = filtrarNombreAlumno(this.criterioNombre, this.listaAlumnos);

      /* if (this.criterioNombre == "") {
        this.lista = this.listaAlumnos;
      } else {
        this.lista = this.listaAlumnos.filter(
          e =>
            e.nombre
              .toUpperCase()
              .includes(this.criterioNombre.toUpperCase()) ||
            (e.nombre_carino
              ? e.nombre_carino
                  .toUpperCase()
                  .includes(this.criterioNombre.toUpperCase())
              : false)
        );
      }*/
    },
    zoomIn() {
      this.myCroppa.zoomIn();
    },
    zoomOut() {
      this.myCroppa.zoomOut();
    },
    rotate() {
      this.myCroppa.rotate();
    },

    flipX() {
      this.myCroppa.flipX();
    },

    flipY() {
      this.myCroppa.flipY();
    }
  },
  remove() {
    this.myCroppa.remove();
  }
};
</script>