import { languages } from "@/data/languages";
import Language from "./Language";
import { MagicCard } from "../ui/magic-card";
import { House, Plus } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import JoinRoom from "./JoinRoom";


const SelectLanguage = () => {
  return (
    <div className="relative rounded-md mx-auto w-11/12 sm:w-full flex justify-center items-center">
      {/* Circles positioned behind the SelectLanguage box */}
      <div className="absolute w-[10em] h-[10em] rounded-full shadow-[0_0_50px_#d84869] bg-gradient-to-bl from-[#d84869] to-[#f46641] animate-circle1 -left-[10%] -top-[15%] opacity-50 blur-xl z-0"></div>
      <div className="absolute w-[15em] h-[15em] rounded-full shadow-[0_0_50px_#5648d8] bg-gradient-to-bl from-[#5648d8] to-[#8641f4] animate-circle2 -right-[10%] -bottom-[20%] opacity-50 blur-xl z-0"></div>

      {/* Select Language box */}
      <div className="relative z-10  min-w-fit max-w-[620px] min-h-fit p-2 sm:p-6 bg-white/5 backdrop-blur-lg shadow-lg border border-white/30 rounded-md text-gray-200">
        <p className="text-lg text-center lg:text-start">Select a language</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-3 mt-4 mb-8">
          {languages.map((language, index) => (
            <Dialog key={index}>
              <DialogTrigger >
                <Language key={index} logo={language.logo} name={language.name} />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className='text-xl'>Create Room</DialogTitle>
                  <DialogDescription className=' text-lg'>
                    A room is created for {language.name} Language
                  </DialogDescription>
                </DialogHeader>
                <div className=" flex flex-col gap-2">
                  <input className="w-full p-2 my-2 bg-slate-800 rounded-lg" type="text" placeholder="Room Name" name="room-name" id="room-name" />

                  <div className=" flex items-center gap-2">
                    <input type="checkbox" name="screen-share" id="screen-share" />
                    <label htmlFor="screen-share">Anyone can see eachother screen</label>
                  </div>

                  <div className=" flex items-center gap-2">
                    <input type="checkbox" name="room-msg" id="room-msg" />
                    <label htmlFor="room-msg">Enable room messages</label>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Join Room box */}
        <Dialog >
          <DialogTrigger className="w-full">
            <JoinRoom />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className='text-xl'>Join Room</DialogTitle>
              <DialogDescription className=' text-lg'>
                Join an existing room by RoomID
              </DialogDescription>
            </DialogHeader>
            <div className="">
              <input className="w-full p-2 my-2 bg-slate-800 rounded-lg" type="text" placeholder="Room ID" name="room-id" id="room-id" />
            </div>
            <DialogFooter>
              <Button type="submit">Join</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SelectLanguage;
