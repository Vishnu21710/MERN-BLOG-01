import React from 'react'

const Wrapper = ({children}) => {
  return (
    <div className='w-[77%] mx-auto mt-9 shadow-lg p-10 my-5  '>
        {children}
    </div>
  )
}

export default Wrapper