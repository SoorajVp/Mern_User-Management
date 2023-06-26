const express = require('express');
const router = express.Router();
const controllers = require('../controllers/userController')
const upload = require('../utils/multer')
const verifyToken = require('../middleware/authUser')


router.post('/signup', controllers.register);

router.post('/login', controllers.loginPost)

router.patch('/update-profile', verifyToken, controllers.updateProfile )

router.put('/update-profile-photo', verifyToken, upload.single('image'), controllers.updateProfilePic)

router.get('/profile', verifyToken, controllers.getProfileData) 


module.exports = router;