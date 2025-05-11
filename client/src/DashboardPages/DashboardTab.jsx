import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Calendar from "react-calendar";
import ResidentChart from "../charts/ResidentChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardTab = () => {
  // Bar chart data for Service Requests (per month)
  const serviceRequestData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Service Requests",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Quick Stats for Pending/Completed Requests
  const quickStats = [
    { title: "Residents", count: 8, color: "bg-yellow-400" },
    { title: "Registered Pedicabs", count: 25, color: "bg-green-400" },
    { title: "Activities", count: 3, color: "bg-blue-400" },
    { title: "Establishments", count: 8, color: "bg-yellow-400" },
    { title: "Cases", count: 25, color: "bg-green-400" },
    { title: "Blotter Records", count: 3, color: "bg-blue-400" },
  ];

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-10">Barangay Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ResidentChart />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md flex flex-col items-center ${stat.color}`}
              >
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-3xl font-bold">{stat.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTab;
