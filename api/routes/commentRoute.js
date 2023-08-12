import { Router } from "express";
import protect from "../Middleware/jwt.js";
import { createComment, getComments } from "../Controller/commentController.js";

const commentRouter = Router()

commentRouter.post('/', protect, createComment)
commentRouter.get('/:id', getComments)

export default commentRouter