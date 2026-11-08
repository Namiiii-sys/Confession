'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="border border-white/20 bg-black/40 backdrop-blur-md rounded-xl p-6 sm:p-8 max-w-md w-full text-center flex flex-col items-center gap-4 text-white shadow-xl">
        <h2 className="text-xl sm:text-2xl font-bold">Something went wrong</h2>
        <p className="text-sm text-zinc-300">
          We couldn&apos;t load the confessions right now. Please try again.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="border-2 border-white px-5 py-2 rounded-lg text-sm font-semibold text-white hover:bg-white hover:text-black transition cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

