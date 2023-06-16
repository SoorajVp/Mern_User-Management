const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

module.exports = {

    register: async (req, res) => {
        try {
            let { name, email, mobile, password } = req.body;
            const user = await User.findOne({ email: email });
            if (user) {
                res.json({ success: false, message: "User Already exists, please login " });
            } else {
                const newUser = new User({
                    name: name,
                    email: email,
                    mobile: mobile,
                    password: await bcrypt.hash(password, 10)
                })
                const userData = await newUser.save()
                res.json({ success: true, message: "Account created successfully" })
            }
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: "Internal server error, please try again" });
        }

    },

    loginPost: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email: email });
            if (user) {
                bcrypt.compare(password, user.password)
                    .then((result) => {
                        if (result) {
                            const token = jwt.sign({ user }, "secret-key", { expiresIn: "1d" });
                            res.json({ success: true, message: "User logged in successfully", token: token, data: user })
                        } else {
                            res.json({ success: false, message: "Wrong password" })
                        }
                    })
                    .catch((err) => {
                        res.json({ success: false, message: "Invalid user credentials" })
                    });
            } else {
                res.json({ success: false, message: "Invalid user credentials" })
            }
        } catch (error) {
            console.log(error)
        }
    },

    updateProfile: (req, res) => {
        try {
            const { name, email, mobile } = req.body;
            User.updateOne(
                { _id: req.body._id }, // Matching condition
                { $set: { name: name, email: email, mobile: mobile } } // Update to be applied
            )
                .then(result => {
                    res.json({ success: true, message: 'Document updated successfully', data: name });
                })
                .catch(error => {
                    res.json({ success: false, message: 'error updating document' });
                });
        } catch (error) {
            console.log(error)
        }
    },

    updateProfilePic: async (req, res) => {
        try {
            let result = await cloudinary.uploader.upload(req.file.path) // Upload the file to Cloudinary
            const filter = { _id: req.body?.user?._id };
            const update = { profilePic: result.url };
            const doc = await User.findByIdAndUpdate(filter, update, { new: true });
            res.json({ success: true})

        } catch (error) {
            res.json({ error: 'Failed to upload file' });
        }

    },

    getProfileData: async(req, res) => {
        try {
            console.log(req.body)
            const user = await User.findById(req.body.user._id)
            res.json({ success: true, data: user })
        } catch (error) {
            res.json({ success: false, message: "Data fetching error" })
        }
    }


}