import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WishList = () => {
  const [data, setData] = useState([]);
  console.log(data);

  // Fetch data from the server
  useEffect(() => {
    axios.get('http://localhost:5000/wishlist')
      .then(res => {
        setData(res.data); // Update state with the fetched data
      })
      .catch(err => console.error("Error fetching wishlist data:", err));
  }, []);

  // Handle remove button click
  const handleRemove = (itemId) => {
    // Call your API to remove the item from the wishlist
    axios.delete(`http://localhost:5000/wishlist/${itemId}`)
      .then(() => {
        alert("Item removed from wishlist");
        setData(data.filter(item => item._id !== itemId)); // Update the local state
      })
      .catch(err => console.error("Error removing item:", err));
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-center mb-6">Your Wishlist</h1>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{item.title}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2">
                <img src={item.imageUrl} alt="Blog" className="w-12 h-12" />
              </td>
              <td className="border px-4 py-2">
                <div className="flex gap-2">
                  <Link to={`/blogs/${item._id}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Details
                  </Link>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WishList;
