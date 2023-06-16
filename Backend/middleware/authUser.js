
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const headerBearer = req.headers.authorization ;
        const token = headerBearer.split(' ')[1];
        jwt.verify(token , "secret-key", async(err, AuthData)=>{

        if(err) {
            res.json({sucess: false, message: "jwt middleware error"})
        }else{
            req.body.user = AuthData.user;
            next();
        }
        })
    } catch (error) {
        res.json({sucess: false, message: "middleware error", error})
    }
}

// module.exports = verifyToken;