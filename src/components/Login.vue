<template>
  <div class="login container">
    <!--<img src="../assets/magic.jpeg" class="rounded-lg" width="150" height="100"/>
    -->
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal"></h1>
      <input
        type="email"
        v-model="input.correo"
        class="form-control"
        placeholder="Correo"
        required
        autofocus
      >
      <input
        type="password"
        v-model="input.password"
        class="form-control"
        placeholder="Password"
        required
      >
      <button class="btn btn-lg btn-primary btn-block" v-on:click="login()">Entrar</button>
      <br>
      <br>
      <!--<p>{{ response }}</p>-->

      <!-- MODAL TOAST -->
      <div
        id="toast_id"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        class="toast border-warning"
        data-autohide="true"
        data-delay="1000"
      >
        <div class="toast-header p-1 mb-1 bg-warning text-dark">
          <strong class="mr-auto">Login</strong>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"
          :disabled="loading">
            <span aria-hidden="true">&times;</span>
            <svg v-if="loading" class="Button__Icon Button__Spinner" viewBox="...">
              <path d="..."></path>
            </svg>
            <svg v-else class="Button__Icon" viewBox="0 0 20 20">
              <path d="..."></path>
            </svg>
            <span v-if="!loading" class="Button__Content">
              <slot></slot>
            </span>
          </button>
        </div>
        <div class="toast-body">
          <p id="toast_msg"></p>
        </div>
      </div>
      <!-- MODAL TOAST -->
    </form>
  </div>
</template>

<script src="../controller/LoginController.js"></script>

<style scoped>
</style>

