import React from 'react'

function Background() {
  return (
    <>
    <div className='w-full z-[2] fixed h-screen'>
     <h2 className= 'w-full text-zinc-700 py-10 top-[5%] text-xl font-semibold text-center flex justify-center absolute'>Documents</h2>
      
      <h1 className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-zinc-900 text-[13vw] leading-none tracking-tight font-semibold text-center'>
        FileInk.
      </h1>
    </div>
    </>
  )
}

export default Background