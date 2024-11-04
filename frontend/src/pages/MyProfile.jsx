import GradientText from '@/components/GradientText';
import UpdatePass from '@/components/Myprofile/UpdatePass';
import UserDetails from '@/components/Myprofile/UserDetails';
import React, { useRef, useState } from 'react'
import { TbCameraPlus } from "react-icons/tb";

const MyProfile = () => {
    return (
        <>
            <div className='bg-[#000814] w-full min-h-screen'>
                <UserDetails />
            </div>
        </>
    )
}

export default MyProfile
