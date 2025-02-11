import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner text-info text-5xl"></div>
      </div>
    );
  }

  if (user?.email) {
    return (
      <div>
        <Navbar></Navbar>
        <div className="pt-20">{children}</div>
        <Footer></Footer>
      </div>
    );
  }
  return <Navigate  to="/login" replace />;
};

export default PrivateRoute;