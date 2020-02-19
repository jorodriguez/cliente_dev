<template>
  <span id="administracion"> 
     
      
       <router-link to="/CatalogoUsuario" class="nav-link">
          <i class="fa fa-cash-register text-blue"></i> Usuarios
        </router-link>
       <!--  <ul class="nav nav-pills nav-justified" id="pills-tab" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  id="pills-home-tab"
                  data-toggle="pill"
                  href="#pills-home"
                  role="tab"
                  aria-controls="pills-home"
                  aria-selected="true"
                >Usuarios</a>
              </li>         
                   
             
              <li class="nav-item">
                <a
                  class="nav-link"
                  id="pills-servicios-tab"
                  data-toggle="pill"
                  href="#pills-facturacion"
                  role="tab"
                  aria-controls="pills-facturacion"
                  aria-selected="false"
                >Facturación</a>
              </li>
            </ul>
            <div class="tab-content" id="pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
              >
                <div class="card">
                  <div class="card-body">
                    usuarios
                  </div>
                </div>
              </div>
            </div>
  -->
   
  </span>
</template>

<script>
import Popup from "../controller/Popup";
import { usuarioSesion, clearSesion } from "../helpers/Sesion";
import { VueGoodTable } from 'vue-good-table';

export default {
  components: {
    Popup, VueGoodTable
  },
  name: "Administracion",
  methods: {}
};
</script>

