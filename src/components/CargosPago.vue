<template>
  <div id="id_tabla_cargos">
    <br>
    <div class="row">
      <div class="col text-left">
        <button
          type="button"
          class="btn btn-danger"
          v-on:click="iniciarAgregarCargo()"
        >Agregar Cargo</button>
      </div>
      <div class="col text-right">
        <div class="btn-group">
          <button
            type="button"
            v-on:click="iniciarAgregarPago()"
            class="btn btn-success"
          >Agregar Pago</button>
          <!--<button
            type="button"
            class="btn btn-success dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
          ></button>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Ver Pagos</a>
            <a class="dropdown-item" href="#">Administrar</a>
          </div>-->
        </div>
      </div>
    </div>
    <!--
    <div class="row text-center">
      <div class="col">
        <a
          class="btn btn-link small text-center"
          data-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >Filtro</a>
        <div class="collapse" id="collapseExample">
          <div class="card card-body">
            Pagado :
            Filas : 20
            <button
              type="button"
              class="btn btn-link"
            >Actualizar Tabla</button>
          </div>
        </div>
      </div>
    </div>
  -->
    <table class="table">
      <thead>
        <th>-</th>
        <th>Fecha</th>
        <th>Concepto</th>
        <th>Adeuda</th>
        <th>Pagado</th>
        <th>Nota</th>
        <th></th>
      </thead>
      <tbody v-for="row in listaCargosAlumnos" :key="row.id">
        <tr>
          <td>
            <input type="checkbox" id="checkbox" v-model="row.checked" v-if="!row.pagado">
            <i v-else class="text-success font-weight-normal">¡Pagado!</i>
          </td>
          <td>
            <span class="small">{{row.fecha | moment("DD-MMM-YY")}}</span>
          </td>
          <td>
            <button v-on:click="verDetalleCargo(row)" type="button" class="btn btn-link">
              <span v-if="!row.pagado" class="small">{{row.nombre_cargo}}</span>
              <span v-else-if="row.pagado" class="small tachado">{{row.nombre_cargo}}</span>
            </button>
          </td>
          <td>
            <strong>
              <span class="small font-weight-bold text-danger">${{row.total}}</span>
            </strong>
          </td>
          <td>
            <strong>
              <span class="small font-weight-bold text-success">${{row.total_pagado}}</span>
            </strong>
          </td>
          <td>
            <span class="d-inline-block text-truncate" style="max-width: 120px;">{{row.nota}}</span>
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL PARA AGREGAR CARGO -->
    <form>
      <div
        id="modal_cargo"
        class="modal"
        tabindex="-1"
        data-keyboard="false"
        data-backdrop="static"
        role="dialog"
      >
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
              <!--
              <div class="form-group">
                <label for="inputCargo">
                  Cantidad
                  <span class="text-danger">*</span>
                </label>
                <input
                  id="inputCargo"
                  type="text"
                  v-model="cargo.cantidad"
                  class="form-control"
                  placeholder="Cantidad"
                >
              </div>-->
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

    <!-- PAGO -->
    <form>
      <div
        id="modal_pago"
        class="modal"
        tabindex="-1"
        data-keyboard="false"
        data-backdrop="static"
        role="dialog"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Agregar Pago</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div class="modal-body text-left">
              <span class="text-danger"> {{mensaje}}</span>
              <table class="table">
                <thead>
                  <th>-</th>
                  <th>Concepto</th>
                  <th>Pago</th>
                  <th>Adeuda</th>
                  <!--<th>Pagado</th>-->
                  <!--<th>Nota</th>-->
                </thead>
                <tbody v-for="row in listaCargosAlumnos" :key="row.id">
                  <tr v-if="row.checked">
                    <td>
                      <input type="checkbox" id="checkbox" v-model="row.checked">
                    </td>
                    <td>
                      <span class="small">{{row.nombre_cargo}}</span>
                    </td>
                    <td>
                      <input
                        id="inputAbono"
                        type="number"
                        @change="reacalcularTotales"
                        v-model="row.pago"
                        class="form-control font-weight-bold text-success"
                        placeholder="Pago"
                        required
                      >
                    </td>
                    <td>
                      <strong>
                        <span class="font-weight-bold text-danger">${{row.total}}</span>
                      </strong>
                    </td>
                    <!--<td>
                      <strong>
                        <span class="small">${{row.total_pagado}}</span>
                      </strong>
                    </td>-->
                    <!--<td>
                      <input
                        id="inputNota"
                        type="text"
                        v-model="row.nota_pago"
                        class="form-control"
                        placeholder="Nota"
                      >
                    </td>-->
                  </tr>
                </tbody>
              </table>
              <div class="row float-right p-3 mb-2 bg-light text-dark">
                <table>
                  <tr><td ><strong>Cargos : </strong></td><td class="text-danger"><strong>${{total_cargos}}</strong></td></tr>
                  <tr ><td><strong>Pago : </strong></td><td class="text-success"><strong>${{pago.pago_total}}</strong></td></tr>                  
                  <tr ><td><strong>Resta : </strong></td><td class="text-danger"><strong>${{total_cargos - pago.pago_total  }}</strong></td></tr>                  
                </table>                                  
              </div>
            </div>

            <div class="modal-footer">
              <button class="btn btn-lg btn-primary" v-on:click="guardarPago()">Guardar</button>
              <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <!-- DETALLE CARGO -->
    <div
      id="modal_detalle_cargo"
      class="modal"
      tabindex="-1"
      data-keyboard="false"
      data-backdrop="static"
      role="dialog"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Detalle del cargo</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body text-left">
            <table class="table">
              <tr>
                <td>Fecha</td>
                <td>{{cargoSeleccionado.fecha | moment("DD-MMM-YY h:mm:ss a")}}</td>
              </tr>
              <tr>
                <td>Cargo</td>
                <td>
                  <label class="font-weight-bold text-danger">${{cargoSeleccionado.cargo}}</label>
                </td>
              </tr>
              <tr>
                <td>Pagado</td>
                <td>
                  <label class="font-weight-bold text-success">$ {{cargoSeleccionado.total_pagado}}</label>
                  <i v-if="cargoSeleccionado.pagado" class="fas fa-check-circle text-success"></i>
                  <i v-else class="fas fa-check-circle text-secondary"></i>
                </td>
              </tr>
              <!--
              <tr>
                <td>Nota</td>
                <td>
                  <textarea v-model="cargoSeleccionado.nota" disabled class="form-control "></textarea>
                </td>
              </tr>
              -->
            </table>
            <span class="text-center">Pagos Realizados</span>
            <div class="row">
              <table class="table">
                <thead>
                  <th>Fecha</th>
                  <th>Pago</th>
                  <!--<th>Nota</th>-->
                </thead>
                <tbody v-for="row in listaPagosCargo" :key="row.id">
                  <tr>
                    <td>
                      <label>{{row.fecha | moment("DD-MMM-YY h:mm:ss a")}}</label>
                    </td>
                    <td>
                      <label class="font-weight-bold text-success">${{row.pago}}</label>
                    </td>
                    <!--<td>
                      <input
                        type="text"
                        v-model="row.nota"
                        disabled
                        class="form-control"
                        placeholder="Sin nota"
                      >
                    </td>-->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-lg btn-primary" v-on:click="guardarPago()">Guardar</button>
            <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- DETALLE CARGO -->
  </div>
</template>

<script src="../controller/CargosPagosController.js"></script>

<style scoped>
.tachado {
  text-decoration: line-through;
}
</style>
