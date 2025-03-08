import React, { useState, useEffect } from 'react';

const Ticketing = ({ eventId, eventDetails }) => {
  const [tickets, setTickets] = useState(1);
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(true);
  const [errorRecommendations, setErrorRecommendations] = useState('');
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);

  useEffect(() => {
    // Fetch AI-recommended events
    const fetchRecommendedEvents = async () => {
      try {
        const res = await fetch('/api/ai-recommendations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ eventId }),
        });

        if (!res.ok) {
          throw new Error('Failed to fetch AI recommendations');
        }

        const data = await res.json();
        setRecommendedEvents(data.recommendedEvents);
      } catch (error) {
        setErrorRecommendations(error.message);
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendedEvents();
  }, [eventId]);

  const handleIncrease = () => {
    setTickets(tickets + 1);
  };

  const handleDecrease = () => {
    if (tickets > 1) {
      setTickets(tickets - 1);
    }
  };

  const handlePurchase = () => {
    // Open a modal with a purchase confirmation
    setPurchaseModalOpen(true);
  };

  const closeModal = () => {
    setPurchaseModalOpen(false);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold text-white mb-4">Purchase Tickets</h2>
      
      {/* Optional Event Details */}
      {eventDetails && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-white">{eventDetails.name}</h3>
          <p className="text-gray-400">
            {eventDetails.date} | {eventDetails.location}
          </p>
        </div>
      )}
      
      {/* Ticket Quantity Controls */}
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={handleDecrease}
          className="bg-red-500 text-white px-4 py-2 rounded-l-lg hover:bg-red-600 transition-colors duration-300"
        >
          -
        </button>
        <span className="bg-gray-700 text-white px-6 py-2">{tickets}</span>
        <button
          onClick={handleIncrease}
          className="bg-green-500 text-white px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors duration-300"
        >
          +
        </button>
      </div>
      
      {/* Purchase Button */}
      <button
        onClick={handlePurchase}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
      >
        Purchase Tickets
      </button>

      {/* Purchase Confirmation Modal */}
      {purchaseModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg z-10 max-w-md w-full">
            <h3 className="text-xl font-bold text-white mb-4">Purchase Confirmation</h3>
            <p className="text-gray-300 mb-4">
              You have purchased {tickets} ticket(s){' '}
              {eventDetails
                ? `for ${eventDetails.name}.`
                : `for event ${eventId}.`} Thank you for your purchase!
            </p>
            <button
              onClick={closeModal}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Recommended Events Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-white mb-4">Recommended Events</h3>
        {loadingRecommendations && (
          <p className="text-gray-400">Loading recommendations...</p>
        )}
        {errorRecommendations && (
          <p className="text-red-500">{errorRecommendations}</p>
        )}
        {!loadingRecommendations && recommendedEvents.length === 0 && !errorRecommendations && (
          <p className="text-gray-400">No recommendations available at the moment.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedEvents.map((event) => (
            <div key={event.id} className="bg-gray-700 p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-white">{event.name}</h4>
              <p className="text-gray-400">{event.date}</p>
              <button
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                onClick={() => alert(`Recommended event: ${event.name}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ticketing;