import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

const EmailField = ({ setStage }) => {
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    if(!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }
    // api call
    setStage(2);
  }

  return (
    <div className="flex flex-col justify-between">
      <h2 className="text-lg ">Forgot Password</h2>
      <p className="text-gray-400">
        Enter your registered email to receive an OTP.
      </p>
      <input
        className="w-full rounded-md bg-[#121212] p-2 border border-white/30"
        type="email"
        placeholder="Enter Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="flex justify-end">
        <Button onClick={handleEmailSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default EmailField;
