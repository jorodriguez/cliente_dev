const dotenv = require('dotenv').config();

export default {
    ENV: process.env.VUE_APP_ENV || 'local_development',
    BASE: process.env.VUE_APP_URL_API
};

