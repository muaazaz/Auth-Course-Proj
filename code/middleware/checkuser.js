const jwt = require('jsonwebtoken')
const User = require('../models/user')

const checkUser = (req, res, next)=>{
    const token = req.cookies.jwt
    if(token){
        jwt.verify(token, 'thisismysecret', async (err, decodedToken)=>{
            if(err){
                res.locals.user = null;
                next()
            }else{
                const user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }else{
       res.locals.user = null;
        next()
    }
}

module.exports = checkUser