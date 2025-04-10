// src/components/StatCard.jsx
import React from "react";
import "./StatCard.css";

function StatCard({ title, value, Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <Icon size={20} color="#6b7280" />
      </div>
      <p className="stat-title">{title}</p>
      <h2 className="stat-value">{value}</h2>
    </div>
  );
}

export default StatCard;
