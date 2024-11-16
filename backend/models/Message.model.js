import mongoose from "mongoose";

const MsgSchema = new mongoose.Schema({
    message :{
        type: String,
    },
    sender: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10800,
    }
});

export const Message = mongoose.model("Message", MsgSchema);