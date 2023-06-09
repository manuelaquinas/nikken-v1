const mysql = require('mysql2/promise');
const dbConfig = require('../configs/db.config');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port
})

async function query(sql, params) {
    const connection = await mysql.createConnection(dbConfig);
    const [results, ] = await connection.execute(sql, params);
    connection.end()
    return results;
}

module.exports = {
    query
}
