import React, { useState } from 'react';

const TravelCard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateRange: '',
    members: [''] // Start with one empty member slot
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMemberChange = (index, value) => {
    const newMembers = [...formData.members];
    newMembers[index] = value;
    setFormData(prev => ({
      ...prev,
      members: newMembers
    }));
  };

  const addMember = () => {
    if (formData.members.length < 10) { // Limit to 5 members
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, '']
      }));
    }
  };

  const removeMember = (index) => {
    if (formData.members.length > 1) { // Keep at least one member
      const newMembers = formData.members.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        members: newMembers
      }));
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full ml-48 mt-16">
        <img
          className="absolute w-[700px] h-[700px] rounded-[30px] left-0 top-0"
          src="/image1.jpg"
          alt="Travel destination"
        />
        <div className="relative left-[570px] top-0 ml-64">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Enter Destination"
            className="flex text-black text-[64px] font-bold w-1/2 bg-white/80 rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
          />
          
          <div className="text-black text-[29px] font-medium mt-2">
            Expected Date of Travel
          </div>
          
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter Description"
            className="text-black text-[24px] font-light w-[665px] mt-4 bg-white/80 rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none resize-none h-32"
          />
          
          <div className="flex items-center mt-4">
            <span className="text-black text-[29px] font-light">Expected Date of Travel: </span>
            <input
              type="text"
              value={formData.dateRange}
              onChange={(e) => handleInputChange('dateRange', e.target.value)}
              placeholder="Enter Date Range"
              className="text-black text-[29px] font-light ml-2 bg-white/80 rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
            />
          </div>
          
          <div className="text-black text-[29px] font-medium mt-8">
            Members
          </div>
          
          <div className="w-[576px] bg-[#F9FAFF] rounded-[19px] border border-[#FA7436] mt-4 p-4">
            {formData.members.map((member, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={member}
                  onChange={(e) => handleMemberChange(index, e.target.value)}
                  placeholder={index === 0 ? "Enter your name" : `Enter Member ${index + 1}`}
                  className="text-black text-[20px] font-normal flex-1 bg-white/80 rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none"
                />
                {index !== 0 && (
                  <button
                    onClick={() => removeMember(index)}
                    className="text-red-500 hover:text-red-700 px-2 py-1 rounded"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            
            {formData.members.length < 10 && (
              <button
                onClick={addMember}
                className="flex items-center gap-2 text-[#FA7436] hover:text-[#d65a24] mt-2 px-4 py-2 rounded-lg border border-[#FA7436] hover:bg-[#fff3ef] transition-colors"
              >
                <span className="text-xl">+</span>
                <span>Add Member</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelCard;