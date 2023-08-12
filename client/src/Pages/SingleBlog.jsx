import React, { useEffect, useRef, useState } from 'react'
import Wrapper from '../Components/Wrapper'
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RecentPosts from '../Components/RecentPosts';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import PersonIcon from '@mui/icons-material/Person';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';;
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Comment from '../Components/Comment';
import { useGetBlogPostQuery, useGetCommentsQuery, useMakeCommentMutation, useGetBlogsQuery } from '../slices/apiSlice';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useNavigate, Link } from 'react-router-dom';
import Tags from '../Components/Tags';
import { useSelector } from 'react-redux';

const SingleBlog = () => {
  const {userInfo} = useSelector(state=>state.user)


  const target = useRef()

  const { id } = useParams()


  const [slice, setSlice] = useState(3)

  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  console.log(category);
  const [commentForm, setCommentForm] = useState({
    blogId: id,
    linkedin: '',
    comment: '',
    email: ''
  })

  useEffect(()=>{
    setCommentForm(preval=>({...preval, blogId: id, linkedin: '', comment: '', email: ''}))
  }, [id])



  const { data, isFetching, isLoading, isError, error, refetch } = useGetBlogPostQuery(id)

  const {data:comments, isLoading:gettingComments, isError:gettingCommentsError, isFetching:fetchingComments, refetch:refetchComment, error: commmentError} = useGetCommentsQuery(id)

  const [newComment, { isLoading: commentLoading, isError: commentError }] = useMakeCommentMutation()

  const {data:allBlogs, isLoading:allBlogsLoading, error: allBlogsError} = useGetBlogsQuery(category)

  console.log(comments, id);


  const handleSLice = ()=>{
    if(!gettingComments){
      if(slice >= comments.length){
        setSlice(3)
      }else{
        setSlice(preval=>preval  + 3)
      }
    }
    
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCommentForm((preval) => ({ ...preval, [name]: value }))
  }

  const createNewComment = async (e) => {
    e.preventDefault()
    try {
      console.log(id);
      const res = await newComment({ ...commentForm }).unwrap()
      console.log(id);
      setCommentForm(pre=>({...pre, blogId:id, email: '', linkedin: '', comment: ''}))
      refetchComment()
    } catch (error) {
      console.log(error);
    }
  }
  console.log(commentError);

  const handleCategory = (cat)=>{
  
    navigate(`/blogs?category=${cat}`)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const nextPost = ()=>{
        if(!isLoading && !allBlogsLoading){
            const index = allBlogs.findIndex(obj=>(
              obj._id === id
            ))
            console.log(allBlogs);
            let newIndex = index + 1
            if(newIndex >= allBlogs.length-1){
              newIndex = allBlogs.length - 1
            }
            navigate(`/blog/${allBlogs[newIndex]._id}`)
            setSlice(3)
        }
        setCommentForm(pre=>({...pre, blogId:id}))
        target.current.scrollIntoView({top: 0, behavior: 'smooth'})
        
  }
  const previousPost = ()=>{
    if(!isLoading && !allBlogsLoading ){
        const index = allBlogs.findIndex(obj=>(
          obj._id === id
        ))
        let newIndex = index - 1
        if(newIndex <= 0){
          newIndex = 0
        }
        navigate(`/blog/${allBlogs[newIndex]._id}`)
        setSlice(3)
    }
    target.current.scrollIntoView({top: 0, behavior: 'smooth'})

}


  return (
    <div>
      <div className='bg-[url("https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80")] h-[500px] w-full relative bg-cover bg-center'>
        <div className='bg-black opacity-60 h-full'></div>
        <div className='flex flex-col gap-3 items-center w-full  opacity-100 absolute top-[50%] mx-auto text-white'>
          {/* {Blog Title} */}
          <h1 className='text-5xl font-bold '>The Blog Library: Explore Our Articles</h1>
          <p className='text-3xl font-semibold'>Home / Blogs</p>
        </div>
      </div>

      <Wrapper>

        {/* {Blog Head} */}
        <div className='flex gap-3 w-full' ref={target}>
          {
            isLoading ? <ClipLoader color="#36d7b7" /> : <div className='left flex flex-col gap-20  w-[70%]'>
              <div className='w-[85%] flex flex-col gap-4 group cursor-pointer'>
                <div className='h-[400px] overflow-hidden'>
                  <img src={`http://localhost:8080/${data.cover}`} alt="" className='h-[400px] w-full object-cover object-center group-hover:scale-110 transition-transform group-hover:grayscale' />
                </div>
                <div className='flex items-center gap-4 text-gray-500'>

                  <p><PersonIcon /> By {data.userId.name}</p>
                  <p><ModeCommentIcon /> <span>{data.comment}</span></p>
                  <p><CalendarMonthIcon /> <span>25 Dec, 2023</span></p>
                  {(userInfo &&(userInfo._id === data.userId._id)) && <Link to={`/update/${data._id}`}><Button variant='outlined' size='md' color='secondary'>Update Post</Button></Link>}
                </div>
                <h1 className='text-3xl text-gray-700 font-bold'>{data.title}</h1>
                <p className='text-justify text-gray-800'>{data.description}</p>
              </div>
              <div dangerouslySetInnerHTML={{ __html: data.body }} className='singleblog w-5/6 text-justify'>

              </div>
              <hr className='bg-indigo-400 w-[85%]' />
              <div className='w-[85%] flex flex-col gap-10'>
                <div className='share flex items-center gap-4 text-gray-700 text-lg' >
                  <p>Share <ShareIcon sx={{ fontSize: "15px" }} /></p>
                  <span>|</span>
                  <IconButton><LinkedInIcon /></IconButton>
                  <IconButton><InstagramIcon /></IconButton>
                  <IconButton><TwitterIcon /></IconButton>
                </div>
{/* {Author Section} */}
                <Link onClick={()=>window.scrollTo({top: 0, behavior: 'smooth'})} to={`/user/${data.userId._id}`} className='author flex items-center gap-5'>
                  <img className='w-36 h-36 rounded-full object-cover object-center' src={`http://localhost:8080/${data.userId.picture}`} alt="" />
                  <div className='flex flex-col gap-4 w-4/6'>
                    <h1 className='text-gray-700 font-bold text-2xl'><span>Author: </span>{data.userId.name}</h1>
                    <p className='text-gray-700 '>{data.userId.description.length > 161 ? data.userId.description.substring(0, 161)+'...' : data.userId.description}</p>
                    <div className='flex items-center gap-3'>
                      <InstagramIcon />
                      <PinterestIcon />
                      <TwitterIcon />
                    </div>
                  </div>
                </Link>
{/* {Hanlde next post and previous posts} */}

                <div className='previous-next flex items-center '>
                  <div onClick={previousPost}  className='group/previous flex flex-col gap-5 items-start border-[1px] border-indigo-100 w-1/2 border-r-0 p-10 cursor-pointer'>
                    <p className='uppercase group-hover/previous:text-indigo-400 text-xl'>Previous Post <KeyboardDoubleArrowLeftIcon sx={{ fontSize: '2rem' }} /></p>
                    <p className='text-mf'>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
                  </div>
                  <div onClick={nextPost} className='group/next flex flex-col items-end border-[1px] border-indigo-100 w-1/2 p-10 gap-5 cursor-pointer'>
                    <p className='uppercase group-hover/next:text-indigo-400 text-xl'>Next Post <KeyboardDoubleArrowRightIcon sx={{ fontSize: '2rem' }} /></p>
                    <p className='text-end text-mf'>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.</p>
                  </div>
                </div>

                {/* {Comment Section} */}

                <div className={`comments flex flex-col gap-4 ${fetchingComments ? 'opacity-20': 'opcacity-100'}`}>
                  <h1 className={` text-2xl font-bold text-gray-700`}>COMMENTS</h1>
                  {
                    gettingComments  ? <ClipLoader color="#36d7b7" /> : (
                      comments?.slice(0, slice).map((c)=>(
                        <Comment key={c._id} user={c.userId} {...c}/>
                      ))
                    )
                  }
                  
                </div>
                <Button variant='outlined' color='secondary' onClick={handleSLice}>Load More</Button>
                {/* {Create Comments Section} */}
                <div className='post-comments flex flex-col gap-4'>
                  <h1 className='text-2xl font-bold text-gray-700'>POST COMMENTS</h1>
                  <div className='grid grid-cols-2 text-gray-700 gap-4'>
                    <label htmlFor="" className='col-span-2 text-lg'>Your Comment</label>
                    <textarea value={commentForm.comment} onChange={handleChange} className='ring-1 p-4 ring-indigo-400 rounded-md col-span-2' placeholder='Write Your Comment...' name="comment" id="" cols="30" rows="10" ></textarea>
                    <TextField value={commentForm.name} label="Enter Your Name" />
                    <TextField value={commentForm.linkedin} onChange={handleChange} name='linkedin' label="Enter Your Linkedin ID" />
                    <TextField value={commentForm.email} onChange={handleChange} name='email' label="Enter Your Email" className='col-span-2' />
                    <Button onClick={createNewComment} variant='contained' sx={{ backgroundColor: '#3756F7' }} size='large' className='col-span-2'>Post Comment</Button>
                  </div>
                </div>

              </div>
            </div>


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
              <Tags handleClick={handleCategory}/>
            </div>

            {/* {Recent Posts} */}
            <div className='rounded-lg border-[1px] border-indigo-50  mt-5'>
              {
              
              (allBlogsLoading || isLoading) ? <ClipLoader color="#36d7b7" /> : <RecentPosts type={'related'} blogs={allBlogs.filter((blog)=>(blog.category === data.category ))}/>
              }
            </div>


            {/* {Contact} */}


            <div className='mt-5 flex flex-col gap-5 p-10 bg-[#3756F7] text-white'>
              <h1 className='text-3xl font-semibold'>How We Can Help You!</h1>
              <p className='text-xl'>labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis</p>
              <Button variant='outlined' sx={{ borderColor: 'white', color: 'white' }}>Contact <ArrowRightAltIcon /></Button>
            </div>

          </div>
        </div>

      </Wrapper>
    </div>

  )
}

export default SingleBlog