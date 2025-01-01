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
  // loading data
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

  // useEffect(() => {
  //   axios.get(`http://localhost:5000/wishlist/?email=${user.email}`,{
  //     withCredentials: true
  //   })
  //   .then(res => setData(res.data))
  // },[user?.email])

  const handleRemove = async (itemId) => {
    console.log(itemId);
    axios.delete(`http://localhost:5000/wishlist/${itemId}`,{
      withCredentials: true
    }).then((res) => {
      console.log(res.data);
      if (res.data.deletedCount>0) {
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



  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      cell: (row) => (
        <div className="text-lg font-semibold text-blue-600 hover:text-blue-800 transition duration-300">
          {row.title}
        </div>
      ),
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      cell: (row) => (
        <span className="text-sm text-gray-500">{row.category}</span>
      ),
    },
    {
      name: "Image",
      selector: (row) => row.imageUrl,
      cell: (row) => (
        <img
          src={row.imageUrl}
          alt="Blog"
          className="w-12 h-12 object-cover rounded-md"
        />
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex space-x-4">
          <Link
            to={`/blogs/${row._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Details
          </Link>
          <button
            onClick={() => handleRemove(row._id)}
            className="px-4 py-2 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700 transition duration-300"
          >
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto my-10 px-6">
      <Helmet>
        <title>WishList | BlogSpotter</title>
      </Helmet>
      <h1 className="text-3xl text-center font-bold mb-6">Your Wishlist</h1>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        responsive
        striped
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
  );
};

export default WishList;
