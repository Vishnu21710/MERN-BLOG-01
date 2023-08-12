import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import RecentPosts from './RecentPosts'
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutUserMutation } from '../slices/apiSlice';
import { logout } from '../slices/userSlice';
import { ClipLoader } from 'react-spinners';

const Navbar = () => {

  const {userInfo} = useSelector(state=>state.user)
  const [link, setLink] = useState('')
  const [menu, setMenu] = useState(false)
  const [logoutUser, {isLoading, isError}] = useLogoutUserMutation()

  const dispatch = useDispatch()

  

  const handleLogout = async()=>{
      try {
        console.log('inside handle logout');
          const res = await logoutUser().unwrap()
          console.log('done');
          dispatch(logout())
          console.log(res);
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <nav className='text=[#333333] flex justify-between px-5 items-center py-2  '>
      <div className='flex items-center gap-2 hover:bg-indigo-300 group cursor-pointer py-1 px-4 rounded-md transition-colors ease-out'>
        <img src="/images/logo.png" alt="" className='w-14 h-14 rounded-full' />
        {/* <h1 className='font-bold text-3xl group-hover:text-white text-blue-500 tracking-wider' style={{ fontFamily: 'Vina Sans, cursive' }}>B-Bytes</h1> */}
      </div>
      <ul className='flex items-center ml-56'>
        <Link to={'/'} onClick={() => setLink('home')} className={`nav-li ${link === 'home' ? 'active' : ''}`}>Home</Link>
        <Link onClick={() => setLink('pages')} className={`nav-li ${link === 'pages' ? 'active' : ''}`}>Pages</Link>
        <li onClick={() => setLink('lifestylee')} className={`nav-li ${link === 'lifestyle' ? 'active' : ''}`}>Lifestyle</li>
        <li onClick={() => setLink('food')} className={`nav-li ${link === 'food' ? 'active' : ''}`}>Food</li>
        <li onClick={() => setLink('travel')} className={`nav-li ${link === 'travel' ? 'active' : ''}`}>Travel</li>
        <Link to={'/blogs'} onClick={() => setLink('blogs')} className={`nav-li ${link === 'blogs' ? 'active' : ''}`}>Blogs</Link>
      </ul>
      <div className='flex gap-4 items-center'>
        {userInfo ? <Button>{userInfo.username} <img  src={`http://localhost:8080/${userInfo?.picture}`} className='w-[40px] h-[40px] rounded-full object-cover object-center ml-5'/></Button> : <Link to={'/login'}><Button>Login</Button></Link>}
       { !userInfo ? <Link to={'/register'}><Button>Register</Button></Link> : <Button onClick={handleLogout}>{isLoading ? <ClipLoader color="#36d7b7" /> : 'Logout'}</Button>}
        <Button onClick={() => {userInfo && setMenu(true)}}><MenuIcon /></Button>
      </div>

      {/* {Sidebar} */}
      <div className={`h-screen shadow-2xl p-7 overflow-y-auto w-[400px] fixed right-0 top-0 z-50 bg-white ${menu ? 'translate-x-0' : 'translate-x-[400px] opacity-0'} transition-all ease-out duration-500`}>
        <div className='flex flex-col content-between gap-5'>
          <div className='flex items-center justify-between'>
            <p>{userInfo?.username}</p>
            <Button onClick={() => setMenu(false)}><CloseIcon /></Button>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <Link to={`/myblogs`} onClick={()=>setMenu(false)}><Button variant='outlined' fullWidth>My Blogs</Button></Link>
            <Link to={`/user/${userInfo?._id}`} onClick={()=>setMenu(false)}><Button variant='outlined' fullWidth>Profile</Button></Link>
            <Link onClick={()=>setMenu(false)}><Button onClick={handleLogout} variant='outlined' fullWidth>Logout</Button></Link>
            <Link onClick={()=>setMenu(false)} to={'/create'}><Button variant='outlined' fullWidth>Create Post</Button></Link>
          </div>
         
          {/* <div>    <RecentPosts /> </div> */}

          <div className='mt-5 flex flex-col gap-5 p-20 bg-[#3756F7] text-white'>
            <h1 className='text-3xl font-semibold'>How We Can Help You!</h1>
            <p className='text-xl'>labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis</p>
            <Button variant='outlined' sx={{ borderColor: 'white', color: 'white' }}>Contact <ArrowRightAltIcon /></Button>
          </div>

        </div>
      </div>

    </nav>
  )
}

export default Navbar