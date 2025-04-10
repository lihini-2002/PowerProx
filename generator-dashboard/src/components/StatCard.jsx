//these cards will be used for diplaying the overall stats in the overview page

// src/components/StatCard.jsx
import React from "react";
import "./StatCard.css";

function StatCard({ title, value, Icon, color }) {
  return (
    <div className="stat-card">
      <div className="icon-circle" style={{ backgroundColor: color }}>
        <Icon size={24} color="#fff" />
      </div>
      <div className="stat-content">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
      </div>
    </div>
  );
}

export default StatCard;
