import React from 'react'
import RecentPostCard from './RecentPostCard'

const RecentPosts = ({blogs, type}) => {
    return (
        <div className='sticky top-0  p-2'>
            <div className='relative p-2 '>
                <h1 className='text-lg font-semibold text-gray-700 mb-3'>{type ? 'Related Post': 'Recent Post'}</h1>
                <div className='flex gap-2'>
                    <hr className='w-1/6 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-5/6 border-4 rounded-full' />
                </div>
                <div className='flex flex-col gap-4 mt-7'>
                    {
                        blogs.slice(0, 6).map((blog)=>(
                    <RecentPostCard {...blog} key={blog._id} />

                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default RecentPosts