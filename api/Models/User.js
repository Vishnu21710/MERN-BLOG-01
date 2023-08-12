import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    username: {
        type:String,
        required: true,
        unique: true
    },
    email: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type:String, 
        required: true
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password =  await bcrypt.hash(this.password, salt)  
})

userSchema.methods.matchPasswords = async function(password){
    return await bcrypt.compare(password, this.password)
}

export default model('User', userSchema)