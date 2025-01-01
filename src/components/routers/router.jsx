import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import DefaultLayout from "../Layouts/DefaultLayout";
import Login from "../Layouts/Login";
import Register from "../Layouts/Register";
import Error from "../Pages/Error";
import AllBlogs from "../Pages/AllBlogs";
import AddBlog from "../Pages/AddBlog";
import FeaturedBlogs from "../Pages/FeaturedBlogs";
import WishList from "../Pages/WishList";
import PrivateRoute from "./PrivateRoute";
import BlogDetails from "../Pages/BlogDetails";
import UpdatePage from "../Pages/UpdatePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout></DefaultLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/all-blogs",
        element: <AllBlogs></AllBlogs>,
      },

      {
        path: "/featured-blogs",
        element: <FeaturedBlogs></FeaturedBlogs>,
      },
    ],
  },
  {
    path: "/wishlist",
    element: (
      <PrivateRoute>
        <WishList></WishList>
      </PrivateRoute>
    ),
  },
  {
    path: "/add-blog",
    element: (
      <PrivateRoute>
        <AddBlog></AddBlog>
      </PrivateRoute>
    ),
  },

  {
    path: "/update/:id",
    element: (
      <PrivateRoute>
        <UpdatePage />
      </PrivateRoute>
    ),
    loader: ({ params }) =>
      fetch(`https://blog-spotter-server.vercel.app/update/${params.id}`, {
        credentials: "include",
      }),
  },
  {
    path: "/blogs/:id",
    element: (
      <PrivateRoute>
        <BlogDetails />
      </PrivateRoute>
    ),
    loader: async ({ params }) => {
      const response = await fetch(
        `https://blog-spotter-server.vercel.app/blogs/${params.id}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch blog data");
        return {}; // Return fallback data if necessary
      }

      return await response.json();
    },
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
