'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

//module.exports = merge(prodEnv, {
  module.exports =  {  
  NODE_ENV: '"development"',  
  ROOT_API : '"http://localhost:5000/alumnos"',
  API_LOGIN : '"http://localhost:5000/auth/login"',
  URL_ALUMNOS : '"http://localhost:5000/alumnos"',
  URL_GRUPOS : '"http://localhost:5000/grupos"',
};
