<template>
<div class="login">
    <img src="../assets/logo.png">
    <form class="form-signin">
        <h1 class="h3 mb-3 font-weight-normal">Login</h1>        
        <input type="email" v-model="input.correo" class="form-control" placeholder="Correo" required autofocus />
        <input type="password" v-model="input.password" class="form-control" placeholder="Password" required/>
        <button class="btn btn-lg btn-primary btn-block" v-on:click="login()">Entrar</button>
        <br/>
        <br/>
        <p>{{ response }}</p>
    </form>
</div>
</template>

<script>

//import axios from "axios";

export default {
    name: 'Login',
    data() {
        return {
            input: {
                correo: "",
                password: ""
            },
            response: "",
            uriTemp:'https://app-restexpres.herokuapp.com/login'
           // uriTemp:'http://localhost:5000/login'            
        }
    },
    mounted() {
        console.log("iniciando ");        
        console.log("====="+this.$router.options.routes);
    },
    methods: {
        login() {
            console.log("login con rest ");                                            
            
            var data = {'correo': this.input.correo,
                        "password": this.input.password};

            //this.$http.get(process.env.LOGIN_API,data,{emulateJSON:true})
            //this.$http.get('https://app-restexpres.herokuapp.com/login',data,{emulateJSON:true})
            this.$http.post(this.uriTemp,data,{emulateJSON:true})
                .then(result => {
                    console.log("En el login");
                    this.response = result.data;
                    
                    //if(this.response.id != null){
                    if(this.response != null){
                      
                      this.$session.set('usuario_sesion', this.response);                       
                      //de esta forma se enruta parecido a angular
                      console.log("==> "+this.response);
                      //this.$router.push({name:'PaginaPrincipal'})
                      this.$router.push({name:'CatAlumno'});

                    }else {
                        this.response = "No se encuentra el usuario..";
                    }                    
                }, error => {
                    console.error(error);
                });
        }
    }
}

// axios({ method: "POST", "url": "https://httpbin.org/post", "data": this.input, "headers": { "content-type": "application/json" } }).then(result => {
            //                this.$http.post("https://develop1.herokuapp.com/api", this.input, { headers: { "content-type": "application/json" } }).then(result => {

</script>

<style scoped>

</style>
