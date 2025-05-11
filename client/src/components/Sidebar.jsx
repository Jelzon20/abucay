import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserIcon,
  DocumentTextIcon,
  BuildingStorefrontIcon,
  ChartBarIcon,
  UsersIcon,
  LifebuoyIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CalendarDateRangeIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard/dashboard",
      icon: <ChartBarIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Barangay Officials",
      path: "/dashboard/officials",
      icon: <UserIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Residents",
      path: "/dashboard/residents",
      icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Documents",
      path: "/dashboard/documents",
      icon: <DocumentTextIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Establishments",
      path: "/dashboard/establishments",
      icon: <BuildingStorefrontIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Pedicabs",
      path: "/dashboard/pedicabs",
      icon: <LifebuoyIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Lupon",
      path: "/dashboard/lupon",
      icon: <BriefcaseIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Blotters",
      path: "/dashboard/blotters",
      icon: <BriefcaseIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Organizations",
      path: "/dashboard/organizations",
      icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Activities",
      path: "/dashboard/activities",
      icon: <CalendarDateRangeIcon className="h-5 w-5 mr-2" />,
    },
    {
      name: "Services",
      path: "/dashboard/services",
      icon: <Cog6ToothIcon className="h-5 w-5 mr-2" />,
      hasDropdown: true,
      children: [
        {
          name: "Barangay Certificate",
          path: "/dashboard/services/barangay-certificate",
        },
        {
          name: "Clearance",
          path: "/dashboard/services/barangay-clearance",
        },
      ],
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-gray-100 dark:bg-gray-800 p-4 overflow-y-auto">
      <nav className="space-y-2">
        {navItems.map((item) => {
          if (item.hasDropdown) {
            return (
              <div key={item.name}>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`flex items-center w-full px-4 py-2 rounded transition-colors ${
                    item.children.some((child) => isActive(child.path))
                      ? "bg-gray-300 text-gray-900 font-medium dark:bg-gray-700 dark:text-white"
                      : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {item.icon}
                  <span className="flex-grow text-left">{item.name}</span>
                  {openDropdown === item.name ? (
                    <ChevronUpIcon className="h-4 w-4" />
                  ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                  )}
                </button>
                {openDropdown === item.name && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`block px-2 py-1 rounded text-sm ${
                          isActive(child.path)
                            ? "bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white"
                            : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                        }`}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded transition-colors ${
                isActive(item.path)
                  ? "bg-gray-300 text-gray-900 font-medium dark:bg-gray-700 dark:text-white"
                  : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
