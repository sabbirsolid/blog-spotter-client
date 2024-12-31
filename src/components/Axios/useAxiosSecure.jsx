// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Providers/AuthProvider";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000",
//   withCredentials: true,
// });

// const useAxiosSecure = () => {
//   const { logOut } = useContext(AuthContext); // Move inside the hook
//   const navigate = useNavigate(); // Move inside the hook

//   useEffect(() => {
//     const interceptor = axiosInstance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         console.log("error caught in interceptor", error);
//         if (error.response?.status === 401 || error.response?.status === 403) {
//           console.log("need to logout the user");
//           logOut()
//             .then(() => {
//               console.log("logged out user");
//               navigate("/login");
//             })
//             .catch((err) => console.log(err));
//         }
//         return Promise.reject(error);
//       }
//     );

//     // Clean up the interceptor
//     return () => {
//       axiosInstance.interceptors.response.eject(interceptor);
//     };
//   }, [logOut, navigate]); // Add dependencies to useEffect

//   return axiosInstance;
// };

// export default useAxiosSecure;

import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
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
          console.error("Authorization error, logging out...");
          try {
            await logOut();
            navigate("/login");
          } catch (err) {
            console.error("Error during logout:", err);
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
