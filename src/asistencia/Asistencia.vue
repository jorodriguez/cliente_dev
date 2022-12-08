<template>
  <div class="asistencia">
    <h1>Entrada de Alumnos</h1>
    <small>{{usuarioSesion.nombre_sucursal}}</small> 
    <!--<span>{{this.mensaje}}</span>-->
    <div class="row">
      <div class="col-1">
        <router-link to="/principal" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>
      <div class="col-11 text-right">
        <router-link to="/ReporteAsistencias" class="btn btn-lg btn-outline-primary">Asistencias por fecha</router-link>
        <router-link
          to="/ReporteAsistenciasSucursalMes"
          class="btn btn-lg btn-outline-primary"
        >Faltas del Mes</router-link>
      </div>
    </div>
    <!--<h3>ENTRADA</h3>-->
    <div class="row m-1">
      <button
        type="button"
        class="btn btn-success btn-block"
        :disabled="loaderEntrada || loaderPorRecibir"
        v-on:click="registrarEntrada()"
      > 
       <span v-if="loaderEntrada">
           <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> Registrando entrada...
       </span>        
       <span v-else>Confirmar Entrada </span>
       </button>
    </div>
    <!--<div class="container jumbotron m-1">-->
    <div class="card border" style="background-color:#E9E9E9;">
      <p>Alumnos seleccionados</p>
      <div class="card-body">
        <div class="row">
          <div
            v-for="item in listaSeleccion"
            v-bind:key="item.id"
            class="d-flex flex-wrap align-content-center"
          >
            <ItemCapsulaAlumno
              :texto="item.nombre"
              :foto="item.foto"
              :color="item.color"
              :seleccion="removeToList"
              :value="item"              
            >
              <span slot="cuerpo">
                    <span v-if="item.cat_tipo_cobranza == 2">
                      <small>
                        <i class="fas fa-clock"></i>
                      </small>
                        <span >{{item.tiempo_saldo}} {{item.tiempo_saldo == 1 ? 'hr':'hrs'}} </span>                  
                    </span>                  

                    <span class="badge badge-pill badge-danger">x</span>
               </span>

            </ItemCapsulaAlumno>
          </div>
        </div>
      </div>
    </div>
    <div class="border" />
    <div class="border" />
    <div class="border" />
    <!--<div class="container jumbotron m-1">-->    
    <div class="card " style="background-color:#E9E9E9;">            
      <h4><strong>{{grupoSeleccionado.nombre}}</strong></h4>
      <div >
        <span
          :style="grupoDefault.color != null ? 'background-color:'+grupoDefault.color: ''"
          class="badge badge-pill"
          v-on:click="filtrarAlumnosPorGrupo(grupoDefault)"
        >Todos</span>      
        <a                    
          :style="grupoItem.color != null ? 'background-color:'+grupoItem.color: ''"
          :class="grupoItem.color != null ? 'badge badge-pill':'badge badge-pill badge-info' "
          v-for="grupoItem in listaFiltroGrupos"
          v-bind:key="grupoItem.id"
          v-on:click="filtrarAlumnosPorGrupo(grupoItem)"
        >{{grupoItem.nombre}}</a>
      </div>
    </div>

    <div class="card border" style="background-color:#E9E9E9;">     
      
      <div class="card-body" style="background-color:#E9E9E9;">
        <!--<p>Seleccione para registrar entrada</p>-->
        <div v-if="loaderPorRecibir" class="d-flex justify-content-center">
            <div class="spinner-border text-success" role="status">
              <span class="sr-only">Espere...</span>
            </div>
        </div>
        <div class="row">                 
        
       
          <div v-for="item in lista" v-bind:key="item.id">
            <div v-if="item.visible" class="d-flex align-content-center flex-wrap">
              <ItemCapsulaAlumno
                :texto="item.nombre"
                :foto="item.foto"
                :color="item.color"
                :seleccion="addToList"
                :value="item"
              >
                <span slot="cuerpo">                    
                    <span v-if="item.cat_tipo_cobranza == 2">
                      <small>
                        <i class="fas fa-clock"></i>
                      </small>
                        <span >{{item.tiempo_saldo}} {{item.tiempo_saldo == 1 ? 'hr':'hrs'}} </span>                  
                    </span>
                </span>
              </ItemCapsulaAlumno>
            </div>
          </div>      
        </div>
        
      </div>
    </div>
    <div class="row m-1">
     <button
        type="button"
        class="btn btn-success btn-block"
        :disabled="loaderEntrada || loaderPorRecibir"
        v-on:click="registrarEntrada()"
      > 
       <span v-if="loaderEntrada">
           <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"/> Registrando entrada...
       </span>        
       <span v-else>Confirmar Entrada </span>
       </button>
    </div>
  </div>
</template>


<script src="../controller/AsistenciaController.js"></script>

<style scoped>
</style>
