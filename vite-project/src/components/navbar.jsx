import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  // Function to handle button click
  const goToLogInPage = () => {
    navigate('/logIn');
  };
  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-between items-center p-4 md:p-8 gap-4 md:gap-[200px] lg:gap-[321px] mx-8 md:mx-16 lg:mx-32">
      {/* Logo */}
      <div className="text-black text-[24px] md:text-[28px] lg:text-[35px] font-publicSans font-medium">
        TripMates
      </div>

      {/* Navigation Links */}
      <div className="flex justify-center md:justify-start items-center gap-4 md:gap-6">
        <div className="text-center text-[#FE9052] text-[14px] md:text-[16px] lg:text-[18px] font-publicSans font-medium leading-[20px]">
          Home
        </div>
        <div className="text-center text-black text-[14px] md:text-[16px] lg:text-[18px] font-publicSans font-medium leading-[20px]">
          Match
        </div>
        <div className="text-center text-black text-[14px] md:text-[16px] lg:text-[18px] font-publicSans font-medium leading-[20px]">
          Trip
        </div>
        <div className="text-center text-black text-[14px] md:text-[16px] lg:text-[18px] font-publicSans font-medium leading-[20px]">
          Locals
        </div>
      </div>

      {/* Login/Signup Button */}
      <div className="w-full md:w-auto h-[48px] flex justify-center md:justify-end gap-4 md:gap-6">
        <div className="px-5 py-2 md:px-10 lg:px-24 md:py-3 bg-[#FE9052] rounded-full border border-white/[.16] backdrop-blur-[4px] flex justify-center items-center gap-2.5">
          <button onClick={goToLogInPage} className="text-center text-white text-[14px] md:text-[16px] font-publicSans font-semibold leading-[20px]">
            Login/Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
