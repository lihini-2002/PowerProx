// src/pages/Generators.jsx

import React, { useEffect, useState } from "react";
import { fetchOrganizedData } from "../services/api";
import EfficiencyChart from "../components/EfficiencyChart";
import GeneratorStatusChart from "../components/GeneratorStatusChart";
import GeneratorStatusPie from "../components/GeneratorStatusPie";
import "./Generators.css";

function Generators() {
  const [generatorData, setGeneratorData] = useState({});
  const [efficiencyStats, setEfficiencyStats] = useState([]);
  const [statusArray, setStatusArray] = useState([]);
  const [latestStatus, setLatestStatus] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchOrganizedData();
      if (
        result &&
        result.Generators &&
        result.overallStats &&
        result.generatorStatus
      ) {
        setGeneratorData(result.Generators);
        setEfficiencyStats(result.overallStats);
        setStatusArray(result.generatorStatus);
        setLatestStatus(
          result.generatorStatus[result.generatorStatus.length - 1]
        );
      }
    };

    loadData();
    const interval = setInterval(loadData, 5 * 60 * 1000); // Refresh every 5 mins
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="generators-page">
      <h2 className="generators-title">Generator Details by Location</h2>

      <div className="efficiency-chart-section">
        <h3 className="chart-title">Average Efficiency Over Time</h3>
        <EfficiencyChart data={efficiencyStats} />
      </div>

      <div className="status-chart-section">
        <h3 className="chart-title">Generator Status Over Time</h3>
        <GeneratorStatusChart data={statusArray} />
      </div>

      {latestStatus && (
        <div className="status-pie-section">
          <h3 className="chart-title">Current Generator Status Distribution</h3>
          <GeneratorStatusPie data={latestStatus} />
        </div>
      )}

      {Object.entries(generatorData).map(([location, generators], index) => (
        <div key={index} className="generator-location-section">
          <h3 className="location-heading">{location}</h3>
          <div className="generator-cards-grid">
            {generators.map((gen, idx) => (
              <div key={idx} className="generator-card">
                <p>
                  <strong>Capacity:</strong> {gen.capacity} kW
                </p>
                <p>
                  <strong>Efficiency:</strong> {gen.efficiency}%
                </p>
                <p>
                  <strong>kVA:</strong> {gen.kVA}
                </p>
                <p>
                  <strong>Time:</strong> {new Date(gen.time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Generators;
