import{ useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Set the initial theme based on localStorage
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme === "dark") {
      document.body.setAttribute("data-theme", "dark");
      setIsDarkMode(true);
    } else {
      document.body.setAttribute("data-theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      // Switch to light mode
      document.body.setAttribute("data-theme", "light");
      localStorage.setItem("selectedTheme", "light");
      setIsDarkMode(false);
    } else {
      // Switch to dark mode
      document.body.setAttribute("data-theme", "dark");
      localStorage.setItem("selectedTheme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <div className="dark_mode">
      <button
        onClick={toggleTheme}
        className="text-lg mt-2 rounded-full transition  dark:text-gray-300"
      >
        {isDarkMode ? <span className="text-yellow-500"><IoSunny /></span>: <FaMoon/>}
      </button>
    </div>
  );
};

export default DarkMode;

// import { useState, useEffect } from "react";
// import { FaMoon } from "react-icons/fa";
// import { IoSunny } from "react-icons/io5";

// const DarkMode = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Function to apply the theme
//   const applyTheme = (theme) => {
//     if (theme === "dark") {
//       document.body.setAttribute("data-theme", "dark");
//       localStorage.setItem("selectedTheme", "dark");
//       setIsDarkMode(true);
//     } else {
//       document.body.setAttribute("data-theme", "light");
//       localStorage.setItem("selectedTheme", "light");
//       setIsDarkMode(false);
//     }
//   };

//   // Set the initial theme based on localStorage or system preference
//   useEffect(() => {
//     const savedTheme = localStorage.getItem("selectedTheme");
//     if (savedTheme) {
//       // Apply the user's preferred theme
//       applyTheme(savedTheme);
//     } else {
//       // If no preference, use the system theme
//       const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
//       applyTheme(systemDarkMode ? "dark" : "light");
//     }

//     // Listen for system theme changes
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleSystemThemeChange = (e) => {
//       console.log("System theme changed:", e.matches ? "dark" : "light"); // Debugging
//       // Only apply system theme if no user preference is set
//       if (!localStorage.getItem("selectedTheme")) {
//         applyTheme(e.matches ? "dark" : "light");
//       }
//     };

//     // Add the listener
//     mediaQuery.addEventListener("change", handleSystemThemeChange);

//     // Cleanup listener on unmount
//     return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
//   }, []);

//   // Toggle between dark & light manually
//   const toggleTheme = () => {
//     const newTheme = isDarkMode ? "light" : "dark";
//     applyTheme(newTheme);
//   };

//   return (
//     <div className="dark_mode">
//       <button
//         onClick={toggleTheme}
//         className="text-lg mt-2 rounded-full transition dark:text-gray-300"
//       >
//         {isDarkMode ? (
//           <span className="text-yellow-500">
//             <IoSunny />
//           </span>
//         ) : (
//           <FaMoon />
//         )}
//       </button>
//     </div>
//   );
// };

// export default DarkMode;

// import { useState, useEffect } from "react";
// import { FaMoon } from "react-icons/fa";
// import { IoSunny } from "react-icons/io5";

// const DarkMode = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     // Function to apply theme
//     const applyTheme = (theme) => {
//       if (theme === "dark") {
//         document.documentElement.classList.add("dark");
//         setIsDarkMode(true);
//       } else {
//         document.documentElement.classList.remove("dark");
//         setIsDarkMode(false);
//       }
//     };

//     // Check for saved theme preference
//     const savedTheme = localStorage.getItem("selectedTheme");

//     if (savedTheme) {
//       // If user has manually set a theme, use it
//       applyTheme(savedTheme);
//     } else {
//       // Otherwise, follow system theme
//       const systemDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
//       applyTheme(systemDarkMode ? "dark" : "light");
//     }

//     // Listen for system theme changes
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

//     const handleSystemThemeChange = (e) => {
//       if (!localStorage.getItem("selectedTheme")) {
//         applyTheme(e.matches ? "dark" : "light");
//       }
//     };

//     mediaQuery.addEventListener("change", handleSystemThemeChange);

//     return () => {
//       mediaQuery.removeEventListener("change", handleSystemThemeChange);
//     };
//   }, []);

//   // Toggle between dark & light manually
//   const toggleTheme = () => {
//     const newTheme = isDarkMode ? "light" : "dark";
//     localStorage.setItem("selectedTheme", newTheme); // Store manual preference
//     document.documentElement.classList.toggle("dark");
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="text-lg mt-2 rounded-full transition dark:text-gray-300"
//     >
//       {isDarkMode ? (
//         <IoSunny className="text-yellow-500" />
//       ) : (
//         <FaMoon className="text-gray-700" />
//       )}
//     </button>
//   );
// };

// export default DarkMode;

