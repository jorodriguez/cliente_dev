'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//URL_API:'"https://api-ambiente-desarrollo.herokuapp.com"',
module.exports = merge(prodEnv, {  
 /* NODE_ENV: '"development"',    
  ROOT_API : '"http://localhost:5000/alumnos"',
  API_LOGIN : '"http://localhost:5000/auth/login"',
  URL_ALUMNOS : '"http://localhost:5000/alumnos"',
  URL_GRUPOS : '"http://localhost:5000/grupos"'*/
})
