import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#0EA5E9",
  "#22C55E",
  "#F97316",
  "#6366F1",
  "#14B8A6",
  "#F43F5E",
  "#84CC16",
];

const EstablishmentChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/establishments/getEstablishmentStats")
      .then((res) => res.json())
      .then((stats) => {
        const formatted = stats.map((item) => ({
          name: item._id || "Unknown",
          value: item.count,
        }));
        setData(formatted);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="w-full h-[500px] bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Establishments by Type</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EstablishmentChart;
