import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import PersonIcon from '@mui/icons-material/Person';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useSelector } from 'react-redux';

const BlogLibraryCard = ({title, description, cover, _id, user, userId, comment}) => {

  const {userInfo} = useSelector(state=>state.user)

  return (
    <Link onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}  to={`/blog/${_id}`} className='w-[85%] flex flex-col gap-4 group cursor-pointer'>
        <div className='h-[400px] overflow-hidden'>
        <img src={`http://localhost:8080/${cover}`} alt="" className='h-[400px] w-full object-cover object-center group-hover:scale-110 transition-transform group-hover:grayscale'/>
        </div>
        <div className='flex items-center gap-4 text-gray-500'>
                
                <p><PersonIcon/> By {user.name}</p>
                <p><ModeCommentIcon/> <span>Comments {comment}</span></p>
                <p><CalendarMonthIcon/> <span>25 Dec, 2023</span></p>
                {(userInfo && (userInfo._id === user._id)) && <Link to={`/update/${_id}`}><Button variant='outlined' size='md' color='secondary'>Update Post</Button></Link>}
        </div>
        <h1 className='text-3xl text-gray-700 font-bold'>{title}</h1>
        <p className='text-gray-600'>{description.length > 190 ? description.substring(0, 190)+'...' : description}</p>
        <Button>Read More...</Button>
    </Link>
  )
}

export default BlogLibraryCard