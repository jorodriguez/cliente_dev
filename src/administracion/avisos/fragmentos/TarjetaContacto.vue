<template>
  <div
    class="row  pb-1 pt-1 border d-flex align-items-center"        
     @click="click()"
  >   
    <div class="col pl-4 text-left">
      <small class="font-weight-bold" style="font-size:15px;">{{ item.nombre }}</small
      ><br />
      <small class="text-primary h5">{{ item.correo }}</small>
      <br />      
      <small class="text-muted">{{ item.celular }}</small
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
