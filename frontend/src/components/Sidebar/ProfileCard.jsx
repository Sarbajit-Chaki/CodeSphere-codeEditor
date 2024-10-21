import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export function ProfileCard({ children, userDetails }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://avatars.githubusercontent.com/u/116663682?s=400&u=c3d1bddd31d3de63f9bb7373ebfbebf2a8125e76&v=4" />
            <AvatarFallback>DG</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-bold font-mono">Dibakar Ghosh</h4>
            <p className="text-xs font-extralight font-mono">
              ghoshdibakar2020@gmail.com
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default ProfileCard;
