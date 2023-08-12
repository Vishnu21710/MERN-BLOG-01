import React, { useState } from 'react'
import Wrapper from '../Components/Wrapper'
import { TextField, Button, TextareaAutosize } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../slices/userSlice'
import { useLoginUserMutation } from '../slices/apiSlice'
import { ClipLoader } from 'react-spinners'

const Login = () => {

  const [signInOption, setSignInOption] = useState('username')
  const [loginUser, {isLoading, isError}] = useLoginUserMutation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async()=>{
        try {
          const res = await loginUser({username, password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate('/')
        } catch (error) {
          console.log(error);
        }
  }

  return (
    <Wrapper>
      <div className='flex gap-5'>
        <div className='left w-1/2 bg-[url("https://images.unsplash.com/photo-1493515114968-cd0f4e52bf18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80")] rounded-md bg-cover bg-center' >

        </div>
        <div className='right w-1/2 '>
          <Wrapper>
            <div className='grid grid-cols-2 gap-10'>
              <h1 className='col-span-2 text-4xl font bold text-gray-700'>Log In</h1>
              {
                signInOption === 'email' ? <TextField label="Enter Email" className='col-span-2' /> : <TextField onChange={(e)=>setUsername(e.target.value)} label="Enter Username" className='col-span-2' />
              }
              <p className='col-span-2'>Sign in using <span>{signInOption === 'email' ? <Button onClick={() => setSignInOption('username')}>Username</Button> : <Button onClick={() => setSignInOption('email')}>Email</Button>}</span></p>

              <TextField label="Enter Password" className='col-span-2' onChange={(e)=>setPassword(e.target.value)} />
              <Button color='secondary' variant='contained' size='large' onClick={handleLogin}>Login</Button>
              {isLoading &&  <ClipLoader color="#36d7b7" />}
              <div className='text-sm text-gray-800 flex items-center gap-3 col-span-2'>
                <p>Don't have an account ? </p>
                <Link to={'/register'} className='text-blue-500'>Sign Up</Link>
              </div>
            </div>
          </Wrapper>
        </div>
      </div>

    </Wrapper>
  )
}

export default Login