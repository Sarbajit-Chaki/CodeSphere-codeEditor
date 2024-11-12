import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

const Participants = () => {
  const data = [
    { firstName: "Dibakar", lastName: "Ghosh", imageUrl: "" },
    { firstName: "Amit", lastName: "Sharma", imageUrl: "https://avatars.githubusercontent.com/u/116663682?s=400&u=c3d1bddd31d3de63f9bb7373ebfbebf2a8125e76&v=4" },
    { firstName: "Priya", lastName: "Singh", imageUrl: "https://cdn.prod.website-files.com/5ec7dad2e6f6295a9e2a23dd/66fcde00cf54d71747a52bac_upwork-profile-photo-tips.jpg" },
    { firstName: "Ravi", lastName: "Kumar", imageUrl: "https://avatars.githubusercontent.com/u/116663682?s=400&u=c3d1bddd31d3de63f9bb7373ebfbebf2a8125e76&v=4" },
    { firstName: "Sneha", lastName: "Patel", imageUrl: "" }
  ]

  return (
    <div className=' h-full w-full px-4 '>
      <div className='flex justify-center font-semibold text-lg pb-1 '>Participants</div>
      <div className=' h-[80%] w-full flex flex-col gap-4 overflow-y-auto  '>
        {
          data.map((user, index) => {
            return (
              <div key={index} className=' w-full flex items-center gap-6 cursor-pointer'>
                <div className=' border-2 border-transparent bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full'>
                  <Avatar className="rounded-full">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>{user.firstName.slice(0, 1)}{user.lastName.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                </div>
                <div className='text-xl font-semibold'>{user.firstName} {user.lastName}</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Participants
