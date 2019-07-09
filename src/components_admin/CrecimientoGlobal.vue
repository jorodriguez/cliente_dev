<template>
  <div class="crecimiento-global">
    <h1>Crecimiento Global</h1>
    <small class="font-weight-bold h6">
      {{usuarioSesion.nombre}} {{usuarioSesion.nombre_sucursal}}
      <button
        type="button"
        class="btn btn-sm btn-warning"
        v-on:click="signout()"
      >
        <i class="fas fa-power-off" v-on:click="signout()"></i>
      </button>
    </small>
    <div class="row text-left">
      <div class="col">
        <router-link :to="{ name: 'ReporteDeudas', params: {} }" class="btn btn-secondary btn-lg">
            <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>          
      </div>
    </div>
    <br>

    <span
      class="text-info"
    >Las cantidades son las que se escriben en el registro del alumno, no son los cargos realizados.</span>
    <div class="table-responsive table-striped">
      <table class="table table-hover">
        <thead>
          <th>Mes</th>
          <th>Alumnos</th>
          <th>Suma Colegiaturas</th>
          <th>Suma Inscripciones</th>
          <th>Suma Total</th>
        </thead>
        <tbody>
          <tr
            v-for="row in listaCrecimientoGlobal"
            :key="row.id"
            class="border"
            v-bind:class="row.count_alumno == 0 ? 'text-danger':''"
          >
            <td>{{row.mes_anio}}</td>
            <td>              
              <a
                href="#"
                v-on:click="verAlumnosMes(row)"
                v-bind:class="row.count_alumno == 0 ? 'badge badge-pill badge-danger text-white' : 'badge badge-pill badge-primary text-white'"
              >{{row.count_alumno}}</a>
               <span class="text-danger">{{row.adeuda ? '*':''}}</span>
            </td>
            <td>$ {{formatPrice(row.suma_colegiaturas)}}</td>
            <td>$ {{formatPrice(row.suma_inscripciones)}}</td>
            <td>$ {{formatPrice(row.suma_total)}}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!--- Detalle -->

    <div id="modal_alumnos" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">({{mes_seleccionado.count_alumno}}) Alumnos en <strong>{{mes_seleccionado.mes_anio}}</strong>  </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <th></th>
                  <th>Nombre</th>
                  <th class="hidden-xs">Apellidos</th>                  
                  <th>Inscripción</th>
                  <th>Colegiatura</th>
                  <th>Sucursal</th>                  
                </thead>
                <tbody >
                  <tr v-for="row in listaNuevosAlumno" :key="row.id" class="text-left">
                    <td>
                      <img
                        src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                        width="50"
                        height="50"
                        alt="..."                        
                        class="rounded-circle"                              
                      >
                    </td>
                    <td >
                      <!--<button
                        type="button"
                        class="btn btn-link"
                        title="Ver datos del alumno"                        
                      >-->
                        <span :style="{'color':row.class_color}"> {{ row.nombre }}</span>
                        <sup
                          v-if="row.nuevo_ingreso"
                          class="badge badge-pill badge-warning"
                        >
                          <i>Nuevo Ingreso</i>
                        </sup>                        
                      <!--</button>-->
                    </td>

                    <td class="hidden-xs">{{ row.apellidos }}</td>

                    <td>
                      <small>{{row.fecha_inscripcion | moment("DD-MMM-YYYY")}}</small>
                    </td>

                    <td class="text-center">
                      ${{formatPrice(row.costo_colegiatura)}}
                    </td>                    
                    <td>                      
                      <small :style="{'background-color':row.class_color}" class="badge badge-pill text-white"   >{{row.nombre_sucursal}}</small>                      
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detalle -->
  </div>
</template>

<script src="../controller/ReporteCrecimientoGlobalController.js" >
</script>
