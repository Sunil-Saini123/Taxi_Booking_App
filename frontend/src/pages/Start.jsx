import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
   <div>
      <div className='bg-yellow-400 w-full h-screen p-4 flex items-center flex-col justify-between'>
          <div className='mt-55'>
            <h1 className='text-4xl font-bold '>T A X I</h1>
            <div className="w-30 border-b-4 "></div>
          </div>
          <Link to='/login' className='p-3 mb-2 text-lg font-semibold bg-black w-full rounded-lg flex justify-center items-center text-white'><button >Continue</button></Link>
      </div>
   </div>
  )
}

export default Start
