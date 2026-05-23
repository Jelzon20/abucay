import React, { useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/solid";

const BrgyDisputesChart = () => {
  const [brgyDisputeCount, setBrgyDisputeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrgyDisputeCount = async () => {
      try {
        const response = await fetch("/api/dashboard/getBrgyDisputeCount");

        if (!response.ok) {
          throw new Error("Failed to fetch barangay dispute count");
        }

        const data = await response.json();

        setBrgyDisputeCount(data.totalBrgyDisputes);
      } catch (error) {
        console.error("Error fetching barangay dispute count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrgyDisputeCount();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <p className="text-gray-500 text-sm font-medium">Barangay Disputes</p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {loading ? "..." : brgyDisputeCount}
        </h2>
      </div>

      <div className="bg-blue-500 p-3 rounded-full flex items-center justify-center">
        <UsersIcon className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default BrgyDisputesChart;
