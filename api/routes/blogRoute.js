import { Router } from "express";
import { getPost, getPosts, createBlogPost, updatePost, getUserBlogs } from "../Controller/blogController.js";
import protect from "../Middleware/jwt.js";
import multer from 'multer'

const upploadMiddleware = multer({dest: 'uploads/'})

const blogRouter = Router()

blogRouter.route('/').get(getPosts).post(protect, upploadMiddleware.single('cover'), createBlogPost)
blogRouter.route('/:id').get(getPost).put(protect , upploadMiddleware.single('cover'),updatePost)
blogRouter.get('/user-blog/:id', getUserBlogs)

export default blogRouter