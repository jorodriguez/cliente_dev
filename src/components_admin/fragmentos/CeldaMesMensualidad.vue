
<template>  
      <span v-if="value != null" >
        <span  v-if="mostrar_mes" class="small text-lowercase">{{ value != null ? ('('+value.abreviatura_mes+'-'+value.anio_abreviado+ ')'):'' }}</span>
        <!--<div class="row">
            <span :class="value.pagado ? '':'small text-lowercase text-danger'">{{value.pagado ? '':'adueda' }}</span>
        </div>-->        
        <div  v-if="mostrar_monto" class="row row-cols-1">
            <span class="col small">Mensualidad</span>
            <span class="col">{{ value != null ? value.cargo:'' }} </span>
        </div>
        <div  v-if="mostrar_pagado" class="row row-cols-1">
              <span class="col small">Pagado</span>
            <span class="col">{{ value != null ? value.total_pagado:'' }}</span>        
        </div>
        <div  v-if="mostrar_adeuda" class="row row-cols-1">
            <span :class="value.pagado ? 'col small':'col small text-danger'">Adeuda</span>
            <span :class="value.pagado ? 'col':'col text-danger'">{{ value != null ? value.total:'' }} </span>
        </div>                      
        
    </span>                           
</template>

<script>

export default {
  name: "celda-mes-mensualidad",
  props:["value","mostrar_mes","mostrar_monto","mostrar_pagado","mostrar_adeuda"],
  data(){
      return{
        escribir:false,
        colorTexto:''
      }
  },
  mounted(){
      this.escribir = (this.value != undefined && this.value != null);
      this.colorTexto = (this.escribir && this.value.pagado) ? 'text-primary':'text-danger';
  },
  methods: {
    click(){
      this.$emit('click');
    }
  }
};
</script>


