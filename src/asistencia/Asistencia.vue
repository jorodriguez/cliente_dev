<template>
  <div class="asistencia container">
    <!--<div class="text-left">
      <router-link to="/principal">
        <i class="fas fa-arrow-circle-left text-gray"  style="font-size:20px;"></i>
      </router-link>
    </div>-->

    <h1>Asistencias</h1>
    <div class="text-left">
    <router-link to="/principal" class="btn btn-secondary btn-lg">
        <i class="fas fa-arrow-circle-left text-gray"></i>
    </router-link>
    </div>
    <span>{{this.mensaje}}</span>
    <nav>
      <div class="nav nav-pills nav-justified" id="nav-tab" role="tablist">
        <a
          class="nav-item nav-link active"
          id="nav-home-tab"
          data-toggle="tab"
          href="#nav-home"
          role="tab"
          aria-controls="nav-home"
          aria-selected="true"
        >Entrada</a>
        <a
          class="nav-item nav-link"
          id="nav-profile-tab"
          data-toggle="tab"
          href="#nav-profile"
          role="tab"
          aria-controls="nav-profile"
          aria-selected="false"
        >Salida</a>
      </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
      <div
        class="tab-pane fade show active"
        id="nav-home"
        role="tabpanel"
        aria-labelledby="nav-home-tab"
      >
        <!--<h3>ENTRADA</h3>-->
        <div class="row m-1">
          <button
            type="button"
            class="btn btn-success btn-block"
            v-on:click="registrarEntrada()"
          >Confirmar Entrada</button>
        </div>
        <div class="container jumbotron m-1">
          <p>Alumnos seleccionados</p>
          <div class="media">
            <div class="row">
              <div
                v-for="item in listaSeleccion"
                v-bind:key="item.id"
                class="d-flex flex-wrap align-content-center bg-light"
              >
                <small class="badge badge-pill badge-info">
                  <img
                    src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                    width="35"
                    height="35"
                    alt="..."
                    class="rounded-circle"
                  >
                  <i>{{item.nombre}}</i>
                  <button
                    type="button"
                    class="btn btn-link btn-xs text-white"
                    v-on:click="removeToList(item)"
                  >
                    <span class="badge badge-pill badge-danger">x</span>
                  </button>
                </small>
              </div>
            </div>
          </div>
        </div>

        <div class="container jumbotron m-1">
          <p>Seleccione para registrar entrada</p>
          <div class="row">
            <div
              v-for="item in lista"
              v-bind:key="item.id"
              class="d-flex align-content-center flex-wrap"
            >
              <small class="badge badge-pill badge-warning border border-primary" v-on:click="addToList(item)">
                <img
                  src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                  width="35"
                  height="35"
                  alt="..."
                  class="rounded-circle"
                >
                <i>{{item.nombre}}</i>
              </small>
            </div>
          </div>
        </div>
        <div class="row m-1">
          <button
            type="button"
            class="btn btn-success btn-block"
            v-on:click="registrarEntrada()"
          >Confirmar</button>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <!--<h3>SALIDA</h3>-->
        <div class="row m-1">
          <button
            type="button"
            class="btn btn-block btn-danger"
            v-on:click="registrarSalida()"
          >Confirmar Salida</button>
        </div>
        <div class="container jumbotron m-1">
          <p>Alumnos seleccionados</p>
          <div class="media">
            <div class="row">
              <div
                v-for="item in listaSeleccionSalida"
                v-bind:key="item.id"
                class="d-flex align-content-center flex-wrap"
              >
                <small class="badge badge-pill badge-info">
                  <img
                    src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                    width="35"
                    height="35"
                    alt="..."
                    class="rounded-circle"
                  >
                  <i>{{item.nombre_alumno}}</i>
                  <button
                    type="button"
                    class="btn btn-link btn-xs text-white"
                    v-on:click="removeToListSalida(item)"
                  >
                    <span class="badge badge-pill badge-danger">x</span>
                  </button>
                </small>

                <!--<span class="label label-default">
                  {{item.nombre_alumno}}
                  <span class="badge badge-primary">
                    <button
                      type="button"
                      class="btn btn-link btn-sm text-white"
                      v-on:click="removeToListSalida(item)"
                    >X</button>
                  </span>
                </span>-->
              </div>
            </div>
          </div>
        </div>

        <div class="container jumbotron m-1">
          <p>Seleccione para registrar salida</p>
          <div class="row">
            <div
              v-for="item in listaRecibidos"
              v-bind:key="item.id"
              class="d-flex align-content-center flex-wrap"
            >
              <small v-on:click="addToListSalida(item)" class="badge badge-pill badge-info">
                <img
                  src="https://library.kissclipart.com/20180926/pe/kissclipart-student-clipart-utrecht-university-student-vu-univ-01ccd8efac8776f3.jpg"
                  width="35"
                  height="35"
                  alt="..."
                  class="rounded-circle"
                >
                <i>{{item.nombre_alumno}}</i>
              </small>

              <!--<span class="label label-default">
                {{item.nombre_alumno}}
                <span class="badge badge-primary">
                  <button
                    type="button"
                    class="btn btn-link btn-sm text-white"
                    v-on:click="addToListSalida(item)"
                  >X</button>
                </span>
              </span>-->
            </div>
          </div>
        </div>
        <div class="row m-1">
          <button
            type="button"
            class="btn btn-block btn-danger"
            v-on:click="registrarSalida()"
          >Confirmar Salida</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script src="../controller/AsistenciaController.js"></script>

<style scoped>
</style>
