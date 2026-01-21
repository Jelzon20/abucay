import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="w-screen min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow text-gray-900 dark:text-gray-100">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
