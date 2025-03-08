import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-4 fixed w-full z-10"
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="#hero" className="hover:text-red-500 transition-colors duration-300">
            Nightlife Media
          </a>
        </div>
        <div className="space-x-6">
          <a href="#events" className="hover:text-red-500 transition-colors duration-300">
            Events
          </a>
          <a href="#gallery" className="hover:text-red-500 transition-colors duration-300">
            Gallery
          </a>
          <a href="#assistant" className="hover:text-red-500 transition-colors duration-300">
            Assistant
          </a>
          <a href="#contact" className="hover:text-red-500 transition-colors duration-300">
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;