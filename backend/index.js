import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import contactRoute from './routes/contactRoute.js'
import roomRoute from './routes/roomRoute.js';
import messageRoute from './routes/messageRoute.js';
import codeRoute from './routes/codeRoute.js';

import { connectDB } from './config/database.js';
import { cloudinaryConfig } from './config/cloudinary.js';

import { socketAuthMiddleware } from './middlewares/auth.middleware.js';

import './jobs/cleanUpJob.js';      // Import your cron job to run on server start

import { addMember, removeMember } from './controllers/roomController.js';
import { saveMessage } from './controllers/messageController.js';
import { codeSave } from './controllers/codeController.js';


dotenv.config();
connectDB();
cloudinaryConfig();

const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true
    }
});

export const initSocket = () => {
    io.use(socketAuthMiddleware);   // socket middleware

    io.on('connection', (socket) => {
        console.log('user connected', socket?.user);

        socket.on('join-room', async (roomId) => {
            // Join the specified room
            socket.join(roomId);
            socket.roomId = roomId;
            await addMember({email: socket.user.email, roomId: roomId});
            
            // Notify all users in the room except the one that just joined
            socket.to(roomId).emit('userJoined', {
                userName: socket.user.name,
            })
        })

        socket.on('sendMessage', async (data) => {
            const { roomId, message } = data;
            await saveMessage({message, roomId, userId: socket.user.id});

            socket.to(roomId).emit('receiveMessage');
        })

        socket.on('saveCode', async (data) => {
            const { code, roomId, language } = data;
            const userId = socket.user.id;
            await codeSave({code, roomId, userId, language});

            socket.to(roomId).emit('receiveCode',{code, userId});
        })

        socket.on('disconnect', async () => {
            await removeMember({email: socket.user.email, roomId: socket.roomId});
            io.to(socket.roomId).emit('userLeft');
        })
    })
}

initSocket();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

app.get('/', (req,res) => {
    res.send('Server is ready');
})

app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/contact', contactRoute);
app.use('/room', roomRoute);
app.use('/message', messageRoute);
app.use('/code', codeRoute);

server.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
})