import Blog from "../Models/Blog.js";
import Comment from "../Models/Comment.js"

export const createComment = async(req, res)=>{
    console.log('inside create Comment', req.user._id);
    
    try {
        const comment = await Comment.create({...req.body, userId: req.user._id})
        if(comment){
            await Blog.findByIdAndUpdate(req.body.blogId, {$inc:{comment: 1}})
        }
        res.status(201).send(comment)
    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
}

export const getComments = async(req, res)=>{
    const id = req.params.id
    console.log('Comment Blog Id',id);
    try {
        
        const comments = await Comment.find({blogId:id}).populate('userId', ['name', 'picture'])
        
        

        res.status(201).send(comments)

    } catch (error) {
        res.status(400).send(error)
        console.log(error);
    }
}