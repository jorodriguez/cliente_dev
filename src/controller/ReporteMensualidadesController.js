import Vue from "vue";

export default {
  name: "ReporteMensualidades",
  data() {
    return {      
     uriTemp: "http://localhost:5000/reporte_mensualidades",     
     listaSucursales : [],
     listaCargos : [],      
      usuarioSesion: {},      
      sesion: {},   
      sucursal_seleccionada:{id_sucursal:0,nombre:""},
      loadFunctionReporteMensualidades:null,
      loadFunctionReporteMensualidadesSucursales:null,
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

    this.loadFunctionReporteMensualidades = function (id_sucursal) {
      this.$http
        .get(
          this.uriTemp+"/"+id_sucursal,
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

    this.loadFunctionReporteMensualidadesSucursales = function () {
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
            console.log("Consulta cargos por sucursal" + result.data);
            if (result.data != null) {
              this.listaSucursales = result.data;
            }
          },
          error => {
            console.error(error);
          }
        );
    };
    
    this.loadFunctionReporteMensualidadesSucursales();
  },
  methods: {
    verListaMensualidadesFacturadas(row_sucursal){
        console.log("row sucursal "+JSON.stringify(row_sucursal));

        this.loadFunctionReporteMensualidades(row_sucursal.id_sucursal);

    }
  }
};