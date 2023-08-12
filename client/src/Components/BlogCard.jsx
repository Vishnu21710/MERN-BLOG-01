import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'


const BlogCard = ({title, cover, description, category, _id, user}) => {
    return (
        <Link onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})} to={`/blog/${_id}`} className='card flex flex-col group w-[320px] text-gray-700 gap-5 cursor-pointer border-b-2 pb-4 '>
            <div className='image h-[15rem] w-full  relative rounded-xl overflow-hidden'>
                <img src={`http://localhost:8080/${cover}`} alt="" className='object-cover object-center h-full w-full  group-hover:scale-110 group-hover:grayscale transition-all ease-out' />
                <button className='cursor-pointer px-6 py-1 rounded-sm text-white text-md  uppercase absolute top-4 left-4 bg-[#3756F7]'>{category}</button>
            </div>
            <div className='content  flex flex-col gap-7 '>
                <h1 className='font-bold text-[18px]'>{title.length > 54 ? title.substring(0, 53)+'...' : title}</h1>
                <div className='flex items-center justify-start gap-3 text-sm text-blue-700 text-[15px]'>
                    <img src={`http://localhost:8080/${user.picture}`} alt="" className='w-[50px] h-[50px] rounded-full object-cover object-center  ' />
                    <p>By {user.name}</p>
                    <span>23 Dec, 2023</span>
                </div>
                <p className='text-gray-500'>
                    { description.length > 115 ?description.substring(0, 115)+'...' : description }
                </p>
            </div>
        </Link>
    )
}

export default BlogCard