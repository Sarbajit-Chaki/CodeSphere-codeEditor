import GradientText from '@/components/GradientText';
import DeleteAcount from '@/components/Myprofile/DeleteAcount';
import UpdatePass from '@/components/Myprofile/UpdatePass';
import UserDetails from '@/components/Myprofile/UserDetails';
import React, { useRef, useState } from 'react'
import { TbCameraPlus } from "react-icons/tb";

const MyProfile = () => {
    return (
        <>
            <div className='bg-[#000814] w-full min-h-screen py-16'>
                <UserDetails />
                <UpdatePass />
                <DeleteAcount />
            </div>
        </>
    )
}

export default MyProfile
