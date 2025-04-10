// src/pages/Generators.jsx

import React, { useEffect, useState } from "react";
import { fetchOrganizedData } from "../services/api";
import "./Generators.css";

function Generators() {
  const [generatorData, setGeneratorData] = useState({});

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchOrganizedData();
      if (result && result.Generators) {
        setGeneratorData(result.Generators);
      }
    };

    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="generators-page">
      <h2 className="generators-title">Generator Details by Location</h2>
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
