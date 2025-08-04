import "../styles/AdminDashboard.css";
import { Link } from 'react-router-dom';

function AdminDashboard() {
return (
  <div className="adminPage">
    <h1>Admin Dashboard</h1>
    <Link to="/">
        <button className="btn">Home</button>
    </Link>
    <div className='adminPanel'></div>
  </div>
);
}

export default AdminDashboard;
