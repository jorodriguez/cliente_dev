<template>
  <div>
    <h1>Administración</h1>

    <div class="row mt-1">
      <div class="col-4">
        <Card
          titulo="Catalogo"
          sub_titulo="Usuarios"
          clase_icono="fas fa-user"
          clase_color="icon icon-shape bg-white rounded-circle shadow"
          clase_fondo="bg-primary pointer"
          icono_etiqueta="fa fa-cog"
          :etiqueta="usuarioSesion.nombre_sucursal"
          descripcion
          @click="irAdministrarUsuario()"
        ></Card>
      </div>
      <div class="col-4">
        <Card
          titulo="Asistencias"
          sub_titulo="Maestras"
          clase_icono="fas fa-calendar-check"
          clase_color="icon text-white  shadow"
          clase_fondo="bg-primary pointer"
          icono_etiqueta="fa fa-calendar"
          :etiqueta="usuarioSesion.nombre_sucursal"
          descripcion
          @click="irReporteSueldos()"
        ></Card>
      </div>
    </div>
  </div>
</template>

<script>
import Popup from "../controller/Popup";
import { getUsuarioSesion } from "../helpers/Sesion";
import Card from "./fragmentos/Card";

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
    },
    irReporteSueldos() {
      this.$router.push({ name: "AsistenciasUsuarioSucursal" });
    }
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>