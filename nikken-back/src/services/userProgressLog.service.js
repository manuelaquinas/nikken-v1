const database = require('./db.service');

async function create(userProgress, requestIp) {
    try {
        let date = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '')
        const userProgressLog = await database.query(
            `INSERT INTO users_progress_logs
                (user_nikken_id, stage_code, level_code, date, request_ip)
            VALUES
                (${userProgress.user_nikken_id}, ${userProgress.stage_code}, ${userProgress.level_code}, '${date}', '${requestIp}')`
        );
        return {
            data: userProgressLog,
            isError: false,
        }
    } catch (error) {
        return {
            error: error,
            isError: true,
        }
    }
}

async function get() {
    try{
        const user = await database.query(
            `SELECT
                user_nikken_id, stage_code, level_code, date, request_ip
            FROM
                users_progress_logs
            ORDER BY
                date ASC`
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

module.exports = {
    create, get
}