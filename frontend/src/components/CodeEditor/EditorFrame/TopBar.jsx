import { Button } from '@/components/ui/button';
import React from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/features/EditorSlice/sidebarSlice.js';

const TopBar = () => {
    const dispatch = useDispatch();
    return (
        <div className=' w-full h-[8%] sm:h-[10%] py-2 px-2 sm:px-4 flex items-center justify-between bg-[#121212] border-b border-b-slate-700  '>
            <div className=' flex items-center gap-1 sm:gap-5'>
                <div onClick={() => dispatch(toggleSidebar())} className='cursor-pointer'><RiMenu2Fill size={28} /></div>
                <div className=' w-[120px] flex justify-center text-lg sm:text-xl font-semibold '>
                    Pyhton 3.18
                </div>
            </div>
            <div className=' flex items-center gap-2 sm:gap-5'>
                <Button className="bg-emerald-400 hidden sm:block">Copy Room ID</Button>
                <div className='p-2 bg-emerald-400 rounded-full cursor-pointer block sm:hidden '><TbCopy size={24} /></div>

                <span className="material-symbols-outlined bg-red-600 p-2 rounded-full cursor-pointer">call_end</span>
            </div>
            <div className=' flex items-center gap-2 sm:gap-5'>
                <Button variant="outline">Save</Button>
                <Button>Run</Button>
            </div>
        </div>
    )
}

export default TopBar
