<template>
    <div class="principal">
        <h1>Bienvenido</h1>      
        <table class="table table-hover">
            <tr><td> {{usuarioSesion.nombre}} </td></tr>
            <tr><td> {{usuarioSesion.correo}} </td></tr>
            <tr><td> {{usuarioSesion.fechaGenero}} </td></tr>
        </table>
    </div>
</template>
<script>

export default {
    name: 'Principal',
    data() {
        return {
            usuarioSesion:{},
            response: ""
        }
    },
    mounted() {
        console.log("iniciando el componente ");        
         this.usuarioSesion =  this.$session.get('usuario_sesion'); 
    },
    methods: {
        signout() {
            console.log("Signout ");            
        }
    }
}
</script>

<style scoped>

</style>
