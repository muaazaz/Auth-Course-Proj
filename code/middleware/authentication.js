const jwt = require('jsonwebtoken')

const auth = (req, res, next)=>{
    const token = req.cookies.jwt
    //Check for token
    if(token){
        jwt.verify(token, 'thisismysecret', (err, decodedToken)=>{
            if(err){
                res.redirect('/login')
            }else{
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

module.exports = auth