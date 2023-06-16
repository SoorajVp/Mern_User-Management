const express = require('express');
const controllers = require('../controllers/adminController');
const router = express.Router();

router.get('/', controllers.getAllusers);

router.post('/login', controllers.adminLogin)

router.post('/update-user', controllers.updateUser)

router.post('/remove-user', controllers.removeUser)


module.exports = router;