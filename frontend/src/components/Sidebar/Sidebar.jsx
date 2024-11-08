import { CircleUser, Home } from "lucide-react";
import SidebarContent from "./SidebarContent";
import SidebarGroup from "./SidebarGroup";
import SidebarHeader from "./SidebarHeader";
import logo from "@/assets/Auth/CodeSphere Logo.png";
import { RiCustomerService2Line } from "react-icons/ri";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import LogoutBtn from "./LogoutBtn";
import ProfileCard from "./ProfileCard";


const sidebarLinks = [
  { page: "/", text: "Dashboard", icon: <Home className="size-6 sm:size-8" /> },
  { page: "/profile", text: "Profile", icon: <CircleUser className="size-6 sm:size-8" /> },
  {
    page: "/contact",
    text: "Contact Us",
    icon: <RiCustomerService2Line className="size-6 sm:size-8" />,
  },
];

const Sidebar = () => {
  return (
    <div className="h-[100svh] w-14 sm:w-20 bg-[#101622] flex flex-col justify-between py-6 overflow-y-hidden overflow-x-hidden">
      <div className="flex flex-col justify-between items-center">
        <SidebarHeader className={"sm:mt-2 mb-10"}>
          <img src={logo} alt="CodeSphere Logo" width={60} />
        </SidebarHeader>
        <SidebarGroup>
          {sidebarLinks.map((link, index) => {
            return (
              <SidebarContent key={index} to={link.page} text={link.text}>
                {link.icon}
              </SidebarContent>
            );
          })}
          <div className="flex justify-center cursor-pointer text-gray-600">
            <LogoutBtn />
          </div>
        </SidebarGroup>
      </div>

      <div className="flex justify-center cursor-pointer">
        <ProfileCard >
        <Avatar className="rounded-md">
          <AvatarImage src="https://avatars.githubusercontent.com/u/116663682?s=400&u=c3d1bddd31d3de63f9bb7373ebfbebf2a8125e76&v=4" />
          <AvatarFallback>DG</AvatarFallback>
        </Avatar>
        </ProfileCard>
      </div>
    </div>
  );
};

export default Sidebar;
