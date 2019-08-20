<template>
  <div class="cambiar_sucursal">
    <h1>Cambiar Alumno de Sucursal</h1>(
    <small>{{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}</small>)
    <div class="text-left">      
       <router-link :to="{ name: 'CatAlumno', params: {} }" class="btn btn-secondary btn-lg">
            <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
    </div>
    <br />
    <div class="text-danger">{{mensaje}}</div>
    <div class="card">
      <div class="card-body">
        <table class="table table-dashed text-left">
          <tr>
            <td>Alumno</td>
            <td><strong>{{alumno.nombre }} {{alumno.apellidos}}</strong> </td>
          </tr>
          <tr>
            <td>Grupo</td>
            <td><strong>{{alumno.nombre_grupo}} </strong> </td>
          </tr>
          <tr>
            <td>Sucursal actual</td>
            <td> <strong> {{alumno.nombre_sucursal}}</strong></td>
          </tr>
          <tr>
            <td><strong>Cambiar a la sucursal <span class="text-danger">*</span> </strong></td>
            <td>
              <select id="id_sucursal_destino" v-model="sucursal_seleccionada" class="form-control form-control-lg" required >
                <option
                  v-for="suc in listaSucursal"
                  v-bind:value="suc"
                  v-bind:key="suc.id"
                ><strong> {{ suc.nombre }}</strong></option>
              </select>              
            </td>
          </tr>
        </table>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        v-on:click="iniciarCambioSucursal()"
        data-dismiss="modal"
      >Cambiar de sucursal</button>
    </div>

    <!-- Confirmar cambio de sucursal -->
    <div
      id="modal_confirmar_cambio_sucursal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      data-keyboard="false"
      data-backdrop="static"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Confirmar cambio de sucursal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              ¿Confirma que desea realizar el cambio de sucursal ?              
            </p>
            <p><strong> Alumno(a) <span class="text-info">{{alumno.nombre}} {{alumno.apellidos}} </span></strong></p>
            <div class="row">
              <div class="col">
                <h5>{{alumno.nombre_sucursal}}</h5> 
              </div>
              <div class="col">
                <i  class="fas fa-arrow-right fa-3x text-primary"></i>
              </div>
              <div class="col">
                <h5>{{sucursal_seleccionada.nombre}}</h5>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success"
              v-on:click="confirmarCambioSucursal()"
              data-dismiss="modal"
            >Confirmar cambio</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>

    <div
      id="modal_mensaje"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      data-keyboard="false"
      data-backdrop="static"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Cambio de sucursal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              {{mensaje}}              
            </p>
            <p>de {{alumno.nombre_sucursal}} a {{sucursal_seleccionada.nombre}}</p>            
          </div>
          <div class="modal-footer">
            <router-link :to="{ name: 'CatAlumno', params: {} }" class="btn btn-primary"
                        data-dismiss="modal"
            >
            Cerrar
          </router-link>            
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script src="../controller/CambiarSucursalController.js" >
</script>

<style scoped>
</style>
