import { Editor } from '@monaco-editor/react'
import React from 'react'
import RemoteEditor from './RemoteEditor'
import { useSelector } from 'react-redux';

const EditorComponent = () => { 
    const isRemoteEditorOpen = useSelector((state) => state.remoteEditor.isRemoteEditorOpen);
    const aboveTablet = window.innerWidth >= 768 ? true : false;

    return (
        <div className=' w-full h-[92%] sm:h-[90%] flex flex-col md:flex-row '>
            <Editor
                className={` ${isRemoteEditorOpen && "h-[50vh]" } md:h-full `}
                width={(isRemoteEditorOpen && aboveTablet) ? "50%" : "100%"}
                defaultLanguage="javascript"
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

            <RemoteEditor />
        </div>
    )
}

export default EditorComponent
