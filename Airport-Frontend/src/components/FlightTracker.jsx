import "../styles/FlightTracker.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import FlightToggle from "./FlightToggle";

function FlightTracker() {
  const [flights, setFlights] = useState([]); // ← this stores data frmo backend

  const handleToggle = async (value) => {
    console.log("Toggled to:", value);

    // backend Ahookups
    // try {
    //   const res = await fetch(`http://localhost:8080/flights/${value}`);
    //   const data = await res.json();
    //   setFlights(data);
    // } catch (err) {
    //   console.error("Failed to fetch flight data", err);
    // }
  };

  return (
    <div className="flightPage">
      <h1>Flight Tracker</h1>
      <Link to="/">
        <button className="btn">Home</button>
      </Link>

      <div className="flightPanel">
        <FlightToggle onToggle={handleToggle} />

        <table className="flightTable">
          <thead>
            <tr>
              <th>Time</th>
              <th>Destination</th>
              <th>Flight</th>
              <th>Gate</th>
            </tr>
          </thead>
          <tbody>
            {/* this is where the data froim the tables will show up */}
            {flights.map((flight, i) => (
              <tr key={i}>
                <td>{flight.time}</td>
                <td>{flight.destination}</td>
                <td>{flight.flight}</td>
                <td>{flight.gate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlightTracker;
