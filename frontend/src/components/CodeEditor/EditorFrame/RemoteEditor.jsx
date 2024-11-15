import { Button } from '@/components/ui/button'
import { Editor } from '@monaco-editor/react'
import { SquareX } from 'lucide-react'
import { useMonaco } from '@monaco-editor/react'
import { useEffect } from 'react'
import { BsTerminal } from 'react-icons/bs'
import { MdSaveAlt } from 'react-icons/md'

import { useDispatch, useSelector } from 'react-redux'
import { openTerminal } from '@/features/EditorSlice/terminalSlice.js'
import { closeRemoteEditor } from '@/features/EditorSlice/remoteEditorSlice.js'

const RemoteEditor = () => {
    const dispatch = useDispatch();
    const isRemoteEditorOpen = useSelector((state) => state.remoteEditor.isRemoteEditorOpen);
    const monaco = useMonaco();

    useEffect(() => {
        if(monaco) {
            monaco.editor.defineTheme('custom-theme', {
                base: 'vs-dark',
                inherit: true,
                rules: [],
                colors: {
                    "scrollbarSlider.background": "#4A5568", // scrollbar thumb color
                    "scrollbarSlider.hoverBackground": "#718096", // thumb color on hover
                    "scrollbarSlider.activeBackground": "#A0AEC0" // thumb color when active
                }
            });

            monaco.editor.setTheme('custom-theme');
        }
    },[monaco])
    
    return (
        <div className={` w-full h-[50%] md:h-full ${!isRemoteEditorOpen && "hidden"}`}>
            <div className=' w-full h-[40px] px-4 flex items-center justify-between bg-[#2a2a2a] border border-l-slate-600 border-b-slate-600 rounded-t-sm '>
                <div className=' text-base sm:text-lg font-semibold'>Sarbajit Chaki</div>
                <div className=' flex items-center gap-5'>
                    <div className=' flex items-center gap-2'>
                        <Button><MdSaveAlt/><span className=' hidden sm:block'>Save</span></Button>
                        <Button onClick={() => dispatch(openTerminal())} variant="outline"><BsTerminal/><span className=' hidden sm:block'>Terminal</span></Button>
                    </div>
                    <SquareX onClick={() => dispatch(closeRemoteEditor())} className=' cursor-pointer' />
                </div>
            </div>

            <Editor
                className={` md:h-[calc(100%-40px)] border-l border-l-slate-600 `}
                defaultLanguage="javascript"
                defaultValue="// Welcome to CodeSphere - Code, Compile, Run and Debug online from anywhere in world."
                theme='vs-dark'
                options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    cursorBlinking: 'smooth',
                    automaticLayout: true,
                    scrollBeyondLastLine: true,
                    highlightActiveLine: true,
                    suggestOnTriggerCharacters: true,
                }}
            />
        </div>
    )
}

export default RemoteEditor
