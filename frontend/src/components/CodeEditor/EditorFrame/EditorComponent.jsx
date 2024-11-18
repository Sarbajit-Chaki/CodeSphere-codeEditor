import { Editor } from '@monaco-editor/react'
import React, { useEffect, useState } from 'react'
import RemoteEditor from './RemoteEditor'
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { toogleNewMessage, toogleparticipantsChange } from '@/features/RoomSlice/RoomSlice';
import { setSocketInstance } from '@/features/RoomSlice/SocketSlice';
import { setUserCode } from '@/features/CodeSlice/codeSlice';

const EditorComponent = () => {
    const isRemoteEditorOpen = useSelector((state) => state.remoteEditor.isRemoteEditorOpen);
    const aboveTablet = window.innerWidth >= 768 ? true : false;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const roomId = location?.state?.roomId;

    const room = useSelector((state) => state.room.room.roomDetails);
    const [language, setLanguage] = useState(null);

    useEffect(() => {
        if (room?.language) {
            const derivedLanguage = room.language.split(" ")[0].toLowerCase();
            setLanguage(derivedLanguage);
        }
    }, [room?.language]);


    const [code, setCode] = useState('//Welcome to CodeSphere - Code, Compile, Run and Debug online from anywhere in world.\n');
    const userCode = useSelector((state) => state.code.userCode);



    const handleConnectionFail = (err) => {
        toast.error("Connection failed", { autoClose: 4000 });
        navigate("/");
    }

    useEffect(() => {
        if (!roomId) {
            navigate("/");
            return;
        }

        const socket = io("http://localhost:4000", {      // user try to connect with the socket server
            withCredentials: true,
            'force new connection': true,
            reconnectionAttempts: 'Infinity',
            timeout: 10000,
            transports: ['websocket']
        });

        dispatch(setSocketInstance(socket));


        socket.on("connect_error", handleConnectionFail);
        socket.on("connect_failed", handleConnectionFail);

        socket.emit("join-room", roomId);

        socket.on("userJoined", (socket) => {
            toast.info(`${socket.userName} joined the room`, {
                position: 'bottom-right',
                autoClose: 2000
            })

            dispatch(toogleparticipantsChange());
        })

        socket.on("receiveMessage", () => {
            dispatch(toogleNewMessage());
        })

        socket.on("userLeft", () => {
            dispatch(toogleparticipantsChange());
        })

        return () => {
            socket.off("connect_error");
            socket.off("connect_failed");
            socket.off("userJoined");

            socket.disconnect()
        }
    }, [])


    return (
        <div className=' w-full h-[92%] sm:h-[90%] flex flex-col md:flex-row '>
            {language && <>
                <Editor
                    className={` ${isRemoteEditorOpen && "h-[50vh]"} md:h-full `}
                    width={(isRemoteEditorOpen && aboveTablet) ? "50%" : "100%"}
                    defaultLanguage={language}
                    defaultValue="// Welcome to CodeSphere - Code, Compile, Run and Debug online from anywhere in world."
                    value={userCode}
                    onChange={(value) => dispatch(setUserCode(value))}
                    theme='vs-dark'
                    options={{
                        minimap: { enabled: false },
                        fontSize: 16,
                        cursorBlinking: 'expand',
                        automaticLayout: true,
                        scrollBeyondLastLine: true,
                        highlightActiveLine: true,
                        suggestOnTriggerCharacters: true,
                        scrollbar: {
                            vertical: 'invisible',          // Show vertical scrollbar always
                            horizontal: 'visible',        // Show horizontal scrollbar always
                            verticalScrollbarSize: 12,    // Set vertical scrollbar size
                            horizontalScrollbarSize: 12,  // Set horizontal scrollbar size
                            verticalSliderSize: 10,       // Set size of the scrollbar slider (thumb)
                            horizontalSliderSize: 10,
                        },
                    }}
                />

                <RemoteEditor language={language} />
            </>}
        </div>
    )
}

export default EditorComponent
