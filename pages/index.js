import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AIAssistant from '@/components/ai/AIAssistant';
import { AIChatWidget } from '@/components/chat/AIChatWidget';
import VideoSection from '@/components/VideoSection';
import RSVPForm from '@/components/RSVPForm';
import BottomNav from '@/components/BottomNav';
import Login from '@/components/Login';
import EventCard from '@/components/events/EventCard';
import GallerySection from '@/components/GallerySection';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { client } from '@/lib/sanity';

export default function HomePage({ events, galleryImages, blogPosts }) {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="scroll-smooth bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center bg-hero bg-cover bg-center relative"
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="text-center px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl font-bold mb-4 neon-text"
          >
            Experience the Hottest Nightlife & Events
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-base sm:text-lg max-w-xs sm:max-w-2xl mx-auto mb-8"
          >
            Stay updated with the latest parties, celebrity events, and exclusive media coverage.
          </motion.p>
          <div>
            <a
              href="#events"
              className="bg-red-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white mr-4 hover:bg-red-600 transition-colors duration-300"
            >
              Browse Events
            </a>
            <a
              href="#gallery"
              className="bg-white text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            >
              View Gallery
            </a>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center neon-text"
          >
            Upcoming Events
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center neon-text"
          >
            RSVP & Photo Services Request
          </motion.h2>
          <RSVPForm />
        </div>
      </section>

      {/* Video Section */}
      <section id="videos" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6 neon-text"
          >
            Watch the Action Unfold
          </motion.h2>
          <p className="text-gray-400 mb-8">
            Immerse yourself in the latest event highlights and exclusive behind-the-scenes footage.
          </p>
          <VideoSection />
        </div>
      </section>

      {/* AI Content Assistant Section */}
      <section id="assistant" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <AIAssistant />
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection images={galleryImages} />

      {/* Blog Section */}
      <section id="blog" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center neon-text"
          >
            Latest Blog Posts
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <div key={post._id} className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">{post.title}</h3>
                <img src={post.mainImage.asset.url} alt={post.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <p className="text-gray-400">{post.body[0].children[0].text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription & Community Section */}
      <section id="subscription" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-10 neon-text"
          >
            Join Our Community
          </motion.h2>
          <p className="text-gray-400 mb-8">
            Get exclusive nightlife updates, event invitations, and more.
          </p>
          <form className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 mb-4 rounded-lg bg-gray-700 text-white"
              required
            />
            <button
              type="submit"
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
          <div className="mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Fixed Bottom Navigation */}
      <BottomNav />

      {/* Fixed AI Chat Widget */}
      <AIChatWidget />
    </div>
  );
}

export async function getStaticProps() {
  const events = await client.fetch(`*[_type == "event"]`);
  const galleryImages = await client.fetch(`*[_type == "image"]{title, "imageUrl": image.asset->url}`);
  const blogPosts = await client.fetch(`*[_type == "blogPost"]`);

  return {
    props: {
      events,
      galleryImages,
      blogPosts,
    },
  };
}