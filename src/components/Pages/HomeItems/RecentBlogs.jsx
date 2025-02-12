import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Providers/AuthProvider";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const RecentBlogs = () => {
  const [recent, setRecent] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("https://blog-spotter-server.vercel.app/recent-blogs")
      .then((res) => setRecent(res.data));
  }, []);

  const handleWishList = (_id, category, title) => {
    if (!user?.email) {
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "Please log in to add items to your wishlist!",
        showConfirmButton: true,
      });
      return;
    }

    const newWish = {
      blogId: _id,
      userName: user.displayName,
      userEmail: user.email,
      category,
      title,
    };

    axios
      .post("https://blog-spotter-server.vercel.app/wishlist", newWish)
      .then((res) => {
        if (res.status === 200 && res.data.acknowledged) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Added to Wishlist successfully!",
            showConfirmButton: true,
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          Swal.fire({
            position: "top-center",
            icon: "info",
            title: "This blog is already in your wishlist!",
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
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <motion.h2
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10 text-indigo-600"
      >
        Recent Blogs
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recent.map((blog) => (
          <motion.div
            key={blog._id}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-40 object-cover rounded-t-md"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className=" mb-3 text-sm">
                  {blog.shortDescription.length > 80
                    ? `${blog.shortDescription.slice(0, 80)}...`
                    : blog.shortDescription}
                </p>
                <p className="text-xs ">
                  Posted on {new Date(blog.postedTime).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <Link
                  to={`/blogs/${blog._id}`}
                  className="px-3 py-1 text-indigo-600 border border-indigo-600 rounded-md text-sm hover:bg-indigo-500 hover:text-white"
                >
                  Details
                </Link>

                <button
                  onClick={() =>
                    handleWishList(blog._id, blog.category, blog.title)
                  }
                  className="flex items-center gap-2 px-3 py-1 text-sm font-semibold border border-gray-400 rounded-lg transition duration-300 hover:bg-gray-100 hover:border-gray-500 active:scale-95"
                >
                  <Heart className="w-5 h-5 text-red-500" /> Wishlist
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;
