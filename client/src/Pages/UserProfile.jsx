import React, { useState } from 'react'
import Wrapper from '../Components/Wrapper'
import { useGetUserBlogsQuery, useGetUserQuery } from '../slices/apiSlice'
import BlogCard from '../Components/BlogCard'
import { useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { Button, TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { useUpdateUserMutation } from '../slices/apiSlice';
import { setCredentials } from '../slices/userSlice'



export const UpdateUser = ({setUpdate}) => {

  const {userInfo} = useSelector(state=>state.user)


  const [cover, setCover] = useState('')
  const dispatch = useDispatch()

  console.log('YOYOYOY');
  const [updateUser, {isLoading, isError, error}] = useUpdateUserMutation()

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    description: ''
  })

  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('username', form.username)
  formData.append('email', form.email)
  formData.append('password', form.password)
  formData.append('description', form.description)
  formData.append('picture', cover)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(preval => ({ ...preval, [name]: value }))
  }

  const update = async(e)=>{
    e.preventDefault()
    console.log('Inside Submit');
    try {
      const res = await updateUser(formData).unwrap()
      dispatch(setCredentials({...res}))
      setUpdate(false)
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form className='grid grid-cols-2 gap-5' onSubmit={update}>
      <TextField onChange={handleChange} name='name' variant='outlined' label='Enter Name' />
      <TextField onChange={handleChange} name='username' variant='outlined' label='Enter Username' />
      <TextField onChange={handleChange} name='email' variant='outlined' label='Enter Email' />
      <TextField onChange={handleChange} name='password' variant='outlined' label='Enter Password' />
      <TextField className='col-span-2' onChange={handleChange} name='description' variant='outlined' label='Enter Description' />
      <TextField className='col-span-2' onChange={(e)=>setCover(e.target.files[0])} name='name' type='file' variant='outlined' />
      <Button type='submit'   className='col-span-2' variant='contained' color='secondary'>Submit</Button>
    </form>
  )
}


const UserProfile = () => {
  const { id } = useParams()
  const { userInfo } = useSelector(state => state.user)
  const {data:userData, isLoading:isUser, error: userError} = useGetUserQuery(id)

  console.log(userInfo);

  const [update, setUpdate] = useState(false)


  const { data: userBlogs, isLoading, isError, error } = useGetUserBlogsQuery(id)



  return (
    <Wrapper>
      {
        isUser ? <ClipLoader color="#36d7b7" /> : (
          <div className='flex gap-5 items-center'>

            <div className='left  w-1/2'>
              <div className='flex flex-col gap-5  text-gray-700'>
                <img className='w-full h-[600px] object-cover object-center rounded-md ' src={`http://localhost:8080/${userData.picture}`} alt="" />
              </div>
            </div>

            <div className='right w-1/2 text-gray-700'>
              <div className='flex flex-col gap-10'>
                <h1 className='text-4xl  font-bold'>User Information</h1>
                <div className='flex gap-2'>
                  <hr className='w-1/6 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-2/6 border-4 rounded-full' />
                </div>
                {
                  update ? <UpdateUser setUpdate={setUpdate} /> : (
                    <div className='flex flex-col gap-10'>
                      <p className='text-3xl font-semibold'>{userData.name}, <span className='text-lg italic'>Since - 25 Dec, 2023</span></p>
                      <p className='text-2xl'><span className='font-bold'>Email:</span> {userData.email}</p>
                      <p className='text-xl'><span className='font-bold'>Description:</span> {userData.description}</p>
                      {(userInfo?._id === userData._id) && <Button onClick={() => setUpdate(true)} variant='outlined' color='secondary'>Update Profile</Button>}
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        )
      }

      <div className='blogs my-10 flex flex-col gap-5'>
        <h1 className='text-4xl  font-bold '>User Blogs</h1>
        <div className='flex gap-2'>
          <hr className='w-1/6 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-2/6 border-4 rounded-full' />
        </div>

        <div className='flex gap-3 flex-wrap items-center'>
          {
            isLoading ? <ClipLoader color="#36d7b7" /> : isError ? 'Something Went Wrong' : (
              userBlogs.map((blog) => (
                <BlogCard key={blog._id} {...blog} user={blog.userId} />
              ))
            )
          }
          {userBlogs?.length === 0 && 'No Blogs Available' }
        </div>
      </div>
    </Wrapper>
  )
}

export default UserProfile