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
    // loader: ({ params }) =>
    //   fetch(`http://localhost:5000/update/${params.id}`),
    loader: ({ params }) => fetch(`http://localhost:5000/update/${params.id}`),
  },
  {
    path: "/blogs/:id",
    element: (
      <PrivateRoute>
        <BlogDetails></BlogDetails>,
      </PrivateRoute>
    ),
    loader: ({ params }) => fetch(`http://localhost:5000/blogs/${params.id}`),
  },

  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
