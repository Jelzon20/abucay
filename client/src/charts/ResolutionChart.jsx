import React, { useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/solid";

const ResolutionChart = () => {
  const [resolutionCount, setResolutionCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResolutionCount = async () => {
      try {
        const response = await fetch("/api/dashboard/getResolutionCount");

        if (!response.ok) {
          throw new Error("Failed to fetch resolution and ordinances count");
        }

        const data = await response.json();

        setResolutionCount(data.totalResolutions);
      } catch (error) {
        console.error(
          "Error fetching resolutions and ordinances count:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResolutionCount();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <p className="text-gray-500 text-sm font-medium">
          Resolutions and Ordinances
        </p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {loading ? "..." : resolutionCount}
        </h2>
      </div>

      <div className="bg-blue-500 p-3 rounded-full flex items-center justify-center">
        <UsersIcon className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default ResolutionChart;
