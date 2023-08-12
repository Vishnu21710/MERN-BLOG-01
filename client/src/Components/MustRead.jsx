import React, { useEffect, useRef } from 'react'
import Wrapper from './Wrapper'
import Slider from './Slider'
import HeaderCard from './HeaderCard'
import Typed from 'typed.js';
import { Button, TextField } from '@mui/material';
import { useGetBlogsQuery } from '../slices/apiSlice';
import { ClipLoader } from 'react-spinners';
const MustRead = () => {

    const { data:blogs, isLoading, isError, error } = useGetBlogsQuery('')

    const el = React.useRef(null);

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Elevate Your Experience with Our Newsletter '],
            typeSpeed: 30,
            backSpeed: 20,
            loop: true
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);


    return (
        <Wrapper>

            <h1 className='text-3xl font-bold py-3'>Our Newsletter</h1>
            <div className='flex gap-2'>
                <hr className='w-28 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-1/6 border-4 rounded-full' />
            </div>
            <div className='my-10 flex items-center  gap-7'>
                {
                    isLoading ? <ClipLoader color="#36d7b7" /> : (
                        <Slider>
                            <div className='w-[900px] h-[600px]'>
                                <HeaderCard className="" type='1st' {...blogs[3]} user={blogs[3].userId} />
                            </div>
                            <div className='w-[900px]'>
                                <HeaderCard type='1st' {...blogs[5]} user={blogs[5].userId}/>
                            </div>
                            <div className='w-[900px]'>
                                <HeaderCard type='1st'  {...blogs[0]} user={blogs[0].userId}/>
                            </div>
                        </Slider>
                    )
                }

                <div className='w-full'>
                    <h1 className='text-3xl font-bold py-3'>Subscribe Our Newletter</h1>
                    <div className='flex gap-2'>
                        <hr className='w-28 mr-3 border-4 rounded-full border-blue-600' /> <hr className='w-1/6 border-4 rounded-full' />
                    </div>
                    <form action="" className='flex flex-col gap-5 mt-5'>
                        <h1 className='text-2xl font-bold text-gray-700 h-7 mb-5'> Blog Bytes:"🚀 Stay Tuned, <span ref={el} className=' font-bold bg-gradient-to-tr from-purple-500 via-indigo-600 to-blue-400 bg-clip-text text-transparent'></span></h1>

                        <div className='mt-5 w-full grid grid-cols-2 gap-4'>
                            <h1 className='col-span-2 text-xl font-semibold text-gray-600'>Please Fill The Mentioned Details Below </h1>
                            <TextField id="outlined-basic" label="First Name" variant="outlined" />
                            <TextField id="outlined-basic" label="Last Name" variant="outlined" />
                            <TextField id="outlined-basic" label="Email" variant="outlined" className='col-span-2' />
                            <Button variant='contained' color='secondary' size='large'>Subscribe</Button>
                        </div>
                    </form>
                </div>
            </div>


        </Wrapper>
    )
}

export default MustRead