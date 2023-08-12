import User from "../Models/User.js"
import { generatetoken } from "../utils/generateToken.js"
import fs from 'fs'

export const registerUser = async(req, res)=>{
    const {name, email, username, password, description} = req.body
    let new_path = null
    console.log(req.file, req.files);
    if(req.file){
        const {originalname, path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length-1] 
        new_path = `${path}.${ext}`
        fs.renameSync(path, new_path)
    }
    console.log(req.file);
    try {
        const existingUser = await User.findOne({email: email, username: username})
        if(existingUser){
            res.status(401)
            throw new Error('User already exits / please use a different username or email')
        }
        const newUser = await User.create({...req.body, picture: new_path})
        if(newUser){
            generatetoken(res, newUser._id)
            res.status(200).send(newUser)
        }else{
            res.status(400)
            throw new Error('Invalid User Data')
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }
}

export const loginUser = async(req, res)=>{
    const {username, password} = req.body
    try {
        const user = await User.findOne({username})
        if(user && (user.matchPasswords(password))){
            generatetoken(res, user._id)
            res.status(201).send(user)
        }else{
            res.status(401)
            throw new Error('User Does Not Exists')
        }
    } catch (error) {
        console.log(error);
        res.status(401).send(error)
    }
}

export const getUserProfile = async(req, res)=>{
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.username,
        username: req.user.email,
        description: req.user.description

    }
    res.status(200).send(user)
}

export const getUsers = async(req, res)=>{
    try {
        const users = await User.find().sort({createdAt: -1})
        res.status(201).send(users)
    } catch (error) {
        res.status(401).send(error)
    }
}



export const getUser = async(req, res)=>{
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.status(201).send(user)
    } catch (error) {
        res.status(401)
        throw new Error('User Does Not Exists')
    }
}

export const updateUser = async(req, res)=>{
  
    try {
        let new_path = null
        const user = await User.findById(req.user._id)
   
        if(user){
            
            if(req.file){
                console.log(req.file);
                const {originalname, path} = req.file
                console.log(originalname, path);
                const parts = originalname.split('.')
                const ext = parts[parts.length-1] 
                console.log(ext);
                new_path = `${path}.${ext}`
                fs.renameSync(path, new_path)
               
            }
            console.log(new_path);
            user.name = req.body.name || user.name
            user.username = req.body.username || user.username
            user.email = req.body.email || user.email
            user.description = req.body.description || user.description
            user.picture = new_path || user.picture
            if(req.body.password){
                user.password = req.body.password || user.password
            }
            const savedUser = await user.save()
            res.status(201).send(savedUser)
        }else{
            res.status(401)
            throw new Error('User not Found')
        }
    } catch (error) {
        res.status(401).send(error)
    }
}

export const logoutUser = (req, res)=>{
    res.cookie('token', '', {
        expires: new Date(0)
    })
    res.status(200).send({message: 'User Logged Out'})
}