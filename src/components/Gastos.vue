<template>
  <div id="id_gastos">
    <h1>Gastos</h1>(
    <small>{{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}</small>)
    <div class="text-left">
      <router-link to="/principal" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
      <button type="button" class="btn btn-primary btn-lg" v-on:click="iniciarAgregarGasto()">Nuevo</button>
    </div>
    <br>   
    <table class="table">
      <thead>        
        <th>Fecha</th>
        <th>Gasto</th>
        <th>Tipo Pago</th>
        <th>Gasto</th>
        <th>Observaciones</th>
        <th></th>
      </thead>
      <tbody v-for="row in listaGastos" :key="row.id">
        <tr>          
          <td>            
            <span class="small">{{row.fecha | moment("DD-MMM-YY")}}</span>
          </td>
          <td>
            <button v-on:click="seleccionarGasto(row,'UPDATE')" type="button" class="btn btn-link">
              <span class="small">{{row.nombre_tipo_gasto}}</span>              
            </button>
          </td>
          <td>
            <strong>
              <span class="small font-weight-bold text-danger">${{row.nombre_tipo_pago }}</span>
            </strong>
          </td>         
          <td>
            <span
              class="d-inline-block text-truncate small"
              style="max-width: 120px;"
              :title="row.observaciones"
            >{{row.observaciones}}</span>
          </td>
          <td>
             <button type="button" class="btn btn-primary btn-lg" v-on:click="seleccionarGasto(row,'DELETE')">
               Eliminar
             </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL PARA AGREGAR Gasto -->
    <form>
      <div
        id="modal_gasto"
        class="modal"
        tabindex="-1"
        data-keyboard="false"
        data-backdrop="static"
        role="dialog"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> {{operacion == 'INSERT' ? ' Registrar':'Modificar'}} Gasto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body text-left">
              <p class="text-danger">{{mensaje}}</p>
              
              <label>
                  Fecha 
                  <span class="text-danger">*</span>
                </label>                
                <datepicker
                  name="fecha"
                  v-model="gasto.fecha"
                  input-class="form-control"
                  required
                ></datepicker>

              <label for="selectTipoGasto">
                Gasto
                <span class="text-danger">*</span>
              </label>
              <select
                v-model="gasto.cat_tipo_gasto"
                class="form-control"
                placeholder="Gasto"
                name="cat_tipo_gasto"
                required
                autofocus
              >
                <option
                  id="selectGasto"
                  v-for="p in listaTiposGasto"
                  v-bind:value="p.id"
                  v-bind:key="p.id"
                >{{ p.nombre }}</option>
              </select>

               <label for="selectFormaPago">
                Tipo Pago
                <span class="text-danger">*</span>
              </label>
              <select
                id="selectFormaPago"
                v-model="gasto.co_forma_pago"
                class="form-control"
                placeholder="Forma Pago"
                name="co_forma_pago"
                required                
              >
                <option
                  id="selectFormaPago"
                  v-for="p in listaFormasPago"
                  v-bind:value="p.id"
                  v-bind:key="p.id"
                >{{ p.nombre }}</option>
              </select>
              
              <div class="form-group">
                <label for="inputGasto">Gasto</label>
                <input
                  id="inputGasto"
                  type="text"
                  v-model="gasto.gasto"
                  class="form-control"
                  placeholder="Gasto"
                />
              </div>

              <div class="form-group">
                <label for="inputObservaciones">Observaciones</label>
                <input
                  id="inputObservaciones"
                  type="text"
                  v-model="gasto.observaciones"
                  class="form-control"
                  placeholder="Escriba alguna observación importante"
                >
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-lg btn-primary" v-on:click="guardarGasto()">Guardar</button>
              <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </form>


     <!-- MODAL PARA eliminar Gasto -->
    <form>
      <div
        id="modal_eliminar"
        class="modal"
        tabindex="-1"
        data-keyboard="false"
        data-backdrop="static"
        role="dialog"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Confirmar eliminar Gasto</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body text-left">
              {{mensaje}}
              ¿Confirma eliminar el gasto ?
            </div>
            <div class="modal-footer">
              <button class="btn btn-lg btn-danger" v-on:click="confirmarEliminar()">Eliminar</button>
              <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </form>


  </div>
</template>

<script src="../controller/GastosController.js"></script>


<style scoped>
.tachado {
  text-decoration: line-through;
}
</style>
