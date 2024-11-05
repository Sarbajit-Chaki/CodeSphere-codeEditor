import { User } from "../models/User.model.js";


export const getUser = async (req, res) => {
    try{
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log(user);
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user
        })
    }catch(error){
        console.log("Error in getUser: ", error);
    }
}

export const updateProfile = async (req, res) => {
    try{
        const data = req.body.userData;
        const userId = req.user.id;
        
        if(data.imageUrl){
            // Upload photo to cloudinary
            // data.imageUrl = cloudinary link
        }

        const user = await User.findByIdAndUpdate(userId, {$set: data}, {new: true});
        console.log(user);

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
        })
    }catch(error){
        console.log("Error in updateProfile: ", error);
    }
}

export const updatePassword = async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect"
            })
        }
        else{
            const newPasswordHash = await bcrypt.hash(newPassword, 10);
            const user = await User.findByIdAndUpdate(userId, {$set: {password: newPasswordHash}}, {new: true});
            return res.status(200).json({
                success: true,
                message: "Password updated successfully",
            })
        }
    }catch(error){
        console.log("Error in updatePassword: ", error);
    }
}

export const deleteUser = async (req, res) => {
    try{
        const userId = req.user.id;

        const user = await User.findByIdAndDelete(userId);
        console.log(user);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        })
    }catch(error){
        console.log("Error in deleteUser: ", error);
    }
}