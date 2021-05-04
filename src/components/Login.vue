<template>
  <div class="login container">
    <!--<img src="../assets/magic.jpeg" class="rounded-lg" width="315" height="150"/>-->
    <img src="../assets/magic.png" class="rounded-lg" width="235" height="110" />

    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal"></h1>
      <input
        type="email"
        v-model="input.correo"
        class="form-control"
        placeholder="Correo"
        v-on:keyup.enter="login()"
        required
        autofocus
      />
      <input
        type="password"
        v-model="input.password"
        class="form-control"
        placeholder="Password"
        v-on:keyup.enter="login()"
        required
      />

      <a
        :class="loading ? 'btn btn-lg btn-primary btn-block text-white disabled':'btn btn-lg btn-primary btn-block text-white'"
        v-on:click="login()"
      >        

       <span v-if="loading" class="spinner-border" role="status" aria-hidden="true"></span> {{loading ? 'Validando..':'Entrar'}}       
      </a> 
      <!--<small class="text-muted">()</small>-->
      <br>
      <br>

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
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
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

