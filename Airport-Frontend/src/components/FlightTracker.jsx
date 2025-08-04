import "../styles/FlightTracker.css";
import { Link } from 'react-router-dom';

function FlightTracker() {
  return (
    <div className="flightPage">
      <h1>Flight Tracker</h1>
      <Link to="/">
        <button className="btn">Home</button>
      </Link>
      <div className='flightPanel'></div>
    </div>
  );
}

export default FlightTracker;
