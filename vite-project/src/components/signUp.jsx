import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = ({ heading }) => {
  const navigate = useNavigate();

  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    password: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to send POST request
  const handleSignUp = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Navigate to the questions page on success
        navigate('/login');
      } else {
        // Handle error, e.g., user already exists, validation issues, etc.
        console.log('Sign up failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-screen w-full">
      {/* Left side for the image */}
      <img 
        className="hidden lg:block lg:w-1/2 h-full lg:h-screen object-cover" 
        src="/image1.jpg" 
        alt="Placeholder" 
      />

      {/* Right side for the login form */}
      <div className="w-full lg:w-1/2 h-full lg:h-screen relative flex flex-col justify-center items-center p-6 lg:p-8">
        {/* Heading */}
        <div className="w-full max-w-md lg:max-w-lg text-center text-[#242424] text-3xl lg:text-4xl font-bold">
          {heading}
        </div>

        {/* Form Fields */}
        <div className="w-full max-w-md lg:max-w-lg mt-8 lg:mt-12 flex flex-col gap-6 lg:gap-8">
          {/* Name Input */}
          <div className="relative w-full">
            <label className="text-[#757575] text-sm lg:text-lg font-normal leading-[24px] mb-2 block">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-base lg:text-lg text-[#757575] placeholder-[#BDBDBD] focus:outline-none focus:border-[#7B76F1]"
              placeholder=""
            />
          </div>

          {/* Age Input */}
          <div className="relative w-full">
            <label className="text-[#757575] text-sm lg:text-lg font-normal leading-[24px] mb-2 block">
              Age
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-base lg:text-lg text-[#757575] placeholder-[#BDBDBD] focus:outline-none focus:border-[#7B76F1]"
              placeholder=""
            />
          </div>

          {/* Email Input */}
          <div className="relative w-full">
            <label className="text-[#757575] text-sm lg:text-lg font-normal leading-[24px] mb-2 block">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-base lg:text-lg text-[#757575] placeholder-[#BDBDBD] focus:outline-none focus:border-[#7B76F1]"
              placeholder=""
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <label className="text-[#757575] text-sm lg:text-lg font-normal leading-[24px] mb-2 block">
              Set Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-base lg:text-lg text-[#757575] placeholder-[#BDBDBD] focus:outline-none focus:border-[#7B76F1]"
              placeholder=""
            />
          </div>
        </div>

        {/* Remember me and Sign Up button */}
        <div className="w-full max-w-md lg:max-w-lg flex flex-col lg:flex-row items-center lg:justify-between gap-6 lg:gap-20 mt-8 lg:mt-12">
          <div className="flex items-center gap-2 lg:gap-3">
            <input
              type="checkbox"
              className="appearance-none w-[20px] lg:w-[25px] h-[20px] lg:h-[26px] rounded-[3px] border-[1px] border-[rgba(123,118,241,0.25)] checked:bg-[#7B76F1]"
            />
            <span className="text-[#757575] text-sm lg:text-lg font-normal">Remember me</span>
          </div>

          {/* Sign Up Button */}
          <div className="relative w-full lg:w-[180px] h-[50px] lg:h-[64px]">
            <button
              onClick={handleSignUp}
              className="w-full h-full bg-[#FE9052] rounded-[32px] shadow-[0px_34px_40px_-8px_rgba(123,118,241,0.24)] text-white text-base lg:text-lg font-bold leading-[24px]"
            >
              SIGN UP
            </button>
          </div>
        </div>

        {/* Log In link */}
        <div className="mt-8 lg:mt-12 text-center">
          <span className="text-[#424242] text-sm lg:text-lg font-normal">Already have an account? </span>
          <span className="text-[#FF5C01] text-sm lg:text-base font-bold underline cursor-pointer">LOG IN</span>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
