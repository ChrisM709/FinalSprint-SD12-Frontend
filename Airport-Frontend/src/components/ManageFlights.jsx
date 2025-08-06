import { Link } from "react-router-dom";
import "../styles/ManageFlights.css";

function ManageFlights() {
  return (
    <div className="flightPage">
    <div className="manageFlights">
      <h1>Manage Flights</h1>
      <Link to="/admin">
        <button className="btn">Back to Dashboard</button>
      </Link>

      <div className="adminFlightPanel">
        <p>This is where you'll add, update, and delete aircrafts.</p>
      </div>
    </div>
    </div>
  );
}

export default ManageFlights;