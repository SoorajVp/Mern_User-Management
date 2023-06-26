const express = require('express');
const controllers = require('../controllers/adminController');
const router = express.Router();

router.get('/', controllers.getAllusers);

router.post('/login', controllers.adminLogin)

router.patch('/update-user', controllers.updateUser)

router.delete('/remove-user/:id', controllers.removeUser)


module.exports = router;