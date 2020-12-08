
<template>
  <span>
    <a
      style="color:blue;cursor:pointer;"
      v-on:click="reenviarComprobantePago()"
      :disabled="loader"
      title="Reenviar el comprobante de este pago"
    >
      <i v-if="!loader" class="fas fa-paper-plane"></i>
      <div v-if="loader" class="spinner-border spinner-border-sm" role="status">        
      </div>
      <small>{{label}}</small>
    </a>
  </span>
</template>

<script>
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";

export default {
  name: "reenviar-comprobante",
  props: ["id_alumno", "id_pago"],
  mixins: [operacionesApi],
  data() {
    return {
      loader: false,
      mensaje: "",
      label: "Enviar"
    };
  },
  methods: {
    click() {
      this.$emit("click");
    },
    reenviarComprobantePago() {
      console.log("enviando peticion para reenvio ");
      //this.mensaje = true;
      if (
        this.id_alumno == null ||
        this.id_alumno == undefined ||
        this.id_pago == null ||
        this.id_pago == undefined
      ) {
        console.log("sin valores ");
        return;
      }
      this.label = "Enviando..";
      this.loader = true;
      this.put(
        URL.REENVIAR_COMPROBANTE,
        {
          id_alumno: this.id_alumno,
          id_pago: this.id_pago
        },
        results => {
          console.log("reenviando comprobante " + results.data);
          if (results.data != null) {
            console.log("Reenvio respuesta " + JSON.stringify(results));
            //this.mensaje_reenvio = `(${results.body})`;
          }
          let thus = this;
          setTimeout(function() {
            thus.loader = false;
            thus.label = "Enviado";
          }, 3000);
        }
      );
    }
  }
};
</script>

