// src/components/LocationCard.jsx
import React from "react";
import "./LocationCard.css";

function LocationCard({ location, kWh, efficiency, rooms, gencount }) {
  return (
    <div className="location-card">
      <div className="location-header">
        <div>
          <h3>{location}</h3>
          <p className="sub-title">Generator Location</p>
        </div>
        <div className="power-info">
          <span>{kWh} kWh</span>
          <span className="efficiency">{efficiency}% Eff</span>
        </div>
      </div>
      <div className="location-body">
        <p>Number of rooms = {rooms}</p>
        <p>Generator Count={gencount}</p>
        {/* You can optionally add more data here later */}
      </div>
    </div>
  );
}

export default LocationCard;
