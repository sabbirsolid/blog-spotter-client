import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { AuthContext } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const WishList = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axiosSecure.get(`/wishlist?email=${user.email}`);
        setData(response.data);
      } catch (error) {
        // console.error("Error fetching wishlist data:", error);
      }
    };

    if (user?.email) {
      fetchWishlist();
    }
  }, [user?.email, axiosSecure]);

  // Handle Remove Item
  const handleRemove = async (itemId) => {
    axios
      .delete(`https://blog-spotter-server.vercel.app/wishlist/${itemId}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.deletedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Item removed from Wishlist!",
            showConfirmButton: true,
          });
          setData((prevData) => prevData.filter((item) => item._id !== itemId));
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
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-2">
          <Link
            to={`/blogs/${row.blogId}`}
            className="text-indigo-500 btn btn-sm btn-outline"
          >
            Details
          </Link>
          <button
            onClick={() => handleRemove(row._id)}
            className="text-red-500 btn btn-sm btn-outline"
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto  px-4">
      <Helmet>
        <title>WishList | BlogSpotter</title>
      </Helmet>
      <h1 className="text-3xl text-center font-bold mb-6">Your Wishlist</h1>
      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={data}
          pagination
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
            pagination: {
              style: {
                backgroundColor: "#f8f8f8",
                borderTop: "1px solid #ddd",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default WishList;
