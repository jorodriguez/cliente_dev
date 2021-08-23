<template>
  <div
    class="row  pb-1 pt-1 border d-flex align-items-center contentDivScoll"        
     @click="click()"
  >
    <div class="col-2 ">
      <img
        :src="item.foto"
        width="50"
        height="50"
        alt=".."
        class="rounded-circle"
      />
    </div>
    <div class="col-10 pl-4 text-left">
      <small class="font-weight-bold">{{ item.nombre_familiar }}</small
      ><br />
      <small>{{ item.parentesco }} de {{ item.nombre_alumno }}</small
      ><br />
      <small>{{ item.correo }}</small>
      <br />
      <span
        class="badge badge-pill badge-light"
        :style="
          `font-size:10px;padding-top:0px;background-color:${
            item.color_sucursal
          }`
        "
        >{{ item.sucursal }}</span
      >
      <span
        class="badge badge-pill badge-light"
        :style="
          `font-size:10px;padding-top:0px;background-color:${item.color_grupo}`
        "
        >{{ item.nombre_grupo }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "targeta-contacto",
  props: [
    "item",
    "seleccionar"
  ],
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>
