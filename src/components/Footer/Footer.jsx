
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section: Logo & Description */}
        <div className="mb-6 sm:mb-0 flex flex-col items-center sm:items-start">
          <h1 className="text-2xl font-semibold mb-2">Blog Spotter</h1>
          <p className="text-sm text-gray-400 text-center sm:text-left">
            Discover amazing content and stay updated with the latest trends in blogging.
          </p>
        </div>

        {/* Center Section: Quick Links */}
        <div className="mb-6 sm:mb-0">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-center sm:text-left">
            <li>
              <a href="/" className="hover:text-gray-400">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-400">About Us</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">Contact</a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Right Section: Social Media Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4 justify-center sm:justify-start">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Blog Spotter. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
