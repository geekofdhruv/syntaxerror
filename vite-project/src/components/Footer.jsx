import React from 'react';
import { MapPin, Mail, Phone, Compass, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div>
            <h2 className="text-2xl font-bold mb-4">TripMates</h2>
            <p className="text-gray-600 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, enim.
            </p>
            <div className="flex space-x-4">
              <Facebook className="text-orange-500 w-6 h-6" />
              <Twitter className="text-orange-500 w-6 h-6" />
              <Instagram className="text-orange-500 w-6 h-6" />
              <Youtube className="text-orange-500 w-6 h-6" />
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-2 rounded-full mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Discover</h3>
            <ul className="text-center">
              <li className="mb-2">Home</li>
              <li className="mb-2">About</li>
              <li className="mb-2">Tours</li>
            </ul>
          </div>

          {/* Right Column */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <ul>
              <li className="flex items-center mb-2">
                <MapPin className="w-5 h-5 mr-2 text-gray-600" />
                <span>Address: Lorem</span>
              </li>
              <li className="flex items-center mb-2">
                <Mail className="w-5 h-5 mr-2 text-gray-600" />
                <span>Email: xyz@mail.com</span>
              </li>
              <li className="flex items-center mb-2">
                <Phone className="w-5 h-5 mr-2 text-gray-600" />
                <span>Phone: 000222200222</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© 2024 Vision. Indesigns All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;