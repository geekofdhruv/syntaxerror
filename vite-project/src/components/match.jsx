import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Import axios to make HTTP requests
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UserCard = ({ name, type, description, buttonText, onClick }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full w-full">
    <div className="mb-4 rounded-lg overflow-hidden">
      <img src="/image1.jpg" alt="Ferris wheel" className="w-full h-40 object-cover" />
    </div>
    <h3 className="text-xl font-semibold mb-1">{name}</h3>
    <p className="text-gray-600 mb-2">{type}</p>
    <p className="text-gray-700 mb-4 flex-grow">{description}</p>
    <button
      onClick={onClick}
      className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500 transition-colors"
    >
      {buttonText}
    </button>
  </div>
);

const Match = () => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [storedUser, setStoredUser] = useState(null); // State to hold the stored user data

  // Function to fetch the user stored in local storage by ID
  const fetchStoredUser = async () => {
    try {
      const userId = localStorage.getItem('user_id'); // Retrieve user ID from local storage
      if (userId) {
        const response = await axios.get(`http://127.0.0.1:8000/users/${userId}/`); // Make API call to get user
        setStoredUser(response.data);  // Set the user data in the state

        // Fetch similar users based on the stored user ID
        const similarUsersResponse = await axios.get(`http://127.0.0.1:8000/api/similar-users/${userId}/`);
        setUsers(similarUsersResponse.data);  // Set similar users
        setCurrentUser(similarUsersResponse.data[0]);  // Set the first user as the current user
      }
    } catch (error) {
      console.error('Error fetching stored user or similar users:', error);
    }
  };

  useEffect(() => {
    fetchStoredUser();  // Fetch the stored user and similar users on component mount
  }, []);

  const nextUser = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex + 1) % users.length);
    setCurrentUser(users[(currentUserIndex + 1) % users.length]);
  };

  const prevUser = () => {
    setCurrentUserIndex((prevIndex) => (prevIndex - 1 + users.length) % users.length);
    setCurrentUser(users[(currentUserIndex - 1 + users.length) % users.length]);
  };

  if (!currentUser || !storedUser) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Find a Travel Buddy</h1>
      <div className="flex flex-col md:flex-row items-center justify-around gap-15">
        <div className="w-full max-w-sm">
          {/* Render the user fetched from local storage */}
          <UserCard
            name={storedUser.name}
            type={storedUser.type}
            description={storedUser.description}
            buttonText="Finding Travel Buddy..."
            onClick={() => {}} // Add functionality if needed
          />
        </div>

        <div className="flex items-center">
          <button
            onClick={prevUser}
            className="bg-orange-300 p-2 rounded-full hover:bg-orange-400 transition-colors mr-4"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="w-full max-w-sm">
            <UserCard
              name={currentUser.name}
              type={currentUser.type}
              description={currentUser.description}
              buttonText="Connect"
              onClick={() => {}} // Add connect functionality
            />
          </div>

          <button
            onClick={nextUser}
            className="bg-orange-300 p-2 rounded-full hover:bg-orange-400 transition-colors ml-4"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Match;
