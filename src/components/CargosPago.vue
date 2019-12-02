<template>
  <div id="id_tabla_cargos">
    <p
      v-if="requiere_factura"
      class="text-right text-success small"
    >* Este alumno requiere de facturación.</p>
    <div class="row">
      <div class="col text-left">
        <div class="btn-group">
          <button
            type="button"
            class="btn btn-success"
            v-on:click="iniciarAgregarCargo()"
          >Agregar Cargo</button>
          <button
            type="button"
            v-on:click="iniciarEliminacionCargo()"
            class="btn btn-danger"
            title="Eliminar cargo(s) selecionado(s)"
          >Eliminar Cargo</button>
        </div>
      </div>
      <div class="col text-right">
        <div class="btn-group">
          <button
            type="button"
            v-on:click="iniciarAgregarPago()"
            class="btn btn-success"
          >Efectuar Pago</button>
        </div>
      </div>
    </div>

    <table class="table">
      <thead>
        <th>
          <input
            type="checkbox"
            id="checkboxSeleccionarTodo"
            v-model="seleccionTodos"
            v-on:change="seleccionarTodoPagos()"
          />
        </th>
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
            <input type="checkbox" id="checkbox" v-model="row.checked" v-if="!row.pagado" />
            <i v-else class="text-success font-weight-normal">¡Pagado!</i>
          </td>
          <td>
            <span class="small">{{row.fecha | moment("DD-MMM-YY")}}</span>
          </td>
          <td>
            <button v-on:click="verDetalleCargo(row)" type="button" class="btn btn-link">
              <span
                v-if="!row.pagado"
                class="small"
              >{{row.cantidad > 1 ? row.cantidad:""}} {{row.nombre_cargo}}{{row.cantidad > 1 ? "s":""}}</span>
              <span
                v-else-if="row.pagado"
                class="small tachado"
              >{{row.cantidad}} {{row.nombre_cargo}}</span>
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
          <td style="width: 180px;">
            <span class="d-inline-block small" style="width: 100%;" :title="row.nota">{{row.nota}}</span>
            <!--<span
              class="d-inline-block text-truncate small"
              style="width: 120px;"
              :title="row.nota"
            >{{row.nota}}</span>-->
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <!-- MODAL PARA AGREGAR CARGO -->

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
            <div class="form-group">
              <label for="selectTipoCargo">
                Cargo
                <span class="text-danger">*</span>
              </label>
              <select
                v-model="cargo.cat_cargo"
                class="form-control"
                placeholder="Cargo"
                @change="onChangeCargo()"
                required
                autofocus
              >
                <option
                  id="selectCargo"
                  v-for="p in listaCargos"
                  v-bind:value="p"
                  v-bind:key="p.id"
                >{{ p.nombre }}</option>
              </select>
            </div>
            <div
              class="form-group"
              v-if="cargo.cat_cargo.id != -1 && cargo.cat_cargo.seleccionar_fecha"
            >
              <label for="inputMensualidadCargo">
                Seleccione el Mes correspondiente al cargo
                <span class="text-danger">*</span>
              </label>
              <select
                v-model="cargo.fecha_cargo"
                class="form-control"
                placeholder="Cargo"
                @change="onChangeMensualidad()"
              >
                <option
                  id="selectMesAdeuda"
                  v-for="p in listaMesesAdeuda"
                  v-bind:value="p"
                  v-bind:key="p.fecha"
                >
                  <span :class="p.cargo_registrado ? 'text-muted':''">{{ p.nombre_mes }}</span>
                </option>
              </select>
            </div>

            <div
              class="form-group"
              v-if="cargo.cat_cargo.id != -1 &&  cargo.cat_cargo.escribir_cantidad"
            >
              <label for="inputCargo">
                Cantidad
                <span class="text-danger">*</span>
              </label>
              <input
                id="inputCargo"
                type="number"
                v-model="cargo.cantidad"
                class="form-control"
                placeholder="Cantidad"
                min="1"
                max="999"
                @change="calcularTotalCargo()"
                maxlength="3"
              />
            </div>

            <div class="form-group" v-if="cargo.cat_cargo.id != -1">
              <label for="inputMonto">
                Monto $
                <span class="text-danger">*</span>
              </label>
              <input
                id="inputMonto"
                type="number"
                v-model="cargo.monto"
                class="form-control"
                :disabled="!cargo.cat_cargo.escribir_monto"
                placeholder="Monto"
                min="1"
                @change="calcularTotalCargo()"
                maxlength="6"
              />
            </div>
            <div class="form-group">
              <label for="inputNota">Nota</label>
              <input
                id="inputNota"
                type="text"
                v-model="cargo.nota"
                class="form-control"
                placeholder="Escriba una nota"
              />
            </div>
            <!--  <div class="row">
              <div class="col col-md-8 text-right">
                <span class="h4 text-secondary">{{cargo.cantidad}} X</span>
              </div>
              <div class="col col-md-3 text-secondary bg-ligth">
                <strong>
                  <span class="h4">{{formatPrice(cargo.monto)}}</span>
                </strong>
              </div>
            </div>
          <div class="row">
              <div class="col col-md-8 text-right">
                <span class="h4">Total</span>
              </div>
              <div class="col col-md-3 bg-danger">
                <strong>
                  <span class="h4 text-white">{{formatPrice(cargo.total_cargo)}}</span>
                </strong>
              </div>
            </div>-->
          </div>

          <div class="modal-footer">
            <button class="btn btn-lg btn-primary" v-on:click="guardarCargo()">Guardar</button>
            <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGO -->

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
            <p>
              <span class="text-danger">{{mensaje}}</span>
            </p>

            <label for="selectFormaPago">
              Forma de Pago
              <span class="text-danger">*</span>
            </label>
            <select
              v-model="pago.cat_forma_pago"
              class="form-control"
              placeholder="Forma pago"
              required
              autofocus
            >
              <option
                id="selectFormaPago"
                v-for="p in listaFormasPago"
                v-bind:value="p"
                v-bind:key="p.id"
              >{{ p.nombre }} - ({{p.descripcion}})</option>
            </select>

            <div
              class="form-group"
              v-if="pago.cat_forma_pago.permite_factura && existen_montos_facturables"
            >
              <div class="form-check">
                <input
                  type="checkbox"
                  id="checkboxFacturado"
                  v-model="escribir_folio_factura"
                  name="facturado"
                />
                <label class="form-check-label" for="checkboxFacturado">
                  Facturado
                  <span class="text-muted">| Escribir folio de factura</span>
                </label>
              </div>
            </div>

            <div
              class="form-row"
              v-if="pago.cat_forma_pago.permite_factura && existen_montos_facturables && escribir_folio_factura"
            >
              <span
                v-if="!requiere_factura"
                class="text-danger"
              >* No estan activos los datos de facturación, vaya a la pestaña facturación para habilitarlos ó escribirlos.</span>
              <div class="col-md-6" v-if="requiere_factura">
                <label for="inputIdentificadorFactura">Folio de factura</label>
                <input
                  id="inputIdentificadorFactura"
                  type="text"
                  v-model="pago.identificador_factura"
                  class="form-control font-weight-bold text-primary"
                  placeholder="Folio de factura"
                />
              </div>
              <div class="col-md-6" v-if="requiere_factura">
                <label for="inputNotaPago">Nota</label>
                <input
                  id="inputNotaPago"
                  type="text"
                  v-model="pago.nota_pago"
                  class="form-control"
                  placeholder="Nota "
                />
              </div>
            </div>

            <table class="table">
              <thead>
                <th>Concepto</th>
                <th>Pago</th>
                <th>Adeuda</th>
                <!--<th>Pagado</th>-->
                <!--<th>Nota</th>-->
              </thead>
              <tbody v-for="row in listaCargosAlumnos" :key="row.id">
                <tr v-if="row.checked" :class="row.es_facturable ? 'bg-info text-white':''">
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
                    />
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
                <tr>
                  <td>
                    <strong>Cargos :</strong>
                  </td>
                  <td class="text-danger">
                    <strong>${{total_cargos}}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Pago :</strong>
                  </td>
                  <td class="text-success">
                    <strong>${{pago.pago_total}}</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Resta :</strong>
                  </td>
                  <td class="text-danger">
                    <strong>${{total_cargos - pago.pago_total }}</strong>
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-lg btn-primary" v-on:click="guardarPago()">Pagar</button>
            <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

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
                <td>
                  <strong>Fecha</strong>
                </td>
                <td>{{cargoSeleccionado.fecha | moment("DD-MMM-YY h:mm:ss a")}}</td>
              </tr>
              <tr>
                <td>
                  <strong>Concepto</strong>
                </td>
                <td>
                  <span
                    v-if="!cargoSeleccionado.pagado"
                  >{{cargoSeleccionado.cantidad > 1 ? cargoSeleccionado.cantidad:""}} {{cargoSeleccionado.nombre_cargo}}{{cargoSeleccionado.cantidad > 1 ? "s":""}}</span>
                  <span
                    v-else-if="cargoSeleccionado.pagado"
                    class="tachado"
                  >{{cargoSeleccionado.cantidad}} {{cargoSeleccionado.nombre_cargo}}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <label class="font-weight-bold text-danger">${{cargoSeleccionado.total}}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Pagado</strong>
                </td>
                <td>
                  <label class="font-weight-bold text-success">$ {{cargoSeleccionado.total_pagado}}</label>
                  <i v-if="cargoSeleccionado.pagado" class="fas fa-check-circle text-success"></i>
                  <i v-else class="fas fa-check-circle text-secondary"></i>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Nota</strong>
                </td>
                <td>
                  <textarea v-model="cargoSeleccionado.nota" disabled class="form-control"></textarea>
                </td>
              </tr>
            </table>
            <div class="text-center">
              <p>Pagos Realizados</p>
            </div>
            <div class="row">
              <table class="table">
                <thead>
                  <th>Fecha</th>
                  <th>Pago</th>
                  <th>Forma de Pago</th>
                  <th>Factura</th>
                </thead>
                <tbody v-for="row in listaPagosCargo" :key="row.id">
                  <tr>
                    <td>
                      <label>{{row.fecha | moment("DD-MMM-YY h:mm:ss a")}}</label>
                    </td>
                    <td>
                      <label class="font-weight-bold text-success">${{row.pago}}</label>
                    </td>
                    <td>
                      <label class="font-weight-bold text-info">{{row.nombre_forma_pago}}</label>
                    </td>
                    <td>{{row.identificador_factura}}</td>
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
            <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
    <!-- DETALLE CARGO -->

    <!-- ELIMINAR CARGO -->
    <Popup id="eliminarCargoAlumno" show_button_close="true">
      <div slot="header">Eliminar cargo</div>
      <div slot="content">
        {{mensaje}}
        <div class="row">
          <div class="container">
            <label>
              motivo
              <span class="text-danger">*</span>
            </label>
            <textarea v-model="motivo_eliminacion" class="form-control" required></textarea>
          </div>
        </div>
      </div>
      <div slot="footer">
        <button v-on:click="confirmarEliminacion()" class="btn btn-danger">Eliminar</button>
      </div>
    </Popup>
    <!-- ELIMINAR CARGO -->
  </div>
</template>

<script src="../controller/CargosPagosController.js"></script>


<style scoped>
.tachado {
  text-decoration: line-through;
}
</style>
