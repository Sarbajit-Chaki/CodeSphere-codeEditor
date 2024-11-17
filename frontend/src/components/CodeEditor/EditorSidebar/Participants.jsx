import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import {SquareX} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '@/features/EditorSlice/sidebarSlice.js'
import { openRemoteEditor } from '@/features/EditorSlice/remoteEditorSlice'
import { useLocation } from 'react-router-dom'
import { getMembers } from '@/api/user'

const Participants = ({setIsSidebarOpen}) => {
  const data = [
    { firstName: "Dibakar", lastName: "Ghosh", imageUrl: "" },
    { firstName: "Amit", lastName: "Sharma", imageUrl: "https://avatars.githubusercontent.com/u/116663682?s=400&u=c3d1bddd31d3de63f9bb7373ebfbebf2a8125e76&v=4" },
    { firstName: "Priya", lastName: "Singh", imageUrl: "https://cdn.prod.website-files.com/5ec7dad2e6f6295a9e2a23dd/66fcde00cf54d71747a52bac_upwork-profile-photo-tips.jpg" },
    { firstName: "Ravi", lastName: "Kumar", imageUrl: "https://avatars.githubusercontent.com/u/116663682?s=400&u=c3d1bddd31d3de63f9bb7373ebfbebf2a8125e76&v=4" },
    { firstName: "Sneha", lastName: "Patel", imageUrl: "" }
  ]

  const participantsChange = useSelector((state) => state.room.room.participantsChange);
  const dispatch = useDispatch();
  const location = useLocation();

  const roomId = location?.state?.roomId;

  const [participants, setParticipants] = useState([]);

  const getParticipants = async () => {
    await new Promise(r => setTimeout(r,1000));
    const res = await getMembers(roomId);

    if(!res){
      return;
    }

    let members = res?.members;
    setParticipants(members);
    console.log("+++",members);
  }

  useEffect(() => {
    getParticipants();

  }, [participantsChange])
  

  return (
    <div className=' h-full w-full px-4 relative '>
      <SquareX onClick={() => dispatch(toggleSidebar())} className=' absolute top-2 right-2 cursor-pointer'/>

      <div className='flex justify-center font-semibold text-lg pb-1 '>Participants</div>
      <div className=' h-[80%] w-full flex flex-col gap-4 overflow-y-auto  '>
        {
          participants.map((user, index) => {
            return (
              <div onClick={() => dispatch(openRemoteEditor())} key={index} className=' w-full flex items-center gap-6 cursor-pointer'>
                <div className=' border-2 border-transparent bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full'>
                  <Avatar className="rounded-full">
                    <AvatarImage src={user?.imageUrl} />
                    <AvatarFallback>{user?.firstName?.slice(0, 1)}{user?.lastName?.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className='text-xl font-semibold'>{user?.firstName} {user?.lastName}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Participants
