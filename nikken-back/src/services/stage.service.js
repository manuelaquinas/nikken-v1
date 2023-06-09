const database = require('./db.service');

async function get() {
    try{
        const stages = await database.query(
            `SELECT *
            FROM
                stages`
        );
        return {
            data: stages,
            isError: false,
        }
    } catch (error) {
        return {
            error: error,
            isError: true,
        }
    }
}

module.exports = {
    get
}