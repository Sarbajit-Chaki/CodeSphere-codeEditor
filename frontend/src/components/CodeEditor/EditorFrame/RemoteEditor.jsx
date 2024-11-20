import { Button } from '@/components/ui/button'
import { Editor } from '@monaco-editor/react'
import { SquareX } from 'lucide-react'
import { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react'
import { BsTerminal } from 'react-icons/bs'
import { MdSaveAlt } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import { openTerminal, setTerminalUser } from '@/features/EditorSlice/terminalSlice.js'
import { closeRemoteEditor } from '@/features/EditorSlice/remoteEditorSlice.js'
import { setRemoteUserCode } from '@/features/CodeSlice/codeSlice'
import { getRemoteCode } from '@/api/user'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

const RemoteEditor = ({language, socket}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const roomId = location?.state?.roomId;
    const roomData = useSelector((state) => state.room.room.roomDetails);
    const isRemoteEditorOpen = useSelector((state) => state.remoteEditor.isRemoteEditorOpen);
    const remoteUserId = useSelector((state) => state.code.remoteUserId);
    const remoteUserCode = useSelector((state) => state.code.remoteUserCode);
    const remoteUserName = useSelector((state) => state.code.remoteUserName);
    const monaco = useMonaco();

    useEffect(() => {
        if(monaco) {
            monaco.editor.defineTheme('custom-theme', {
                base: 'vs-dark',
                inherit: true,
                rules: [
                    { token: '', foreground: 'D4D4D4', background: '10151B' },
                    { token: 'comment', foreground: '808080' }, 
                    { token: 'keyword', foreground: 'FE4EDA' }, 
                    { token: 'string', foreground: '32CD32' }, 
                    { token: 'function', foreground: 'F1C40F' },
                    { token: 'variable', foreground: '9CDCFE' },
                    { token: 'constant', foreground: '4FC1FF' }, 
                    { token: 'number', foreground: '56B6C2' }, 
                    { token: 'delimiter', foreground: 'D4D4D4' },
                    { token: 'error', foreground: 'F44747' }, 
                ],
                colors: {
                    "editor.background": "#10151B", 
                    'editorLineNumber.foreground': '#4B5263',
                    'editor.selectionBackground': '#264F78', 
                    'editorIndentGuide.background': '#2E2E3E', 
                    "scrollbarSlider.background": "#4A5568", 
                    "scrollbarSlider.hoverBackground": "#718096", 
                    "scrollbarSlider.activeBackground": "#A0AEC0",
                    "editor.lineHighlightBackground": "#1B2635",
                }
            });

            monaco.editor.setTheme('custom-theme');
        }

    },[monaco])

    const handleCodeSave = async (code) => {
        const language = roomData?.language?.split(" ")[0].toLowerCase();
        const roomName = roomData?.name;

        if (!code || !language) {
            toast.error("Code not found", { autoClose: 3000 });
            return;
        }

        const extensions = {
            c: "c",
            "c++": "cpp", // C++
            java: "java", // Java
            python: "py",
            javascript: "js",
            typescript: "ts", // TypeScript
            rust: "rs", // Rust
            go: "go", // Go
        };

        const fileExtension = extensions[language] || "txt"; // Default to .txt if language is unknown

        // Create a Blob object with the code content
        const fileBlob = new Blob([code], { type: "text/plain" });
        const url = URL.createObjectURL(fileBlob);

        // Create a temporary anchor element
        const a = document.createElement("a");
        a.href = url;
        a.download = `${roomName} - ${remoteUserName.split(" ").join("")}.${fileExtension}`; // Set the file name and extension
        document.body.appendChild(a);

        // Programmatically click the anchor to trigger the download
        a.click();

        // Clean up
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const getRemoteEditorCode = async () => {
        const res = await getRemoteCode({roomId: roomId, userId: remoteUserId});

        if(!res){
            return;
        }

        dispatch(setRemoteUserCode(res?.code?.code));
    }

    useEffect(() => {
      getRemoteEditorCode();

      socket.on("receiveCode", (data) => {
        if(remoteUserId === data.userId) {
            dispatch(setRemoteUserCode(data.code));
        }
      })
    
      return () => {
        socket.off("receiveCode");
      }
    }, [])
    
    
    return (
        <div className={` w-full h-[50%] md:h-full ${!isRemoteEditorOpen && "hidden"}`}>
            <div className=' w-full h-[40px] px-4 flex items-center justify-between bg-[#2a2a2a] border border-l-slate-600 border-b-slate-600 rounded-t-sm '>
                <div className=' text-base sm:text-lg font-semibold'>{remoteUserName}</div>
                <div className=' flex items-center gap-5'>
                    <div className=' flex items-center gap-2'>
                        <Button onClick={() => handleCodeSave(remoteUserCode)}><MdSaveAlt/><span className=' hidden sm:block'>Save</span></Button>
                        <Button onClick={() => {dispatch(openTerminal()); dispatch(setTerminalUser("remoteUser"))}} variant="outline"><BsTerminal/><span className=' hidden sm:block'>Terminal</span></Button>
                    </div>
                    <SquareX onClick={() => dispatch(closeRemoteEditor())} className=' cursor-pointer' />
                </div>
            </div>

            <Editor
                className={` md:h-[calc(100%-40px)] border-l border-l-slate-600 `}
                defaultLanguage={language}
                defaultValue="// Welcome to CodeSphere - Code, Compile, Run and Debug online from anywhere in world."
                value={remoteUserCode}
                theme='vs-dark'
                options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    cursorBlinking: 'expand',
                    automaticLayout: true,
                    scrollBeyondLastLine: true,
                    highlightActiveLine: true,
                    suggestOnTriggerCharacters: true,
                    readOnly: true
                }}
            />
        </div>
    )
}

export default RemoteEditor
