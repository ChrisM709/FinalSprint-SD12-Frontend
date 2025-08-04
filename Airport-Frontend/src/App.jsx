import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="appContainer">
      <div className="card">
        <h1>✈️ Flight Tracker</h1>
        <div className="buttonGroup">
          <Link to="/flights">
            <button className="btn">View Flights</button>
          </Link>
          <Link to="/admin">
            <button className="btn">Admin Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;
