import React from 'react';
import { useNavigate } from 'react-router-dom';


const LoginComponent = ({ heading }) => {
  const navigate = useNavigate();
   // Function to handle button click
   const goTosignupPage = () => {
    navigate('/SignUp');
  };
  return (
   
    <div className="flex flex-col lg:flex-row h-full lg:h-screen w-full">
      {/* Left side for the image */}
      <img 
        className="hidden lg:block lg:w-1/2 h-full object-cover" 
        src="/image1.jpg" 
        alt="Placeholder" 
      />

      {/* Right side for the login form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-6 lg:p-8">
        {/* Heading */}
        <div className="w-full max-w-md lg:max-w-lg text-center text-[#242424] text-3xl lg:text-4xl font-bold">
          {heading}
        </div>

        {/* Form Fields */}
        <div className="w-full max-w-md lg:max-w-lg mt-8 lg:mt-12 flex flex-col gap-6 lg:gap-8">
          {/* Email or Username Input */}
          <div className="relative w-full">
            <label className="text-[#757575] text-sm lg:text-lg font-normal leading-[24px] mb-2 block">
              Email or Username
            </label>
            <input
              type="text"
              className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-base lg:text-lg text-[#757575] placeholder-[#BDBDBD] focus:outline-none focus:border-[#7B76F1]"
              placeholder=""
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <label className="text-[#757575] text-sm lg:text-lg font-normal leading-[24px] mb-2 block">
              Password
            </label>
            <input
              type="password"
              className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-base lg:text-lg text-[#757575] placeholder-[#BDBDBD] focus:outline-none focus:border-[#7B76F1]"
              placeholder=""
            />
          </div>
        </div>

        {/* Remember me and Log In button */}
        <div className="w-full max-w-md lg:max-w-lg flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-20 mt-8 lg:mt-12">
          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2 lg:gap-3">
            <input
              type="checkbox"
              className="appearance-none w-[20px] lg:w-[25px] h-[20px] lg:h-[26px] rounded-[3px] border-[1px] border-[rgba(123,118,241,0.25)] checked:bg-[#7B76F1]"
            />
            <span className="text-[#757575] text-sm lg:text-lg font-normal">Remember me</span>
          </div>

          {/* Log In Button */}
          <div className="w-full lg:w-[180px] h-[50px] lg:h-[64px]">
            <button  className="w-full h-full bg-[#FE9052] rounded-[32px] shadow-[0px_34px_40px_-8px_rgba(123,118,241,0.24)] text-white text-base lg:text-lg font-bold leading-[24px]">
              LOG IN
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-8 lg:mt-12 text-center">
          <span className="text-[#424242] text-sm lg:text-lg font-normal">No Account yet? </span>
          <span onClick={goTosignupPage} className="text-[#FF5C01] text-sm lg:text-base font-bold underline cursor-pointer">SIGN UP</span>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
