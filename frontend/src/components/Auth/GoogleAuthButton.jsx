import { FcGoogle } from "react-icons/fc";
import ShineBorder from "../ui/shine-border";

const GoogleAuthButton = ({signIn}) => {
  return (
    <>
      <ShineBorder className="flex w-full justify-center items-center gap-x-2 bg-[#27272A] rounded-3xl px-8 py-3 min-h-fit cursor-pointer" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
        <FcGoogle className="text-xl" />
        <span className="text-lg">{signIn ? "Login" : "Signup"} with Google</span>
      </ShineBorder>
    </>
  );
};

export default GoogleAuthButton;
