import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const VideoSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Simulate fetching videos from an API
        const mediaVideos = [
          "https://www.youtube.com/embed/fixw7oCx3ws",
          "https://www.youtube.com/embed/another-video-id"
        ];
        // Validate URLs
        const validVideos = mediaVideos.filter(video => video.includes("youtube.com/embed/"));
        setVideos(validVideos);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load videos:', error);
        setError('Failed to load videos.');
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return (
      <section id="videos" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="loader">Loading videos...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="videos" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="videos" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center neon-text"
        >
          Featured Videos
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, index) => (
            <div key={index} className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src={video}
                title={`Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;