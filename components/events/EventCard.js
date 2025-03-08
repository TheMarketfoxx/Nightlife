import React from 'react';
import { motion } from 'framer-motion';

const EventCard = ({ event }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: event.index * 0.2 }}
      viewport={{ once: true }}
    >
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 sm:h-60 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          {event.title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mt-2">
          {event.description}
        </p>
        <a
          href="#rsvp"
          className="mt-4 inline-block bg-red-500 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-white hover:bg-red-600 transition-colors duration-300"
        >
          RSVP Now
        </a>
      </div>
    </motion.div>
  );
};

export default EventCard;