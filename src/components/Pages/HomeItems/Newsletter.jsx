
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail(''); // Clear the input field
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <motion.section
      className="bg-gray-800 text-white py-20 px-6 sm:px-12 lg:px-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto">
          Stay updated with the latest articles, tips, and news. Enter your email to receive our newsletter.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-4 py-3 mb-4 sm:mb-0 sm:mr-4 w-full rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;