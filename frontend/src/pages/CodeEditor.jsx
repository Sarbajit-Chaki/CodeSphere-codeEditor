import EditorComponent from '@/components/CodeEditor/EditorFrame/EditorComponent'
import TopBar from '@/components/CodeEditor/EditorFrame/TopBar'
import EditorSidebar from '@/components/CodeEditor/EditorSidebar/EditorSidebar'
import React from 'react'

const CodeEditor = () => {
    return (
        <>
            <div className=' w-full h-screen'>
                <EditorSidebar />
                <TopBar />
                <EditorComponent />
            </div>
        </>
    )
}

export default CodeEditor
