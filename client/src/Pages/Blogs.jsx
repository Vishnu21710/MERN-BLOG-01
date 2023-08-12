import React, {useState} from 'react'
import Wrapper from '../Components/Wrapper'
import BlogLibraryCard from '../Components/BlogLibraryCard'
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Button, TextField, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecentPosts from '../Components/RecentPosts';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useGetBlogsQuery } from '../slices/apiSlice';
import { ClipLoader } from 'react-spinners';
import { useLocation, useNavigate } from 'react-router-dom';
import Tags from '../Components/Tags';

const Blogs = () => {
  const navigate = useNavigate()
 
  const location = useLocation()
  const category = location.search && location.search.split("=")[1]
  const [page, setPage] = useState(1)
  
  const indexOFLastPage = page * 5
  const currentPage = indexOFLastPage - 5
  
  const {data: blogs, isLoading, isFetching, isError, error } = useGetBlogsQuery(category)
  
  console.log('BLOGS');
  const handleChange = (e, value)=>{
    setPage(value)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }
  

  const handleClick = (cat)=>{
    navigate(`/blogs?category=${cat}`)
    setPage(1)
  }

  return (
    <div>
      <div className='bg-[url("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80")] h-[500px] w-full relative bg-cover bg-center'>
        <div className='bg-black opacity-60 h-full'></div>
        <div className='flex flex-col gap-3 items-center w-full  opacity-100 absolute top-[50%] mx-auto text-white'>
          <h1 className='text-5xl font-bold '>The Blog Library: Explore Our Articles</h1>
          <p className='text-3xl font-semibold'>Home / Blogs</p>
        </div>
      </div>

      <Wrapper>
        <div className='flex gap-3 w-full'>
          {
            isLoading ? <ClipLoader color="#36d7b7" /> : (
              <div className='left flex flex-col gap-20  w-[70%]'>
                {
                  blogs.length > 0 ? blogs.slice(currentPage, indexOFLastPage).map((blog)=>(
                    <BlogLibraryCard {...blog} key={blog._id} user={blog.userId}/>
                  )) : 'Opps not found'
                }
              <Pagination page={page} onChange={handleChange} count={Math.ceil(blogs?.length / 5)} shape="rounded" size='large'/>
              </div>
            )
          }
          


          {/* {Author Component} */}

          <div className='right w-[30%] flex flex-col gap-10'>
            <div className='flex flex-col gap-6 justify-center items-center bg-[#F9FAFF] p-5  rounded-lg border-[1px] border-indigo-50'>
              <img src="https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="" className='w-52 h-52 rounded-full object-cover object-center' />
              <h1 className='text-gray-700 font-bold text-2xl'>James Anderson</h1>
              <p className='text-gray-700 w-4/6'>Hi! beautiful people. I`m One of the Creator and  Authtor of this blog. Read our post - stay with us</p>
              <div className='flex items-center gap-9'>
                <button className='rounded-full p-2 bg-[#EEEFF7]'><TwitterIcon /></button>
                <button className='rounded-full p-2 bg-[#EEEFF7]'><LinkedInIcon /></button>
                <button className='rounded-full p-2 bg-[#EEEFF7]'><InstagramIcon /></button>
                <button className='rounded-full p-2 bg-[#EEEFF7]'><PinterestIcon /></button>
              </div>
            </div>


            {/* Search  Component */}
            <div className='flex flex-col my-6 rounded-lg border-[1px] border-indigo-50 p-5'>
              <h1 className='text-lg font-semibold text-gray-700 mb-3'>Search Post</h1>
              <div className='flex gap-2'>
                <hr className='w-1/6 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-2/6 border-4 rounded-full' />
              </div>
              <div className='flex gap-3 items-center mt-5 '>
                <TextField variant='outlined' label="Search Post" fullWidth />
                <Button variant='contained' color='info' sx={{ paddingY: "15px" }}><SearchIcon /></Button>
              </div>
            </div>


            {/* {Tags Component} */}

            <div className='rounded-lg border-[1px] border-indigo-50 p-5'>      
              <div className='flex flex-wrap gap-5 w-full mt-5'>
                <Tags handleClick={handleClick}/>
              </div>
            </div>

            {/* {Recent Posts} */}
            <div className='rounded-lg border-[1px] border-indigo-50 p-0 mt-5'>
              {
             
              !isLoading &&  <RecentPosts blogs={blogs}/>
              }
            </div>


            {/* {Contact} */}


            <div className='mt-5 flex flex-col gap-5 p-10 bg-[#3756F7] text-white'>
              <h1 className='text-3xl font-semibold'>How We Can Help You!</h1>
              <p className='text-xl'>labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis</p>
              <Button variant='outlined' sx={{borderColor: 'white', color: 'white'}}>Contact <ArrowRightAltIcon/></Button>
            </div>

          </div>
        </div>

      </Wrapper>
    </div>


  )
}

export default Blogs