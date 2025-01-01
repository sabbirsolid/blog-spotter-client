import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import DataTable from "react-data-table-component";

const FeaturedBlogs = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Fetch Featured Blogs Data
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        const response = await axiosSecure.get(`/featured`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
      }
    };

    fetchFeaturedBlogs();
  }, [axiosSecure]);

  // Handle Add to Wishlist
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
      .post("http://localhost:5000/wishlist", newWish)
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

  // Table Columns
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Posted Date",
      selector: (row) => new Date(row.postedTime).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Link
            to={`/blogs/${row._id}`}
            className="px-2 py-1 text-sm bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Details
          </Link>
          <button
            onClick={() => handleWishList(row._id, row.category, row.title)}
            className="px-2 py-1 text-sm bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
          >
            Wishlist
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto my-10 px-4">
      <Helmet>
        <title>Featured Blogs | BlogSpotter</title>
      </Helmet>
      <h1 className="text-3xl text-center font-bold mb-6">Featured Blogs</h1>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={data}
          highlightOnHover
          responsive
          customStyles={{
            header: {
              style: {
                backgroundColor: "#f8f8f8",
                fontWeight: "bold",
              },
            },
            rows: {
              style: {
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              },
            },
            
          }}
        />
      </div>
    </div>
  );
};

export default FeaturedBlogs;
