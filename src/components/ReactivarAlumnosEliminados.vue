<template>
  <div class="reactivar_alumnos">
    <h1>Alumnos eliminados</h1>
    <small>{{ usuarioSesion.nombre_sucursal }}</small>
    <div class="text-left">
      <router-link to="/CatAlumno" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
    </div>
    <br />
    <!--<form>-->
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
            <button
              class="btn btn-outline-secondary"
              type="button"
              v-on:click="buscarPorNombre()"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        <div class="row ">
          <div v-if="criterioNombre != '' && lista.length == 0" class="mx-auto">
            <p class="text-muted ">Ningún resultado</p>
          </div>
          <div
            v-if="criterioNombre == '' && lista.length == 0 && !loader"
            class="mx-auto"
          >
            <p class="text-muted ">Oprime ENTER para listar todo</p>
          </div>
          <div v-if="loader" class="mx-auto">
            <Loader :loading="loader" :mini="true" />
          </div>
          <!-- configuracion correcta para todos los dispositivos-->
          <div
            class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-3"
            v-for="row in lista"
            :key="row.id"
          >
            <div class="card border border-secondary">
              <img
                class="card-img-top rounded-circle mx-auto"
                style="width:100px"
                @click="seleccionarAlumno(row)"
                :src="row.foto"
                alt="Foto"
              />
              <div class="card-body">
                <h5 class="card-text">
                  {{ row.nombre }}
                  <span v-if="row.mostrar_nombre_carino"
                    >({{ row.nombre_carino }})</span
                  >
                </h5>
                <h5 class="card-text small">
                  {{ row.apellidos }}
                </h5>
                <h5
                  :style="row.color ? 'background-color:' + row.color : ''"
                  class="badge badge-info text-wrap"
                >
                  {{ row.nombre_grupo }}
                </h5>
                <h5 class="card-text small">
                  {{ row.fecha_baja_format ? "Baja" : "-" }}
                  <span class="text-red">{{ row.fecha_baja_format }}</span>
                </h5>
                <!--<h6>{{row.hora_entrada}}</h6>
              <h6>{{row.hora_salida}}</h6>-->
                <button
                  type="button"
                  @click="seleccionarAlumno(row)"
                  class="btn btn-outline-primary btn-block btn-sm"
                >
                  Activar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reactivar alumno -->

    <Popup id="popup_iniciar_activacion" :show_button_close="true">
      <div slot="header">¿Confirma que desea dar activar la cuenta?</div>
      <div slot="content">
        <div class="card">
          <div class="card-body">
            <div class="media ">
              <img
                class="rounded-circle mr-2"
                style="width:140px"
                :src="alumnoSelecionado.foto"
                alt="foto"
              />
              <div class="media-body text-left">
                <h4 class="mt-0">
                  <strong
                    >{{ alumnoSelecionado.nombre }}
                    {{ alumnoSelecionado.apellidos }}</strong
                  >
                </h4>
                <p class="text-sm ">
                  <strong
                    >Entrada: {{ alumnoSelecionado.hora_entrada }} Salida:
                    {{ alumnoSelecionado.hora_salida }}</strong
                  >
                </p>
                <p class="text-sm">
                  Fecha de Baja :
                  <span class="text-red">{{
                    alumnoSelecionado.fecha_baja_format
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="form-check text-right">
            <input
              type="checkbox"
              v-model="verPerfil"
              class="form-check-input"
            />
            <label class="form-check-label text-sm" for="invalidCheck">
              Ver el perfil después de activar
            </label>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button class="btn btn-primary" v-on:click="reactivarAlumno()">
          {{loaderActivacion ? 'Activando..':'Confirmar' }} 
        </button>
      </div>
    </Popup>
  </div>
</template>

<script>
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import { getUsuarioSesion } from "../helpers/Sesion";
import Loader from "../components_utils/Loader";
import Popup from "../controller/Popup";

export default {
  name: "cat_alumnos_eliminados",
  components: { Loader, Popup },
  mixins: [operacionesApi],
  data() {
    return {
      alumnoSelecionado: {},
      usuarioSesion: {},
      criterioNombre: "",
      lista: [],
      listaRespaldo: [],
      loader: false,
      loaderActivacion: false,
      eliminados: true,
      verPerfil: true
    };
  },
  mounted() {
    console.log("##### iniciando catalogo alumno eliminados ####");

    this.usuarioSesion = getUsuarioSesion();
    this.cargarAlumnosEliminados();
  },
  methods: {
    enrutarPerfil() {
      this.$router.push({
        name: "PerfilAlumno",
        params: { id: this.alumnoSelecionado.id }
      });
    },
    async cargarAlumnosEliminados() {
      this.loader = true;
      this.criterioNombre='';
      this.lista = await this.getAsync(
        `${URL.ALUMNOS_BASE}/${this.usuarioSesion.co_sucursal}/eliminados/true`
      );
      //this.listaRespaldo = [...this.lista]; //Object.assign({},this.lista);
      this.listaRespaldo = Object.assign([], this.lista);
      this.loader = false;
    },

    buscarPorNombre() {
      console.log("Buscar por nombre " + this.criterioNombre);
      if (this.criterioNombre == "") {
        this.lista = this.listaRespaldo;
      } else {
        this.lista = this.listaRespaldo.filter(
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
      }
    },
    seleccionarAlumno(alumno) {
      this.alumnoSelecionado = alumno;
      console.log(this.alumnoSelecionado);
      $("#popup_iniciar_activacion").modal("show");
    },
    async reactivarAlumno() {
      this.loaderActivacion = true;
      const result = await this.putAsync(
        `${URL.ALUMNOS_BASE}/activar/${this.alumnoSelecionado.id}`,
        { genero: this.usuarioSesion.id }
      );
      if (this.verPerfil) {
        setTimeout(() => {
          this.loaderActivacion = false;
          $("#popup_iniciar_activacion").modal("hide");
          this.enrutarPerfil();
        }, 1000);
      } else {
        this.loaderActivacion = false;
        $("#popup_iniciar_activacion").modal("hide");
        await this.cargarAlumnosEliminados();
      }
    }
  }
};
</script>

<style scoped></style>
