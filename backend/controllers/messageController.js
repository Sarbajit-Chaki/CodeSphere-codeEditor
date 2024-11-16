import { Message } from "../models/Message.model.js";
import { Room } from "../models/Room.model.js";
import { User } from "../models/User.model.js";


export const getMessages = async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.user.id;

        if(!userId || !roomId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Unauthorize"
            })
        }

        const room = await Room.findById(roomId).populate({
            path: "messages",   // Populate the 'messages' field
            populate: {
                path: "sender", // Within 'messages', populate the 'sender' field
                model: "User",  // // Specify the model to populate (if needed)
            }
        });

        if(!room) {
            return res.status(400).json({
                success: false,
                message: "Room not found"
            })
        }

        const messages = room.messages;

        return res.status(200).json({
            success: true,
            message: "Messages fetched successfully",
            messages,
        })
    } catch (error) {
        console.log("Error in getMessages");
    }
}

export const saveMessage = async (req, res) => {
    try {
        const { message, roomId } = req.body;
        const userId = req.user.id;

        if(!userId || !message || !roomId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Unauthorize"
            })
        }

        const room = await Room.findById(roomId);
        if(!room) {
            return res.status(400).json({
                success: false,
                message: "Room not found"
            })
        }

        const newMessage = await Message.create({message, sender: user._id});

        if(!newMessage) {
            return res.status(400).json({
                success: false,
                message: "Unable to save message"
            })
        }

        room.messages.push(newMessage._id);
        await room.save();

        return res.status(200).json({
            success: false,
            message: "Message saved successfully"
        })
    } catch (error) {
        console.log("Error in saveMessage");
    }
}