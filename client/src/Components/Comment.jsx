import React from 'react'

const Comment = ({user, comment}) => {
    return (
        <div className='flex flex-col '>
            <div className='author flex items-center gap-5'>
                <img className='w-20 h-20 rounded-full object-cover object-center' src={`http://localhost:8080/${user.picture}`} alt="" />
                <div className='flex flex-col gap-4 w-4/6'>
                    <h1 className='text-gray-700 font-bold text-xl'>{user.name} <span className='text-md font-normal text-indigo-500 ml-3 '>25 Dec, 2023</span></h1>
                    <p className='text-gray-700'>{comment}.</p>
                </div>
            </div>
            <hr className='bg-indigo-400 my-5 ' />
        </div>

    )
}

export default Comment