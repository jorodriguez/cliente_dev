<template>
  <span id="administracion">
    <div class="row mb-4">
      <Card
        titulo="Administrar"
        sub_titulo="Usuarios"
        clase_icono="fas fa-user"
        clase_color="icon icon-shape bg-white rounded-circle shadow"
        clase_fondo="bg-gradient-info"
        icono_etiqueta ="fa fa-cog"
        :etiqueta="usuarioSesion.nombre_sucursal"
        descripcion=""
        @click="irAdministrarUsuario()"
      ></Card>
      <!--<router-link to="/CatalogoUsuario" class="nav-link">
        <i class="fa fa-cash-register text-blue"></i> Usuarios
      </router-link>-->
    </div>
  </span>
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
  data(){
    return{
        usuarioSesion :null
    }
  },
  name: "Administracion",
  mounted(){
      this.usuarioSesion = getUsuarioSesion();
  },
  methods: {
    irAdministrarUsuario(){
      this.$router.push({ name: "CatalogoUsuario" });
    }
  }
};
</script>

