import jwt from 'jsonwebtoken'
import User from '../Models/User.js'


const protect = async(req, res, next)=>{
    const token = req.cookies.token
    if(token){
        try {      
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized / Token Expired / Incvalid Token')
        }
    }else{
        res.status(401)
        throw new Error('Not auhtorized / No token')
    }
}

export default protect