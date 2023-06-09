const stageService = require('../services/stage.service');

async function get(req, res, next) {
    const stages = await stageService.get();
    if(!stages.isError) {
        return res.status(200).json(stages.data)
    } else {
        return res.status(500).json(`Could not get stages: ` + stages.error.message)
    }
}

module.exports = {
    get
}