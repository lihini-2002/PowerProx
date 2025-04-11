// src/components/GeneratorStatusChart.jsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function GeneratorStatusChart({ data }) {
  const formattedData = data.map((item) => ({
    time: new Date(item.time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    Online: item.Online,
    Standby: item.Standby,
    Fault: item.Fault,
    Warning: item.Warning,
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
        <AreaChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#cbd5e1" />
          <YAxis stroke="#cbd5e1" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Online"
            stackId="1"
            stroke="#10B981"
            fill="#10B981"
          />
          <Area
            type="monotone"
            dataKey="Standby"
            stackId="1"
            stroke="#3B82F6"
            fill="#3B82F6"
          />
          <Area
            type="monotone"
            dataKey="Fault"
            stackId="1"
            stroke="#EF4444"
            fill="#EF4444"
          />
          <Area
            type="monotone"
            dataKey="Warning"
            stackId="1"
            stroke="#F59E0B"
            fill="#F59E0B"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GeneratorStatusChart;
