import { getRoomDetails } from '@/api/user'
import EditorComponent from '@/components/CodeEditor/EditorFrame/EditorComponent'
import TopBar from '@/components/CodeEditor/EditorFrame/TopBar'
import EditorSidebar from '@/components/CodeEditor/EditorSidebar/EditorSidebar'
import Terminal from '@/components/CodeEditor/Terminal/TerminalComponent'
import { setRoomDetails } from '@/features/RoomSlice/RoomSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

const CodeEditor = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const roomId = location?.state?.roomId;

    const getRoomData = async () => {
        const res = await getRoomDetails(roomId);

        if(!res) {
            return;
        }

        dispatch(setRoomDetails(res.room));
    }

    useEffect(() => {
      getRoomData();
    
    }, [])
    
    return (
        <>
            <div className='relative w-full h-screen overflow-y-hidden'>
                <EditorSidebar />
                <TopBar />
                <EditorComponent />
                <Terminal />
            </div>
        </>
    )
}

export default CodeEditor
