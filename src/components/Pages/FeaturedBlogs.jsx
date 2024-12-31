import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

const FeaturedBlogs = () => {
  const [featured, setFeatured] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:5000/featured")
      .then((res) => setFeatured(res.data))
      .catch((error) => console.error("Error fetching featured blogs:", error));
  }, []);

  // Wishlist functionality
  const handleWishList = (_id) => {
    const selectedBlog = featured?.find((blog) => blog._id === _id);

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

  // Columns definition for the DataTable
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
      cell: (row) => <span className="text-sm text-gray-500">{row.category}</span>,
    },
    {
      name: "Posted Date",
      selector: (row) => new Date(row.postedTime).toLocaleDateString(),
      sortable: true,
      cell: (row) => <span className="text-sm text-gray-400">{new Date(row.postedTime).toLocaleDateString()}</span>,
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
            onClick={() => handleWishList(row._id)}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition duration-300"
          >
            Wishlist
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto my-10 px-6">
      <h1 className="text-3xl text-center font-bold  mb-6">Featured Blogs</h1>
      <DataTable
        columns={columns}
        data={featured}
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
                backgroundColor: "#f1f1f1", // Adding hover effect without fixed background color
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

export default FeaturedBlogs;