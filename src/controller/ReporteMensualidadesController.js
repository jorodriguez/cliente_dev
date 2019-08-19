import Vue from "vue";

export default {
  name: "ReporteMensualidades",
  data() {
    return {      
     uriTemp: "http://localhost:5000/reporte_mensualidades",     
     listaCargos : [],      
      usuarioSesion: {},
      sesion: {},   
      response: "",
      mensaje: ""
    };
  },
  mounted() {
    console.log("iniciando el componente reporte de mensualidades ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    if (!this.usuarioSesion.permiso_gerente) {
      this.$router.push("/");
      return;
    }

    this.loadFunctionReporteMensualidades = function () {
      this.$http
        .get(
          this.uriTemp,
          {
            headers: {
              "x-access-token": this.sesion.token
            }
          }
        )
        .then(
          result => {
            console.log("Consulta " + result.data);
            if (result.data != null) {
              this.listaCargos = result.data;
            }
          },
          error => {
            console.error(error);
          }
        );
    };

    this.loadFunctionReporteMensualidades();
    
  },
  methods: {
    
  }
};