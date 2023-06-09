const userProgressService = require('../services/userProgress.service');
const levelService = require('../services/level.service');
const userProgressLogService = require('../services/userProgressLog.service');
const { generateHash } = require('../util/security/generteHash');

async function getOne(req, res, next) {
    const userProgress = await userProgressService.getOne(req.params.nikken_id);
    if(!userProgress.isError) {
        if(userProgress.data.length) {
            return res.status(200).json(userProgress.data)
        } else {
            return res.status(400).json('No user progress found by this Id')
        }
    } else {
        return res.status(500).json(`Could not get user progress with nikken_id ${req.params.nikken_id}: ` + userProgress.error.message)
    }
}

async function update(req, res, next) {
    let userProgress = await userProgressService.getOne(req.params.nikken_id);
    if(userProgress.isError) {
        return res.status(500).json(`Could not update user progress with nikken_id ${req.params.nikken_id}: ` + userProgress.error.message)
    }
    if(!userProgress.data.length) {
        return res.status(400).json('No user progress found by this Id')
    }
    userProgress = userProgress.data[0]
    if(req.body.is_content_read){
        userProgress.is_content_read = true
    }
    if(req.body.is_video_watched){
        userProgress.is_video_watched = true
    }
    //TODO: Add condition to only do when user's stage is equal or lower than highest stage
    if(userProgress.is_content_read && userProgress.is_video_watched) {
        let requestIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        let userProgressLog = await userProgressLogService.create(userProgress, requestIp)
        if(userProgressLog.isError) {
            return res.status(500).json(`Could not log user progress: `+ userProgressLog.error.message)
        }
        userProgress.level_code += 1
        userProgress.is_content_read = false
        userProgress.is_video_watched = false
        let highestLevel = await levelService.getHighestByStageCode(userProgress.stage_code)
        if(highestLevel.isError) {
            return res.status(500).json(`Could not find highest level in stage: `+ highestLevel.error.message)
        }
        highestLevel = highestLevel.data[0]
        if(highestLevel.code < userProgress.level_code) {
            userProgress.stage_code += 1
            userProgress.level_code = 1
        }
    }
    const updatedUserProgress = await userProgressService.update(userProgress)
    const nikken_id = req.params.nikken_id

    if(!updatedUserProgress.isError) {
        let hash = generateHash()
        res.cookie('session', hash, { maxAge: 1800000, secure: false,  encode: String });
        res.cookie('nikken_id', nikken_id, { maxAge: 1800000, secure: false});
        return res.status(200).json(`Updated user progress with nikken_id ${nikken_id}`)
    } else {
        return res.status(500).json(`Could not update user progress with nikken_id ${nikken_id}: ` + updatedUserProgress.error.message)
    }
}

module.exports = {
    update, getOne
}
