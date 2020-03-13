
<template>
  <div
    @click="click()"
    :class="class_color ? '':'bg-primary'"
    :style="class_color ? ('background-color:'+class_color) :''"
  >
    <!-- Card body -->
    <div class="card-body">
      <div class="row">
        <div class="col">
          <h5 class="card-title text-uppercase text-muted mb-0 text-white">{{titulo}}</h5>
          <span class="h2 font-weight-bold mb-0 text-white">{{nombre}}</span>
        </div>
        <div class="col-auto">
          <div class="icon icon-shape bg-white rounded-circle shadow">
            <img v-if="foto == null" src="../../assets/magic.png" class="avatar" />
            <img v-else alt="No Image" :src="foto" class="avatar" />
          </div>
        </div>
      </div>
      <slot name="contenido"></slot>
      <p class="mt-3 mb-0 text-sm">
        <span class="text-white mr-2">
          <i :class="icono_etiqueta ? icono_etiqueta : 'fa fa-arrow-right'"></i>
          {{etiqueta}}
        </span>
        <span class="text-nowrap text-light">{{descripcion}}</span>        
      </p>      
    </div>
  </div>
</template>

<script>
export default {
  name: "celda-mes-mensualidad",
  props: [
    "class_color",
    "titulo",
    "nombre",
    "foto",
    "icono_etiqueta",
    "etiqueta",
    "descripcion"
  ],
  data() {
    return {
      escribir: false,
      colorTexto: ""
    };
  },
  mounted() {
    this.escribir = this.value != undefined && this.value != null;
    this.colorTexto =
      this.escribir && this.value.pagado ? "text-primary" : "text-danger";
  },
  methods: {
    click() {
      this.$emit("click");
    }
  }
};
</script>


