<template>
  <div>
    <a class="dropdown-item" v-if="mostrarOpcion" @click="cargarSucursales(true)">
      <i class="ni ni-settings"></i>
      <span>Cambiar de Sucursal</span>
    </a>

    <Popup id="popup_cambio_sucursal" size="md" :show_button_close="true">
      <div slot="header">
        <p>Mis Sucursales</p>
      </div>
      <div slot="content">
        <div class="text-center">
          <div class="container text-center">
            <small>Estas en </small>
            <h2>{{usuarioSesion.nombre_sucursal}}</h2>
            <Loader :loading="loader" :mini="false" />
            <p>Cambiar a</p>
            <div class="card" v-for="row in listaSucursales" :key="row.id">
              <div class="row align-items-center">
                <div class="col-auto">
                  <!-- Avatar -->
                  <a
                    href="#"
                    @click="cambiarSucursal(row)"
                    class="avatar avatar-xl rounded-circle"
                    :style="'background-color:'+row.class_color"
                  >
                    <img
                      v-if="row.foto != null && row.foto != '#'"
                      alt="Image placeholder"
                      :src="row.foto ? row.foto:'../assets/magic.png'"
                    />
                  </a>
                </div>
                <div class="col ml--2">
                  <h4 class="mb-0">
                    <a href="#!" class="h1" @click="cambiarSucursal(row)">{{row.nombre_sucursal}}</a>
                  </h4>
                  <p class="text-sm text-muted mb-0">
                    <!--<span :class="row.contador_alumnos_por_entregar > 0 ? 'text-danger':'text-gray'">●</span>-->
                    <span :class="row.contador_alumnos_por_entregar > 0 ? 'text-danger':'text-gray'">
                      <span :class="row.contador_alumnos_por_entregar > 0 ? 'badge badge-pill badge-danger':'badge badge-pill badge-secondary'">{{row.contador_asistencia_alumnos}}</span> alumnos por entregar
                    </span>
                  </p>
                  <span class="text-primary">●</span>
                  <small>{{row.contador_alumnos}} Alumnos</small>
                  <span :class="row.contador_asistencia_alumnos > 0 ? 'text-success':'text-gray'">●</span>
                  <small>{{row.contador_asistencia_alumnos}} Asistencias en total</small>
                  
                </div>
                <div class="col-auto">
                  <button
                    type="button"
                    class="btn btn-sm btn-primary"
                    @click="cambiarSucursal(row)"
                  >Seleccionar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>
  </div>
</template>

<script>
import Popup from "../controller/Popup";
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import Loader from "../components_utils/Loader";
import { getUsuarioSesion, setSession } from "../helpers/Sesion";
import Card from "../administracion/fragmentos/Card";
import { cargarSesion } from "../controller/LoginHelper";
//import Bus from "../components_utils/Bus";

export default {
  name: "cambiar-sucursal-item",
  mixins: [operacionesApi],
  components: {
    Popup,
    Loader,
    Card
  },
  data() {
    return {
      listaSucursales: [],
      loader: false,
      obtener: null,
      usuarioSesion: null,
      contador: 0,
      mostrarOpcion: false
    };
  },
  mounted() {
    console.log("Inciando consulta de sucucrsales");
    this.usuarioSesion = getUsuarioSesion();
    this.cargarSucursales(false);
  },
  methods: {
    cargarSucursales(mostrarVentanaCambio) {
      console.log("@obtener sucursales " + this.usuarioSesion.co_sucursal);
      this.loader = true;
      this.listaSucursales = [];
      console.log("URL " + JSON.stringify(URL.SUCURSAL_USUARIO));
      try {
        this.get(
          URL.SUCURSAL_USUARIO + "/" + this.usuarioSesion.id,
          results => {
            if (results.data != null) {
              this.loader = false;
              this.listaSucursales = results.data;
              this.mostrarOpcion = this.listaSucursales.length >= 1;
              if (mostrarVentanaCambio) {
                $("#popup_cambio_sucursal")
                  .appendTo("#bienvenido")
                  .modal("show");
              }
            }
          }
        );
      } catch (error) {
        console.error("ERRRRRR OR " + error);
      }
    },
    cambiarSucursal(row) {
      console.log("Cambiar de sucursal a " + row);
      try {
        this.put(
          URL.SUCURSAL_USUARIO,
          { id_usuario: this.usuarioSesion.id, id_sucursal: row.id_sucursal },
          results => {
            if (results.data != null && results.data.auth) {
              cargarSesion(results.data)
                .then(path => {
                  console.log("PATH " + path);

                  this.usuarioSesion = getUsuarioSesion();

                  //this.$router.push({ path: '/' });
                  this.$router.push({ path: path });
                  //  Bus.$emit('CAMBIO_SUCURSAL',{id_sucursal_seleccionada:this.usuarioSesion.co_sucursal});
                  this.$root.$emit("CAMBIO_SUCURSAL", {
                    id_sucursal_seleccionada: this.usuarioSesion.co_sucursal
                  });
                  $("#popup_cambio_sucursal").modal("hide");
                })
                .catch(error => {
                  this.$notificacion.error(
                    "Error",
                    "Ups!! sucedió un detalle al cambiar de sucursal."
                  );
                });
            } else {
              this.$notificacion.error(
                "Error",
                "Ups!! sucedió un detalle al cambiar de sucursal."
              );
            }
          }
        );
      } catch (error) {
        console.error("ERRRRRR OR " + error);
      }
    }
  }
};
</script>