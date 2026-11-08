'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import photo from '@/public/photo.jpg'
import { createPost } from '@/server/action'

function Page() {
  const router = useRouter()
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (content.trim().length < 10) {
      setError('Confession must be at least 10 characters long.')
      return
    }

    try {
      setIsSubmitting(true)
      setError('')
      await createPost(content)
      router.push('/')
    } catch (err) {
      console.error(err)
      setError('Failed to submit confession. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-4xl flex items-center justify-start mb-3">
        <Link
          href="/"
          className="text-white/80 hover:text-white text-xs sm:text-sm flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 bg-black/30 backdrop-blur-md transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Feed
        </Link>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center gap-6 md:gap-8">
        {/* Left Side - Confession Form */}
        <div className="border border-white/30 w-full max-w-md md:w-1/2 h-[520px] sm:h-[560px] md:h-[75vh] max-h-[650px] rounded-2xl flex justify-between gap-4 px-6 sm:px-10 py-6 items-center flex-col bg-black/30 backdrop-blur-md shadow-2xl">
          <h3 className="text-4xl sm:text-5xl font-bold underline font-title text-white text-center">
            Confessions
          </h3>

          <div className="w-full flex-1 flex flex-col gap-2">
            <textarea
              value={content}
              maxLength={2000}
              onChange={(e) => {
                setContent(e.target.value)
                if (error && e.target.value.trim().length >= 10) {
                  setError('')
                }
              }}
              className="flex-1 w-full bg-transparent border-2 border-white text-white outline-none p-3 sm:p-4 rounded-md resize-none text-sm sm:text-base placeholder:text-zinc-400 focus:ring-1 focus:ring-white"
              placeholder="Type your confession..."
            />

            <div className="flex justify-between items-center text-xs px-1 text-zinc-300">
              <span>{content.trim().length < 10 ? 'Min 10 characters' : 'Ready to post'}</span>
              <span>{content.length}/2000</span>
            </div>

            {error && (
              <p className="text-red-400 text-xs sm:text-sm px-1">{error}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="border-2 border-white w-full rounded-lg py-3 sm:py-4 text-sm sm:text-md font-semibold text-white hover:bg-white hover:text-black transition cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Your Confession'}
          </button>
        </div>

        {/* Right Side - Image */}
        <div className="w-full max-w-md md:w-1/2 h-[320px] sm:h-[400px] md:h-[75vh] max-h-[650px] border border-white/30 rounded-2xl overflow-hidden p-2 bg-black/20 backdrop-blur-sm hidden md:block">
          <Image
            src={photo}
            alt="photo"
            priority
            className="h-full w-full object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  )
}

export default Page
