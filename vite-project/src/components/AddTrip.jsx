import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TravelCard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateRange: '',
    isGroup: false,
    members: ['']
  });

  const navigate = useNavigate();

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
    if (formData.members.length < 10) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, '']
      }));
    }
  };

  const removeMember = (index) => {
    if (formData.members.length > 1) {
      const newMembers = formData.members.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        members: newMembers
      }));
    }
  };

  const handleAddTrip = async () => {
    try {
      const data = {
        place_to_travel: formData.title,
        expected_date_of_travel: formData.dateRange,
        group_or_solo: formData.isGroup,
        members: formData.isGroup ? formData.members : [],
      };
  
      const token = localStorage.getItem('access_token');
      console.log('Token:', token);  // Log the token to debug
      if (!token) {
        throw new Error('No token found. Please log in.');
      }
  
      const response = await axios.post('http://127.0.0.1:8000/trips/', data, {
        headers: {
          Authorization: `Bearer ${token}`, // Correctly formatted string
        },  
      });
  
      console.log('Trip added:', response.data);
      navigate('/trips');
    } catch (error) {
      console.error('Error adding trip:', error.response?.data || error.message);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mt-8">
      <img
        className="md:w-[700px] md:h-[750px] rounded-[30px] mb-4 md:mb-0 md:mr-8"
        src="/image1.jpg"
        alt="Travel destination"
      />
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter Destination"
          className="flex text-black text-[32px] md:text-[64px] font-bold w-full bg-white/80 rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none mb-4"
        />

        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Enter Description"
          className="text-black text-[20px] md:text-[24px] font-light w-full mt-4 bg-white/80 rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none resize-none h-32 mb-4"
        />

        <div className="flex items-center mt-4">
          <span className="text-black text-[20px] md:text-[29px] font-light">Expected Date of Travel: </span>
          <input
            type="text"
            value={formData.dateRange}
            onChange={(e) => handleInputChange('dateRange', e.target.value)}
            placeholder="Enter Date Range"
            className="text-black text-[20px] md:text-[29px] font-light ml-2 bg-white/80 rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none mb-4"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="text-black text-[20px] md:text-[24px] font-light">Solo Travel</label>
          <input
            type="radio"
            checked={!formData.isGroup}
            onChange={() => handleInputChange('isGroup', false)}
          />
          <label className="text-black text-[20px] md:text-[24px] font-light">Group Travel</label>
          <input
            type="radio"
            checked={formData.isGroup}
            onChange={() => handleInputChange('isGroup', true)}
          />
        </div>

        {formData.isGroup && (
          <>
            <div className="text-black text-[24px] md:text-[29px] font-medium mt-8 mb-4">Members</div>
            <div className="w-full bg-[#F9FAFF] rounded-[19px] border border-[#FA7436] mt-4 p-4">
              {formData.members.map((member, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={member}
                    onChange={(e) => handleMemberChange(index, e.target.value)}
                    placeholder={index === 0 ? "Enter your name" : `Enter Member ${index + 1}`} // Corrected placeholder
                    className="text-black text-[18px] md:text-[20px] font-normal flex-1 bg-white/80 rounded-lg px-4 py-2 border border-gray-300 focus:border-blue-500 focus:outline-none mb-2"
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
          </>
        )}

        <button
          onClick={handleAddTrip}
          className="mt-6 px-6 py-2 bg-[#FE9052] text-white font-semibold rounded-lg hover:bg-[#d65a24] transition-colors"
        >
          Add Trip
        </button>
      </div>
    </div>
  );
};

export default TravelCard;
