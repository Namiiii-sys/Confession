'use client'

import { createPost } from '@/server/action'
import { useRouter } from 'react'
import React, { useState } from 'react'
import Image from 'next/image'
import photo from '@/public/photo.jpg'

function Page() {
  const router = useRouter()
  const [content, setcontent ] = useState('')

  async function Handle(){
    if(content.length < 10){
      alert("too short")
      return
    }

    await createPost(content);

    router.push('/')
  }


  return (

    <body>
    <div className='h-screen w-screen flex cursor-pointer justify-center items-center '>
        <div className='border w-1/3 h-4/5 rounded-2xl flex justify-center gap-5 px-10 py-5 items-center flex-col bg-black/30 backdrop-blur-md '>
        <h3 className='text-5xl font-bold underline font-title'>Confessions</h3>
        <textarea onChange={(e) =>setcontent(e.target.value)} id="confession" className='flex-1 w-full bg-transparent border-2 text-white outline-none px-2 py-4'></textarea>
        <button onClick={Handle} className='border-2 w-full rounded-lg py-4 text-md font-semibold hover:bg-white hover:text-black'>
            Submit Your Confession
        </button>
        </div>
        <div className='w-1/3 h-4/5 border rounded-2xl flex justify-center gap-20 items-center flex-col'>
          <Image src = {photo} className = "h-full w-full rounded-2xl p-2"
          alt = "photo" />
        </div>
    </div> 
    </body>    
  )
}

export default Page

