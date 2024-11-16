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

import { connectDB } from './config/database.js';
import { cloudinaryConfig } from './config/cloudinary.js';

import './jobs/cleanUpJob.js';      // Import your cron job to run on server start

dotenv.config();
connectDB();
cloudinaryConfig();

const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        credentials: true
    }
});

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

server.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
})