import React from 'react'

function Card({content,date}) {
  return (
    <div className='w-2/3 border bg-black/40 rounded-md p-8 flex flex-col gap-8'>
        <p className='text-lg'>
            {content}
        </p>
        <p className='text-white'>Posted on {date}</p>
    </div>
  )
}

export default Card
