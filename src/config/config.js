const { config } = require('dotenv');

config({
    path: `.env.${process.env.NODE_ENV  || 'development'}.local`
});


const {
    NODE_ENV,
    PORT,
    API_VERSION,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    ORIGIN,
    DB_CNN
} = process.env;

module.exports = {
    NODE_ENV,
    PORT,
    API_VERSION,
    DB_HOST,
    DB_PORT,
    DB_NAME,
    DB_PASSWORD,
    DB_USER,
    ORIGIN,
    DB_CNN
}