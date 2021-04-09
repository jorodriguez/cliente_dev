import Vue from 'vue';
import FormatoModel from './FormatoModel';

var Alumno = new Vue({
    data : {
        id: 0,
        formato_inscripcion:FormatoModel,        
        padre:{},
        madre:{},
        datos_facturacion:{},
        co_sucursal:0,
        co_grupo:0,
        nombre: "",
        adeuda:false,        
        apellidos: "",
        nombre_carino:"",
        mostrar_nombre_carino:false,        
        cat_genero:-1,       
        nombre_grupo:"",
        nombre_sucursal:"",
        fecha_nacimiento: null,
        alergias: "",
        nota: "",
        hora_entrada: "",
        hora_salida: "",
        costo_inscripcion: "",
        costo_colegiatura: "",        
        minutos_gracia: 0,        
        fecha_reinscripcion: null,
        fecha_limite_pago:null,
        foto: "",
        visible:false,
        genero: 1
    },
    methods: {
        
    },
});


        