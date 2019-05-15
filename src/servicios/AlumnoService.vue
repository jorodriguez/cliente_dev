import Vue from 'vue';
import AlumnoModel from '../models/AlumnoModel';

const AlumnoService = new Vue({
    data :{
      alumno:AlumnoModel,
      uriTemp:'https://app-restexpres.herokuapp.com/alumnos'
    },
    methods: {
        this.findById = function(id,response) {        
        this.$http.get(this.uriTemp).then(
        result => {
          response = result.data;
          console.log("Find by id " + response);          
        },
        error => {
          console.error(error);
        }
      );
    };
    },
});


        