'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ROOT_API : 'https://app-restexpres.herokuapp.com/',
  API_LOGIN : 'https://app-restexpres.herokuapp.com/login'
  
})
