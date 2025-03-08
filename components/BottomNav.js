import React from 'react';
import { useRouter } from 'next/router';

const BottomNav = () => {
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around py-2 z-50">
      <button onClick={() => navigateTo('#hero')} className="flex flex-col items-center">
        <i className="fas fa-home"></i>
        <span className="text-xs">Home</span>
      </button>
      <button onClick={() => navigateTo('#events')} className="flex flex-col items-center">
        <i className="fas fa-calendar-alt"></i>
        <span className="text-xs">Events</span>
      </button>
      <button onClick={() => navigateTo('#rsvp')} className="flex flex-col items-center">
        <i className="fas fa-envelope"></i>
        <span className="text-xs">RSVP</span>
      </button>
      <button onClick={() => navigateTo('#videos')} className="flex flex-col items-center">
        <i className="fas fa-video"></i>
        <span className="text-xs">Videos</span>
      </button>
      <button onClick={() => navigateTo('#vip')} className="flex flex-col items-center">
        <i className="fas fa-star"></i>
        <span className="text-xs">VIP</span>
      </button>
      <button onClick={() => navigateTo('#subscription')} className="flex flex-col items-center">
        <i className="fas fa-users"></i>
        <span className="text-xs">Community</span>
      </button>
    </nav>
  );
};

export default BottomNav;