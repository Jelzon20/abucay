import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const VehicleChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/pedicabs/getVehicleStats")
      .then((res) => res.json())
      .then((stats) => {
        // Optional: Format `_id` to `type`
        const formatted = stats.map((item) => ({
          type: item._id,
          count: item.count,
        }));
        setData(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-full h-96 bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Vehicles Per Type</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VehicleChart;
