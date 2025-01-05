import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import useAxiosSecure from "../Axios/useAxiosSecure";

const UpdatePage = () => {
  const data = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const {
    title: defaultTitle,
    imageUrl: defaultImageUrl,
    category: defaultCategory,
    shortDescription: defaultShortDescription,
    longDescription: defaultLongDescription,
    _id,
  } = data[0];

  const [formData, setFormData] = useState({
    title: defaultTitle,
    imageUrl: defaultImageUrl,
    category: defaultCategory,
    shortDescription: defaultShortDescription,
    longDescription: defaultLongDescription,
  });

  const categories = [
    "Technology",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosSecure.patch(`/update/${_id}`, formData).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your blog has been updated successfully",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          position: "top-center",
          icon: "error",
          title: "Your blog could not be updated",
          showConfirmButton: true,
        });
      }
    });
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   axios
  //     .patch(`https://blog-spotter-server.vercel.app/update/${_id}`, formData, {
  //       withCredentials: "include",
  //     })
  //     .then((res) => {
  //       if (res.data.modifiedCount > 0) {
  //         Swal.fire({
  //           position: "top-center",
  //           icon: "success",
  //           title: "Your blog has been updated successfully",
  //           showConfirmButton: true,
  //         });
  //       } else {
  //         Swal.fire({
  //           position: "top-center",
  //           icon: "error",
  //           title: "Your blog could not be updated",
  //           showConfirmButton: true,
  //         });
  //       }
  //     });
  // };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br px-4">
      <Helmet>
        <title>Update Blog | BlogSpotter</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className=" shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6 border border-gray-200"
      >
        <h2 className="text-3xl font-semibold  text-center">Update Blog</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium  mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
            placeholder="Enter the blog title"
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium  mb-1">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
            placeholder="Enter the image URL"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium  mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Short Description
          </label>
          <textarea
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
            rows="2"
            placeholder="Write a short description"
            required
          />
        </div>

        <div>
          <label
            htmlFor="longDescription"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Long Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-2"
            rows="4"
            placeholder="Write a detailed description"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-300"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdatePage;
