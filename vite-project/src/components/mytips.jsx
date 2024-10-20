import React, { useState, useEffect } from 'react';
import { Calendar, Users, User, PlusCircle } from 'lucide-react';
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
  
    useEffect(() => {
      // Simulated API call to fetch trips
      const fetchTrips = async () => {
        // Replace this with your actual API call
        const mockTrips = [
          { id: 1, destination: 'Paris, France', startDate: '2023-06-15', endDate: '2023-06-22', isGroup: false, status: 'Completed' },
          { id: 2, destination: 'Tokyo, Japan', startDate: '2023-08-01', endDate: '2023-08-10', isGroup: true, status: 'Pending' },
          { id: 3, destination: 'New York, USA', startDate: '2023-12-23', endDate: '2024-01-02', isGroup: true, status: 'Upcoming' },
          { id: 4, destination: 'Bali, Indonesia', startDate: '2024-03-15', endDate: '2024-03-25', isGroup: false, status: 'Pending' },
        ];
        setTrips(mockTrips);
        setIsLoading(false);
      };
  
      fetchTrips();
    }, []);
    const navigate = useNavigate();
  
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
                key={trip.id}
                destination={trip.destination}
                startDate={trip.startDate}
                endDate={trip.endDate}
                isGroup={trip.isGroup}
                status={trip.status}
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