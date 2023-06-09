const database = require('./db.service');

async function getByStageCode(stage_code) {
    try{
        const levels = await database.query(
            `SELECT
                code, stage_code, title, description, video_url, pdf_url, image_route
            FROM
                levels
            WHERE
                stage_code = ${stage_code}`
        );
        return {
            data: levels,
            isError: false,
        }
    } catch (error) {
        return {
            error: error,
            isError: true,
        }
    }
}

async function getHighestByStageCode(stage_code) {
    try{
        const level = await database.query(
            `SELECT
                code, stage_code, title, description, video_url, pdf_url, image_route
            FROM
                levels
            WHERE
                stage_code = ${stage_code}
            ORDER BY code DESC LIMIT 1`
        );
        return {
            data: level,
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
    getByStageCode, getHighestByStageCode
}