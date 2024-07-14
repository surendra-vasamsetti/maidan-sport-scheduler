// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const AdminSignup = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");
//   const [csrfToken, setCsrfToken] = useState("");

//   useEffect(() => {
//     fetchCsrfToken();
//   }, []);

//   const fetchCsrfToken = async () => {
//     try {
//       const response = await fetch("http://localhost:3001/api/csrf-token", {
//         credentials: "include",
//       });
//       const { csrfToken } = await response.json();
//       setCsrfToken(csrfToken);
//     } catch (error) {
//       console.error("Error fetching CSRF token:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:3001/api/admin/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-csrf-token": csrfToken,
//         },
//         body: JSON.stringify({ username, email, password }),
//         credentials: "include",
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setMessage("Admin created successfully");
//         navigate("/admin/signin"); // Redirect to signin page
//       } else {
//         setMessage(result.error);
//       }
//     } catch (error) {
//       console.error("Error signing up admin:", error);
//       setMessage("Error signing up admin");
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default AdminSignup;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/csrf-token", {
        credentials: "include",
      });
      const { csrfToken } = await response.json();
      setCsrfToken(csrfToken);
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setMessage("Admin created successfully");
        navigate("/admin/signin"); // Redirect to signin page
      } else {
        setMessage(result.error);
      }
    } catch (error) {
      console.error("Error signing up admin:", error);
      setMessage("Error signing up admin");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-900 via-red-500 to-blue-900 h-screen flex items-center justify-center px-5 lg:px-0">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-blue-900 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://img.freepik.com/premium-vector/through-power-technology-every-movement-decision-made-field-can-now-be-analyzed_216520-106972.jpg?ga=GA1.1.873480028.1714200168&semt=ais_user)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-blue-900">
                Admin Sign Up
              </h1>
              <p className="text-xs text-gray-500">
                Hey, enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <form
                onSubmit={handleSubmit}
                className="mx-auto max-w-xs flex flex-col gap-4"
              >
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-3">Sign Up</span>
                </button>
              </form>
              <p className="mt-6 text-xs text-gray-600 text-center">
                Already have an account?{" "}
                <a href="/admin/signin" className="text-blue-900 font-semibold">
                  Sign in
                </a>
              </p>
              {message && (
                <p className="mt-3 text-red-500 text-xs">{message}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
