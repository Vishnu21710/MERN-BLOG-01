
import Blog from "../Models/Blog.js"
import fs from 'fs'


export const createBlogPost = async(req, res)=>{
    let new_path = null
    if(req.file){
        const {originalname, path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length-1] 
        new_path = `${path}.${ext}`
        fs.renameSync(path, new_path)
    }
        try {
            const newPost = await Blog.create({...req.body, userId: req.user._id, cover: new_path}) 
            res.status(201).send(newPost)
        } catch (error) {
            res.status(401)
            throw new Error(error)
        }
}


export const getUserBlogs = async(req, res)=>{
        const id= req.params.id
        try {
            const blogs = await Blog.find({userId: id}).populate('userId', ['name', 'picture', 'username', 'email', 'description'])
            res.status(200).send(blogs)
        } catch (error) {
            res.status(401).send(error)
            throw new Error(error)
        }
}


export const getPosts = async(req, res)=>{
    console.log(req.query);
    try {
        const filters = {
            ...(req.query.category && {category: req.query.category})  ,
            ...(req.query.search && {title: req.query.search})
        }
        console.log(filters);
        const posts = await Blog.find(filters).sort({createdAt: -1}).populate('userId', ['picture', 'name', 'description'])
        res.status(201).send(posts)
    } catch (error) {
        res.status(401).send(error)
    }
}

export const getPost = async(req, res)=>{
    const id = req.params.id
    try {
        const post = await Blog.findById(id).populate('userId', ['name', 'picture', 'description'])
        res.status(201).send(post)
    } catch (error) {
        res.status(401)
        throw new Error(error)
    }
}

export const updatePost = async(req, res)=>{
    const id = req.params.id
    const userId = String(req.user._id)
    let new_path = null

    if(req.file){
        const {originalname, path} = req.file
        const parts = originalname.split('.')
        const ext = parts[parts.length-1] 
        new_path = `${path}.${ext}`
        fs.renameSync(path, new_path)
    }
    try {
        const post = await Blog.findById(id)
        if(userId === post.userId){
            post.title = req.body.title || post.title
            post.description = req.body.description || post.description
            post.body = req.body.body || post.body
            post.cover = new_path || post.cover 
            post.category = req.body.category || post.category
            const updatedPost = await post.save()
            res.status(201).send(updatedPost)
        }else{
            res.status(401)
            throw new Error('Not Authorized for this action')
        }
    } catch (error) {
        res.status(401)
        console.log(error);
    }
}