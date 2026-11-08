import React from 'react'
import Card from '@/components/Card'
import { getPosts } from '@/server/action'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

async function Page() {
  const posts = (await getPosts()).slice().reverse();

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <header className="w-full h-16 shadow-md shadow-zinc-500 flex justify-between items-center px-4 sm:px-8">
        <h1 className="text-2xl font-bold">Confessions</h1>
        <Link
          href="/create"
          className="border w-10 h-10 text-black bg-white text-2xl font-bold rounded-full flex items-center justify-center"
        >
          +
        </Link>
      </header>

      <div className="p-4 sm:p-10 gap-8 flex-1 overflow-y-auto w-full sm:w-4/5 md:w-3/5 flex flex-col items-center">
        {posts.map((post, index) => (
          <Card
            key={post.cid || index}
            cid={post.cid}
            content={post.content}
            date={post.date}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
