import Vue from 'vue';

export default {
  data() {
    return {
         usuarioSesion: {},
         sesion: {}
    }
  }
  mounted() {
    console.log("iniciando  ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;
  }
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
    getHeadersToken(){
        return {
          headers: {
            "x-access-token": this.sesion.token
          }
        }
    }
  }
}


        