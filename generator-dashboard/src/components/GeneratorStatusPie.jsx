import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#10B981", "#3B82F6", "#EF4444", "#F59E0B"];

function GeneratorStatusPie({ data }) {
  const pieData = [
    { name: "Online", value: data.Online },
    { name: "Standby", value: data.Standby },
    { name: "Fault", value: data.Fault },
    { name: "Warning", value: data.Warning },
  ];

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
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            fill="#8884d8"
            label
          >
            {pieData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GeneratorStatusPie;
