const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET user
router.get('/:nikken_id', userController.getOne);

// POST user
router.post('/', userController.create);

// PATCH user
router.patch('/:nikken_id', userController.update);

// POST user session

router.post('/login/:nikken_id', userController.login);

module.exports = router;
