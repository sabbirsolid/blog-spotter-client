import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TrendingBlogs = () => {
  const [trendingBlogs, setTrendingBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("https://blog-spotter-server.vercel.app/trending-topics")
      .then((res) => {
        setTrendingBlogs(res.data);
      })
      .catch((err) => {
        // console.error("Error fetching trending topics:", err);
      });
  }, []);

  return (
    <motion.div
      className="max-w-screen-xl mx-auto py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        Trending Blogs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {trendingBlogs.map((blog) => (
          <motion.div
            key={blog._id}
            className="rounded-lg border border-gray-200  shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {blog.category} | {blog.commentCount} Comments
                </p>
                <p className="text-sm text-gray-700">
                  {blog.shortDescription.length > 80
                    ? `${blog.shortDescription.slice(0, 80)}...`
                    : blog.shortDescription}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between items-center">
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Read More
                </Link>
                <span className="text-sm text-gray-500">
                  {blog.commentCount} Comments
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrendingBlogs;
