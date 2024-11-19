import { Editor } from "@monaco-editor/react";
import React, { useEffect, useRef, useState } from "react";
import RemoteEditor from "./RemoteEditor";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUserCode } from "@/features/CodeSlice/codeSlice";

const EditorComponent = ({ socket }) => {
  const isRemoteEditorOpen = useSelector((state) => state.remoteEditor.isRemoteEditorOpen);
  const aboveTablet = window.innerWidth >= 768 ? true : false;

  const dispatch = useDispatch();
  const location = useLocation();
  const roomId = location?.state?.roomId;

  const room = useSelector((state) => state.room.room.roomDetails);
  const userCode = useSelector((state) => state.code.userCode);
  const [language, setLanguage] = useState(null);
  const lastEmittedCode = useRef(""); // Store last emitted code
  const timeoutRef = useRef(null); // Store timeout reference

  useEffect(() => {

    if (room?.language) {
      const derivedLanguage = room.language.split(" ")[0].toLowerCase();
      setLanguage(derivedLanguage);
    }
  }, [room?.language]);


  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to emit the code after a delay (3 seconds)
    timeoutRef.current = setTimeout(() => {
      if (roomId && socket && userCode !== lastEmittedCode.current) {
        lastEmittedCode.current = userCode; // Update last emitted code
        socket.emit("saveCode", { roomId, code: userCode, room: room?.language });
      }
    }, 3000); // Delay of 3 seconds (adjust as needed)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      dispatch(setUserCode(""));
    };
  }, [userCode, roomId, socket, room?.language]);

  return (
    <div className=" w-full h-[92%] sm:h-[90%] flex flex-col md:flex-row ">
      {language && socket && (
        <>
          <Editor
            className={` ${isRemoteEditorOpen && "h-[50vh]"} md:h-full `}
            width={isRemoteEditorOpen && aboveTablet ? "50%" : "100%"}
            defaultLanguage={language}
            defaultValue="// Welcome to CodeSphere - Code, Compile, Run and Debug online from anywhere in world."
            value={userCode}
            onChange={(value) => dispatch(setUserCode(value))}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              cursorBlinking: "expand",
              automaticLayout: true,
              scrollBeyondLastLine: true,
              highlightActiveLine: true,
              suggestOnTriggerCharacters: true,
              scrollbar: {
                vertical: "invisible", // Show vertical scrollbar always
                horizontal: "visible", // Show horizontal scrollbar always
                verticalScrollbarSize: 12, // Set vertical scrollbar size
                horizontalScrollbarSize: 12, // Set horizontal scrollbar size
                verticalSliderSize: 10, // Set size of the scrollbar slider (thumb)
                horizontalSliderSize: 10,
              },
            }}
          />

          <RemoteEditor language={language} />
        </>
      )}
    </div>
  );
};

export default EditorComponent;
