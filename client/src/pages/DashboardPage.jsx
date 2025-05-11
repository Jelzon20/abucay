import { Link, Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";

export default function DashboardPage() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Breadcrumb generation from current path
  const generateBreadcrumb = () => {
    const parts = location.pathname.split("/").filter(Boolean);
    const titleMap = {
      dashboard: "Dashboard",
      residents: "Residents",
      documents: "Documents",
      establishments: "Establishments",
    };

    return parts.map((part, index) => {
      const path = "/" + parts.slice(0, index + 1).join("/");
      return (
        <span key={index} className="text-gray-600 capitalize">
          {index > 0 && <span className="mx-1">/</span>}
          {titleMap[part] || part}
        </span>
      );
    });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-gray-900 p-6 overflow-auto text-gray-900 dark:text-white">
        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          <Breadcrumb />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
