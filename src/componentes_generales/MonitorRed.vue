<template>
  <span>
    <!-- @detected-condition fires when the connectivity status of the device changes -->
    <offline @detected-condition="handleConnectivityChange">
      <!-- Only renders when the device is online -->
      <div slot="online">
        <!--<span @click="clicMonitor()" title="Senal de internet ok">
          <i class="fas fa-signal"></i>ok
        </span>-->
      </div>
      <!-- Only renders when the device is offline -->
      <div slot="offline">
        <!--<span @click="clicMonitor()" title="SIN Senal de internet">
          <i class="fas fa-signal" style="color:red"></i>Sin señal de internet
        </span>-->
      </div>
    </offline>
     <span v-if="senial"></span>
    <span v-else class="bg-danger text-white h3" @click="clicMonitor()"><i class="fas fa-exclamation-triangle  text-white"></i> Sin señal de Internet <i class="far fa-frown" ></i></span>

    <Popup id="id_monitor_red" size="md" show_button_close="true">
      <div slot="header">
        <p>Monitor de Red</p>
      </div>
      <div slot="content">
        <div class=" text-center">
          <div class="container text-center">
            
              <span v-if="senial" ><i class="fas fa-signal text-info" ></i><h2> Señal de internet Ok </h2></span>
              <div v-else  class="row">
                  <span class="h2"><i class="fas fa-signal text-red" style="color:red"></i>Sin señal de Internet <i class="far fa-frown text-danger" /></span>
                  <span class="text-muted">Esta ventana se cerrará cuando la señal de restaure. </span>
              </div>
            
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Popup>
  </span>
</template>

<script>
import offline from "v-offline";
import Popup from "../controller/Popup";

export default {
  name: "monitor-red",
  components: {
    offline,
    Popup
  },
  data(){
      return{
          senial:Boolean
      }
  },
  methods: {
    handleConnectivityChange(status) {
      console.log("INTERNET = ", status);
      $("#id_monitor_red").modal(status ? "hide" : "show");
      this.senial = status;
    },
    clicMonitor() {
      $("#id_monitor_red").modal("show");
    }
  }
};
</script>