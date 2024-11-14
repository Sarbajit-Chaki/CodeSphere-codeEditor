import { Editor } from '@monaco-editor/react'
import React from 'react'

const EditorComponent = () => {
    return (
        <div className=' w-full h-[92%] sm:h-[90%] flex'>
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                defaultValue="// Welcome to CodeSphere - Code, Compile, Run and Debug online from anywhere in world."
                theme='vs-dark'
                options={{
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

export default EditorComponent
