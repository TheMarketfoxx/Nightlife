import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Insert API call or other logic here. We'll simulate a successful submission.
    try {
      // Simulate a delay for submission.
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmitted(true);
      setError('');
    } catch (err) {
      setError('Failed to send your message, please try again later.');
    }
  };

  return (
    <section id="contact-form" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 neon-text">Contact Us</h2>
        {isSubmitted ? (
          <p className="text-green-400">Thank you for your message! We&apos;ll be in touch soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
              required
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
              required
            ></textarea>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default ContactForm;