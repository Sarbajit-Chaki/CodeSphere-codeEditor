import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js';
import { connectDB } from './config/database.js';
import { cloudinaryConfig } from './config/cloudinary.js';

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
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Server is ready');
})

app.use('/auth', authRoute);
app.use('/user', userRoute);

server.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
})