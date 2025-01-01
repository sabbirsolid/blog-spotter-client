import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
  ];

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Fetch total blog count for pagination
  useEffect(() => {
    setLoading(true);
    fetch("https://blog-spotter-server.vercel.app/blogsCount")
      .then((res) => res.json())
      .then((data) => {
        setCount(data.count);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch blogs based on pagination, category, and search query
  useEffect(() => {
    setLoading(true);
    const query = `https://blog-spotter-server.vercel.app/blogs?page=${currentPage}&size=${itemsPerPage}${
      selectedCategory ? `&category=${selectedCategory}` : ""
    }${searchQuery ? `&search=${searchQuery}` : ""}`;

    fetch(query)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [currentPage, itemsPerPage, selectedCategory, searchQuery]);

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0); // Reset to first page when performing a new search
  };

  // Adding data to wishlist
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
    <div className="shop-container p-4">
      <Helmet>
        <title>All Blogs | BlogSpotter</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loading loading-spinner text-info text-5xl"></div>
        </div>
      ) : (
        <>
          {/* Filter Bar */}
          <div className="filter-bar flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="flex items-center w-full md:w-1/6"
            >
              <input
                type="text"
                placeholder="Search blogs by title"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm"
              >
                Search
              </button>
            </form>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Blogs Grid */}
          <div className="products-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.map((blog) => (
              <div
                key={blog._id}
                className="blog-card border rounded-lg p-4 shadow-md flex flex-col justify-between"
              >
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">{blog.title}</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    {blog.shortDescription}
                  </p>
                  <div className="text-sm font-medium text-gray-500 mt-2">
                    {blog.category}
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <Link to={`/blogs/${blog._id}`}>
                    <button className="px-3 py-1 text-blue-500 border border-blue-500 rounded-md text-sm hover:bg-blue-500 hover:text-white">
                      Details
                    </button>
                  </Link>
                  <button
                    onClick={() =>
                      handleWishList(blog._id, blog.category, blog.title)
                    }
                    className="px-3 py-1 text-gray-600 border border-gray-400 rounded-md text-sm hover:bg-gray-300"
                  >
                    Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination flex flex-col items-center mt-6">
            <div className="flex gap-2">
              <button
                onClick={handlePrevPage}
                className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Prev
              </button>
              {pages.map((page) => (
                <button
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentPage(page)}
                  key={page}
                >
                  {page + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Next
              </button>
            </div>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPage}
              className="mt-4 p-2 border rounded-md"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default AllBlogs;
