import React from 'react';

const Hero = () => {
  const deals = [
    { id: 1, name: 'Montriol', rating: 4.8, price: 549, image: '/image1.jpg' },
    { id: 2, name: 'Flygone', rating: 4.5, price: 549, image: '/image1.jpg' },
    { id: 3, name: 'Piqnic', rating: 4.7, price: 549, image: '/image1.jpg' },
    { id: 4, name: 'Guideline', rating: 4.8, price: 549, image: '/image1.jpg' },
  ];
  const cards = [
    {
      id: 1,
      title: 'Sign Up',
      description: 'Create an account to start connecting with locals and fellow travelers.',
    },
    {
      id: 2,
      title: 'Explore Travelers',
      description: 'Browse profiles of travelers and locals in your destination.',
    },
    {
      id: 3,
      title: 'Connect with them',
      description: 'Start chatting and plan meetups with your new connections.',
    },
  ];
  return (
    <div>
    <div className="flex items-center justify-between p-8 bg-gray-100">
      <div className="w-1/2 pr-8">
        <h1 className="text-6xl font-bold mb-4 w-[35vw]">Get started on finding your next TripMate with us.</h1>
        <p className="text-xl mb-6 w-[40vw]">
          Discover amazing destinations and connect with fellow travelers. 
          Your next adventure is just a click away!
        </p>
        <button className="bg-white text-orange-500 font-bold py-2 px-4 rounded hover:bg-orange-100 transition duration-300">
          Discover Now
        </button>
      </div>
      <div className="w-1/2">
        <img 
          src="image1.jpg" 
          alt="Travel destination" 
          className="w-full h-[60%] rounded-lg shadow-lg"
        />
      </div>
    </div>
    <div className="bg-gray-100 p-6 md:p-10">
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Exclusive deals & discounts</h2>
      <p className="text-gray-600">Discover our best deals and unique offers to save this season</p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {deals.map((deal) => (
        <div key={deal.id} className="bg-white rounded-lg overflow-hidden shadow-md">
          <img src={deal.image} alt={deal.name} className="w-full h-40 object-cover" />
          <div className="p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">{deal.name}</h3>
              <div className="flex items-center">
                <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>{deal.rating}</span>
              </div>
            </div>
            <p className="text-orange-500 font-bold">${deal.price}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="text-center mt-8">
      <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300">
        Explore
      </button>
    </div>
  </div>
  <div className="bg-blue-50 p-6 md:p-10">
  <div className="text-center mb-8">
    <h2 className="text-2xl md:text-3xl font-bold mb-2">
      Connect with <span className="text-orange-500">Locals!</span>
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Discover authentic experiences and make new friends by connecting with locals at your travel destination.
    </p>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {cards.map((card) => (
      <div key={card.id} className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
        <p className="text-gray-600">{card.description}</p>
      </div>
    ))}
  </div>
</div>
</div>
  );
};

export default Hero;