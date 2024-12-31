import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://blog-spotter-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          // console.error("Authorization error, logging out...");
          try {
            await logOut();
            navigate("/login");
          } catch (err) {
            // console.error("Error during logout:", err);
          }
        }
        return Promise.reject(error); // Ensure no infinite retries
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor); // Clean up
    };
  }, [logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
