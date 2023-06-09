const env = process.env;

const db = {
    host: env.MYSQL_HOST || 'localhost',
    user: env.MYSQL_USER || 'root',
    password: env.MYSQL_PASSWORD || 'admin',
    database: env.MYSQL_DATABASE || 'nikken',
    port: env.MYSQL_PORT || 3306,
}

module.exports = db;
