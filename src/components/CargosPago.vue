<template>
  <div id="id_tabla_cargos" class="container">
         <button
                          type="button"
                          class="btn btn-success"                          
                          v-on:click="iniciarAgregarCargo()"
                        >
           Agregar cargo
      </button>
       <table class="table">
        <thead>
          <th>Fecha</th>
          <th>Concepto</th>                         
          <th>$</th>                         
          <th></th>          
        </thead>
        <tr v-for="row in listaCargosAlumnos" :key="row.id">
            <td><span class="small">{{row.fecha | moment("DD-MMM-YY")}}</span></td>
            <td><span class="small">{{row.nombre_cargo}}</span></td>
            <td><strong><span class="small text-danger">${{row.total}}</span></strong></td>
            <td>{{row.tipo}}</td>            
        </tr>        
       </table>


   <!-- MODAL PARA AGREGAR FAMILIAR -->
     <!-- <form>
        <div id="modal_familiar" class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Registro de Familiar</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body text-left">
                {{mensaje}}
                <div class="form-group" v-if="operacion == 'INSERT'">
                  <label for="selectParentescoFamiliar">
                    Parentesco
                    <span class="text-danger">*</span>
                  </label>
                  <select
                    v-model="familiar.co_parentesco"
                    class="form-control"
                    placeholder="Parentesco"
                    required
                    autofocus
                  >
                    <option
                      id="selectParentesco"
                      v-for="p in listaParentesco"
                      v-bind:value="p.id"
                      v-bind:key="p.id"
                    >{{ p.nombre }}</option>
                  </select>
                </div>                

                <div class="form-group">
                  <label for="inputNombreFamiliar">
                    Nombre
                    <span class="text-danger">*</span>
                  </label>
                  <input
                    id="inputNombreFamiliar"
                    type="text"
                    v-model="familiar.nombre"
                    class="form-control"
                    placeholder="Nombre"
                    required
                  >
                </div>
                               
                <div class="form-group">
                  <label for="inputCargo">Correo</label>
                  <input
                    id="inputCargo"
                    type="text"
                    v-model="cargo"
                    class="form-control"
                    placeholder="Correo"
                  >
                </div>
              </div>
              <div class="modal-footer">                
                <button class="btn btn-lg btn-primary" v-on:click="agregarFamiliar()">Guardar</button>                
                <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </form>-->

  </div>    
</template>

<script src="../controller/CargosPagosController.js"></script>

<style scoped>

</style>
