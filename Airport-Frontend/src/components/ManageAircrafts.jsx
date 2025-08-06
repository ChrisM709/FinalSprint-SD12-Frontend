import { Link } from "react-router-dom";
import "../styles/ManageAircrafts.css";

function ManageAircrafts() {
  return (
    <div className="aircraftPage">
    <div className="manageAircrafts">
      <h1>Manage Aircrafts</h1>
      <Link to="/admin">
        <button className="btn">Back to Dashboard</button>
      </Link>

      <div className="aircraftPanel">
        <p>This is where you'll add, update, and delete aircrafts.</p>
      </div>
    </div>
    </div>
  );
}

export default ManageAircrafts;
