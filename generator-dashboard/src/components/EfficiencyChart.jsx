import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function EfficiencyChart({ data }) {
  // Convert ISO time to short readable format
  const formattedData = data.map((item) => ({
    time: new Date(item.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    efficiency: item["Avg Efficiency"],
  }));

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        background: "#1f2937",
        borderRadius: "12px",
        padding: "1rem",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="efficiency"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EfficiencyChart;
