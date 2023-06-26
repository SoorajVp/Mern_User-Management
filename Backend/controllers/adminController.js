const User = require('../models/user');

const credentials = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  }

module.exports = {

    adminLogin: (req, res) => {
        try {
            if(req.body.email == credentials.email && req.body.password == credentials.password ) {
                res.json({success: true, message: 'Login successful'})
            }else {
                res.json({success: false, message: 'Invalid credentials'})
            }
        } catch (error) {
            res.json({success: false, message: 'Internal server error, please try again'})
        }
    },

    getAllusers: async (req, res) => {
        try {
            const users = await User.find({});
            res.json({ users })
        } catch (error) {

        }
    },

    updateUser: async (req, res) => {
        const { id, name, email, mobile } = req.body;
        User.updateOne(
            { _id: id }, // Matching condition
            { $set: { name: name, email: email, mobile: mobile } } // Update to be applied
        )
            .then(result => {
                res.json({ success: true, message: 'Document updated successfully' });
            })
            .catch(error => {
                res.json({ success: false, message: 'error updating document' });
            });
    },

    removeUser: async (req, res) => {
        try {
            await User.deleteOne({ _id: req.params.id })
                .then(() => {
                    res.json({success: true, message: 'Document deleted successfully'});
                })
                .catch((error) => {
                    console.error(error);
                })
        } catch (error) {
            console.log(error)
        }
    }

}