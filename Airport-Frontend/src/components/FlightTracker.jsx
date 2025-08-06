import "../styles/FlightTracker.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import FlightToggle from "./FlightToggle";

function FlightTracker() {
  const [flights, setFlights] = useState([]); // ← this stores data from backend
  const [selectedAirport, setSelectedAirport] = useState("YYZ");
  const airports = [
    { code: "YYZ", name: "Toronto Pearson"},
    { code: "YYT", name: "St.John's International"},
    { code: "LAX", name: "Los Angeles LAX"},
  ];

  const handleAirportChange = (e) => {
    const newAirport = e.target.value;
    setSelectedAirport(newAirport);
    console.log("Selected:", value, "Airport", selectedAirport);
    setSelectedAirport(e.target.value);
    // Backend API call with airport filter
    // try {
    // const res = await fetch(`http://localhost:8080/flights/${selectedAirport}/${value}`);
    // const data = await res.json();
    // setFlights(data);
    // } catch (error){
    // console.error("Failed to fetch flight data", error)}
  };

  const handleToggle = async (value) => {
    console.log("Toggled to:", value, "Airport", selectedAirport);

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
        <div className="flightPanelHeader">
          <select value={selectedAirport} onChange={handleAirportChange} className="airportDropdown">
            {airports.map((airport) => (
              <option key={airport.code} value={airport.code}>{airport.name}</option>
            ))}
          </select>
          <div className="flightToggleWrapper">
          <FlightToggle onToggle={handleToggle} />
          </div>
        </div>
        

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
            {/* this is where the data from the tables will show up */}
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
