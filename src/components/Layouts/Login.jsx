import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../Providers/AuthProvider";

const Login = () => {
  const { logIn, signInWithGoogle, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await logIn(email, password);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You Logged in successfully!",
        showConfirmButton: true,
      });
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong! Please try again.",
        showConfirmButton: true,
      });
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "You Logged in successfully!",
        showConfirmButton: true,
      });
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Something went wrong! Please try again.",
        showConfirmButton: true,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex m-3 items-center justify-center bg-gradient-to-r">
      <Helmet>
        <title>Login | BlogSpotter</title>
      </Helmet>
      <div className=" p-8 border rounded-xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold  mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block  text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <div className="mb-6 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Google Login Button */}
        <button
          onClick={handleSignInWithGoogle}
          className="w-full gap-1 flex items-center justify-center bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition mt-4"
        >
          <span>
            <FaGoogle></FaGoogle>
          </span>
          Sign in with Google
        </button>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
