import { Button } from '@mui/material'
import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
const HeaderCard = ({type, cover, category, title, description, _id, user}) => {



  return (
    <Link onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})} to={`/blog/${_id}`} className='relative group overflow-hidden h-full  flex items-end rounded-lg cursor-pointer'>
            <div className='bg-black h-full w-full absolute opacity-30  z-0'></div>
            <img src={`http://localhost:8080/${cover}`} alt="" className='bg-cover bg-center group-hover:scale-110 transition-transform ease-in-out duration-200 absolute -z-10 object-cover object-center w-full h-full ' />
            <div className='flex flex-col gap-7    items-start  px-5 pb-5 pt-14 z-10'>
                                <Button  color='success' sx={{color: 'white', borderColor: 'white', border: '3px solid white'}}>{category}</Button>
                                <h1 className={`${!type ? 'text-lg font-bold' : 'text-3xl'} font-bold text-white`}>{title.length > 45 ? title.substring(0, 45)+'...' : title}</h1>
                                <p className={`${type !== '1st' ? 'hidden': ''} text-gray-100`}>{description.length > 155 ? description.substring(0, 115)+'...' : description}</p>
                                <div className='flex items-center gap-4 text-gray-100 text-sm'>
                                    <img src={`http://localhost:8080/${user?.picture}`} alt="" className='w-[50px] h-[50px] rounded-full object-cover object-center group-hover:scale-110 transition-transform' />
                                    <p>By {user?.name}</p>
                                    <span>23 Dec, 2023</span>
                                </div>
            </div>
    </Link>
  )
}

export default HeaderCard



