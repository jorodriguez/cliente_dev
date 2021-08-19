//const dotenv = require('dotenv').config();

export default {
    ENV: process.env.ENV || 'local_development',
    BASE: process.env.URL_API
};

