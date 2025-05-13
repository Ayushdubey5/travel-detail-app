import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function Navbar() {
  return (
    <nav className=" bg-gray-900 shadow-lg fixed w-full top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-600">Sydney Events</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-purple-600">Home</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Categories</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">About</a>
            <a href="#" className="text-gray-600 hover:text-purple-600">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Reservation Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>48-hour cancellation policy</li>
              <li>100% refund if cancelled in time</li>
              <li>ID required at venue</li>
              <li>Age restrictions may apply</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400">Contact Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="mb-4 text-sm">Stay updated with the latest events in Sydney!</p>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:text-blue-400">Facebook</a>
              <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-400">Instagram</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2024 Sydney Events. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [email, setEmail] = useState('');
  const [expandedEvent, setExpandedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Sydney Opera House Concert',
      image: 'https://images.pexels.com/photos/1259614/pexels-photo-1259614.jpeg',
      date: '2024-03-15',
      ticketUrl: 'https://www.sydney.com/events',
      description: 'Enjoy a classical music evening at the iconic Sydney Opera House.'
    },
    {
      id: 2,
      title: 'Harbour Bridge Festival',
      image: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
      date: '2024-03-20',
      ticketUrl: 'https://www.sydney.com/events',
      description: 'Celebrate with fireworks, food, and culture on Sydney’s Harbour Bridge.'
    },
    {
      id: 3,
      title: 'Bondi Beach Music Festival',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg',
      date: '2024-03-25',
      ticketUrl: 'https://www.sydney.com/events',
      description: 'Live music and summer vibes at the world-famous Bondi Beach.'
    },
    {
      id: 4,
      title: 'Taronga Zoo Night Concert',
      image: 'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
      date: '2024-04-01',
      ticketUrl: 'https://www.sydney.com/events',
      description: 'Music under the stars with wildlife around at Taronga Zoo.'
    },
    {
      id: 5,
      title: 'Sydney Food Festival',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
      date: '2024-04-05',
      ticketUrl: 'https://www.sydney.com/events',
      description: 'Taste the best cuisines from around the world in Sydney’s heart.'
    },
    {
      id: 6,
      title: 'Royal Botanical Gardens Exhibition',
      image: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
      date: '2024-04-10',
      ticketUrl: 'https://www.sydney.com/events',
      description: 'Explore nature and floral art at the Botanical Gardens Exhibition.'
    }
  ];

  const handleTicketClick = (event) => {
    setSelectedEvent(event);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://backend-zfrz.onrender.com/api/email', {
        email,
        eventId: selectedEvent.id,
      });
      toast.success('Email registered successfully!');
      window.location.href = selectedEvent.ticketUrl;
    } catch (error) {
      toast.error('Failed to register email');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Toaster position="top-right" />
      <Navbar />

      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-2"><span className='text-5xl text-purple-800'>Discover</span> Sydney Events</h1>
          <p className="text-center text-gray-600 mb-12">Find and book the best events happening in Sydney</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl relative"
                onMouseEnter={() => setExpandedEvent(event.id)}
                onMouseLeave={() => setExpandedEvent(null)}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                {expandedEvent === event.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 transition-opacity duration-300" onClick={() => handleTicketClick(event)}>
                    <div className="text-white text-center">
                      <p className="font-semibold mb-2">Event Details:</p>
                      <p className="text-sm">{event.date}</p>
                      <p className="text-sm mt-2">Click for tickets!</p>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h2>
                  <p className="text-gray-600 mb-4">{event.date}</p>
                  <button
                    onClick={() => handleTicketClick(event)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    GET TICKETS
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Enter your email</h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Continue to Tickets
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
