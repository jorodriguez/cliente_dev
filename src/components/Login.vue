<template>
  <div class="login container">
    <!--<img src="../assets/magic.jpeg" class="rounded-lg" width="150" height="100">-->
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
      <p>{{ response }}</p>
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
        password: ""
      },
      response: "",
      uriTemp:'https://app-restexpres.herokuapp.com/auth/login'
     // uriTemp: "http://localhost:5000/auth/login"
    };
  },
  mounted() {
    console.log("iniciando ");
    this.$session.clear();

  },
  methods: {
    login() {
      console.log("login con rest ");      
      var data = { correo: this.input.correo, password: this.input.password };
    
      this.$http.post(this.uriTemp, data, { emulateJSON: true }).then(
      //this.$http.post(process.env.API_LOGIN, data, { emulateJSON: true }).then(
        result => {
          console.log("En el login");
          this.response = result.data;

          if (this.response.auth) {            
            this.$session.set("usuario_sesion", this.response);
            this.$session.set("jwt", this.response.token);            
            this.$router.push({ name: "PaginaPrincipal" });
          } else {
            this.response = "No se encuentra el usuario..";
          }
        },
        error => {
          console.log(error);
          this.response = error;
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

