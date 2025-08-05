import "../styles/AdminDashboard.css";
import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="adminPage">
      <h1>Admin Dashboard</h1>
      <Link to="/">
        <button className="btn">Home</button>
      </Link>
      <div className="adminPanel">
        <div className="adminButtons">
          <Link to="/admin/aircrafts">
            <button className="adminButton">Manage Aircrafts</button>
          </Link>
          <Link to="/admin/gates">
            <button className="adminButton">Manage Gates</button>
          </Link>
        </div>
        <div className="adminMap">
          <iframe
            src="http://embed.flightaware.com/commercial/integrated/web/delay_map.rvt"
            width="100%"
            height="100%"
            style={{ border: "none", borderRadius: "8px" }}
            title="Live Flight Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
