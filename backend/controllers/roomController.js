import mongoose from "mongoose";
import { Room } from "../models/Room.model.js";
import { User } from "../models/User.model.js";

export const createRoom = async (req, res) => {
    try {
        const { roomName, language, isVisible, isMsgEnable } = req.body;
        const adminId = req.user.id;

        if (!roomName || !language || !adminId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const admin = await User.findById(adminId);
        if(!admin){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        const room = await Room.create({name:roomName, language: language, admin: admin._id, isVisible: isVisible, isMsgEnable: isMsgEnable})
        if(!room){
            return res.status(400).json({
                success: false,
                message: "Some error occured, can't create Room"
            });
        }

        admin.rooms.push(room._id);
        await admin.save();

        return res.status(200).json({
            success: true,
            message: "Room created successfully",
            room
        })

    } catch (error) {
        console.log("Error in createRoom");
    }

}

export const joinRoom = async (req, res) => {
    try{
        const { roomId } = req.body;
        const userId = req.user.id;

        if(!roomId || !userId){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        if(!mongoose.Types.ObjectId.isValid(roomId)){
            return res.status(400).json({
                success: false,
                message: "Room Id is not valid",
            });
        }

        const room = await Room.findById(roomId);
        if(!room){
            return res.status(400).json({
                success: false,
                message: "Room not found"
            });
        }

        if(!user.rooms.includes(roomId)){
            user.rooms.push(roomId);
            await user.save();
        }

        return res.status(200).json({
            success: true,
            message: "Joined Room successfully",
            room
        })

    }catch(error){
        console.log("Error in joinRoom", error);
    }
}

export const getMembers = async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.user.id;

        if(!roomId || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Unauthorize",
            })
        }

        const room = await Room.findById(roomId).populate(members);
        if(!room) {
            return res.status(400).json({
                success: false,
                message: "Room not found",
            })
        }

        const members = room.members;

        return res.status(200).json({
            success: true,
            message: "Members fetched successfully",
            members,
        })
    } catch (error) {
        console.log("Error in getError");
    }
}