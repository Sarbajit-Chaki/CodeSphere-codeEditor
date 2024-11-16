import { Dot } from "lucide-react";
import { MagicCard } from "../ui/magic-card";
import { languages } from "@/data/languages";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HistoryCard = ({ logo, roomName, roomID, createdAt }) => {
  return (
    <div className="flex border-[1px] border-slate-500 rounded-md">
      <MagicCard
        className="py-2 px-4 bg-black/20 hover:bg-black/100  rounded-md cursor-pointer"
        gradientColor={"#262626"}
      >
        <div className="flex flex-row gap-x-4 items-center w-full">
          <div className="">
            <img
              src={languages[0].logo}
              width={30}
              className="aspect-square object-cover"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-purple-300 text-lg">my-room-1</p>
            <p className="text-gray-400 flex text-[10px] sm:text-xs items-center">
              507f1f77bcf86cd799439011
              <Dot size={28} className="inline-block" />
              Created 2 days ago
            </p>
          </div>
          <div className="w-full block sm:hidden">
            <p className="text-purple-300">my-room-1</p>
            <p className="text-[10px] text-gray-400">
              Created 2 days ago
            </p>
          </div>
        </div>
      </MagicCard>
      <div className="h-10 my-auto w-[1px] bg-slate-500"></div>
      <div className="w-16 ">
        <MagicCard
          className=" flex items-center  bg-black/20 hover:bg-black/100  rounded-md cursor-pointer"
          gradientColor={"#262626"}
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsVerticalIcon color="white" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Join</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </MagicCard>
      </div>
    </div>
  );
};

export default HistoryCard;
