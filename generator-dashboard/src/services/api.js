//this will contain the API fetch logic

// src/services/api.js

const API_URL = "http://124.43.136.185:8001/data";

export async function fetchOrganizedData() {
  try {
    const res = await fetch(API_URL);
    const json = await res.json();
    const rawData = json.data;

    // -------------------------
    // 1. OverallStats (latest one)
    // -------------------------
    const overallStats = [...rawData]
      .reverse()
      .find(item =>
        item["Active Alerts"] !== undefined &&
        item["Avg Efficiency"] !== undefined &&
        item["Number of Generators"] !== undefined &&
        item["Number of Locations"] !== undefined &&
        item["Total Consumption"] !== undefined
      );

    // -------------------------
    // 2. Generator Status (latest one)
    // -------------------------
    const generatorStatus = [...rawData]
      .reverse()
      .find(item =>
        item.Fault !== undefined &&
        item.Online !== undefined &&
        item.Standby !== undefined &&
        item.Total !== undefined &&
        item.Warning !== undefined
      );

    // -------------------------
    // 3. GenLocations (unique by location with most recent entry)
    // -------------------------
    const genLocationRaw = rawData.filter(
      item => item.location !== undefined && item.gencount !== undefined && item.kWh !== undefined
    );

    const GenLocations = [];
    const seenLocations = new Set();

    // Go in reverse order to keep the most recent first
    for (const item of [...genLocationRaw].reverse()) {
      if (!seenLocations.has(item.location)) {
        GenLocations.push(item);
        seenLocations.add(item.location);
      }
    }

    // -------------------------
    // 4. Generators (grouped by location)
    // -------------------------
    const generatorDetails = rawData.filter(
      item => item.location !== undefined && item.capacity !== undefined && item.kVA !== undefined
    );

    const Generators = {};
    for (const gen of generatorDetails) {
      const location = gen.location;
      if (!Generators[location]) {
        Generators[location] = [];
      }
      Generators[location].push(gen);
    }

    // -------------------------
    // 5. Alerts (two types of field structures)
    // -------------------------
    const Alerts = rawData.filter(
      item =>
        (item["Number of generators"] !== undefined && item["Number of locations"] !== undefined) ||
        item["Number of Locations"] !== undefined
    );

    // Return everything organized
    return {
      overallStats,
      generatorStatus,
      GenLocations,
      Generators,
      Alerts
    };
  } catch (error) {
    console.error("Error fetching or processing API data:", error);
    return null;
  }
}
