
<template>
  <div id="app">
    <a
      id="id_notificador_principal"
      class="hide btn btn-link"
      data-toggle="collapse"
      href="#collapseExample"
      role="button"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      <div id="encabezado_notificador_principal"></div>
    </a>
    <div id="collapseExample" class="collapse">
      <div class="card card-body">
        <div class="overflow-auto">
          <div id="cuerpo_notificador_principal"></div>
        </div>
      </div>
    </div>

    <!--app principal -->
    <router-view />
  </div>
</template>

<script>
export default {
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
