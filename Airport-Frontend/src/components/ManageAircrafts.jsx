import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ManageAircrafts.css";

function ManageAircrafts() {
  const [aircrafts, setAircrafts] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [selectedAirline, setSelectedAirline] = useState("");
  const [form, setForm] = useState({ tailNumber: "", model: "", capacity: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAirlines();

    fetchAircrafts();
  }, []);

  const fetchAirlines = async () => {
    try {
      const res = await fetch("http://localhost:8080/airlines");
      const data = await res.json();
      setAirlines(data);
      if (data.length > 0) setSelectedAirline(data[0].id);
    } catch (err) {
      setError("Failed to load airlines");
    }
  };

  const fetchAircrafts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8080/aircrafts");
      const data = await res.json();
      setAircrafts(data);
    } catch (err) {
      setError("Failed to load aircrafts");
    } finally {
      setLoading(false);
    }
  };

  const addAircraft = async () => {
    try {
      setLoading(true);
      const body = {
        ...form,
        capacity: Number(form.capacity),
        airlineId: selectedAirline,
      };
      await fetch("http://localhost:8080/aircraft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await fetchAircrafts();
      setForm({ tailNumber: "", model: "", capacity: "" });
    } catch (err) {
      setError("Failed to add aircraft");
    } finally {
      setLoading(false);
    }
  };

  const deleteAircraft = async (id) => {
    await fetch(`http://localhost:8080/aircraft/${id}`, { method: "DELETE" });
    await fetchAircrafts();
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="manageAircrafts">
      <h1>Manage Aircrafts</h1>

      <Link to="/admin">
        <button className="btn">Back to Dashboard</button>
      </Link>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading…</p>}

      {/*add aircraft form*/}
      <div className="aircraftPanel">
        <h3>Add / Update Aircraft</h3>

        {/*airline dropdown */}
        <select
          value={selectedAirline}
          onChange={(e) => setSelectedAirline(e.target.value)}
          className="aircraftDropdown"
        >
          {airlines.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <input
          name="tailNumber"
          placeholder="Tail Number"
          value={form.tailNumber}
          onChange={handleChange}
        />
        <input
          name="model"
          placeholder="Model"
          value={form.model}
          onChange={handleChange}
        />
        <input
          name="capacity"
          type="number"
          placeholder="Capacity"
          value={form.capacity}
          onChange={handleChange}
        />

        <button className="btn" onClick={addAircraft}>
          Save Aircraft
        </button>
      </div>

      {/*aircraft table */}
      <table className="aircraftTable" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Tail #</th>
            <th>Model</th>
            <th>Capacity</th>
            <th>Airline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {aircrafts.map((ac) => (
            <tr key={ac.id}>
              <td>{ac.tailNumber}</td>
              <td>{ac.model}</td>
              <td>{ac.capacity}</td>
              <td>{ac.airline?.name || "N/A"}</td>
              <td>
                <button onClick={() => deleteAircraft(ac.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {aircrafts.length === 0 && (
            <tr>
              <td colSpan="5">No aircrafts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageAircrafts;
