import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeTerminal } from '@/features/EditorSlice/terminalSlice.js';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const TerminalComponent = () => {
    const dispatch = useDispatch();
    const isTerminalOpen = useSelector((state) => state.terminal.isTerminalOpen);

    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput>{`*\n**\n***\n****\n*****\n******`}</TerminalOutput>
    ]);

    return (
        <div className={`absolute ${isTerminalOpen ? " bottom-0":" bottom-[-100%]"} transition-all duration-500 ease-in-out  w-full flex flex-col-reverse md:flex-row h-[250px] z-20 border-t border-t-slate-600`}>
            <div className="w-full md:w-[60%] h-full">
                <Terminal name='CodeSphere-Terminal' height='165px' colorMode={ColorMode.Dark}>
                    { terminalLineData }
                </Terminal>
            </div>

            <div className='w-full md:w-[40%] h-full bg-[#252a33] p-4 pt-1 border border-l-slate-700 '>
                <div className='flex justify-between items-center mb-4'>
                    <div className='text-xl font-mono font-medium text-gray-400'>Input</div>
                    <div className='flex gap-2'>
                        <Button>Run</Button>
                        <Button onClick={() => dispatch(closeTerminal())} variant="destructive">Close</Button>
                    </div>
                </div>
                <textarea 
                    placeholder='Your program will run without input'
                    className='w-full p-2 bg-transparent resize-none border border-slate-600 rounded-md h-[120px]' 
                >
                </textarea>
                <p className=' text-gray-400 text-xs'>Type input by giving space separated values</p>
            </div>
        </div>
    )
}

export default TerminalComponent
