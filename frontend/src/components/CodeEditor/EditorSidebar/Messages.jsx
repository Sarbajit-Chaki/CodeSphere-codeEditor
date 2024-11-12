import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IoIosSend } from "react-icons/io";

const Messages = () => {
  const user = {
    email: "sarbajit.c.0222@inspiria.edu.in",
  }

  const data = [
    {
      email: "john.doe@example.com",
      imageUrl: "https://via.placeholder.com/150",
      firstName: "John",
      lastName: "Doe",
      message: "Hi there! Nice to meet you.",
    },
    {
      email: "jane.smith@example.com",
      imageUrl: "",
      firstName: "Jane",
      lastName: "Smith",
      message: "Good morning! How’s everything going?",
    },
    {
      email: "alice.jones@example.com",
      imageUrl: "https://via.placeholder.com/150",
      firstName: "Alice",
      lastName: "Jones",
      message: "Hey! What’s up?",
    },
    {
      email: "sarbajit.c.0222@inspiria.edu.in",
      imageUrl: "https://via.placeholder.com/150",
      firstName: "Sarbajit",
      lastName: "Chaki",
      message: "Hello, how are you?",
    },
    {
      email: "john.doe@example.com",
      imageUrl: "https://via.placeholder.com/150",
      firstName: "Emily",
      lastName: "Davis",
      message: "Just checking in. How have you been?",
    },
    {
      email: "jane.smith@example.com",
      imageUrl: "",
      firstName: "Michael",
      lastName: "Wilson",
      message: "What are you working on these days?",
    },
    {
      email: "alice.jones@example.com",
      imageUrl: "https://via.placeholder.com/150",
      firstName: "Olivia",
      lastName: "Taylor",
      message: "Long time, no see!",
    },
    {
      email: "sarbajit.c.0222@inspiria.edu.in",
      imageUrl: "https://via.placeholder.com/150",
      firstName: "Ethan",
      lastName: "Thomas",
      message: "Hello! Let’s catch up soon.",
    },
    {
      email: "john.doe@example.com",
      imageUrl: "https://via.placeholder.com/150",
      firstName: "Sophia",
      lastName: "Anderson",
      message: "Just wanted to say hi!",
    },
    {
      email: "jane.smith@example.com",
      imageUrl: "",
      firstName: "William",
      lastName: "Martinez",
      message: "How’s everything on your end?",
    }
  ]

  return (
    <div className=' w-full h-full px-4  '>
      <div className=' h-[8%] flex justify-center font-semibold text-lg '>Messages</div>

      <div className=' h-[77%] overflow-y-auto'>
        {
          data.map((userItem, index) => {
            return (
              <div key={index} className={`w-full flex ${user.email === userItem.email && "justify-end"} items-center gap-1 mb-2`}>
                {
                  user.email !== userItem.email && (
                    <Avatar className="rounded-full">
                      <AvatarImage src={userItem.imageUrl} />
                      <AvatarFallback>{userItem.firstName.slice(0, 1)}{userItem.lastName.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                  )
                }
                <div className={` max-w-[70%] ${user.email === userItem.email ? "bg-[#121212]" : "bg-[#1f1f1f]"} rounded-md py-2 px-2 `}>
                  {userItem.message}
                </div>
              </div>
            )
          })
        }
      </div>

      <div className=' h-[15%] pt-2 '>
        <div className=' flex items-center gap-4 relative'>
          <input className=' w-full rounded-md px-4 py-2 pr-10 bg-transparent border border-gray-400 focus:outline-none ' type="text" placeholder='Type a message' />
          <IoIosSend className=' absolute right-4 cursor-pointer ' size={22} />
        </div>
      </div>
    </div>
  )
}

export default Messages