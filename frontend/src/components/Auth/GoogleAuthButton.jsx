import { FcGoogle } from "react-icons/fc";
import ShineBorder from "../ui/shine-border";
import { useGoogleLogin } from "@react-oauth/google";
import { oAuthLogin } from "@/api/user";

const GoogleAuthButton = ({ signIn }) => {
  const FetchUserData = async (response) => {
    try {
      if (response.code) {
        const code = response.code
        const data = await oAuthLogin(code)
        console.log(data)
      }
    } catch (error) {
      console.log("Error in responseGoogle: ", error);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: FetchUserData,
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
  })

  return (
    <div onClick={() => googleLogin()}>
      <ShineBorder
        className="flex w-full justify-center items-center gap-x-2 bg-[#27272A] rounded-3xl px-8 py-3 min-h-fit cursor-pointer" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <FcGoogle className="text-xl" />
        <span className="text-lg">{signIn ? "Login" : "Signup"} with Google</span>
      </ShineBorder>
    </div>
  );
};

export default GoogleAuthButton;
