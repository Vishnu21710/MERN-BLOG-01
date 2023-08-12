import React, {useState} from 'react'
import Wrapper from '../Components/Wrapper'
import { TextField, Button, TextareaAutosize } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterUserMutation } from '../slices/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/userSlice'
import {ClipLoader} from 'react-spinners'


const Register = () => {
  const [picture, setPicture] = useState('')





  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    description: '',
  })


  console.log(form);

  // console.log(Array.from(picture)[0]);

  const [registerUser, {isLoading, isError}] = useRegisterUserMutation()

  const handleChange = (e)=>{
    const {name, value} = e.target
    setForm((preval)=>({...preval, [name]: value}))
  }

  const dispatch = useDispatch()
  const navigate = useNavigate() 

  const register = async(e)=>{
      const {confirmPassword, ...body} = form
      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email);
      formData.append('username', form.username);
      formData.append('password', form.password);
      formData.append('description', form.description);
      formData.append('picture', picture);
      console.log(formData);
      e.preventDefault()
      try {
            if(form.password === form.confirmPassword){
              const res = await registerUser(formData).unwrap()
              console.log(res);
              dispatch(setCredentials({...res}))
              navigate('/')

            }else{
              console.log('Password does not match');
            }
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <Wrapper>
      <div className='flex gap-5 items-center'>
        <div className='left w-[55%] h-[600px]  bg-[url("https://images.unsplash.com/photo-1493515114968-cd0f4e52bf18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")] rounded-md bg-cover bg-center' >

        </div>
        <div className='right w-[45%] '>
          <div className='p-5 shadow-md'>
            <form encType="multipart/form-data" onSubmit={register} className='grid grid-cols-2 gap-10'>
              <h1 className='col-span-2 text-4xl font bold text-gray-700'>Register</h1>
              <TextField value={form.name} onChange={handleChange} label="Enter Name" name='name'/>
              <TextField value={form.username} onChange={handleChange} label="Enter Username" name='username'/>
              <TextField value={form.email} onChange={handleChange} label="Enter Email" name="email" className='col-span-2' />
              <TextField value={form.password} onChange={handleChange} label="Enter Set Password" name='password' />
              <TextField onChange={handleChange} label="Enter Confirm Password" name='confirmPassword' />
              <TextField  className='col-span-2' type='file' onChange={(e)=>setPicture(e.target.files[0])} name='picture'/>
              <textarea value={form.description} onChange={handleChange} name='description' className='p-4 ring-gray-400 rounded-sm ring-1 col-span-2' placeholder='Short description about your self...'></textarea>
              <Button type='submit' color='secondary' variant='contained' size='large'>Register</Button>
               <p>{isLoading && <ClipLoader color="#36d7b7" />}</p>
              <div className='text-sm text-gray-800 flex items-center gap-3 col-span-2'>
                <p>Already have an account ? </p>
                <Link to={'/login'} className='text-blue-500'>Sign In</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

    </Wrapper>
  )
}

export default Register