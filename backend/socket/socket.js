import { socketAuthMiddleware } from '../middlewares/auth.middleware.js';

import { addMember, checkRoom, removeMember } from '../controllers/roomController.js';
import { saveMessage } from '../controllers/messageController.js';
import { codeSave } from '../controllers/codeController.js';

export const initSocket = (io) => {
    io.use(socketAuthMiddleware);   // socket middleware

    io.on('connection', (socket) => {
        console.log('user connected', socket?.user);

        socket.on('join-room', async (roomId) => {
            // check if user is already in the room, if not, 
            //Join the specified room
            const isPresesent = await checkRoom({roomId, userId: socket.user.id});
            if(isPresesent){
                socket.emit('userAlreadyPresent', {
                    userName: socket.user.name,
                });
                return;
            }

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
