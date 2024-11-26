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

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // db call
  },[]);

  const handleResetPassword = async () => {
    // db call
  }

  return (
    <div className="flex items-center justify-center h-screen bg-[#000814]">
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
          <Button>Reset Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
