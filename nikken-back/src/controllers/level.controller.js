const levelService = require('../services/level.service');

async function getByStageCode(req, res, next) {
    const levels = await levelService.getByStageCode(req.params.stage_code);
    if(!levels.isError) {
        if(levels.data.length) {
            return res.status(200).json(levels.data)
        } else {
            return res.status(400).json('No levels found by this stage code')
        }
    } else {
        return res.status(500).json(`Could not get levels: ` + levels.error.message)
    }
}

module.exports = {
    getByStageCode
}