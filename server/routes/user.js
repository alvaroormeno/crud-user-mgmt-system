const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');

// use user controller
router.get('/', userController.view);
router.post('/', userController.find);
router.post('/adduser', userController.form);



module.exports = router