import React from 'react'
import { Link } from 'react-router-dom'

const RecentPostCard = ({title, cover, description, _id}) => {
  return (
    <Link to={`/blog/${_id}`} onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})} className='flex items-center justify-between gap-3 cursor-pointer group'>
        <img src={`http://localhost:8080/${cover}`} alt="" className='w-[90px] h-[90px] object-cover object-center rounded-md' />
        <div className='flex flex-col gap-2   text-gray-600 '>
                <p className='text-xs '>25 Dec, 2023</p>
                <p className='text-[14px] group-hover:text-blue-600 transition-colors font-semibold '>{title.length > 40 ? title.substring(0, 42)+'...' : title}</p>
        </div>
    </Link>
  )
}

export default RecentPostCard