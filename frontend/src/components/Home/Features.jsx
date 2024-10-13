import React from 'react'
import tablet from '@/assets/Home/tablet-home.png'

const Features = () => {
  return (
    <div className=' w-full min-h-[95vh] bg-[#0e141c] border-b border-b-slate-700'>
      <div className=' w-full py-5 sm:py-10 md:py-20 px-4 sm:px-12 lg:px-20'>
        <div className=' w-full flex flex-col gap-4 items-center'>
            <h1 className=' text-3xl sm:text-5xl font-semibold'>Features Overview</h1>
            <div className=' text-gray-400 text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, maxime! Maxime rerum enim, non ipsum obcaecati ab animi illo optio accusantium quo blanditiis tempora placeat exercitationem, vel nam aperiam harum consequuntur soluta vero. Magnam porro molestiae hic voluptas quae eum at sunt earum. Adipisci reprehenderit praesentium voluptates quisquam esse assumenda.</div>
        </div>
        <div className=' w-full h-full bg-red-500 relative'>
            <img className=' w-[75px] sm:w-[130px] md:w-[180px] lg:w-[220px] xl:w-[280px] absolute rotate-90 left-0' src={tablet} alt="" />
            <img className=' w-[75px] sm:w-[130px] md:w-[180px] lg:w-[220px] xl:w-[280px] absolute left-[50%] ' src={tablet} alt="" />
            <img className=' w-[75px] sm:w-[130px] md:w-[180px] lg:w-[220px] xl:w-[280px] absolute rotate-90 right-0' src={tablet} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Features
