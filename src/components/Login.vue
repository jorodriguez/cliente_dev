<template>
<div class="hello ">
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
import axios from "axios";
export default {
    name: 'Login',
    data() {
        return {
            input: {
                correo: "",
                password: ""
            },
            response: ""
        }
    },
    mounted() {
        console.log("iniciando ");        
        console.log("====="+this.$router.options.routes);
    },
    methods: {
        login() {
            console.log("login con rest ");                                            
            //this.$http.get("https://develop1.herokuapp.com/api/login?usuario=" + this.input.correo + "&password=" + this.input.password)
            var data = {'correo': this.input.correo,
                        "password": this.input.password};

            this.$http.get(process.env.API_LOGIN,data,{emulateJSON:true})
                .then(result => {
                    this.response = result.data;
                    
                    if(this.response != null){
                      this.$session.set('usuario_sesion', this.response); 
                      
                      //de esta forma se enruta parecido a angular
                      console.log("==> "+this.response);
                      this.$router.push({name:'PaginaPrincipal'})
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
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}

textarea {
    width: 600px;
    height: 200px;
}
</style>
