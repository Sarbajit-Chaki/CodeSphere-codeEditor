import { useState } from "react";
import HomeBtn from "../Home/HomeBtn";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log(formData);
  };

  return (
    <div className="w-full border border-gray-600 rounded-xl p-4 sm:p-7 lg:p-14 flex gap-3 flex-col">
      <h1 className="text-2xl text-gray-300 md:text-3xl lg:text-4xl sm:leading-10 font-semibold text-richblack-5">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="text-gray-400 text-sm sm:text-base">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-x-6 my-2">
            <div className="w-full">
              <label>
                <p className="text-gray-300 text-sm sm:text-base">
                  First Name<span className="text-red-500">*</span>
                </p>
                <input
                  required
                  type="text"
                  name="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={handleOnChange}
                  className="bg-[#101622] text-xs sm:text-base border-gray-700 border-[1px] rounded-md w-full p-2 mb-2"
                />
              </label>
            </div>
            <div className="w-full">
              <label>
                <p className="text-gray-300 text-sm sm:text-base">
                  Last Name<span className="text-red-500">*</span>
                </p>
                <input
                  required
                  type="text"
                  name="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={handleOnChange}
                  className="bg-[#101622] text-xs sm:text-base border-gray-700 border-[1px] rounded-md w-full p-2 mb-2"
                />
              </label>
            </div>
          </div>
          <div className="my-2">
            <label>
              <p className="text-gray-300 text-sm sm:text-base">
                Email <span className="text-red-500">*</span>
              </p>
              <input
                required
                type="email"
                name="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleOnChange}
                className="bg-[#101622] text-xs sm:text-base border-gray-700 border-[1px] rounded-md w-full p-2 mb-2"
              />
            </label>
          </div>
          <div className="my-2">
            <label>
              <p className="text-gray-300 text-sm sm:text-base">
                Phone Number <span className="text-red-500">*</span>
              </p>
              <input
                required
                type="number"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleOnChange}
                className="bg-[#101622] text-xs sm:text-base border-gray-700 border-[1px] rounded-md w-full p-2 mb-2"
              />
            </label>
          </div>
          <div className="my-2">
            <label>
              <p className="text-gray-300 text-sm sm:text-base">
                Message <span className="text-red-500">*</span>
              </p>
              <textarea
                required
                name="message"
                placeholder="Enter your message here"
                cols={10}
                rows={7}
                value={formData.message}
                onChange={handleOnChange}
                className="bg-[#101622] text-xs sm:text-base border-gray-700 border-[1px] rounded-md w-full p-2 mb-2"
              />
            </label>
          </div>
          <button className="w-full" type="submit">
            <HomeBtn text="Send Message" className={'w-full'} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
