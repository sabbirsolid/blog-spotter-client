import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "https://blog-spotter-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext); // Move inside the hook
  const navigate = useNavigate(); // Move inside the hook

  const retryRequest = async (error, retries = 3, delay = 1000) => {
    let attempt = 0;

    while (attempt < retries) {
      try {
        // Wait for delay before retrying
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Retry the request
        const response = await axiosInstance(error.config);
        return response; // Return the successful response
      } catch (retryError) {
        attempt += 1;
        // console.log(`Retrying request, attempt ${attempt}`);

        if (attempt === retries) {
          // console.log("Max retries reached, logging out");
          return Promise.reject(retryError); // Reject after max retries
        }
      }
    }
  };

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        // console.log("Error caught in interceptor", error);

        if (error.response?.status === 401 || error.response?.status === 403) {
          // console.log("Need to logout the user");

          try {
            // Retry the request before logging out
            const retryResponse = await retryRequest(error, 3, 1000);

            // If the request succeeds after retry, return the response
            if (retryResponse) {
              return retryResponse;
            }
          } catch (retryError) {
            // console.log("Error after retries, logging out");
            // Log out the user after 3 retries
            logOut()
              .then(() => {
                // console.log("Logged out user");
                navigate("/login");
              })
              // .catch((err) => console.log(err));
          }
        }

        return Promise.reject(error);
      }
    );

    // Clean up the interceptor on component unmount
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logOut, navigate]); // Add dependencies to useEffect

  return axiosInstance;
};

export default useAxiosSecure;
