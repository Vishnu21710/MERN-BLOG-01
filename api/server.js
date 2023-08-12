import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import commentRouter from './routes/commentRoute.js'
import blogRouter from './routes/blogRoute.js'
import userRouter from './routes/userRoute.js'
import { errorHandler, notFound } from './Middleware/errorMiddleware.js'
import path from 'path'

dotenv.config()

const app = express()
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(cookieParser())
// app.use(express.urlencoded({extended: true}))
app.use(express.json())
const __dirname = path.resolve()
console.log(__dirname);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/comments', commentRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)

app.get('/', (req, res)=>{
    res.status(200).send('Server is Ready')
})

app.use(notFound)
app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected To Database');
})

app.listen(8080, ()=>{
    console.log(`Listening to port 8080`);
})