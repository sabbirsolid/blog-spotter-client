import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TrendingBlogs= () => {
  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    // Fetch the trending topics from the server
    axios
      .get("http://localhost:5000/trending-topics")
      .then((res) => {
        setTrendingTopics(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch trending topics:", err);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Trending Topics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingTopics.map((topic) => (
          <div
            key={topic._id}
            className=" shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={topic.imageUrl}
              alt={topic.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
            <p className=" text-sm mb-2">{topic.category}</p>
            <p className=" text-sm mb-4">{topic.shortDescription}</p>
            <div className="flex justify-between items-center">
              <span className=" text-sm">Comments: {topic.commentCount}</span>
              <Link to={`/blogs/${topic._id}`} className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingBlogs
