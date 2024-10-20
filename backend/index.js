import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/authRoute.js';

dotenv.config();
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
app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Server is ready');
})

app.use('/auth', authRoute);

server.listen(PORT, (req,res) => {
    console.log(`Server is running on port ${PORT}`);
})