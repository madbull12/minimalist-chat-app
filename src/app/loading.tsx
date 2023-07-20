import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
const LoadingPage = () => {
  return (
    <div className='flex flex-col items-end gap-y-4'>
        {Array(8).fill(null).map((_,i)=>(
            <Skeleton key={i} className="w-[200px] h-[40px]"  />
        ))}
    </div>
  )
}

export default LoadingPage