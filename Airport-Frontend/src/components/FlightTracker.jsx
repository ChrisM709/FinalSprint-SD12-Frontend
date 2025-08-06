import "../styles/FlightTracker.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FlightToggle from "./FlightToggle";

function FlightTracker() {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState("");
  const [flightType, setFlightType] = useState("arrivals");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch airports on component mount
  useEffect(() => {
    fetchAirports();
  }, []);

  // Fetch flights when airport or flight type changes
  useEffect(() => {
    if (selectedAirport) {
      fetchFlights();
    }
  }, [selectedAirport, flightType]);

  const fetchAirports = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/airport');
      if (!response.ok) {
        throw new Error('Failed to fetch airports');
      }
      const data = await response.json();
      setAirports(data);
      // Set first airport as default if available
      if (data.length > 0) {
        setSelectedAirport(data[0].id);
      }
    } catch (error) {
      console.error('Error fetching airports:', error);
      setError('Failed to load airports');
    } finally {
      setLoading(false);
    }
  };

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError("");
      
      const endpoint = flightType === "arrivals" 
        ? `http://localhost:8080/flights/airport/${selectedAirport}/arrivals`
        : `http://localhost:8080/flights/airport/${selectedAirport}/departures`;
      
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${flightType}`);
      }
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error(`Error fetching ${flightType}:`, error);
      setError(`Failed to load ${flightType}`);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAirportChange = (e) => {
    const newAirportId = e.target.value;
    setSelectedAirport(newAirportId);
  };

  const handleToggle = (value) => {
    setFlightType(value);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "TBD";
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getSelectedAirportName = () => {
    const airport = airports.find(a => a.id == selectedAirport);
    return airport ? airport.name : "Select Airport";
  };

  return (
    <div className="flightPage">
      <h1>Flight Tracker</h1>
      <Link to="/">
        <button className="btn">Home</button>
      </Link>

      <div className="flightPanel">
        <div className="flightPanelHeader">
          <select 
            value={selectedAirport} 
            onChange={handleAirportChange} 
            className="airportDropdown"
            disabled={loading}
          >
            <option value="">Select Airport</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name} ({airport.code})
              </option>
            ))}
          </select>
          <div className="flightToggleWrapper">
            <FlightToggle onToggle={handleToggle} />
          </div>
        </div>

        {error && (
          <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', margin: '10px 0' }}>
            Loading...
          </div>
        )}

        {selectedAirport && (
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <h3>{getSelectedAirportName()} - {flightType.charAt(0).toUpperCase() + flightType.slice(1)}</h3>
          </div>
        )}

        <table className="flightTable">
          <thead>
            <tr>
              <th>Time</th>
              <th>Flight Number</th>
              <th>Airline</th>
              <th>Destination</th>
              <th>Gate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {flights.length === 0 && !loading && selectedAirport && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No {flightType} found for this airport
                </td>
              </tr>
            )}
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>
                  {flightType === "arrivals" 
                    ? formatDateTime(flight.scheduledArrival)
                    : formatDateTime(flight.scheduledDeparture)
                  }
                </td>
                <td>{flight.flightNumber}</td>
                <td>{flight.airline?.name || "N/A"}</td>
                <td>
                  {flightType === "arrivals" 
                    ? flight.departureAirport?.name || "N/A"
                    : flight.arrivalAirport?.name || "N/A"
                  }
                </td>
                <td>
                  {flightType === "arrivals" 
                    ? flight.arrivalGate?.gateNumber || "TBD"
                    : flight.departureGate?.gateNumber || "TBD"
                  }
                </td>
                <td>{flight.status || "SCHEDULED"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FlightTracker;
