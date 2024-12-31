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
      <h2 className="text-3xl font-semibold text-center mb-6">
        Trending Topics
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {trendingBlogs.map((blog) => (
          <motion.div
            key={blog._id}
            className="rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="rounded-t-lg w-full h-40 object-cover"
            />
            <div className="mt-4">
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <p className="text-sm my-2">
                {blog.category} | {blog.commentCount} Comments
              </p>
              <p className="text-sm">
                {blog.shortDescription.length > 80
                  ? `${blog.shortDescription.slice(0, 80)}...`
                  : blog.shortDescription}
              </p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <Link
                to={`/blogs/${blog._id}`}
                className="text-blue-600 font-semibold hover:underline"
              >
                Read More
              </Link>
              <span className="text-sm">{blog.commentCount} Comments</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TrendingBlogs;
