import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ManageFlights.css";

function ManageFlights() {
  const [flights, setFlights] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [gate, setGates] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState("");
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const [status, setStatus] = useState("SCHEDULED")
  const [departureGate, setDepartureGate] = useState("");
  const [arrivalGate, setArrivalGate] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [flightDigits, setFlightDigits] = useState([]);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [scheduledDeparture, setScheduledDeparture] = useState("");
  const [scheduledArrival, setScheduledArrival] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFlights();
    fetchAirlines();
    fetchAirports();
    fetchAircrafts();
    fetchGates();
  }, []);

  useEffect(() => {
    if (airlines.length > 0) {
      const firstAirline = airlines[0].id;
      setSelectedAirline(firstAirline);

      const code = airlineCodeMap[firstAirline];
      const randomNum = Math.floor(100 + Math.random() * 900);
      setFlightNumber(`${code}${randomNum}`);
    }
  }, [airlines]);

  const fetchFlights = async () => {
    try {
      const res = await fetch("http://localhost:8080/flights");
      const data = await res.json();
      console.log("Fetched flights:", data); // debug
      setFlights(data);
    } catch {
      setError("Failed to load flights");
    }
  };

  const fetchAirlines = async () => {
    try {
      const res = await fetch("http://localhost:8080/airlines");
      const data = await res.json();
      setAirlines(data);
      if (data.length > 0) setSelectedAirline(data[0].id);
    } catch {
      setError("Failed to load airlines");
    }
  };

  const fetchAirports = async () => {
    try {
      const res = await fetch("http://localhost:8080/airport");
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();

      if (data._embedded && data._embedded.airports) {
        setAirports(data._embedded.airports);
      } else if (Array.isArray(data)) {
        setAirports(data);
      } else {
        setError("Unexpected airport data format");
        setAirports([]);
      }
    } catch (err) {
      console.error("Error fetching airports:", err);
      setError("Failed to load airports");
    }
  };

  const fetchAircrafts = async () => {
    try {
      const res = await fetch("http://localhost:8080/aircrafts");
      const data = await res.json();
      setAircrafts(data);
      if (data.length >0) setSelectedAircraft(data[0].id);
    }catch{
      setError("Failed to load aircrafts");
    }
  }

  const fetchGates = async () => {
    try {
      const res = await fetch("http://localhost:8080/gates");
      const data = await res.json();
      
      if (data._embedded && data._embedded.gates){
        setGates(data._embedded.gates);
      }else{
        setGates(data);
      }
    }catch(err){
      setError("Failed to load gates", err);
    }
  }

  const airlineCodeMap = {
    1: "AC", // Westjet
    2: "WS", // AirCanada
    3: "PD", // Porter
  };

  const handleAirlineChange = (e) => {
    const airlineId = e.target.value;
    setSelectedAirline(airlineId);

    const code = airlineCodeMap[Number(selectedAirline)];

    if (flightDigits && flightDigits.length > 0){
      setFlightNumber(`${code}${flightDigits}`);
    } else{
      const randomNum = Math.floor(100 + Math.random() * 900);
      setFlightDigits(String(randomNum));
      setFlightNumber(`${code}${randomNum}`);
    }
  }

  const handleFlightDigitsChange = (e) => {
    const value = e.target.value;

    // Restrict to 3 digits
    if (!/^\d{0,3}$/.test(value)) return;

    setFlightDigits(value);

    const code = airlineCodeMap[Number(selectedAirline)];
    setFlightNumber(`${code}${value}`)
  }

const addFlight = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightNumber,
          airline: { id: Number(selectedAirline) },
          aircraft: { id: Number(selectedAircraft) },
          departureAirport: { id: Number(departure) },
          arrivalAirport: { id: Number(arrival)},
          departureGate: { id: Number(departureGate)},
          arrivalGate: { id: Number(arrivalGate)},
          scheduledDeparture,
          scheduledArrival,
          status,
        }),
      });

      if (res.ok){
        await fetchFlights();
        resetForm();
      } else{
        setError("Failed to add flight")
      }
    } catch(err){
      setError("Error occured while adding flight");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFlightNumber("");
    if (airlines.length > 0) setSelectedAirline(airlines[0].id);
    setDeparture("");
    setArrival("");
    setScheduledDeparture("");
    setScheduledArrival("");
  }

  const deleteFlight = async (id) => {
    setLoading(true);
    await fetch(`http://localhost:8080/flights/${id}`, {
      method: "DELETE",
    });
    await fetchFlights();
    setLoading(false);
  };

  return (
    <div className="flightPage">
      <div className="manageFlights">
        <h1>Manage Flights</h1>

        <Link to="/admin">
          <button className="btn">Back to Dashboard</button>
        </Link>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading…</p>}

        <div className="flightsPanel">
          <h3>Add New Flight</h3>

          <select
            value={selectedAirline}
            onChange={handleAirlineChange}>
              <option value="">Select Airline</option>
              {airlines.map((airline) => (
                <option key={airline.id} value={airline.id}>
                  {airline.name}
                </option>
              ))}
            </select>
            
          <input
          type="text"
          placeholder="Flight # (3 digits)"
          value={flightDigits}
          onChange={handleFlightDigitsChange}
          />

          <select value={selectedAircraft} onChange={(e) => setSelectedAircraft(e.target.value)}>
            <option value="">Select Aircraft</option>
            {aircrafts.map((aircrafts) => (
              <option key={aircrafts.id} value={aircrafts.id}>{aircrafts.model} - {aircrafts.tailNumber}</option>
            ))}
          </select>

          <select value={departure} onChange={(e) => setDeparture(e.target.value)}>
            <option value="">Select Departure</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}> {airport.name} - {airport.code}</option>
            ))}
          </select>
          
          <select value={arrival} onChange={(e) => setArrival(e.target.value)}>
            <option value="">Select Arrival</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}> {airport.name} - {airport.code}</option>
            ))}
          </select>

          <select value={departureGate} onChange={(e) => setDepartureGate(e.target.value)}>
            <option value="">Select Departure Gate</option>
            {gate.map((gates) => (
              <option key={gates.id} value={gates.id}> {gates.gateNumber}</option>
            ))}
          </select>

           <select value={arrivalGate} onChange={(e) => setArrivalGate(e.target.value)}>
            <option value="">Select Arrival Gate</option>
            {gate.map((gates) => (
              <option key={gates.id} value={gates.id}> {gates.gateNumber}</option>
            ))}
          </select>
          
          
          <input
            type="datetime-local"
            value={scheduledDeparture}
            onChange={(e) => setScheduledDeparture(e.target.value)}
            placeholder="Scheduled Departure Time"
            />

           <input
            type="datetime-local"
            value={scheduledArrival}
            onChange={(e) => setScheduledArrival(e.target.value)}
            placeholder="Scheduled Arrival Time"
            />

            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}>
                <option value="SCHEDULED">Scheduled</option>
                <option value="BOARDING">Boarding</option>
                <option value="DEPARTED">Departed</option>
                <option value="ARRIVED">Arrived</option>
                <option value="DELAYED">Delayed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
          

          <button className="btn" onClick={addFlight}>
            Add Flight
          </button>
        </div>

        <table className="adminFlightTable">
          <thead>
            <tr className="adminFlightPanel">
              <th>Airline</th>
              <th>Flight #</th>
              <th>Aircraft</th>
              <th>Departure</th>
              <th>Departure Gate</th>
              <th>Arrival</th>
              <th>Arrival Gate</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="adminFlightPanel">
            {flights.map((f) => (
              <tr key={f.id}>
                <td>{f.airline.name}</td>
                <td>{f.flightNumber}</td>
                <td>{f.aircraft?.model || "N/A"}</td>
                <td>{f.departureAirport?.name || "N/A"}</td>
                <td>{f.departureGate?.gateNumber || "N/A"}</td>
                <td>{f.arrivalAirport?.name || "N/A"}</td>
                <td>{f.arrivalGate?.gateNumber || "N/A"}</td>
                <td>{f.scheduledDeparture || "N/A"}</td>
                <td>{f.scheduledArrival || "N/A"}</td>
                <td>{f.status}</td>
                
                <td>
                  <button className="deleteBtn" onClick={() => deleteFlight(f.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageFlights;
