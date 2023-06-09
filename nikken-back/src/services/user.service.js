const database = require('./db.service');

async function create(user) {
    try {
        const createdUser = await database.query(
            `INSERT INTO users
                (nikken_id, name, language)
            VALUES
                (${user.nikken_id}, '${user.name}', '${user.language}')`,
        );
        if(createdUser.affectedRows) {
            return {
                data: createdUser,
                isError: false,
            }
        }
        throw new error('')
    } catch (error) {
        return {
            error: error,
            isError: true,
        }
    }
}

async function getOne(id) {
    try{
        const user = await database.query(
            `SELECT
                nikken_id, name, language
            FROM
                users
            WHERE
                nikken_id = ${id}`,
        );    
        return {
            data: user,
            isError: false,
        }
    } catch (error) {
        return {
            error: error,
            isError: true,
        }
    }
}

async function update(nikken_id, user) {
    try {
        const updatedUser = await database.query(
            `UPDATE users SET
                name = '${user.name}', language = '${user.language}'
            WHERE nikken_id = ${nikken_id}`
        );
        if(updatedUser.affectedRows) {
            return {
                data: updatedUser,
                isError: false,
            }
        }
        throw new error('')
    } catch (error) {
        return {
            error: error,
            isError: true,
        }
    }
}

module.exports = {
    create, getOne, update
}
