import { useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const ResetPassword = ({ setStage, setDialogOpen }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // api call
    setDialogOpen(false);
    setStage(3);
  }

  return (
    <div className="flex flex-col justify-between gap-y-4">
      <h2 className="text-lg ">Reset Password</h2>
      <div className="relative">
        <p className="text-gray-400 mb-1">
          New Password <span className="text-red-400">*</span>
        </p>
        <input
          className="w-full rounded-md bg-[#121212] p-2 border border-white/30"
          type={showPassword1 ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
        />
        {
          showPassword1 ? (
            <EyeOff 
              className="absolute right-2 top-[52%] cursor-pointer" 
              onClick={() => setShowPassword1(c => !c)} 
            />
          ) : (
            <Eye 
              className="absolute right-2 top-[52%] cursor-pointer" 
              onClick={() => setShowPassword1(c => !c)}
            />
          )
        }
      </div>
      <div className="relative">
        <p className="text-gray-400 mb-1">
          Confirm Password <span className="text-red-400">*</span>
        </p>
        <input
          className="w-full rounded-md bg-[#121212] p-2 border border-white/30"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={showPassword2 ? "text" : "password"}
          placeholder="Confirm your password"
        />
        {
          showPassword2 ? (
            <EyeOff 
              className="absolute right-2 top-[52%] cursor-pointer" 
              onClick={() => setShowPassword2(c => !c)} 
            />
          ) : (
            <Eye 
              className="absolute right-2 top-[52%] cursor-pointer" 
              onClick={() => setShowPassword2(c => !c)} 
            />
          )
        }
      </div>
      <div className="flex justify-end">
        <Button onClick={handleResetPassword}>Reset Password</Button>
      </div>
    </div>
  );
};

export default ResetPassword;
