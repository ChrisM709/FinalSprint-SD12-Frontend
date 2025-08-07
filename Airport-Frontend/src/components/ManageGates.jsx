import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/ManageGates.css";

function ManageGates() {
  const [gates, setGates] = useState([]);
  const [aircrafts, setAircrafts] = useState([]);
  const [selectedGate, setSelectedGate] = useState("");
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGates();
    fetchAircrafts();
  }, []);

  const fetchGates = async () => {
    try {
      const res = await fetch("http://localhost:8080/gates");
      const data = await res.json();
      setGates(data);
      if (data.length > 0) setSelectedGate(data[0].id);
    } catch {
      setError("Failed to load gates");
    }
  };

  const fetchAircrafts = async () => {
    try {
      const res = await fetch("http://localhost:8080/aircrafts");
      const data = await res.json();
      setAircrafts(data);
      if (data.length > 0) setSelectedAircraft(data[0].id);
    } catch {
      setError("Failed to load aircrafts");
    }
  };

  const assignAircraft = async () => {
    if (!selectedGate || !selectedAircraft) return;
    setLoading(true);
    await fetch(
      `http://localhost:8080/gates/${selectedGate}/aircraft/${selectedAircraft}`,
      { method: "POST" }
    );
    await fetchGates();
    setLoading(false);
  };

  const removeAircraft = async (gateId) => {
    setLoading(true);
    await fetch(`http://localhost:8080/gates/${gateId}/aircraft`, {
      method: "DELETE",
    });
    await fetchGates();
    setLoading(false);
  };

  return (
    <div className="gatePage">
      <div className="manageGates">
        <h1>Manage Gates</h1>

        <Link to="/admin">
          <button className="btn">Back to Dashboard</button>
        </Link>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading…</p>}

        {/* assign panel */}
        <div className="gatesPanel">
          <h3>Assign Aircraft to Gate</h3>

          <select
            value={selectedGate}
            onChange={(e) => setSelectedGate(e.target.value)}
            className="gatesDropdown"
          >
            {gates.map((g) => (
              <option key={g.id} value={g.id}>
                Gate {g.gateNumber}
              </option>
            ))}
          </select>

          <select
            value={selectedAircraft}
            onChange={(e) => setSelectedAircraft(e.target.value)}
            className="gatesDropdown"
          >
            {aircrafts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.tailNumber} ({a.model})
              </option>
            ))}
          </select>

          <button className="btn" onClick={assignAircraft}>
            Assign
          </button>
        </div>

        {/* gate list */}
        <table className="gatesTable">
          <thead>
            <tr>
              <th>Gate #</th>
              <th>Terminal</th>
              <th>Aircraft</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {gates
              .filter((g) => g.aircraft)
              .map((g) => (
                <tr key={g.id}>
                  <td>{g.gateNumber}</td>
                  <td>{g.terminal}</td>
                  <td>{`${g.aircraft.tailNumber} (${g.aircraft.model})`}</td>
                  <td>
                    <button
                      className="deleteBtn"
                      onClick={() => removeAircraft(g.id)}
                    >
                      Remove
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

export default ManageGates;
