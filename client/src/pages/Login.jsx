import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess, setOfficials } from "../../redux/slices/authSlice.js";
import { fetchOfficials } from "../../redux/slices/officialSlice.js";
import login_image from "../assets/login_image.jpg";
import abucay_logo_white from "../assets/abucay_logo_white.jpg";
import { saveAuth } from "../utils/auth.js";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // 🔐 SAVE JWT
      saveAuth(data.token, data.user);

      // redux user
      dispatch(loginSuccess(data.user));

      // load officials after authenticated
      dispatch(fetchOfficials());

      setSuccess("Login successful");

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* LEFT SIDE — BRANDING / IMAGE */}
      <div className="hidden lg:flex w-1/2 relative text-white items-center justify-center p-16">
        {/* Background Image */}
        <img
          src={login_image}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark overlay (keeps text readable) */}
        <div className="absolute inset-0 bg-blue-900/90"></div>

        {/* CONTENT (unchanged styling) */}
        <div className="relative z-10 max-w-md space-y-6">
          <img src={abucay_logo_white} alt="" className="w-200" />

          <p className="text-blue-100 text-lg">
            Manage residents, officials, disputes, and records in one
            centralized platform designed for local government operations.
          </p>

          <p className="text-sm text-blue-200 pt-8">
            © {new Date().getFullYear()} Barangay 91 - Abucay Information System
          </p>
        </div>
      </div>

      {/* RIGHT SIDE — LOGIN FORM */}
      <div className="flex flex-1 items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">Sign in</h2>
            <p className="text-gray-500 mt-2">
              Enter your credentials to access the dashboard
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white py-3 rounded-md font-medium hover:bg-blue-800 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm text-gray-500 text-center pt-4">
            Need access? Please contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
