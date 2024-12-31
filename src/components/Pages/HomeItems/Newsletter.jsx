import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail(""); // Clear the input field
    } else {
      toast.error("Please enter a valid email address.");
    }
  };

  return (
    <motion.section
      className="py-20 px-6 sm:px-12 lg:px-24 bg-gradient-to-r from-blue-800 to-indigo-800 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Stay Connected
        </h2>
        <p className="text-lg sm:text-xl mb-8 max-w-xl mx-auto">
          Join thousands of readers who stay updated with the latest blogs and trends. Enter your email to subscribe.
        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto flex flex-col sm:flex-row items-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="px-4 py-3 mb-4 sm:mb-0 sm:mr-4 w-full rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md bg-gray-900 text-white"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Subscribe
          </button>
        </form>
      </div>
    </motion.section>
  );
};

export default Newsletter;