import React from 'react'
import Wrapper from '../Components/Wrapper'
import { useGetUserBlogsQuery } from '../slices/apiSlice'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import BlogLibraryCard from '../Components/BlogLibraryCard'
const MyBlogs = () => {
  const {userInfo} = useSelector(state=>state.user) 
  console.log(userInfo);
  const {data:userBlogs, isLoading, isError, error} = useGetUserBlogsQuery(userInfo._id)
  console.log(userBlogs);
  return (
    <Wrapper>
      <div className='w-4/6'>
      {
            isLoading ? <ClipLoader color="#36d7b7"/> : (
              userBlogs.map((blog)=>(
                <BlogLibraryCard key={blog._id} {...blog} user={blog.userId}/>
              ))
            )
          }
      </div>
          
    </Wrapper>
  )
}

export default MyBlogs