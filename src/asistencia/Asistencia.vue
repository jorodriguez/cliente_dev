<template>
  <div class="asistencia container">
    <h1>Entrada de Alumnos</h1>
    <span>{{this.mensaje}}</span>
    <div class="row">
      <div class="col-1">
        <router-link to="/principal" class="btn btn-secondary btn-lg">
          <i class="fas fa-arrow-circle-left text-gray"></i>
        </router-link>
      </div>
      <div class="col-11 text-right">
        <router-link to="/ReporteAsistencias" class="btn btn-lg btn-primary">Asistencias por fecha</router-link>
        <router-link
          to="/ReporteAsistenciasSucursalMes"
          class="btn btn-lg btn-primary"
        >Faltas del Mes</router-link>
      </div>
    </div>
    <!--<h3>ENTRADA</h3>-->
    <div class="row m-1">
      <button
        type="button"
        class="btn btn-success btn-block"
        v-on:click="registrarEntrada()"
      >Confirmar Entrada</button>
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
                <button
                  type="button"
                  class="btn btn-link btn-xs text-white"
                  v-on:click="removeToList(item)"
                >
                  <span class="badge badge-pill badge-danger">x</span>
                </button>
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
    <div class="card border" style="background-color:#E9E9E9;">      
      <h4><strong>{{grupoSeleccionado.nombre}}</strong></h4>
      <div class="col-sm" >
        <span
          :style="grupoDefault.color != null ? 'background-color:'+grupoDefault.color: ''"
          class="badge badge-info text-wrap"
          v-on:click="filtrarAlumnosPorGrupo(grupoDefault)"
        >Todos</span>
        <button                    
          :style="grupoItem.color != null ? 'background-color:'+grupoItem.color: ''"
          class="badge badge-info text-wrap"
          v-for="grupoItem in listaFiltroGrupos"
          v-bind:key="grupoItem.id"
          v-on:click="filtrarAlumnosPorGrupo(grupoItem)"
        >{{grupoItem.nombre}}</button>
      </div>
    </div>

    <div class="card border" style="background-color:#E9E9E9;">
      
      <!--<div class="row">
        <div class="dropdown">
          <button
            class="btn btn-link dropdown-toggle"
            type="button"
            id="dropdownMenu2"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >{{grupoSeleccionado.nombre}}</button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button
              class="dropdown-item"
              v-on:click="filtrarAlumnosPorGrupo(grupoDefault)"
              type="button"
            >{{grupoDefault.nombre}}</button>
            <button
              class="dropdown-item"
              v-for="grupoItem in listaFiltroGrupos"
              v-bind:key="grupoItem.id"
              v-on:click="filtrarAlumnosPorGrupo(grupoItem)"
              type="button"
            >{{grupoItem.nombre}}</button>
          </div>
        </div>
      </div>
      -->
      <div class="card-body" style="background-color:#E9E9E9;">
        <!--<p>Seleccione para registrar entrada</p>-->
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
                <span slot="cuerpo"></span>
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
        v-on:click="registrarEntrada()"
      >Confirmar Entrada</button>
    </div>
  </div>
</template>


<script src="../controller/AsistenciaController.js"></script>

<style scoped>
</style>
