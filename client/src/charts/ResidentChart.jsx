import React, { useEffect, useState } from "react";
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

// Register required chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResidentChart = () => {
  const [residentData, setResidentData] = useState([]);

  useEffect(() => {
    // Fetch the number of residents per month from the backend using fetch
    const fetchResidentData = async () => {
      try {
        const response = await fetch("/api/residents/getResidentsPerMonth");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        // Format the data to fit the chart requirements
        const labels = result.map((item) => `Month ${item.month}`);
        const data = result.map((item) => item.count);

        // Set the state with formatted data
        setResidentData({
          labels,
          datasets: [
            {
              label: "Residents per Month",
              data: data,
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Bar color
              borderColor: "rgba(75, 192, 192, 1)", // Border color
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching resident data:", error);
      }
    };

    fetchResidentData(residentData);
  }, []);

  console.log();

  return (
    <div className="chart-container">
      <h2 className="text-xl font-semibold mb-4">Residents per Month</h2>
      {residentData.labels ? (
        <Bar
          data={residentData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: "Monthly Residents Count",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Month",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Residents",
                },
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResidentChart;
