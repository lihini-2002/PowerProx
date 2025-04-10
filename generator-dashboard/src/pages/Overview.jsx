//this is the main landing page(the main dashboard)

import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import StatusCard from "../components/StatusCard";
import LocationCard from "../components/LocationCard";
import { fetchOrganizedData } from "../services/api";

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
    <div style={{ padding: "2rem" }}>
      <h2 style={{ color: "white", marginBottom: "1.5rem" }}>
        Energy Analytics Overview
      </h2>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
        <div
          style={{
            backgroundColor: "#1e3a8a",
            padding: "1.5rem",
            borderRadius: "16px",
            marginTop: "2rem",
            color: "white",
          }}
        >
          <h3 style={{ marginBottom: "1rem" }}>Generator Status Summary</h3>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
      {genLocations.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3 style={{ color: "white", marginBottom: "1rem" }}>
            Generator Locations
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
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
