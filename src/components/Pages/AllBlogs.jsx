// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AllBlogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);

//   const categories = ["Technology", "Health", "Lifestyle", "Education", "Travel"];
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBlogs();
//   }, [page, category, search]);

//   const fetchBlogs = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/blogs", {
//         params: {
//           page,
//           limit: 5,
//           category,
//           search,
//         },
//       });
//       setBlogs(response.data.blogs);
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//     }
//   };

//   const addToWishlist = async (blog) => {
//     try {
//       await axios.post("http://localhost:5000/wishlist", blog);
//       alert("Added to wishlist!");
//     } catch (error) {
//       console.error("Error adding to wishlist:", error);
//     }
//   };

//   const handleSearchChange = (e) => setSearch(e.target.value);
//   const handleCategoryChange = (e) => setCategory(e.target.value);

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">All Blogs</h1>

//         <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="Search by title"
//             value={search}
//             onChange={handleSearchChange}
//             className="w-full md:w-1/2 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />

//           <select
//             value={category}
//             onChange={handleCategoryChange}
//             className="w-full md:w-1/4 px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">All Categories</option>
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {blogs.map((blog) => (
//             <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
//               <img
//                 src={blog.imageUrl}
//                 alt={blog.title}
//                 className="w-full h-48 object-cover"
//               />
//               <div className="p-4">
//                 <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
//                 <p className="text-gray-600 text-sm mb-2">Category: {blog.category}</p>
//                 <p className="text-gray-700 mb-4">{blog.shortDescription}</p>
//                 <div className="flex justify-between items-center">
//                   <button
//                     onClick={() => navigate(`/blogs/${blog._id}`)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                   >
//                     Details
//                   </button>
//                   <button
//                     onClick={() => addToWishlist(blog)}
//                     className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                   >
//                     Wishlist
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center items-center mt-8">
//           <button
//             onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
//             disabled={page === 1}
//             className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
//           >
//             Previous
//           </button>

//           <span className="text-gray-800 font-medium">Page {page} of {totalPages}</span>

//           <button
//             onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={page === totalPages}
//             className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllBlogs;


// import React, { useEffect, useState } from 'react';
// import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
// import Cart from '../Cart/Cart';
// import Product from '../Product/Product';
// import './Shop.css';

import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";

const Shop = () => {
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
  ]; // Static categories array

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Fetch total blog count for pagination
  useEffect(() => {
    fetch("http://localhost:5000/blogsCount")
      .then((res) => res.json())
      .then((data) => setCount(data.count));
  }, []);

  // Fetch blogs based on pagination, category, and search query
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
    setCurrentPage(0); // Reset to first page when performing a new search
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

export default Shop;

