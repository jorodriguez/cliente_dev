import Vue from 'vue';
import FormatoModel from './FormatoModel';

var Alumno = new Vue({
    data : {
        id: 0,
        formato_inscripcion:FormatoModel,        
        co_sucursal:0,
        co_grupo:0,
        nombre: "",        
        apellidos: "",
        nombre_carino:"",
        sexo:"",        
        nombre_grupo:"",
        nombre_sucursal:"",
        fecha_nacimiento: "",
        alergias: "",
        nota: "",
        hora_entrada: "",
        hora_salida: "",
        costo_inscripcion: "",
        costo_colegiatura: "",
        minutos_gracia: "",        
        fecha_reinscripcion: "",
        foto: "",
        genero: 1
    },
    methods: {
        
    },
});


        