// src/components/StatusCard.jsx
import React from "react";
import "./StatusCard.css";

function StatusCard({ label, value, color }) {
  return (
    <div className="status-card" style={{ backgroundColor: color }}>
      <p className="status-label">{label}</p>
      <h2 className="status-value">{value}</h2>
    </div>
  );
}

export default StatusCard;
