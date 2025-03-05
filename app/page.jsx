import Card from '@/components/card'
import React from 'react'
import { getPosts } from '@/server/action'

async function page() {
  const posts = await (await getPosts().reverse)

  return (
    <div className='h-screen w-full flex flex-col items-center'>
      <header className='w-full h-16 shadow-md shadow-zinc-500 flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>ACM Confessions</h1>
        <Link href={'/create'}k className='border w-10 h-10 text-black bg-white text-2xl font-bold rounded-full'>+</Link>
      </header>

      <div className='p-10 gap-8 flex-1 overflow-y-auto w-3/5 flex flex-col items-center'>
         {posts.map((post) => (
            <Card content ={post.content} date={post.date}/>
         ))}
      </div>
    </div>
  )
}

export default page