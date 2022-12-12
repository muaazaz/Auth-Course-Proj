
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const maxAge = 3*24*60*60
const createtoken = (id)=>{
    return jwt.sign({id},'thisismysecret',{
        expiresIn: maxAge
    })
}


//Handle custom errors
const errorhandling=(err)=>{

    let errors = {email:'', password:''}

    //Invaid user login
    if(err.message === 'Invalid User'){
        errors.email = 'Invalid User Email';
    }

    if(err.message === 'Invalid Password'){
        errors.password = 'Incorrect password';
    }


    if(err.code === 11000){
        errors.email = 'That email is already taken'
        return errors;
    }


    if(err.message.toLowerCase().includes('user validation failed')){
        Object.values(err.errors).forEach((error)=>{
            errors[error.properties.path] = error.properties.message
        })
    }
    return errors
}

const signup_get=(req,res)=>{
    res.render('signup')
}
const login_get=(req,res)=>{
    res.render('login')
}
const signup_post= async(req,res)=>{
    try {
        const user = await new User(req.body)
        const token = await createtoken(user._id)
        await user.save()
        res.cookie('jwt', token,{httpOnly: true})
        res.send({user})
    } catch (e) {
        const errors = errorhandling(e);
        res.status(400).send({errors})
    }
}
const login_post= async(req,res)=>{
    try {
        const user = await User.login(req.body.email, req.body.password)
        const token = createtoken(user._id)
        res.cookie('jwt', token, {httpOnly: true, maxAge})
        res.send({user})
    } catch (e) {
        const errors = errorhandling(e);
        res.send({errors})
    }
}

const logout_get = async(req,res)=>{
    try {
        res.cookie('jwt', '', {maxAge:1})
        res.redirect('/')
    } catch (e) {
        
    }
}

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}