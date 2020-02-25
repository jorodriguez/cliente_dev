<template>
  <div id="id_gastos" >
    <h1>Gastos</h1>
    <div class="row">
      <div class="col-auto mr-auto">
      <router-link to="/principal" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
      </router-link>
      <button type="button" class="btn btn-primary btn-lg" v-on:click="iniciarAgregarGasto()">Nuevo</button>
      </div>
      <div class="col-auto ">
         <select v-model="mes_seleccionado" class="form-control" placeholder="Mes" 
                v-on:change="verDetalleMesSeleccionado()">
                  <option
                    v-for="mes in listaGastosMensuales"
                    v-bind:value="mes"
                    v-bind:key="mes.mes_anio"
                  >{{ mes.mes_anio }} <strong><span class="text-danger">(${{ mes.suma }})</span> </strong> </option>
                </select>
      </div>
    </div>
    
    <br>   
    <!--<vue-good-table
      :columns="columns"
       :rows="listaGastos"/>
   -->
   <form>
    <table class="table">
      <thead>        
        <th>Fecha</th>
        <th>Gasto</th>
        <th>Tipo de Pago</th>
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
              <span class="small font-weight-bold">{{row.nombre_tipo_pago}}</span>
            </strong>
          </td>      
          <td>
            ${{row.gasto}}
          </td>   
          <td>
            <span
              class="d-inline-block text-truncate small"
              style="max-width: 120px;"
              :title="row.observaciones"
            >{{row.observaciones}}</span>
          </td>
          <td>
             <button type="button" class="btn btn-danger btn-sm" v-on:click="seleccionarGasto(row,'DELETE')">
               <i class="fas fa-trash-alt"></i>
             </button>
          </td>
        </tr>
      </tbody>
    </table>
    </form>

    <!-- MODAL PARA AGREGAR Gasto -->
   
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
              <!--<p class="text-danger">{{mensaje}}</p>-->
              
              <label>
                  Fecha 
                  <span class="text-danger">*</span>
                </label>                
                <datepicker
                  name="fecha"
                  v-model="gasto.fecha"
                  :open-date="new Date()"
                  input-class="form-control"
                  :disabledDates="disabledDates"
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
                <textarea 
                  v-model="gasto.observaciones"
                  class="form-control"
                 placeholder="Observaciones">

                </textarea>
                <!--<input
                  id="inputObservaciones"
                  type="text"
                  v-model="gasto.observaciones"
                  class="form-control"
                  placeholder="Escriba alguna observación importante"
                >-->
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-lg btn-primary" v-on:click="guardarGasto()">Guardar</button>
              <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    


     <!-- MODAL PARA eliminar Gasto -->
   
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
              ¿Confirma eliminar el gasto de <strong>{{gasto.nombre_tipo_gasto}}</strong> del <strong>{{gasto.fecha | moment("DD-MMM-YY")}}</strong> por $<strong>{{gasto.gasto}}</strong>?
            </div>
            <div class="modal-footer">
              <button class="btn btn-lg btn-danger" v-on:click="confirmarEliminar()">Eliminar</button>
              <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
   


  </div>
</template>

<script src="../controller/GastosController.js"></script>


<style scoped>
.tachado {
  text-decoration: line-through;
}
</style>
