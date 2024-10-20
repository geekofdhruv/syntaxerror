import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginSignup = () => {
    navigate('/login'); // Redirect to login page
  };
  const backToHome = () => {
    navigate('/'); // Redirect to home page
  };
  const toTrips = () => {
    navigate('/trips'); // Redirect to login page
  };
  const toMatchPage = () => {
    navigate('/match'); // Redirect to match page
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-between items-center p-4 gap-4 md:gap-[321px] mx-32">
      {/* Logo */}
      <div className="flex items-center">
        <img 
          src="Group 9.png" 
          alt="TripMates Logo" 
          className="w-10" 
        />
        <span className="text-black text-[28px] md:text-[35px] font-publicSans font-medium ml-2">
          TripMates
        </span>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center md:justify-start items-center gap-4 md:gap-6">
        <button onClick={backToHome} className="text-center text-[#FE9052] text-[16px] md:text-[18px] font-publicSans font-medium leading-[20px]">
          Home
        </button>
        <button onClick={toMatchPage} className="text-center text-black text-[16px] md:text-[18px] font-publicSans font-medium leading-[20px]">
          Match
        </button>
        <button onClick={toTrips} className="text-center text-black text-[16px] md:text-[18px] font-publicSans font-medium leading-[20px]">
          Trip
        </button>
        <div className="text-center text-black text-[16px] md:text-[18px] font-publicSans font-medium leading-[20px]">
          Locals
        </div>
      </div>

      {/* Login/Signup Button */}
      <div className="h-[48px] flex gap-4 md:gap-6">
        <button
          onClick={handleLoginSignup}
          className="px-5 py-2 md:px-24 md:py-3 bg-[#FE9052] rounded-full border border-white/[.16] backdrop-blur-[4px] flex justify-center items-center gap-2.5"
        >
          <div className="text-center text-white text-[14px] md:text-[16px] font-publicSans font-semibold leading-[20px]">
            Login/Signup
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;