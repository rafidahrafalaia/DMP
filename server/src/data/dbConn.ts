const mysql = require('mysql');

const knexConfig = require('../../knexfile'); // eslint-disable-line
const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const db = mysql.createConnection({
    host: config.connection.host,
    user: config.connection.user,
    password: config.connection.password,
    database: config.connection.database,
    port: config.connection.port,
});
module.exports = db;
