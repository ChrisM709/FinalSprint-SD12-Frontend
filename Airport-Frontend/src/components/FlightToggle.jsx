import { useState } from "react";

function FlightToggle({ onToggle }) {
  const [selected, setSelected] = useState("arrivals");

  const handleClick = (value) => {
    setSelected(value);
    onToggle(value);
  };

  return (
    <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center" }}>
      <button
        onClick={() => handleClick("arrivals")}
        style={{
          width: "100px",
          height: "30px",
          fontSize: "14px",
          color: selected === "arrivals" ? "#000" : "#fff",
          backgroundColor: selected === "arrivals" ? "#fff" : "#00008B",
          border: "1px solid #ffffff",
          borderRight: "none",
          borderRadius: "8px 0 0 8px",
          fontWeight: selected === "arrivals" ? "bold" : "normal",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Arrivals
      </button>
      <button
        onClick={() => handleClick("departures")}
        style={{
          width: "100px",
          height: "30px",
          fontSize: "14px",
          color: selected === "departures" ? "#000" : "#fff",
          backgroundColor: selected === "departures" ? "#fff" : "#00008B",
          border: "1px solid #ffffff",
          borderRadius: "0 8px 8px 0",
          fontWeight: selected === "departures" ? "bold" : "normal",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Departures
      </button>
    </div>
  );
}

export default FlightToggle;
