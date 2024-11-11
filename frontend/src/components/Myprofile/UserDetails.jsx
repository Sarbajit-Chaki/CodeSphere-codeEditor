import GradientText from '@/components/GradientText';
import { useRef, useState } from 'react'
import { TbCameraPlus } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import  userDeafult  from "../../assets/MyProfile/user-image.jpg";
import { setAbout, setEmail, setFirstName, setImageUrl, setLastName } from '@/features/Profile/profileSlice';
import { updateProfile } from '@/api/user';

const UserDetails = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [userTemp, setUserTemp] = useState({});

    const [user_imageFile, setUser_imageFile] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    const imageRef = useRef(null);
    const handleImageClick = () => {
        if (isEditable) {
            imageRef.current.click();
        }
    }

    const handleFileChange = () => {
        const file = imageRef.current.files[0];
        if (file) {
            console.log(file);
            const fileUrl = URL.createObjectURL(file);
            dispatch(setImageUrl(fileUrl));
            setUser_imageFile(fileUrl);
        }
    }

    const enableEdit = () => {  // enable input fields and save the current states
        setIsEditable(true);

        let data ={
            firstName: user?.firstName,
            lastName: user?.lastName,
            about: user?.about,
            imageUrl: user?.imageUrl    
        }

        setUserTemp(data);
    }

    const onSave = async () => {  // after clicking save button save the redux states in DB
        setIsEditable(false);

        let data ={};

        if(userTemp?.firstName !== user?.firstName){
            data.firstName = user?.firstName;
        }

        if(userTemp?.lastName !== user?.lastName){
            data.lastName = user?.lastName;
        }

        if(userTemp?.about !== user?.about){
            data.about = user?.about;
        }

        if(userTemp?.imageUrl !== user?.imageUrl){
            data.imageUrl = user?.imageUrl;
        }

        if(Object.keys(data).length > 0){
            console.log("---",data);
            const res = await updateProfile(data);
            console.log("onSave: ",res);

        }
    }

    return (
        <div className='flex justify-center '>
            <div className=' w-[95%] lg:w-[800px] min-h-[450px] flex flex-col md:flex-row bg-[#101622] rounded-lg '>
                <div className=' md:w-1/4 h-full flex justify-center items-center md:border-r-2 border-gray-600'>
                    <div
                        className={` flex flex-col justify-center items-center gap-2
                                
                            `}
                    >
                        <div onClick={handleImageClick} className={`mt-6 md:mt-0 relative border-4 border-transparent bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCB045] rounded-full
                                    ${isEditable ? "cursor-pointer" : "cursor-not-allowed"}
                                `}>
                            <TbCameraPlus className=' size-8 sm:size-10 absolute right-0 bottom-0 rounded-full p-1 bg-white text-blue-500 ' />
                            <img className=' rounded-full size-20 sm:size-32' src={user_imageFile || userDeafult} alt="user-image" />
                            <input onChange={handleFileChange} ref={imageRef} type="file" accept='image/*' name="image" id="image" className=' hidden' />
                        </div>
                        <div className=' font-semibold text-center md:text-lg'>{user.firstName + " " + user.lastName}</div>
                    </div>
                </div>

                <div className=' md:w-3/4 h-full'>
                    <div className=' m-4 md:m-6 flex flex-col items-center gap-6 md:gap-8'>
                        <div className=''>
                            <GradientText className={"text-xl sm:text-2xl font-bold"} >My Profile</GradientText>
                        </div>
                        <div className=' md:w-4/5 flex flex-col gap-4 sm:text-lg font-semibold'>
                            <div className=' flex items-center gap-2 sm:gap-6'>
                                <div className='w-[100px] whitespace-nowrap '>First Name:</div>
                                <input className={` bg-transparent w-[70%] border-[1px] border-transparent rounded-sm px-2 ${isEditable ? "cursor-auto  border-white " : "cursor-not-allowed"} `}
                                    disabled={!isEditable}
                                    type="text"
                                    value={user.firstName}
                                    onChange={(e) => dispatch(setFirstName(e.target.value))}
                                />
                            </div>
                            <div className=' flex items-center gap-2 sm:gap-6 '>
                                <div className='w-[100px] whitespace-nowrap'>Last Name:</div>
                                <input className={`bg-transparent w-[70%] border-[1px] border-transparent rounded-sm px-2 ${isEditable ? "cursor-auto  border-white " : "cursor-not-allowed"} `}
                                    disabled={!isEditable}
                                    type="text"
                                    value={user.lastName}
                                    onChange={(e) => dispatch(setLastName(e.target.value))}
                                />
                            </div>
                            <div className=' flex items-center gap-2 sm:gap-6 '>
                                <div className='w-[100px] whitespace-nowrap'>Email:</div>
                                <input className={`bg-transparent w-[70%] border-[1px] border-transparent rounded-sm px-2 cursor-not-allowed `}
                                    disabled
                                    type="text"
                                    value={user.email}
                                    onChange={(e) => dispatch(setEmail(e.target.value))}
                                />
                            </div>
                            <div className=' flex gap-2 sm:gap-6 '>
                                <div className='w-[100px] whitespace-nowrap'>About</div>
                                <textarea name="about" id="about"
                                    cols={30}
                                    rows={4}
                                    className={`bg-transparent w-[70%] border-[1px] border-transparent rounded-sm px-2 resize-none ${isEditable ? "cursor-auto  border-white " : "cursor-not-allowed"} `}
                                    disabled={!isEditable}
                                    value={user.about}
                                    onChange={(e) => dispatch(setAbout(e.target.value))}
                                />
                            </div>
                        </div>
                        <div className=' flex self-end mt-5 gap-4'>
                            <button onClick={enableEdit} className=' bg-[#1a8cd8] px-4 py-1 rounded-md font-semibold'>Edit</button>
                            <button disabled={!isEditable} onClick={onSave} className={` bg-[#1a8cd8] px-4 py-1 rounded-md font-semibold ${isEditable ? "cursor-pointer" : "cursor-not-allowed"} `}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
