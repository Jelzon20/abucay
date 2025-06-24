import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Add this inside your Navbar component
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const handleSettingsClick = () => {
    window.location.href = "/dashboard/dashboard"; // navigate to dashboard
  };

  const handleLogout = () => {
    alert("Logged out!");
    // Implement real logout logic here
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md">
      <div className="max-w-full mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-1">
          <div className="text-xl font-bold">AbucayApp</div>
        </div>

        {/* Center: Links (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-200">
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/services">Services</Link>
            </li>
            <li className="hover:text-blue-600 cursor-pointer">
              <Link to="/orgChart">Barangay Officials</Link>
            </li>
          </ul>
        </div>

        {/* Right: Dark Mode + User Icon (Desktop) */}
        <div className="relative hidden md:flex flex-1 justify-end items-center space-x-4">
          <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
            {isDark ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>

          <div className="relative">
            <UserCircleIcon
              className="h-8 w-8 cursor-pointer"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
            />
            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded shadow z-10">
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
        </div>

        {/* Mobile: Hamburger */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? (
            <XMarkIcon className="h-6 w-6 dark:text-gray-500" />
          ) : (
            <Bars3Icon className="h-6 w-6 dark:text-gray-500" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a href="#" className="block hover:text-blue-500">
            Home
          </a>
          <a href="#" className="block hover:text-blue-500">
            Residents
          </a>
          <a href="#" className="block hover:text-blue-500">
            Reports
          </a>
          <hr className="border-gray-200 dark:border-gray-600" />
          <div className="flex items-center space-x-4 pt-2">
            <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
              {isDark ? (
                <SunIcon className="h-6 w-6 text-yellow-400" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
            <UserCircleIcon className="h-8 w-8 cursor-pointer" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
