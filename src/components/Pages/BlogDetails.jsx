import { useState, useEffect, useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../Axios/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const BlogDetails = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // const axiosSecure = useAxiosSecure();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const {
    title,
    imageUrl,
    category,
    shortDescription,
    longDescription,
    _id,
    authorEmail,
  } = data[0];

  //Fetch comments for the blog
  useEffect(() => {
    fetch(`http://localhost:5000/comments/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("Fetched comments:", data);
        setComments(data);
      });
  }, [_id]);


  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!commentText.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty comment",
        text: "Please write something before submitting!",
      });
      return;
    }

    const newComment = {
      blogId: _id,
      userName: user.displayName,
      userProfilePicture: user.photoURL,
      comment: commentText,
    };

    // Add the new comment (send to server)
    fetch("http://localhost:5000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newComment),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          const addedComment = {
            ...newComment,
            _id: data.insertedId, // Assuming the server returns the new comment's ID
          };
          setComments((prevComments) => [addedComment, ...prevComments]);
          setCommentText(""); // Clear the textarea
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your comment has been added successfully!",
            showConfirmButton: true,
          });
        }
      })
      .catch((error) => {
        // console.error("Error adding comment:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to post your comment. Please try again later!",
        });
      });
  };

  const isOwner = user?.email === authorEmail;

  return (
    <div className="blog-details p-4 max-w-7xl mx-auto">
      <Helmet>
        <title>Blog Details | BlogSpotter</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <img
          src={imageUrl}
          alt={title}
          className="w-full md:w-1/2 rounded-lg shadow-md object-cover h-80"
        />
        <div className="text-content md:w-1/2">
          <p className="text-sm text-gray-500 mb-2">{category}</p>
          <p className="text-lg font-semibold mb-4">{shortDescription}</p>
          <p className="text-base mb-6">{longDescription}</p>

          {!isOwner ? null : (
            <Link to={`/update/${_id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Update Blog
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Comment Section */}
      <div className="comments-section">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        {/* Display Comments */}
        <div className="comments-list mb-6 space-y-4">
          {comments?.map((comment) => (
            <div key={comment._id} className="comment flex gap-4">
              <img
                src={comment.userProfilePicture}
                alt={comment.userName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="comment-content">
                <p className="font-semibold">{comment.userName}</p>
                <p className="text-sm text-gray-600">{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Form */}
        {isOwner ? (
          <p className="text-red-500">You cannot comment on your own blog</p>
        ) : (
          <form
            onSubmit={handleCommentSubmit}
            className="comment-form flex flex-col gap-4"
          >
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows="4"
              className="p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Post Comment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BlogDetails;
