const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        lowercase: true,
        required: [true, 'Please enter an email'],
        unique: true,
        validate: [(value)=>{
            if(!validator.isEmail(value)){
                throw new Error('Please enter a valid email')
            }
        }]
    },
    password:{
        type: String,
        minLength: [6, 'Paswword too short'],
        required : [true, 'Please enter a password']
    }
})


//These methods are called mongoose hooks
//Pre is used to perform action before something
//Post is used to perform after something is done
userSchema.pre('save', async function(next){
    const usr = this
  if(usr.isModified('password')){
    usr.password = await bcrypt.hash(usr.password, 8)
  }  
  next()
})

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if(user){
        const isValid = bcrypt.compareSync(password, user.password)
        if(!isValid){
            throw Error('Invalid Password')
        }
        return user
        
    }else{
        throw Error('Invalid User')
    }

    
}


const User = mongoose.model('User', userSchema)

module.exports = User