// import { useEffect, useState } from "react";

// type Theme = "light" | "dark";

// export function useTheme() {
//   const [theme, setTheme] = useState<Theme>(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove("light", "dark");
//     root.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = (e: MediaQueryListEvent) => {
//       setTheme(e.matches ? "dark" : "light");
//     };

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return { theme, toggleTheme };
// }

// import { useEffect, useState } from "react";

// export function useTheme() {
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove("light", "dark");
//     root.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = (e) => {
//       setTheme(e.matches ? "dark" : "light");
//     };

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return { theme, toggleTheme };
// }


// import { useEffect, useState } from "react";

// const useTheme = () => {
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   });

//   useEffect(() => {
//     const root = window.document.documentElement;
//     root.classList.remove("light", "dark");
//     root.classList.add(theme);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleChange = (e) => {
//       setTheme(e.matches ? "dark" : "light");
//     };

//     mediaQuery.addEventListener("change", handleChange);
//     return () => mediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return { theme, toggleTheme };
// };

// export default useTheme;


import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    console.log("Setting theme:", theme);
    root.setAttribute("data-theme", theme);
    localStorage.setItem("selectedTheme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
