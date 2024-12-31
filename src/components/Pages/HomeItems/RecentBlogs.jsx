import axios from "axios";
import { useEffect, useState } from "react";

const RecentBlogs = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/recent-blogs")
      .then((res) => {
        setRecent(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch recent blogs:", err);
      });
  }, []);

  const handleWishlist = (blog) => {
    console.log(`Added to wishlist: ${blog.title}`);
    // You can implement wishlist functionality here
  };

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Recent Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recent.map((blog) => (
          <div
            key={blog._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 text-sm mb-4">
                {blog.shortDescription}
              </p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleWishlist(blog)}
                  className="bg-gray-800 text-white px-4 py-2 text-sm rounded hover:bg-gray-700"
                >
                  Add to Wishlist
                </button>
                <a
                  href={`/blogs/${blog._id}`}
                  className="text-blue-500 text-sm hover:underline"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentBlogs;