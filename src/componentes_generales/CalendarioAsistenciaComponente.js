
import Vue from "vue";
import { operacionesApi } from "../helpers/OperacionesApi";
import URL from "../helpers/Urls";
import { GChart } from "vue-google-charts";


//https://vuejsexamples.com/vuejs-functional-calendar-component/
export default {
  name: "calendario-asistencia-alumno",
  components: {
    GChart
  },
  mixins: [operacionesApi],
  template: `<span>
              <div class="spinner-grow spinner-grow-sm" role="status" v-if="loading">
                  <span class="sr-only">Cargando...</span>
              </div>            
              <table>             
              <tr>
              <th>D</th>
              <th>L</th>
              <th>M</th>
              <th>M</th>
              <th>J</th>
              <th>V</th>                
              <th>S</th>                
            </tr>              
                <template v-for="index in iteraciones">
                <tr>
                  <template v-for="data in getIndices(index)">
                    <td :class="getClase(data)" >                        
                        <button class="btn btn-link text-danger" v-if="data.cargos_extras > 0" >{{data.num_dia}}</button>
                        <span :title="data.hora_entrada" v-else>                        
                            {{data.num_dia}}
                        </span>
                    </td>
                    </template>
                </tr>                
                </template>
              </table>                          
            </span>`,
  props: ['idalumno'],
  data() {
    return {
      fechasAsistencias: [],
      lista: [],
      iteraciones: [],
      loading: false,
      load: null,
      numero_mes: "",
      mensaje: "",
      sesion: null,
      usuarioSesion: null
    };
  },
  mounted() {
    console.log("iniciando el componente grafica de asistencia alumno ");
    this.sesion = this.$session.get("usuario_sesion");

    if (!this.sesion || !this.sesion.usuario) {
      console.log("No tiene sesion");
      this.$router.push("/");
      return;
    }
    this.usuarioSesion = this.sesion.usuario;

    if (!this.idalumno) {
      console.log("No existe la propiedad de idalumno");

    }
    this.loading = true;
    this.load = () => {
      this.get(
        //URL.ASISTENCIA_REPORTE_POR_ALUMNO +`/${this.idalumno}/${this.numero_mes}`,
        URL.ASISTENCIA_REPORTE_MES_ALUMNO + `${this.idalumno}`,
        this.sesion.token,
        (result) => {
          try {
            if (result.data != null) {
              this.lista = result.data;
              if (this.lista.length > 0) {
                this.numero_semanas = parseInt(this.lista.length / 7);

                console.log("this.numero_semanas "+this.numero_semanas);

                this.iteraciones = [...Array(this.numero_semanas).keys()];

              }
              //this.fechasAsistencias = convertToDataGraphic(this.lista);           
              this.loading = false;
            }
          } catch (e) { console.log("XXX error " + e); }
        }
      );
    };
    this.load();
  },
  methods: {
    changedMonth(data) {
      console.log("Cambio de mes " + data);
    },
    getIndices(iteracion) {
      let index_inicio = iteracion == 0 ? 0 : (iteracion * 7);
      let index_fin = iteracion == 0 ? 7 : index_inicio + 7;
      return this.lista.slice(index_inicio, index_fin);
    },
    getClase(data) {

      if (data.fecha_mayor_hoy || data.es_fin_semana) {
        return 'table-active text-gray';
      }
      if (!data.asistencia) {
        return '';
      }

      return 'table-info';
    }
  },
};

function convertToDataGraphic(lista) {
  if (lista == null || lista == undefined) {
    return [];
  }

  var retorno = [];
  //retorno.push(['Dia','valor']);

  lista.forEach(e => {
    retorno.push(new Date(e.anio, e.mes, e.dia));
  });

  return retorno;
}
