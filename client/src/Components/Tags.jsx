import React from 'react'
import { Button } from '@mui/material'

const Tags = ({handleClick}) => {
    return (
        <div>
            <h1 className='text-lg font-semibold text-gray-700 mb-3'>Tags</h1>
              <div className='flex gap-2'>
                <hr className='w-1/6 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-2/6 border-4 rounded-full' />
              </div>
              <div className='flex flex-wrap gap-2  mt-5'>
                <button onClick={()=>handleClick('technology') >window.scrollTo({top: 5, behavior: 'smooth'})}  className='bg-[#ECF4FB]  hover:text-white hover:bg-purple-600 transition-colors ease-out py-3 px-5 rounded-md'>Tech</button>
                <button variant='contained' className='bg-[#ECF4FB] hover:text-white hover:bg-purple-600 transition-colors ease-out py-3 px-5 rounded-md'>Food</button>
                <button onClick={()=>handleClick('lifestyle') >window.scrollTo({top: 5, behavior: 'smooth'})}  className='bg-[#ECF4FB] hover:text-white hover:bg-purple-600 transition-colors ease-out py-3 px-5 rounded-md'>Life Style</button>
                <button onClick={()=>handleClick('sports') >window.scrollTo({top: 5, behavior: 'smooth'})}  className='bg-[#ECF4FB] hover:text-white hover:bg-purple-600 transition-colors ease-out py-3 px-5 rounded-md'>Fitness</button>
                <button variant='contained' className='bg-[#ECF4FB] hover:text-white hover:bg-purple-600 transition-colors ease-out py-3 px-5 rounded-md'>Gym</button> 
                <button variant='contained' className='bg-[#ECF4FB] hover:bg-purple-600 hover:text-white transition-colors ease-out py-3 px-5 rounded-md'>Self Immprovement</button>
                <button variant='contained' className='bg-[#ECF4FB] hover:text-white hover:bg-purple-600 transition-colors ease-out py-3 px-5 rounded-md'>Motivation</button>
                <button onClick={()=>handleClick('sports') >window.scrollTo({top: 5, behavior: 'smooth'})}  className='bg-[#ECF4FB] hover:text-white hover:bg-purple-600 transition-colors ease-out py-3 px-5 rounded-md'>Sports</button>
              </div>
        </div>

    )
}

export default Tags