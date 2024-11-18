import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoIosSend } from "react-icons/io";
import { getMessages } from '@/api/user';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Messages = () => {
  const location = useLocation();
  const roomId = location?.state?.roomId;
  const msgChange = useSelector((state) => state.room.room.newMesage);
  const user = useSelector((state) => state.profile.user);
  const socket = useSelector((state) => state.socket.socketInstance);

  const [msgs, setMsgs] = useState([]);
  const [msg, setMsg] = useState("");


  const getMsgs = async () => {
    const res = await getMessages(roomId);
    if (!res) {
      return;
    }

    console.log(res);
    setMsgs(res.messages);
  }

  useEffect(() => {
    getMsgs();

  }, [msgChange]);  


  const handleMsgSend = () => {
    if (!msg) {
      return;
    }

    socket.emit("sendMessage", { roomId, message: msg });
    setMsgs((prev) => [...prev, { sender: {email: user.email}, message: msg }]);

    setMsg("");

  }


  return (
    <div className=' w-full h-full px-4  '>
      <div className=' h-[8%] flex justify-center font-semibold text-lg '>Messages</div>

      <div className=' h-[77%] overflow-y-auto'>
        {
          msgs.map((msg, index) => {
            return (
              <div key={index} className={`w-full flex ${user?.email === msg?.sender?.email && "justify-end"} items-center gap-1 mb-2`}>
                {
                  user?.email !== msg?.sender?.email && (
                    <Avatar className="rounded-full">
                      <AvatarImage src={msg?.sender?.imageUrl} />
                      <AvatarFallback>{msg?.sender?.firstName.slice(0, 1)}{msg?.sender?.lastName.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                  )
                }
                <div className={` max-w-[70%] ${user?.email === msg?.sender?.email ? "bg-[#121212]" : "bg-[#1f1f1f]"} rounded-md py-2 px-2 `}>
                  {msg?.message}
                </div>
              </div>
            )
          })
        }
      </div>

      <div className=' h-[15%] pt-2 '>
        <div className=' flex items-center gap-4 relative'>
          <input className=' w-full rounded-md px-4 py-2 pr-10 bg-transparent border border-gray-400 focus:outline-none '
            type="text"
            placeholder='Type a message'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
          <IoIosSend onClick={handleMsgSend} className=' absolute right-4 cursor-pointer ' size={22} />
        </div>
      </div>
    </div>
  )
}

export default Messages