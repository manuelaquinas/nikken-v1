const database = require('./db.service');

async function create(nikken_id) {
    try {
        const createdUserProgress = await database.query(
            `INSERT INTO users_progress
                (user_nikken_id, stage_code, level_code, is_content_read, is_video_watched)
            VALUES
                (${nikken_id}, 1, 1, false, false)`
        );
        return {
            data: createdUser,
            isError: false,
        }
    } catch (error) {
        return {
            error: error,
            isError: true,
        }
    }
}

async function getOne(nikken_id) {
    try{
        const user = await database.query(
            `SELECT
                user_nikken_id, stage_code, level_code, is_content_read, is_video_watched
            FROM
                users_progress
            WHERE
                user_nikken_id = ${nikken_id}`
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

async function update(userProgress) {
    try {
        const updatedUser = await database.query(
            `UPDATE users_progress SET
            stage_code = '${userProgress.stage_code}', level_code = '${userProgress.level_code}', 
            is_content_read = ${userProgress.is_content_read}, is_video_watched = ${userProgress.is_video_watched}
            WHERE user_nikken_id = '${userProgress.user_nikken_id}'`
        );
        if(updatedUser.affectedRows) {
            return {
                data: updatedUser,
                isError: false,
            }
        }
        throw new error('Failed to process request')
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