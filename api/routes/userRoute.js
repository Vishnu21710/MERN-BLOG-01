import { Router } from "express";
import { getUser, getUsers, registerUser, updateUser, getUserProfile, loginUser, logoutUser } from "../Controller/userContrioller.js";
import protect from "../Middleware/jwt.js";
import multer from 'multer'

const upploadMiddleware = multer({dest: 'uploads/'})

const userRouter = Router()

userRouter.route('/').post(upploadMiddleware.single('picture') ,registerUser).get(getUsers)
userRouter.get('/:id' , getUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout',protect, logoutUser)
userRouter.route('/profile').get(protect, getUserProfile).put(upploadMiddleware.single('picture'),protect, updateUser)

export default userRouter