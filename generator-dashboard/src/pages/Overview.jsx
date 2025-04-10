//this is the main landing page(the main dashboard)

import React, { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { fetchOrganizedData } from "../services/api";

// Icons from react-icons
import { FiZap, FiActivity } from "react-icons/fi";
import { MdWarning } from "react-icons/md";
import { AiOutlineDatabase } from "react-icons/ai";
import { GoLocation } from "react-icons/go";

function Overview() {
  const [stats, setStats] = useState(null);

  // Fetch latest data every 10 seconds
  useEffect(() => {
    const loadData = async () => {
      const result = await fetchOrganizedData();

      // Check if the result is not null
      if (result) {
        const { overallStats } = result;
        setStats(overallStats);
      } else {
        console.warn("Failed to fetch organized data");
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
    </div>
  );
}

export default Overview;
