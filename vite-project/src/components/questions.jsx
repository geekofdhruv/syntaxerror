import React from 'react';

const LoginComponent = ({ heading }) => {
  return (
    <div className="flex flex-col lg:flex-row h-full lg:h-screen w-full">
      {/* Left side for the image */}
      <img 
        className="w-full lg:w-1/2 h-64 lg:h-full object-cover" 
        src="/image1.jpg" 
        alt="Placeholder" 
      />

      {/* Right side for the form */}
      <div className="w-full lg:w-1/2 h-full relative flex flex-col justify-center items-start p-6 lg:p-8 lg:ml-24">
        {/* Heading */}
        <div className="mt-8 lg:mt-32 w-full lg:w-[480px] text-center lg:ml-48 text-[#242424] text-2xl lg:text-4xl font-bold">
          {heading}
        </div>

        {/* Instruction */}
        <div className="w-full lg:w-[520px] mt-4 lg:mt-16 text-center lg:ml-48 text-[#242424] text-lg lg:text-xl font-normal">
          Answer the following questions to tailor your journey:
        </div>

        {/* Form Fields */}
        <div className="w-full lg:ml-48 lg:mt-12 flex flex-col gap-8 mt-8 lg:gap-8">
          <div className="flex flex-col gap-8">
            {/* Travel Frequency Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Travel frequency
              </label>
              <select className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer">
                <option value="">Select</option>
                <option value="weekly">Once a month</option>
                <option value="monthly">Once a year</option>
                <option value="quarterly">2-3 times a year</option>
                <option value="yearly">More frequently</option>
              </select>
            </div>

            {/* Trip Preference Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Trip Preference
              </label>
              <select className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer">
                <option value="">Select</option>
                <option value="solo">Adventure</option>
                <option value="family">Relaxation</option>
                <option value="friends">Partying/Nightlife</option>
                <option value="couple">Business</option>
              </select>
            </div>

            {/* Trip Type Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Trip Type
              </label>
              <select className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer">
                <option value="">Select</option>
                <option value="adventure">Planned</option>
                <option value="relaxation">Spontaneous</option>
                <option value="cultural">A mix of both</option>
              </select>
            </div>

            {/* Destination Preference Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Destination Preference
              </label>
              <select className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer">
                <option value="">Select</option>
                <option value="beach">Beaches</option>
                <option value="mountain">Mountains</option>
                <option value="city">Urban Cities</option>
                <option value="historic">Historic Sites</option>
                <option value="national-parks">National Parks</option>
              </select>
            </div>

            {/* Accommodation Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Accommodation
              </label>
              <select className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer">
                <option value="">Select</option>
                <option value="hotel">Hotels</option>
                <option value="resort">Hostels</option>
                <option value="hostel">Ashrams/ Dharamshaala</option>
                <option value="apartment">Camping</option>
              </select>
            </div>

            {/* Transport Preference Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Transport Preference
              </label>
              <select className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer">
                <option value="">Select</option>
                <option value="public-transport">Public transportation (buses, trains, etc.)</option>
                <option value="car-rental">Renting a car</option>
                <option value="walking">Walking/Biking</option>
                <option value="private">Private transport (taxis, Ubers, etc.)</option>
              </select>
            </div>
          </div>

          {/* Done Button */}
          <div className="flex justify-center lg:justify-between ml-48 mt-8">
            <button className="w-[180px] h-[64px] bg-[#FE9052] rounded-[32px] shadow-[0px_34px_40px_-8px_rgba(123,118,241,0.24)] text-white text-lg font-bold leading-[24px] hover:bg-[#ff7b2e] transition-colors duration-300">
              DONE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
