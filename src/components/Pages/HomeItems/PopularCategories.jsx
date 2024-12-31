import { useEffect, useState } from "react";
import axios from "axios";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/popular-categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch popular categories:", err);
      });
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Popular Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className=" rounded-lg p-6 shadow-md hover:shadow-lg text-center transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="">Blogs: {category.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
