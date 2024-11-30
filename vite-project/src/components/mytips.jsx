import React, { useState, useEffect } from 'react';
import { Calendar, Users, User, PlusCircle } from 'lucide-react';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom';

const TripCard = ({ destination, startDate, endDate, isGroup, status }) => (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full">
      <h3 className="text-xl font-semibold mb-2 text-orange-600">{destination}</h3>
      <div className="flex items-center mb-2 text-gray-600">
        <Calendar size={18} className="mr-2" />
        <span>{startDate} - {endDate}</span>
      </div>
      <div className="flex items-center mb-2 text-gray-600">
        {isGroup ? <Users size={18} className="mr-2" /> : <User size={18} className="mr-2" />}
        <span>{isGroup ? 'Group Trip' : 'Solo Trip'}</span>
      </div>
      <div className="mt-auto">
        <span className={`px-2 py-1 rounded-full text-sm ${
          status === 'Completed' ? 'bg-green-100 text-green-800' : 
          status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-blue-100 text-blue-800'
        }`}>
          {status}
        </span>
      </div>
    </div>
);

const AddTripCard = ({ onClick }) => (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 flex flex-col h-full items-center justify-center cursor-pointer hover:bg-orange-100 transition-colors"
    >
      <PlusCircle size={48} className="text-orange-500 mb-4" />
      <h3 className="text-xl font-semibold text-orange-600">Add New Trip</h3>
    </div>
);

const MyTripsPage = ({ AddTripComponent }) => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddTrip, setShowAddTrip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch trips from the backend using the user ID stored in local storage
    
    const fetchTrips = async () => {
      const userId = localStorage.getItem('user_id'); // Get user ID from local storage
      const token = localStorage.getItem('access_token'); // Get access token from local storage
      if (userId) {
        try {
          const response = await axios.get(`http://127.0.0.1:8000/trips/user/${userId}/`, {
            headers: {
              Authorization: `Bearer ${token}` // Include the token in the headers
            }
          });
          setTrips(response.data);  // Set the trips from the response
        } catch (error) {
          console.error('Error fetching trips:', error.response ? error.response.data : error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false); // Stop loading if there's no user ID
      }
    };
    
    
    fetchTrips();  // Call the function to fetch trips
  }, []);

  const handleAddTripClick = () => {
    setShowAddTrip(true);
    navigate('/AddTrip');
  };

  const handleCloseAddTrip = () => {
    setShowAddTrip(false);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="bg-orange-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black-600 mb-8 text-center">My Trips</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <TripCard
              key={trip.trip_id}
              destination={trip.place_to_travel}
              startDate={trip.expected_date_of_travel}
              endDate={trip.end_date_of_travel || 'N/A'} // Adjust if `end_date_of_travel` is available
              isGroup={trip.group_or_solo}
              status={trip.status || 'Upcoming'} // Adjust based on your model
            />
          ))}
          <AddTripCard onClick={handleAddTripClick} />
        </div>
      </div>

      {showAddTrip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <AddTripComponent onClose={handleCloseAddTrip} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTripsPage;
