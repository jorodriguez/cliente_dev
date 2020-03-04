<template>
  <span id="reportes">
    <div class="card">
      <div class="card-body">
        <div class="row mb-4">
          <Card
            titulo="Alumnos"
            sub_titulo="Faltas del mes"
            clase_icono="fas fa-user"
            clase_color="icon icon-shape bg-white rounded-circle shadow"
            clase_fondo="bg-gradient-info pointer"
            icono_etiqueta="fa fa-cog"
            :etiqueta="usuarioSesion.nombre_sucursal"
            descripcion
            @click="irAdministrarUsuario()"
          ></Card>          
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import Popup from "../controller/Popup";
import { getUsuarioSesion } from "../helpers/Sesion";
import Card from "../administracion/fragmentos/Card";

export default {
  components: {
    Popup,
    Card
  },
  data() {
    return {
      usuarioSesion: null
    };
  },
  name: "Administracion",
  mounted() {
    this.usuarioSesion = getUsuarioSesion();
  },
  methods: {
    irAdministrarUsuario() {
      this.$router.push({ name: "CatalogoUsuario" });
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>