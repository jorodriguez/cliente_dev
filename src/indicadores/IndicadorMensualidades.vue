<template>
  <span>
    <span>
      Vencen
      <span class="badge badge-pill badge-primary">{{listaMensualidades.length}}</span>
    </span>
    <span>
      <Popup id="popup_mensualidades" size="md" show_button_close="true">
        <div slot="header">
          <p>Mensualidades próximas a vencer</p>
        </div>
        <div slot="content">
          <div class="text-center">
            <div class="container text-center"></div>
          </div>
        </div>
        <div slot="footer"></div>
      </Popup>
    </span>
  </span>
</template>

<script>
import Popup from "../controller/Popup";
import URL from "../helpers/Urls";
import { operacionesApi } from "../helpers/OperacionesApi";
import { getUsuarioSesion, token } from "../helpers/Sesion";

export default {
  name: "indicadores-mensualidad-vencer",
  mixins: [operacionesApi],
  components: {
    Popup
  },
  data() {
    return {
      listaMensualidades: [],
      loader: false,
      obtenerIndicadorMensualidad: null,
      usuarioSesion: null
    };
  },
  mounted() {
    console.log("Inciando consulta de indicadores");

    this.usuarioSesion = getUsuarioSesion();

    this.obtenerIndicadorMensualidad = function() {
      console.log(
        "@obtenerIndicadorMensualidad " + this.usuarioSesion.co_sucursal
      );
      this.loader = true;
      this.get(
        URL.MENSUALIDAD_VENCE_SEMANA_ACTUAL + this.usuarioSesion.co_sucursal,

        results => {
          console.log(" MENSUALIDADADES A VENCER  " + results);
          if (results != null) {
            this.loader = false;
            this.listaMensualidades = results;
          }
        }
      );
    };

    this.obtenerIndicadorMensualidad();
  },
  methods: {
    verLista() {
      $("#popup_mensualidades").modal("show");
    }
  }
};
</script>