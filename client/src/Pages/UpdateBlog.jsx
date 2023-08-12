import React, { useEffect, useState } from 'react'
import Wrapper from '../Components/Wrapper'
import { Button, TextField } from '@mui/material'
import { Select, Option } from "@material-tailwind/react";;
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";
import ImageResize from 'quill-image-resize-module-react';
import { ClipLoader } from 'react-spinners';
import { useGetBlogPostQuery ,useUpdateBlogPostMutation } from '../slices/apiSlice';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {
  const {id} = useParams()
  const {data, isLoading:gettingBlog, isFetching, isError:gettingBlogError, error:blogError} = useGetBlogPostQuery(id)

  

  const [body, setBody] = useState('')
  const [cover, setCover] = useState('')
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "technology",
  })
  
 
    useEffect(()=>{
      if(!gettingBlog){
        setBody(data.body)
        setCover(data.cover)
        setForm((preval)=>({...preval, title: data.title, description: data.description, category: data.category}))
      }
     
    }, [data])
    
  

  const navigate = useNavigate()

  // Quill Toolbar options 

  Quill.register('modules/imageResize', ImageResize);
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link", "image"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],


  ];

  //Quill modules 
  const modules = {
    toolbar: toolbarOptions,
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  };



  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((preVal) => ({ ...preVal, [name]: value }))
  }

  const [updateBlogPost, {isLoading, isError, error}] = useUpdateBlogPostMutation()

  if(isError){
    console.log(error);
  }
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', form.title)
    formData.append('description', form.description)
    formData.append('category', form.category)
    formData.append('cover', cover)
    formData.append('body', body)
    console.log(id);
    try {
        const res = await updateBlogPost({blogId:id, formData:formData}).unwrap()
        console.log(res);
        navigate(`/blog/${res._id}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper>
      <h1 className='text-4xl text-gray-700 font-bold'>Create Post</h1>
      <div className='flex gap-2'>
        <hr className='w-28 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-1/6 border-4 rounded-full' />
      </div>
      <div className='flex gap-5 mt-7'>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className='left grid grid-cols-2 gap-5 w-1/2'>
          <TextField onChange={handleChange} label="Type Blog Title" type='text' name='title' value={form.title} className='col-span-2' />
          <TextField onChange={handleChange} label="Type Blog description" type='text' name='description' value={form.description} className='col-span-2' />
          <select  onChange={handleChange} value={form.category}  name="category" >
            <option value={'technology'}>Technology</option>
            <option value={'sports'}>Sports</option>
            <option value={'lifestyle'}>Lifestyle</option>
          </select>
          <TextField type='file' onChange={(e)=>setCover(e.target.files[0])}/>
          <div className='col-span-2'>
            <ReactQuill modules={modules} value={body} onChange={setBody}/>
          </div>
          <Button type='submit' variant='contained' color='secondary'>Publish</Button>
          <p>{isLoading && <ClipLoader color="#36d7b7" />}</p>
        </form>

        <div className='preview right w-1/2' dangerouslySetInnerHTML={{__html: body}}>

        </div>
      </div>
    </Wrapper>
  )
}

export default UpdateBlog