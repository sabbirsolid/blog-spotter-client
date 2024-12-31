// HeroSection.js

import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white py-32 px-6 sm:px-12 lg:px-24">
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Overlay */}
      <div className="relative container mx-auto text-center z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
          Discover Your Next Favorite Blog
        </h1>
        <p className="text-lg sm:text-xl mb-8 max-w-xl mx-auto">
          Explore insightful articles, trending topics, and the latest in the
          blogging world. Stay updated with the best content.
        </p>
        <Link 
          to='/all-blogs'
          className="inline-block px-8 py-3 text-lg font-semibold text-blue-600 bg-white rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Explore Blogs
        </Link>
      </div>
    </section>
  );
};

export default Banner;
