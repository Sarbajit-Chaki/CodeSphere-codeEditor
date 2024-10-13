import React from 'react'
import code from '@/assets/Home/code-about.png'

const About = () => {
  return (
    <div className=' w-full min-h-[90vh] bg-[#0e141c] '>
      <div className=' w-full flex flex-col gap-6 py-5 sm:py-10 md:py-20 px-4 sm:px-12 lg:px-20'>
        <div className=' w-full flex flex-col gap-4 items-center'>
            <h1 className=' text-3xl sm:text-5xl font-semibold'>About CodeSphere</h1>
            <div className=' text-gray-400 text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores, maxime! Maxime rerum enim, non ipsum obcaecati ab animi illo optio accusantium quo blanditiis tempora placeat exercitationem, vel nam aperiam harum consequuntur soluta vero. Magnam porro molestiae hic voluptas quae eum at sunt earum. Adipisci reprehenderit praesentium voluptates quisquam esse assumenda.</div>
        </div>
        <div className=' w-full h-full '>
            <img className=' w-[800px] mx-auto ' src={code} alt="" />
        </div>
      </div>
    </div>
  )
}

export default About
