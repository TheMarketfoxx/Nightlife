import React, { useState } from "react";

const RSVPForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    event: "",
    photoServices: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, email, event } = formData;
    if (!name || !phone || !email || !event) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    try {
      // Simulate a network request or send to an API endpoint.
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsSubmitted(true);
    } catch (err) {
      setError("Submission failed. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-800 text-white rounded-lg">
      {isSubmitted ? (
        <p className="text-green-400">Thank you! Your RSVP has been received.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <label className="block mb-1" htmlFor="name">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="phone">
              Phone Number*
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="email">
              Email*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block mb-1" htmlFor="event">
              Event RSVP For*
            </label>
            <input
              type="text"
              id="event"
              name="event"
              value={formData.event}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="photoServices"
              name="photoServices"
              checked={formData.photoServices}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="photoServices">Request photo services for my event</label>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 p-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
          >
            Submit RSVP
          </button>
        </form>
      )}
    </div>
  );
};

export default RSVPForm;