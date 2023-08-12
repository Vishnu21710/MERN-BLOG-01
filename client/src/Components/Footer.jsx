import React from 'react'
import Wrapper from './Wrapper'
import { Button } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <div className='bg-gradient-to-br from-purple-600 to-indigo-700  w-full text-white '>
      <Wrapper >
        <div className='flex justify-between py-5'>
          <div className='w-1/6'>
            <h1 className='mb-3 text-xl font-bold'>Blog Bytes</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui repudiandae et earum ipsa iste aut inventore voluptas totam similique quam, temporibus accusamus, placeat explicabo fugit non. Consectetur eum sapiente molestias.</p>
          </div>
          <div className='w-1/6'>
            <h1 className='mb-3 text-xl font-bold'>Important Links</h1>
            <ul className='flex flex-col gap-3'>
              <li>News</li>
              <li>Career</li>
              <li>Technology</li>
              <li>Startup</li>
              <li>Lifestyle</li>
              <li>Gadgets</li>
            </ul>
          </div>
          <div className='flex flex-wrap gap-3 text-white w-1/6'>
            <h1 className='mb-3 text-xl font-bold'>Categories</h1>

            <div className='flex flex-wrap gap-2'>
              <Button variant='contained' color='info'>Tech</Button>
              <Button variant='contained' color='secondary'>Food</Button>
              <Button variant='contained' color='info'>Life Style</Button>
              <Button variant='contained' color='secondary'>Fitness</Button>
              <Button variant='contained' color='info'>Gym</Button>
              <Button variant='contained' color='secondary'>Self Immprovement</Button>
              <Button variant='contained' color='info'>Motivation</Button>
              <Button variant='contained' color='secondary'>Sports</Button>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <h1 className='mb-3 text-xl font-bold'>Socials</h1>
            <YouTubeIcon/>
            <LinkedInIcon />
            <TwitterIcon />
            <InstagramIcon />
            <FacebookIcon />
            <PinterestIcon />
          </div>
        </div>

      </Wrapper>
      <div className='py-5 bg-indigo-600 text-center'>
        <p>Copyright © 2023 BlogBytes. All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer