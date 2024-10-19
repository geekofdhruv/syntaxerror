import React from 'react';

const match = () => {
  return (
<div className="w-full h-full pt-1.5 pb-4.25 pl-1.5 pr-1.5 bg-white shadow-md rounded-lg overflow-hidden flex flex-col justify-center items-center gap-1.5">
  <div className="relative h-[261.48px]">
    <div className="absolute w-[237.14px] h-[142px] flex justify-center items-center">
      <img
        className="w-[237.14px] h-[142px] rounded-lg"
        src="https://via.placeholder.com/237x142"
        alt="placeholder"
      />
    </div>
    <div className="absolute w-[214.42px] h-[102.44px] left-3 top-[159.04px] flex flex-col justify-start items-start gap-4.25">
      <div className="flex flex-col justify-start items-center gap-3">
        <div className="w-[214.42px] text-[#16192C] text-[11.36px] font-semibold leading-[15.45px]">
          Dhruv Saxena
        </div>
        <div className="w-[214.42px] text-[#425466] text-[9.94px] font-normal leading-[16.33px]">
          Tentative dates - November end
          <br />
          Kedarkantha Trek
        </div>
      </div>
      <div className="flex flex-col justify-start items-start gap-[7.10px]">
        <div className="flex flex-col justify-start items-start">
          <div className="px-[14.20px] py-2 bg-[#FE9052] rounded-md flex flex-col justify-start items-center gap-[7.10px]">
            <div className="flex justify-start items-center gap-1.5">
              <div className="text-white text-[8.52px] font-semibold leading-[8.52px]">
                See more
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default match;
