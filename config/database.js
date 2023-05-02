const mysql = require('mysql2');
const {Client} = require('pg');
// mySQL database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "shogunblade17",
    database: "my-db",
    port: 3306
})
// Postgres database
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'shogunblade17',
    database: 'my-db'
})

module.exports = [connection, client];