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

const RemoteEditor = ({language}) => {
    const dispatch = useDispatch();
    const isRemoteEditorOpen = useSelector((state) => state.remoteEditor.isRemoteEditorOpen);
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
                defaultLanguage={language}
                defaultValue="// Welcome to CodeSphere - Code, Compile, Run and Debug online from anywhere in world."
                theme='vs-dark'
                options={{
                    minimap: { enabled: false },
                    fontSize: 16,
                    cursorBlinking: 'expand',
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
