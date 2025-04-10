// src/pages/Overview.jsx

import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import StatusCard from "../components/StatusCard";
import LocationCard from "../components/LocationCard";
import { fetchOrganizedData } from "../services/api";
import "./Overview.css";

// Icons from react-icons
import { FiZap, FiActivity } from "react-icons/fi";
import { MdWarning } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

// Define colors for each status type
const STATUS_COLORS = {
  Online: "#10B981",
  Standby: "#3B82F6",
  Fault: "#EF4444",
  Warning: "#F59E0B",
  Total: "#6366F1",
};

function Overview() {
  const [stats, setStats] = useState(null);
  const [status, setStatus] = useState(null);
  const [genLocations, setGenLocations] = useState([]);

  // Fetch latest data every 10 seconds
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchOrganizedData();
      if (result) {
        const { overallStats, generatorStatus, GenLocations } = result;
        setStats(overallStats);
        setStatus(generatorStatus);
        setGenLocations(GenLocations);
      }
    };

    loadData(); // Initial fetch
    const interval = setInterval(loadData, 10000); // every 10 sec

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  if (!stats) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <div className="overview-page">
      <div className="header-row">
        <h2 className="overview-title">Energy Analytics Overview</h2>
      </div>

      <div className="overview-top-row">
        <div className="stat-section">
          <StatCard
            title="Total Consumption"
            value={`${stats["Total Consumption"]} kWh`}
            Icon={FiZap}
            color="#3B82F6"
          />
          <StatCard
            title="Avg Efficiency"
            value={`${stats["Avg Efficiency"]}%`}
            Icon={FiActivity}
            color="#10B981"
          />
          <StatCard
            title="Active Alerts"
            value={stats["Active Alerts"]}
            Icon={MdWarning}
            color="#EF4444"
          />
          <StatCard
            title="Number of Generators"
            value={stats["Number of Generators"]}
            Icon={AiOutlineDatabase}
            color="#F59E0B"
          />
          <StatCard
            title="Number of Locations"
            value={stats["Number of Locations"]}
            Icon={GoLocation}
            color="#6366F1"
          />
        </div>

        {status && (
          <div className="status-summary">
            <h3 className="status-title">Generator Status Summary</h3>
            <div className="status-row">
              <StatusCard
                label="Online"
                value={status.Online}
                color={STATUS_COLORS.Online}
              />
              <StatusCard
                label="Standby"
                value={status.Standby}
                color={STATUS_COLORS.Standby}
              />
              <StatusCard
                label="Fault"
                value={status.Fault}
                color={STATUS_COLORS.Fault}
              />
              <StatusCard
                label="Warning"
                value={status.Warning}
                color={STATUS_COLORS.Warning}
              />
              <StatusCard
                label="Total"
                value={status.Total}
                color={STATUS_COLORS.Total}
              />
            </div>
          </div>
        )}
      </div>

      {genLocations.length > 0 && (
        <div className="locations-section">
          <h3 className="locations-title">Generator Locations</h3>
          <div className="locations-grid">
            {genLocations.map((loc, index) => (
              <LocationCard
                key={index}
                location={loc.location}
                kWh={loc.kWh}
                efficiency={loc.efficiency}
                rooms={loc.rooms}
                gencount={loc.gencount}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Overview;
