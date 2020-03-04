
<template>  


      <div :class="clase_fondo ? ('card '+clase_fondo) : 'bg-primary'" @click="click()">
        <!-- Card body -->
        <div class="card-body">
          <div class="row">
            <div class="col">
              <h5 class="card-title text-uppercase text-muted mb-0 text-white">{{titulo}}</h5>
              <span class="h2 font-weight-bold mb-0 text-white">{{sub_titulo}}</span>
            </div>
            <div class="col-auto">
              <div :class=" clase_fondo ? clase_color : 'icon icon-shape bg-white rounded-circle shadow'">
                <i :class="clase_icono ? clase_icono : 'ni ni-atom'"></i>
              </div>
            </div>
          </div>
          <p class="mt-3 mb-0 text-sm">
            <span class="text-white mr-2">
              <i :class="icono_etiqueta ? icono_etiqueta : 'fa fa-arrow-up'"></i> {{etiqueta}}
            </span>
            <span class="text-nowrap text-light">{{descripcion}}</span>
          </p>
        </div>
      </div>     

</template>

<script>

export default {
  name: "card",
  props:["accion","titulo","sub_titulo","clase_icono","clase_fondo","clase_color","etiqueta","descripcion","icono_etiqueta"],
  methods: {
    click(){
      this.$emit('click');
    }
  }
};
</script>

