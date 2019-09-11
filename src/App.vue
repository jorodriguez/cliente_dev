
<template>
  <div id="app">    
    <button id="id_notificador_principal" 
            type="button" 
            class="btn btn-link btn-small hide" 
            data-toggle="modal" 
            data-target="#detalle_notificacion_principal">
        <!--<span class="spinner-border" > </span>  -->
         <span id="texto_notificador_principal"> </span>
      </button>
    <!--app principal -->
    <router-view />
    <!-- app principal -->
        <Popup id="detalle_notificacion_principal" show_button_close="true">
          <div slot="header"><p id="encabezado_notificador_principal"></p></div>
          <div slot="content">                    
            <div class="row">              
              <div class="container overflow-auto">
                    <div id="cuerpo_notificador_principal"></div>
              </div>
            </div>
          </div>
          <div slot="footer">
            
          </div>
        </Popup>


  </div>
</template>

<script>

import Popup from './controller/Popup'

export default {
  components:{
      Popup,
  },
  name: "App"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
