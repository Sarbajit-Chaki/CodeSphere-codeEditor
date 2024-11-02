import React, { useRef, useState } from 'react'
import { TbCameraPlus } from "react-icons/tb";

const MyProfile = () => {
    const user_details = {
        firstName: "K",
        lastName: "Jeneliya",
        email: "kGenelia1234@gmail.com",
        about: "I am a student of computer application"
    }

    const [isEditable, setIsEditable] = useState(false);

    const enableEdit = () => {  // enable input fields and onchange change the redux states
        setIsEditable(true);
    }

    const onSave = () => {  // after clicking save button save the redux states in DB
        setIsEditable(false);
    }


    return (
        <>
            <div className=' w-full h-screen'>
                <div className='flex justify-center '>
                    <div className=' w-[95%] lg:w-[800px] min-h-[450px] flex flex-col md:flex-row bg-[#1f1f1f] rounded-lg mt-8 '>
                        <div className=' md:w-1/4 h-full flex justify-center items-center md:border-r-2 border-gray-600'>
                            <div
                                className={` flex flex-col justify-center items-center gap-2
                                
                            `}
                            >
                                <div className={` relative border-4 border-transparent bg-gradient-to-tr from-sky-400 to-pink-400 rounded-full
                                    ${isEditable ? "cursor-pointer" : "cursor-not-allowed"}
                                `}>
                                    <TbCameraPlus className=' size-8 sm:size-10 absolute right-0 bottom-0 rounded-full p-1 bg-white text-blue-500 ' />
                                    <img className=' rounded-full size-20 sm:size-32' src="https://cdn3.pixelcut.app/1/3/profile_picture_1728ecf2bd.jpg" alt="user-image" />
                                </div>
                                <div className=' font-semibold md:text-lg'>K Jeneliya</div>
                            </div>
                        </div>

                        <div className=' md:w-3/4 h-full'>
                            <div className=' m-4 md:m-6 flex flex-col items-center gap-6 md:gap-8'>
                                <div className=''>
                                    <h1 className=' text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-sky-400 to-pink-400'>My Profile</h1>
                                </div>
                                <div className=' md:w-4/5 flex flex-col gap-4 sm:text-lg font-semibold'>
                                    <div className=' flex items-center gap-2 sm:gap-6'>
                                        <div className='w-[100px] whitespace-nowrap '>First Name:</div>
                                        <input className={` bg-transparent w-[70%] border-[1px] rounded-sm px-2 ${isEditable ? "cursor-auto  border-white " : "cursor-not-allowed"} `}
                                            disabled={!isEditable}
                                            type="text"
                                            value={user_details.firstName}
                                        />
                                    </div>
                                    <div className=' flex items-center gap-2 sm:gap-6 '>
                                        <div className='w-[100px] whitespace-nowrap'>Last Name:</div>
                                        <input className={`bg-transparent w-[70%] border-[1px] rounded-sm px-2 ${isEditable ? "cursor-auto  border-white " : "cursor-not-allowed"} `}
                                            disabled={!isEditable}
                                            type="text"
                                            value={user_details.lastName}
                                        />
                                    </div>
                                    <div className=' flex items-center gap-2 sm:gap-6 '>
                                        <div className='w-[100px] whitespace-nowrap'>Email:</div>
                                        <input className={`bg-transparent w-[70%] border-[1px] rounded-sm px-2 ${isEditable ? "cursor-auto  border-white " : "cursor-not-allowed"} `}
                                            disabled={!isEditable}
                                            type="text"
                                            value={user_details.email}
                                        />
                                    </div>
                                    <div className=' flex gap-2 sm:gap-6 '>
                                        <div className='w-[100px] whitespace-nowrap'>About</div>
                                        <textarea name="about" id="about"
                                            cols={30}
                                            rows={4}
                                            className={`bg-transparent w-[70%] border-[1px] rounded-sm px-2 resize-none ${isEditable ? "cursor-auto  border-white " : "cursor-not-allowed"} `}
                                            disabled={!isEditable}
                                            value={user_details.about}
                                        />
                                    </div>
                                </div>
                                <div className=' flex self-end mt-5 gap-4'>
                                    <button onClick={enableEdit} className=' bg-[#509bf5] px-4 py-1 rounded-md font-semibold'>Edit</button>
                                    <button onClick={onSave} className=' bg-[#509bf5] px-4 py-1 rounded-md font-semibold'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyProfile
