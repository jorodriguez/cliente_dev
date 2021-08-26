<template>
  <div
    class="row  pb-1 pt-1 border d-flex align-items-center"        
     @click="click()"
  >
    <!--<div class="col-2 ">
      <img
        :src="item.foto"
        width="50"
        height="50"
        alt=".."
        class="rounded-circle"
      />
    </div>-->
    <div class="col pl-4 text-left">
      <small class="font-weight-bold" style="font-size:15px;">{{ item.nombre_familiar }}</small
      ><br />
      <small class="text-primary h5">{{ item.correo }}</small>
      <br />      
      <small class="text-muted">{{ item.parentesco }} de {{ item.nombre_alumno }}</small
      >
      <br v-if="mostrar_sucursal" />      
      <span
        class="badge  badge-primary"        
        style="font-size:10px;"
        v-if="mostrar_sucursal"
        >{{ item.nombre_grupo }}</span
      >
      <span
        class="badge  badge-info"               
        v-if="mostrar_sucursal"
        style="font-size:10px;"
        >{{ item.sucursal }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "targeta-contacto",
  props: [
    "item",
    "seleccionar",
    "mostrar_sucursal"
  ],
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
