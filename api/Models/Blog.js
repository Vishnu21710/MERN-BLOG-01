import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    cover: {
        type:String,
        required: true
    },
    comment: {
        type:Number,
        default:0
    },
    category:{
        type: String,
        required: true
    }
}, {
    timestamps:true
})

export default model('Blog', blogSchema)