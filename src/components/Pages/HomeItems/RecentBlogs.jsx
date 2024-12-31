


import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { motion } from "framer-motion";

const RecentBlogs = () => {
  const [recent, setRecent] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/recent-blogs")
      .then((res) => setRecent(res.data))
      .catch((err) => console.error("Failed to fetch recent blogs:", err));
  }, []);

  const handleWishList = (_id) => {
    const selectedBlog = recent.find((blog) => blog._id === _id);

    if (!user?.email) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "Please log in to add items to your wishlist!",
        showConfirmButton: true,
      });
      return;
    }

    const blogWithUser = { ...selectedBlog, email: user.email };
    axios.post("http://localhost:5000/wishlist", blogWithUser).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Added to Wishlist successfully!",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Failed to add to Wishlist.",
          showConfirmButton: true,
        });
      }
    });
  };

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-8 "
      >
        Recent Blogs
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recent.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 ">
              <h3 className="text-2xl font-semibold  mb-2">
                {blog.title}
              </h3>
              <p className=" mb-4">
                {blog.shortDescription.length > 100
                  ? `${blog.shortDescription.slice(0, 100)}...`
                  : blog.shortDescription}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleWishList(blog._id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add to Wishlist
                </button>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;