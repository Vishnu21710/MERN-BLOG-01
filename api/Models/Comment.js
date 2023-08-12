import { Schema, model } from "mongoose";

const commentSchema = Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    blogId: {
        type: String,
        required: true,
        ref: 'Blog'
    },
    comment: {
        type: String,
        required: true
    },
    linkedin:{
        type:String
    },
    email: {
        type: String
    }
})

export default model('Comment', commentSchema)