import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react'
import { RiMenu2Fill } from "react-icons/ri";
import { TbCopy } from "react-icons/tb";
import { BsTerminal } from "react-icons/bs";
import { MdSaveAlt } from "react-icons/md";

import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '@/features/EditorSlice/sidebarSlice.js';
import { openTerminal } from '@/features/EditorSlice/terminalSlice.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const TopBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const roomId = location?.state?.roomId;
    const roomData = useSelector((state) => state.room.room.roomDetails);

    const handleCopyRoomId = (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(roomId);

        toast.success("Room Id copied", {
            autoClose: 1000,
            position: "bottom-right",
        });
    }

    return (
        <div className=' w-full h-[8%] sm:h-[10%] py-2 px-2 sm:px-4 flex items-center justify-between bg-[#121212] border-b border-b-slate-700  '>
            <div className=' flex items-center gap-1 sm:gap-5'>
                <div onClick={() => dispatch(toggleSidebar())} className='cursor-pointer'><RiMenu2Fill size={28} /></div>
                <div className=' w-[120px] sm:w-[150px] flex justify-center text-lg sm:text-xl font-semibold '>
                    <span className=' flex gap-2'>
                        {roomData?.language?.split(" ")[0]}
                        <span className=' hidden sm:block'>{roomData?.language?.split(" ")[1]}</span>
                    </span>
                </div>
            </div>
            <div className=' flex items-center gap-2 sm:gap-5'>
                <Button onClick={handleCopyRoomId} className="bg-emerald-400 hidden sm:block">Copy Room ID</Button>
                <div className='p-2 bg-emerald-400 rounded-full cursor-pointer block sm:hidden '><TbCopy size={24} /></div>

                <span onClick={() => navigate("/")} className="material-symbols-outlined bg-red-600 p-2 rounded-full cursor-pointer">call_end</span>
            </div>
            <div className=' flex items-center gap-2 sm:gap-5'>
                <Button variant="outline"><MdSaveAlt /><span className=' hidden sm:block'>Save</span></Button>
                <Button onClick={() => dispatch(openTerminal())}><BsTerminal /><span className=' hidden sm:block'>Terminal</span></Button>
            </div>
        </div>
    )
}

export default TopBar
