const express = require('express');
const router = express.Router();
const stageController = require('../controllers/stage.controller');
const levelController = require('../controllers/level.controller');

// GET stages
router.get('/', stageController.get);

// GET levels by stage code
router.get('/:stage_code/levels', levelController.getByStageCode);

module.exports = router;