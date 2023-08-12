import { Button } from '@mui/material'
import React, {useState} from 'react'
import HeaderCard from './HeaderCard'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Slider = ({ children }) => {

    const [currentSlide, setCurrentSlide] = useState(0)

    const handleLeft = ()=>{
        setCurrentSlide(currentSlide === 0 ? 2 : currentSlide - 1)
    }

    const handleRight = ()=>{
        setCurrentSlide(currentSlide === 2 ? 0 : currentSlide + 1)
    }

    return (
        <div className=' relative flex w-[700px] px-5'>
            <div className=' overflow-hidden w-[700px] rounded-lg ' >
                <div className='w-[2100px] flex transition-all ease-in-out duration-300' style={{transform: `translateX(-${currentSlide * 700}px)`}}>
                    {
                        children
                    }
                </div>   
            </div>
            <button onClick={handleLeft} className='absolute left-0 top-[45%] text-white rounded-full p-5 bg-gray-900 '><ArrowBackIosIcon /></button>
            <button onClick={handleRight} className='absolute right-0 top-[45%] text-white rounded-full p-5 bg-gray-900'><ArrowForwardIosIcon /></button>
        </div>

    )
}

export default Slider