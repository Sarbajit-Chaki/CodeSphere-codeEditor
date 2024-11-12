import React from 'react'
import Messages from './Messages'
import Participants from './Participants'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

const EditorSidebar = () => {
    return (
        <ResizablePanelGroup
            direction="vertical"
            className=" max-w-[340px] min-h-screen border "
        >
            <ResizablePanel defaultSize={40}>
                <Participants />
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel defaultSize={60}>
                <Messages />
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}

export default EditorSidebar
