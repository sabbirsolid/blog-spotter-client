import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/add-blog"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
      >
        Add Blog
      </NavLink>
      <NavLink
        to="/all-blogs"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
      >
        All Blogs
      </NavLink>
      <NavLink
        to="/featured-blogs"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
      >
        Featured Blogs
      </NavLink>
      <NavLink
        to="/wishlist"
        className={({ isActive }) =>
          isActive
            ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-lg font-semibold shadow-md"
            : "text-gray-200 hover:text-white px-4 py-2 transition-colors duration-300"
        }
      >
        Wish List
      </NavLink>
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-blue-800 to-indigo-800 shadow-lg text-gray-100 fixed z-50 w-full">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Navbar Start */}
        <div className="flex items-center">
          <div className="dropdown lg:hidden relative z-50">
            <button
              tabIndex={0}
              className="text-white focus:outline-none"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 rounded-lg shadow-lg mt-3 w-52 space-y-2 p-3 absolute top-full left-0 z-50"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="text-3xl font-bold hidden lg:block tracking-wide"
          >
            <span className="text-blue-200">Blog</span>
            <span className="text-indigo-300">Spotter</span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="hidden lg:flex lg:space-x-6">{links}</div>

        {/* Navbar End */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="flex items-center space-x-2">
                {user.photoURL && (
                  <Link>
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow-sm"
                    />
                  </Link>
                )}
              </div>
              <button
                onClick={logOut}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-x-3">
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
