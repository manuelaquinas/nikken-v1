const express = require('express');
const router = express.Router();
const userProgressController = require('../controllers/userProgress.controller');
const { checkSession } = require('../util/security/checkSession');

// GET user progress
router.get('/:nikken_id', checkSession, userProgressController.getOne);

// PATCH user progress
router.patch('/:nikken_id', checkSession, userProgressController.update);

module.exports = router;
