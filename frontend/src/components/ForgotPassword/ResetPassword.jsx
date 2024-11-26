import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import { resetPassword, verifyToken } from "@/api/user";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [tokenNotFound, setTokenNotFound] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const location = useLocation();


  const verify = async (token) => {
    if (!token) {
      setTokenNotFound(true);
      return;
    }

    const res = await verifyToken(token);
    if (!res) {
      setIsTokenExpired(true);
      return;
    }

    setEmail(res?.decoded?.email);
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    verify(token);

  }, [location]);


  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be atleast 6 characters long", { autoClose: 3000 });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Password doesn't match", { autoClose: 3000 });
      return;
    }

    let data = {
      email: email,
      password: newPassword
    }

    const toastId = toast.loading("Resetting password...");

    const res = await resetPassword(data);
    if (!res) {
      toast.update(toastId, { render: "Failed to reset password", type: "error", isLoading: false, autoClose: 3000 });
      return;
    }
    toast.update(toastId, { render: "Password reset successfully", type: "success", isLoading: false, autoClose: 3000 });
  }

  if (tokenNotFound) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#000814]">
        <div className="text-white text-2xl font-semibold">Token Not Found</div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#000814]">
      {isTokenExpired ? <div className="text-white text-2xl font-semibold">Token Expired</div> :
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>
              Reset your password by entering your new password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="relative mb-4">
                <p className="mb-2">New Password</p>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  className="w-full p-2 rounded-lg border border-[#b1b1b1] bg-[#27272A]"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {showPassword ? (
                  <EyeOff
                    className="absolute right-2 top-10 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="absolute right-2 top-10 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <div className="relative">
                <p className="mb-2">Confirm Password</p>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full p-2 rounded-lg border border-[#b1b1b1] bg-[#27272A]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {showConfirmPassword ? (
                  <EyeOff
                    className="absolute right-2 top-10 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                ) : (
                  <Eye
                    className="absolute right-2 top-10 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={handleResetPassword}>Reset Password</Button>
          </CardFooter>
        </Card>
      }
    </div>
  );
};

export default ResetPassword;
