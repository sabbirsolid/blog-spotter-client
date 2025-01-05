import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";

import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../Providers/AuthProvider";
import auth from "../../Firebase/firebase.config.init";

const Register = () => {
  const { createUserWithEmail, signInWithGoogle, loading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const name = form.name.value;
    const photo = form.photoURL.value;

    // Combined validation for uppercase and lowercase
    if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      setError(
        "Password must contain at least one uppercase and one lowercase letter."
      );
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");

    // Create user and update profile info
    createUserWithEmail(email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
          .then(() => {
            // navigate(location?.state ? location.state : "/");
            navigate("/");
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "You have successfully created an account",
              showConfirmButton: true,
            });
            form.reset();
          })
          .catch((error) => {
            setError(`Failed to update profile: ${error.message}`);
          });
      })
      .catch((error) => {
        setError(`Failed to register: ${error.message}`);
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <span className="loading loading-spinner text-info text-5xl"></span>
      </div>
    );
  }

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then(() => {
        // navigate(location?.state ? location.state : "/");
        navigate('/');
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "You have successfully created an account",
          showConfirmButton: true,
        });
      })
      .catch(() => {
        setError(`Failed to register: ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen m-3 flex items-center justify-center bg-gradient-to-r">
      <Helmet>
        <title>Register | BlogSpotter</title>
      </Helmet>
      <div className="border rounded-xl p-8 shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-semibold  mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block  text-sm font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

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
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">PhotoURL</label>
            <input
              type="photoURL"
              name="photoURL"
              id="photoURL"
              placeholder="Enter your photoURL"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block  text-sm font-semibold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-3 right-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block  text-sm font-semibold mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-3 right-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white  py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            Sign Up
          </button>
        </form>

        <button
          onClick={handleSignInWithGoogle}
          className="w-full flex gap-1 items-center justify-center bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition mt-4"
        >
          <span>
            <FaGoogle></FaGoogle>
          </span>
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;



