'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import photo from '@/public/photo.jpg'
import { createPost } from '@/server/action'

function Page() {
  const router = useRouter()
  const [content, setContent] = useState('')

  async function handleSubmit() {
    if (content.length < 10) {
      alert('Too short')
      return
    }

    await createPost(content)
    router.push('/')
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {/* Left Side - Confession Form */}
      <div className="border w-1/3 h-4/5 rounded-2xl flex justify-center gap-5 px-10 py-5 items-center flex-col bg-black/30 backdrop-blur-md">
        <h3 className="text-5xl font-bold underline font-title text-white">Confessions</h3>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 w-full bg-transparent border-2 border-white text-white outline-none px-2 py-4 rounded-md"
          placeholder="Type your confession..."
        />
        <button
          onClick={handleSubmit}
          className="border-2 border-white w-full rounded-lg py-4 text-md font-semibold text-white hover:bg-white hover:text-black transition"
        >
          Submit Your Confession
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="w-1/3 h-4/5 border rounded-2xl overflow-hidden p-2">
        <Image
          src={photo}
          alt="photo"
          className="h-full w-full object-cover rounded-2xl"
        />
      </div>
    </div>
  )
}

export default Page
