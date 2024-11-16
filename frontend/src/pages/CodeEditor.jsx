import EditorComponent from '@/components/CodeEditor/EditorFrame/EditorComponent'
import TopBar from '@/components/CodeEditor/EditorFrame/TopBar'
import EditorSidebar from '@/components/CodeEditor/EditorSidebar/EditorSidebar'
import Terminal from '@/components/CodeEditor/Terminal/TerminalComponent'
import React from 'react'

const CodeEditor = () => {
    return (
        <>
            <div className='relative w-full h-screen overflow-y-hidden'>
                <EditorSidebar />
                <TopBar />
                <EditorComponent />
                <Terminal />
            </div>
        </>
    )
}

export default CodeEditor
