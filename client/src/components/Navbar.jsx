import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import abucay_logo_1 from "../assets/abucay_logo_1.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSettingsClick = () => navigate("/dashboard/dashboard");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={abucay_logo_1} alt="Abucay Logo" className="w-40 md:w-48" />
        </div>

        {/* Desktop Links pushed to the far right */}
        <div className="hidden md:flex items-center space-x-6 ml-auto">
          <Link
            to="/"
            className="font-semibold hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="font-semibold hover:text-blue-600 transition-colors"
          >
            Services
          </Link>
          <Link
            to="/bbi"
            className="font-semibold hover:text-blue-600 transition-colors"
          >
            Barangay-Based Institutions
          </Link>
          <Link
            to="/contact-us"
            className="font-semibold hover:text-blue-600 transition-colors"
          >
            Contact Us
          </Link>

          {/* User / Login */}
          {!currentUser ? (
            <button
              onClick={() => navigate("/signin")}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <UserCircleIcon
                className="h-8 w-8 cursor-pointer"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              />
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={handleSettingsClick}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center ml-auto">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6 dark:text-gray-500" />
            ) : (
              <Bars3Icon className="h-6 w-6 dark:text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 px-4 pb-4 space-y-2">
          <Link
            to="/"
            className="block py-2 font-semibold hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/services"
            className="block py-2 font-semibold hover:text-blue-600 transition-colors"
          >
            Services
          </Link>
          <Link
            to="/bbi"
            className="block py-2 font-semibold hover:text-blue-600 transition-colors"
          >
            Barangay-Based Institutions
          </Link>
          <Link
            to="/contact-us"
            className="block py-2 font-semibold hover:text-blue-600 transition-colors"
          >
            Contact Us
          </Link>

          <hr className="border-gray-200 dark:border-gray-600" />

          {!currentUser ? (
            <button
              onClick={() => navigate("/signin")}
              className="w-full px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col space-y-2">
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={handleSettingsClick}
              >
                Settings
              </button>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
