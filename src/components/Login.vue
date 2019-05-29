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
      <button class="btn btn-lg btn-primary btn-block"
       v-on:click="login()">Entrar</button>    
      <br/>
      <br/>
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
          <!--<img src="" class="rounded mr-2" alt="...">-->
          <strong class="mr-auto">Login</strong>
          <!--<small>11 mins ago</small>-->
          <button type="button" class="ml-2 mb-1 close" 
                data-dismiss="toast" aria-label="Close">
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

<script>
//import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      input: {
        correo: "",
        password: "",
        mensajeToast:null
      },
      response: "",
      //uriTemp: "https://app-restexpres.herokuapp.com/auth/login"
      uriTemp: "http://localhost:5000/auth/login"
    };
  },
  mounted() {
    console.log("iniciando login ");
    this.$session.clear();
      //toast
    this.mensajeToast = mensaje => {
      $("#toast_msg").text(mensaje);
      $("#toast_id").toast("show");
    };
  },
  methods: {
    async login() {
      console.log("login con rest ");

      if (!this.input.correo || !this.input.password) {
        this.mensajeToast("Escribe tu usuario y tu clave.");
        return;
      }

      var data = { correo: this.input.correo, password: this.input.password };

      await this.$http.post(this.uriTemp, data, { emulateJSON: true }).then(        
        result => {
          console.log("En el login");
          this.response = result.data;
          //this.mensajeToast(JSON.stringify(result));
          if (this.response.auth) {
            this.$session.set("usuario_sesion", this.response);
            this.$session.set("jwt", this.response.token);
            this.$router.push({ name: "PaginaPrincipal" });
          } else {
            this.mensajeToast("No se encuentra el usuario..");
            this.response = "No se encuentra el usuario..";
          }
        },
        error => { //FIXME: modificar la contestacion del API
          //console.log(JSON.stringify(error));
          if(!error.auth){
             this.mensajeToast("El usuario o la clave son incorrectas.");
          }          
          //this.response = error;
        }
      );
    }
  }
};

// axios({ method: "POST", "url": "https://httpbin.org/post", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
//                this.$http.post("https://develop1.herokuapp.com/api", this.input, { headers: { "content-type": "application/json" } }).then(result => {
</script>

<style scoped>
</style>

