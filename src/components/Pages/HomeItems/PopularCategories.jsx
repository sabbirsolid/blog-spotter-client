import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://blog-spotter-server.vercel.app/popular-categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        // console.error("Failed to fetch popular categories:", err);
      });
  }, []);

  return (
    <motion.div
      className="max-w-screen-xl mx-auto py-12 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-4xl font-bold text-center mb-10 text-indigo-600">
        Popular Categories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            className="rounded-lg p-6 shadow-md bg-gradient-to-r from-blue-800 to-indigo-800 text-white text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <h3 className="text-2xl font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-300">Blogs: {category.count}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default PopularCategories;