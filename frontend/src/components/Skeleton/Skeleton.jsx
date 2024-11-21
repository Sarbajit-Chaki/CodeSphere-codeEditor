import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const SkeletonComponent = () => {
    return (
        <div className=' bg-[#000814] rounded-md mx-auto w-11/12 h-screen sm:w-full flex items-center absolute z-50 inset-0'>
            <div className='h-screen w-20 border-r border-gray-900 flex flex-col justify-between py-4'>
                <div className='flex flex-col items-center justify-center gap-y-3'>
                    <Skeleton className=" w-10 h-10 rounded-md" />
                    <Skeleton className=" w-10 h-10 rounded-md" />
                    <Skeleton className=" w-10 h-10 rounded-md" />
                    <Skeleton className=" w-10 h-10 rounded-md" />
                </div>
                <div className=' flex justify-center items-center'>
                    <Skeleton className=" w-10 h-10 rounded-md" />
                </div>
            </div>
            <div className=' mx-auto'>
                <div className=' max-w-fit lg:min-w-[620px] min-h-fit p-2 sm:p-6 mb-4 bg-white/5 backdrop-blur-lg shadow-lg border border-gray-900 rounded-md text-gray-200'>
                    <Skeleton className=' w-[70%] mx-auto h-8 rounded-md' />
                    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-3 my-4'>
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto" />
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto" />
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto" />
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto" />
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto" />
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto" />
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto" />
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto" />
                        <Skeleton className="max-w-[130px] min-w-[100px] h-[100px] mx-auto hidden md:block lg:hidden " />
                    </div>
                    <Skeleton className=' w-[40%] h-6 rounded-md mb-4' />
                    <Skeleton className=' w-full h-12 rounded-md' />
                </div>
                <div className='min-w-fit lg:min-w-[620px] min-h-fit p-2 sm:p-6 bg-white/5 backdrop-blur-lg shadow-lg border border-gray-900 rounded-md text-gray-200'>
                    <Skeleton className=' w-36 h-6 rounded-md mb-4' />
                    <Skeleton className=' w-full h-12 rounded-md' />
                </div>
            </div>
        </div>
    )
}

export default SkeletonComponent
