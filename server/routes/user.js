const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');

// use user controller
router.get('/', userController.view);



module.exports = router