import Vue from "vue";

export default {
  name: "ReporteMensualidades",
  data() {
    return {      
     uriTemp: "http://localhost:5000/reporte_mensualidades",     
     listaSucursales : [],
     listaCargos : [],      
     listaCargosResp : [],
      usuarioSesion: {},      
      sesion: {},   
      sucursal_seleccionada:{id_sucursal:0,nombre:""},
      loadFunctionReporteMensualidades:null,
      loadFunctionReporteMensualidadesSucursales:null,
      filtrarCargos:null,
      verTodosCargos : false,      
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
              this.listaCargosResp = result.data;
              this.filtrarCargos();
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

    this.filtrarCargos = ()=>{
      
        if(this.verTodosCargos){
          this.listaCargos = this.listaCargosResp;
        }else{
           this.listaCargos = this.listaCargosResp.filter(row => row.pagado == true);
        }
      
    };

    
    this.loadFunctionReporteMensualidadesSucursales();
  },
  methods: {
    verListaMensualidadesFacturadas(row_sucursal){
        console.log("row sucursal "+JSON.stringify(row_sucursal));
        this.sucursal_seleccionada = row_sucursal;
        this.loadFunctionReporteMensualidades(row_sucursal.id_sucursal);

    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    },
    toggleTodosCargos(){
      console.log("Ver todos los cargos "+this.verTodosCargos);
      this.verTodosCargos = !this.verTodosCargos;
      
      this.filtrarCargos();      
    }    
  }
};