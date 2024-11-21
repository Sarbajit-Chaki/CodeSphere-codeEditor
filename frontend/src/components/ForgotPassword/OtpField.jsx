import { useState } from "react";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

const OtpField = ({ setStage }) => {
  const [otp, setOtp] = useState("");

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp) {
      return;
    }
    if(otp.length !== 6) {
      return;
    }
    // api call
    setStage(3);
  }
  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-lg ">Enter OTP</h2>
      <p className="text-gray-400">We have sent an OTP to your email</p>
      <InputOTP
        maxLength={6}
        value={otp}
        onChange={(value) => {
          setOtp(value);
        }}
      >
        <InputOTPGroup>
          {Array(6)
            .fill("")
            .map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="sm:size-14 border-gray-600"
              />
            ))}
        </InputOTPGroup>
      </InputOTP>
      <div className="flex justify-end">
        <Button onClick={handleOtpSubmit}>Verify</Button>
      </div>
    </div>
  );
};

export default OtpField;
