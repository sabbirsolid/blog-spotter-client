import React from "react";
import { FaFacebook, FaInstagram, FaReddit } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6 sm:px-12">
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section: Logo & Description */}
        <div className="mb-6 sm:mb-0 flex flex-col items-center sm:items-start">
          <h1 className="text-3xl font-bold mb-3">Blog Spotter</h1>
          <p className="text-sm text-gray-400 text-center sm:text-left max-w-sm">
            Discover amazing content and stay updated with the latest trends in blogging. Your go-to platform for inspiration and insights.
          </p>
        </div>

        {/* Center Section: Quick Links */}
        <div className="mb-6 sm:mb-0">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-center sm:text-left">
            <li>
              <a href="/" className="hover:text-indigo-400 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-indigo-400 transition duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-indigo-400 transition duration-300">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-indigo-400 transition duration-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section: Social Media Links */}
        <div className="text-center lg:text-start">
          <h2 className="text-lg font-semibold mb-4">Follow Us on</h2>
          <div className="flex space-x-4 justify-center sm:justify-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition duration-300"
              aria-label="Facebook"
              
            >
              <FaFacebook />
              <i className="fab fa-facebook-f text-white"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition duration-300"
              aria-label="Twitter"
            ><FaXTwitter />
              <i className="fab fa-twitter text-white"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-pink-500 hover:bg-pink-600 p-3 rounded-full transition duration-300"
              aria-label="Instagram"
            ><FaInstagram />
              <i className="fab fa-instagram text-white"></i>
            </a>
            <a
              href="https://reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-700 hover:bg-orange-800 p-3 rounded-full transition duration-300"
              aria-label="LinkedIn"
            ><FaReddit />
              <i className="fab fa-linkedin-in text-white"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section: Copyright */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Blog Spotter. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;