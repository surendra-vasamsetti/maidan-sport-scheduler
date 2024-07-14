

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking local storage or a cookie
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSignUpClick = () => {
    setActiveSection("signup");
  };

  const handleSignInClick = () => {
    setActiveSection("signin");
  };

  const handleLogout = async () => {
    try {
      const csrfResponse = await fetch("http://localhost:3001/api/csrf-token", {
        credentials: "include",
      });
      const { csrfToken } = await csrfResponse.json();

      const response = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      if (response.ok) {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        navigate("/"); // Adjust the route to match your application
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <header className="text-white body-font bg-gray-900">
        <div className="text-white mx-auto flex flex-wrap flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl">PLAYWELL</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link
              to="/"
              className="mr-5 hover:text-gray-900"
              onClick={() => setActiveSection(null)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="mr-5 hover:text-gray-900"
              onClick={() => setActiveSection(null)}
            >
              About
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="mr-5 hover:text-gray-900"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="#"
                  className="mr-5 hover:text-gray-900"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </Link>
                <Link
                  to="#"
                  className="mr-5 hover:text-gray-900"
                  onClick={handleSignInClick}
                >
                  Sign In
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      {activeSection === "signup" && (
        <div className="bg-gray-800 text-white py-4">
          <div className="text-center mb-4">
            <Link
              to="/admin/signup"
              className="mr-5 hover:text-gray-300"
              onClick={() => setActiveSection(null)}
            >
              Admin Sign Up
            </Link>
            <Link
              to="/user/signup"
              className="mr-5 hover:text-gray-300"
              onClick={() => setActiveSection(null)}
            >
              User Sign Up
            </Link>
          </div>
        </div>
      )}
      {activeSection === "signin" && (
        <div className="bg-gray-800 text-white py-4">
          <div className="text-center mb-4">
            <Link
              to="/admin/signin"
              className="mr-5 hover:text-gray-300"
              onClick={() => setActiveSection(null)}
            >
              Admin Sign In
            </Link>
            <Link
              to="/user/signin"
              className="mr-5 hover:text-gray-300"
              onClick={() => setActiveSection(null)}
            >
              User Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
