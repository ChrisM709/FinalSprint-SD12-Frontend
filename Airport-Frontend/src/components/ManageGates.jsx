import { Link } from "react-router-dom";
import "../styles/ManageGates.css";

function ManageGates() {
  return (
    <div className="gatePage">
    <div className="manageGates">
      <h1>Manage Gates</h1>
      <Link to="/admin">
        <button className="btn">Back to Dashboard</button>
      </Link>
      <div className="gatesPanel">
        <p>This is where you’ll add, update, and delete gates.</p>
      </div>
    </div>
    </div>
  );
}

export default ManageGates;
