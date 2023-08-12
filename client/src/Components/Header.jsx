import React from 'react'
import Wrapper from './Wrapper'
import HeaderCard from './HeaderCard'
import { useGetBlogsQuery } from '../slices/apiSlice'
import { ClipLoader } from 'react-spinners'


const Header = () => {

    const { data:blogs, isLoading, isError, error } = useGetBlogsQuery('')
    return (
        <Wrapper>
            {
                isLoading ? <ClipLoader color="#36d7b7" /> : (
                    <div className='grid grid-cols-4 gap-3  h-[600px] '>
                        <div className=' col-span-2 row-span-2 shadow-md rounded-md'>
                            <HeaderCard className="" type='1st' {...blogs[0]} user={blogs[0].userId} />
                        </div>
                        <div className=' col-span-2 shadow-md rounded-md'>
                            <HeaderCard type='' bg="images/scene1.jpg"  {...blogs[1]} user={blogs[1].userId}/>
                        </div>
                        <div className='shadow-md rounded-md'>
                            <HeaderCard type='' {...blogs[2]} user={blogs[2].userId} />
                        </div>
                        <div className='shadow-md rounded-md'>
                            <HeaderCard type='' {...blogs[3]}  user={blogs[3].userId}/>
                        </div>

                    </div>
                )
            }

        </Wrapper>
    )
}

export default Header