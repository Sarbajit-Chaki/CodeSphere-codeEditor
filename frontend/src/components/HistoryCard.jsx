import { Dot } from "lucide-react";
import { MagicCard } from "./ui/magic-card";
import { languages } from "@/data/languages";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HistoryCard = ({logo, roomName, roomID, createdAt}) => {
  return (
    <div className="flex  border-[1px] border-slate-500 rounded-md">
        <MagicCard
          className="py-2 px-4 bg-black/20 hover:bg-black/100  rounded-md cursor-pointer"
          gradientColor={"#262626"}
        >
          <div className="flex gap-x-4 items-center w-full">
            <div className="max-w-[50px]">
              <img
                src={languages[0].logo}
                width={30}
                className="aspect-square object-cover"
              />
            </div>
            <div>
              <p className="text-purple-300 text-lg">my-room-1</p>
              <p className="text-gray-400 flex text-xs items-center">
                cb4e8ef1-bfaf-4aa4-900f-e2ff7c36f073
                <Dot size={28} className="inline-block" />
                Created 2 days ago
              </p>
            </div>
          </div>
        </MagicCard>
        <div className="h-10 my-auto w-[1px] bg-slate-500"></div>
        <div className="w-16 ">
          <MagicCard
            className="py-2 px-4 flex items-center  bg-black/20 hover:bg-black/100  rounded-md cursor-pointer"
            gradientColor={"#262626"}
          >
            <DropdownMenu>
              <DropdownMenuTrigger>
                <DotsVerticalIcon color="white" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Rename</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </MagicCard>
        </div>
      </div>
  )
}

export default HistoryCard