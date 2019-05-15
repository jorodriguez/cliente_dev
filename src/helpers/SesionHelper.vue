import Vue from 'vue';


const mySesion = new Vue({
    data : {
        this.usuarioSesion :{}
    },
    methods: {  
        getSesion(){
            var sesion = this.$session.get("usuario_sesion");
    
            if (!sesion || !sesion.usuario) {
                console.log("No tiene sesion");
                this.$router.push("/");
                return;
            }
            this.usuarioSesion = sesion.usuario;  
            return this.usuarioSesion;
        },
    }
});


        