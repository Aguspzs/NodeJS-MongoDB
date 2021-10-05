const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController')
    /* GET users listing. */
router.post('/', usersController.create);
router.post('/login', usersController.login);

module.exports = router;