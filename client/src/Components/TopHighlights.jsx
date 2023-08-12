import React, { useEffect, useState } from 'react'
import Wrapper from './Wrapper'
import BlogCard from './BlogCard'
import RecentPosts from './RecentPosts'
import { Button } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useGetBlogsQuery } from '../slices/apiSlice'
import { ClipLoader } from 'react-spinners'

const TopHighlights = () => {

    const {data:blogs, isLoading, isError, error} = useGetBlogsQuery('')
    const [slice, setSlice] = useState(6)


    useEffect(()=>{
        if(!isLoading){
            if(slice > blogs.length){
                    setSlice(blogs.length)
            }
        }
        
    }, [blogs, slice])
    console.log(slice);

    return (
        <Wrapper>
            <h1 className='text-3xl font-bold py-3'> <span className=''>Today's</span> <span className=''>Top</span> Highlights</h1>
            <div className='flex gap-2'>
                <hr className='w-28 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-1/6 border-4 rounded-full' />
            </div>
            <div className='w-full flex gap-5 py-5'>
                <div className='left flex  flex-wrap gap-7 w-[70%] '>
                    {
                        isLoading ? <ClipLoader color="#36d7b7" /> : (
                            blogs.slice(0, slice).map((blog)=>(
                                <BlogCard key={blog._id} {...blog} user={blog.userId}/>
                            ))
                        )
                    }
                    
                    
                </div>
                <div className='right w-[30%] border-[1px] border-indigo-50  px-2 rounded-md relative'>
                    {
                        isLoading ? <ClipLoader color="#36d7b7" /> : (
                            <div className='sticky top-2'>
                                    <RecentPosts blogs={blogs}/>
                            </div>
                        )
                    }
                        
                </div>
            </div>
            <div className='self-center'>
                <Button onClick={()=>setSlice(preval=>preval + 6)} variant='contained' color='secondary'>Load More <ArrowDropDownIcon/></Button>
            </div>
        </Wrapper>
    )
}

export default TopHighlights