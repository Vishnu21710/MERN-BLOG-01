import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import Blogs from './Pages/Blogs'
import Register from './Pages/Register'
import Login from './Pages/Login'
import UserProfile from './Pages/UserProfile'
import SingleBlog from './Pages/SingleBlog'
import CreatePost from './Pages/CreatePost'
import MyBlogs from './Pages/MyBlogs'
import { ThemeProvider } from "@material-tailwind/react";
import UpdateBlog from './Pages/UpdateBlog'


function App() {


  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<UserProfile />} />
            <Route path='/blog/:id' element={<SingleBlog />} />
            <Route path='/create' element={<CreatePost />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/update/:id' element={<UpdateBlog />} />
            <Route path='/myblogs' element={<MyBlogs />} />
            <Route path='/user/:id' element={<UserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  )
}

export default App
