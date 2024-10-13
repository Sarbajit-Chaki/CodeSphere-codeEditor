import React from 'react'
import laptop from '@/assets/Home/laptop-hero.png'

const HeroSection = () => {
    return (
        <div className=' w-full h-[calc(100vh-75px)] bg-[#0e141c] border-b border-b-slate-700 '>
            <div className=' w-full h-full flex flex-col md:flex-row  items-center justify-around md:justify-between py-5 sm:py-10 md:py-20 px-4 sm:px-12 lg:px-20'>
                <div className=' w-full md:w-1/2 '>
                    <div className=' w-full md:w-[70%] flex flex-col items-start gap-4 sm:gap-8 '>
                        <h1 className=' text-3xl sm:text-5xl font-semibold'>Enter the CodeSphere</h1>
                        <div className=' text-gray-400 text-justify'>Welcome to our collaborative code editor platform, where students and teachers can come together to create, compile and share their code with everyone in a dynamic, interactive environment.</div>
                        <button className='text-gray-800 font-medium text-sm px-7 py-3 rounded-sm bg-[#f3c77e]'>Get Started</button>
                    </div>
                </div>
                <div className=''>
                    <img className=' w-[280px] sm:w-[350px] md:w-[500px]' src={laptop} alt="laptop" />
                </div>
            </div>
        </div>
    )
}

export default HeroSection
