const dotenv = require('dotenv').config();

module.exports = {
    ENV: process.env.ENV || 'local_development',
    BASE: process.env.URL_API
};