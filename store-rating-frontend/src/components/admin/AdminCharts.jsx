import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6366f1", "#a855f7", "#22c55e", "#f59e0b"];

const AdminCharts = ({ stats }) => {
  if (!stats) return null;

  // 🔥 ONLY REAL DATA FROM API (NO DUMMY)
  const pieData = [
    { name: "Users", value: stats.totalUsers || 0 },
    { name: "Stores", value: stats.totalStores || 0 },
    { name: "Ratings", value: stats.totalRatings || 0 },
  ];

  const barData = [
    { name: "Users", count: stats.totalUsers || 0 },
    { name: "Stores", count: stats.totalStores || 0 },
    { name: "Active", count: stats.activeStores || 0 },
    { name: "Inactive", count: stats.inactiveStores || 0 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

      {/* PIE CHART */}
      <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
        <h2 className="text-xl font-bold mb-4">Distribution</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100} label>
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
        <h2 className="text-xl font-bold mb-4">Metrics</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AdminCharts;