import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import DataTable from "react-data-table-component";
import { Heart } from "lucide-react";

const FeaturedBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const { user } = useContext(AuthContext);

  // Fetch Featured Blogs Data
  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://blog-spotter-server.vercel.app/featured"
        );
        setData(response.data);
      } catch (error) {
        // console.error("Error fetching featured blogs:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFeaturedBlogs();
  }, []);

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
        <div className="flex gap-2">
          <Link
            to={`/blogs/${row._id}`}
            className="text-indigo-500 btn btn-sm btn-outline"
          >
            Details
          </Link>
          <button
            onClick={() => handleWishList(row._id, row.category, row.title)}
            className="flex items-center gap-2 px-3 py-1 btn btn-outline btn-sm"
          >
            <Heart className="w-5 h-5 text-red-500" /> Wishlist
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto  px-2 p-4">
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
