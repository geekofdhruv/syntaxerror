import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const LoginComponent = ({ heading }) => {
  const navigate = useNavigate();
  // State variables for form fields
  const [travelFrequency, setTravelFrequency] = useState('');
  const [tripPreference, setTripPreference] = useState('');
  const [tripType, setTripType] = useState('');
  const [destinationPreference, setDestinationPreference] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [transportPreference, setTransportPreference] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userPersonaData = {
      travel_frequency: travelFrequency,
      trip_preferences: tripPreference,
      trip_type: tripType,
      destination_preference: destinationPreference,
      accommodation_preference: accommodation,
      transport_preference: transportPreference,
    };
  
    const token = localStorage.getItem('access_token');
    console.log('Token:', token); // Log the token
  
    try {
      const response = await fetch('http://127.0.0.1:8000/personas/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userPersonaData),
      });
  
      console.log('Response status:', response.status);
  
      if (response.ok) {
        const data = await response.json();
        console.log('User persona created:', data);
        alert('Your preferences have been saved successfully!');

        navigate('/');
       
      } else {
        const errorData = await response.json();
        console.error('Error details:', errorData);
        alert('Error saving persona: ' + (errorData.detail || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error during submission:', error.response ? error.response.data : error);
      alert('An error occurred while saving your persona.');
    }
  };
  

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
        <form onSubmit={handleSubmit} className="w-full lg:ml-48 lg:mt-12 flex flex-col gap-8 mt-8 lg:gap-8">
          <div className="flex flex-col gap-8">
            {/* Travel Frequency Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Travel frequency
              </label>
              <select
                value={travelFrequency}
                onChange={(e) => setTravelFrequency(e.target.value)}
                className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="once_a_year">Once a year</option>
                <option value="2-3_times_a_year">2-3 times a year</option>
                <option value="once_a_month">Once a month</option>
                <option value="more_frequently">More frequently</option>
              </select>
            </div>

            {/* Trip Preference Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Trip Preference
              </label>
              <select
                value={tripPreference}
                onChange={(e) => setTripPreference(e.target.value)}
                className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="adventure">Adventure</option>
                <option value="relaxation">Relaxation</option>
                <option value="cultural_exploration">Cultural exploration</option>
                <option value="partying_nightlife">Partying/Nightlife</option>
                <option value="business">Business</option>
              </select>
            </div>

            {/* Trip Type Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Trip Type
              </label>
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="planned">Planned</option>
                <option value="spontaneous">Spontaneous</option>
                <option value="mix_of_both">A mix of both</option>
              </select>
            </div>

            {/* Destination Preference Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Destination Preference
              </label>
              <select
                value={destinationPreference}
                onChange={(e) => setDestinationPreference(e.target.value)}
                className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="beaches">Beaches</option>
                <option value="mountains">Mountains</option>
                <option value="urban_cities">Urban Cities</option>
                <option value="historical_sites">Historical Sites</option>
                <option value="national_parks">National Parks</option>
              </select>
            </div>

            {/* Accommodation Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Accommodation
              </label>
              <select
                value={accommodation}
                onChange={(e) => setAccommodation(e.target.value)}
                className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="hotels">Hotels</option>
                <option value="hostels">Hostels</option>
                <option value="ashrams_dharamshaala">Ashrams/ Dharamshaala</option>
                <option value="camping">Camping</option>
              </select>
            </div>

            {/* Transport Preference Dropdown */}
            <div className="relative w-full lg:w-[480px] h-[75px]">
              <label className="text-[#757575] text-base lg:text-lg font-normal leading-[24px] mb-2 block">
                Transport Preference
              </label>
              <select
                value={transportPreference}
                onChange={(e) => setTransportPreference(e.target.value)}
                className="w-full h-[40px] border-b-2 border-[#BDBDBD] text-lg text-[#757575] bg-transparent focus:outline-none focus:border-[#7B76F1] cursor-pointer"
              >
                <option value="">Select</option>
                <option value="public_transportation">Public transportation (buses, trains, etc.)</option>
                <option value="renting_a_car">Renting a car</option>
                <option value="walking_biking">Walking/Biking</option>
                <option value="private_transport">Private transport (taxis, Ubers, etc.)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-[50px] bg-[#7B76F1] text-white text-lg font-semibold rounded-lg mt-6 hover:bg-[#6d6ae6]"
            >
              DONE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
