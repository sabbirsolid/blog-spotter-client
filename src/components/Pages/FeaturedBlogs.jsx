import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProvider";
import { Link } from "react-router-dom";

const FeaturedBlogs = () => {
  const [featured, setFeatured] = useState([]);
  const {user} = useContext(AuthContext)

  useEffect(() => {
    axios
      .get("http://localhost:5000/featured")
      .then((res) => setFeatured(res.data))
      .catch((error) => console.error("Error fetching featured blogs:", error));
  }, []);

 

 // wishlist
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

  return (
    <div>
      <h1>Featured Blogs</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Title</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Category</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Posted Date</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {featured.map((blog) => (
            <tr key={blog._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{blog.title}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{blog.category}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                {new Date(blog.postedTime).toLocaleDateString()}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                <Link to={`/blogs/${blog._id}`}
                  
                  style={{
                    marginRight: "10px",
                    padding: "6px 12px",
                    backgroundColor: "#007BFF",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Details
                </Link>
                <button
                  onClick={() => handleWishList(blog._id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#28A745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Wishlist
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedBlogs;
