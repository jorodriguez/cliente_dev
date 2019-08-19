<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div
            v-for="row in listaSucursales"
            :key="row.id_sucursal"
            class="col-xl-3 col-sm-4 py-2 mx-auto"
          >
            <div
              class="card text-white h-100 pointer sucursal-item-hover hover"
              v-on:click="verListaMensualidadesFacturadas(row)"
              title="Clic para ver el detalle"
              v-bind:style="{'background-color':row.class_color}"
            >
              <div class="card-body" v-bind:style="{'background-color':row.class_color}">
                <h6 class="text-uppercase">{{row.sucursal}}</h6>
                <small>Mensualidades Facturadas</small>
                <h4 class="display-5">0</h4>
              </div>
            </div>
          </div>
        </div>
        <h3>{{sucursal_seleccionada.sucursal}}</h3>
      </div>
    </div>
  </div>
</template>

<script src="../controller/ReporteMensualidadesController.js" >
</script>
