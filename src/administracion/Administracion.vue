<template>
  <div>
    <h1>Administración</h1>
    <div class="row mt-1 " >
      <div class="col-4 mb-3" v-for="opc in lista" :key="opc.id">
        <Card
          titulo=""
          :sub_titulo="opc.nombre"
          :clase_icono="opc.icono_menu"
          clase_color="icon icon-shape bg-white rounded-circle shadow"
          clase_fondo="bg-primary pointer"
          :icono_etiqueta="opc.icono_menu"
          :etiqueta="usuarioSesion.nombre_sucursal"
          descripcion
          @click="ir(opc.ruta)"
        ></Card>
        <!--<Card
          titulo="Catalogo"
          sub_titulo="Usuarios"
          clase_icono="fas fa-user"
          clase_color="icon icon-shape bg-white rounded-circle shadow"
          clase_fondo="bg-primary pointer"
          icono_etiqueta="fa fa-cog"
          :etiqueta="usuarioSesion.nombre_sucursal"
          descripcion
          @click="ir(opc.ruta)"
        ></Card>-->
      </div>      
      <!--<div class="col-4">
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
      </div>-->
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
      usuarioSesion: null,
      lista:[]
    };
  },
  name: "Administracion",
  mounted() {
    this.usuarioSesion = getUsuarioSesion();
    let menu = this.usuarioSesion.menu||[];
    for(let i = 0;i<menu.length;i++){
        if(menu.id = 1){//Administracion
            this.lista = menu[i].opciones_hijo;
        }
    }
  },
  methods: {
    ir(name){
      this.$router.push({ name: name });
    },
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