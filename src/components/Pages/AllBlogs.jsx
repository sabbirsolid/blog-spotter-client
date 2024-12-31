import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [count, setCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = useContext(AuthContext);

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
    fetch("http://localhost:5000/blogsCount")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  
  useEffect(() => {
    const query = `http://localhost:5000/blogs?page=${currentPage}&size=${itemsPerPage}${
      selectedCategory ? `&category=${selectedCategory}` : ""
    }${searchQuery ? `&search=${searchQuery}` : ""}`;

    fetch(query)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
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
    setCurrentPage(0);
  };
// wishlist
  const handleWishList = (_id) => {
    const selectedBlog = blogs?.find((blog) => blog._id === _id);
    if (!user?.email) {
      // If the user is not logged in, show a warning message
      Swal.fire({
        position: "top-center",
        icon: "warning",
        title: "Please log in to add items to your wishlist!",
        showConfirmButton: true,
      });
      return;
    }

    const blogWithUser = { ...selectedBlog, email: user.email }; // Add email to the selected data
    console.log(blogWithUser);
    axios.post("http://localhost:5000/wishlist", blogWithUser).then((res) => {
      if (res.data.acknowledged) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Added to Wishlist successfully!",
          showConfirmButton: true,
        });
      } else {
        console.log(res.data);
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
    <div className=" p-4">
      <h1 className="text-3xl font-bold text-center mb-6">All Blogs</h1>

      <div className="filter-bar flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex items-center w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search blogs by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div key={blog._id} className="blog-card border rounded-lg p-4 shadow-md">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-2">{blog.title}</h2>
            <p className="text-gray-600 mt-1">{blog.shortDescription}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm font-medium text-gray-500">{blog.category}</span>
              <Link to={`/blogs/${blog._id}`}><button  className="text-blue-500 hover:underline">Details</button></Link>
            </div>
            <button onClick={() => handleWishList(blog._id)} className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Add to Wishlist
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination flex flex-col items-center mt-6">
        <p>Current page: {currentPage + 1}</p>
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
    </div>
  );
};

export default AllBlogs;

