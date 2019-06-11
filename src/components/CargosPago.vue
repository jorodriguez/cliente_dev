<template>
  <div id="id_tabla_cargos" class="container">
    <button type="button" class="btn btn-success" v-on:click="iniciarAgregarCargo()">Agregar cargo</button>
    <table class="table">
      <thead>
        <th>Fecha</th>
        <th>Concepto</th>
        <th>$</th>
        <th></th>
      </thead>
      <tr v-for="row in listaCargosAlumnos" :key="row.id">
        <td>
          <span class="small">{{row.fecha | moment("DD-MMM-YY")}}</span>
        </td>
        <td>
          <span class="small">{{row.nombre_cargo}}</span>
        </td>
        <td>
          <strong>
            <span class="small text-danger">${{row.total}}</span>
          </strong>
        </td>
        <td>{{row.tipo}}</td>
      </tr>
    </table>

    <!-- MODAL PARA AGREGAR FAMILIAR -->
    <form>
        <div id="modal_cargo" class="modal" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Agregar Cargo</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>

              <div class="modal-body text-left">
                  {{mensaje}}
                  <label for="selectTipoCargo">
                    Cargo
                    <span class="text-danger">*</span>
                  </label>
                  <select
                    v-model="cargo.cat_cargo"
                    class="form-control"
                    placeholder="Cargo"
                    required
                    autofocus
                  >
                    <option
                      id="selectCargo"
                      v-for="p in listaCargos"
                      v-bind:value="p.id"
                      v-bind:key="p.id"
                    >{{ p.nombre }}</option>
                  </select>                                  
                               
                <div class="form-group">
                  <label for="inputCargo">Cantidad <span class="text-danger"> *</span></label>
                  <input
                    id="inputCargo"
                    type="text"
                    v-model="cargo.cantidad"
                    class="form-control"
                    placeholder="Cantidad"
                  >
                </div>
                 <div class="form-group">
                  <label for="inputNota">Nota</label>
                  <input
                    id="inputNota"
                    type="text"
                    v-model="cargo.nota"
                    class="form-control"
                    placeholder="Escriba una nota"
                  >
                </div>
              </div>
              <div class="modal-footer">                
                <button class="btn btn-lg btn-primary" v-on:click="guardarCargo()">Guardar</button>                
                <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
    </form>
  </div>
</template>

<script src="../controller/CargosPagosController.js"></script>

<style scoped>
</style>
