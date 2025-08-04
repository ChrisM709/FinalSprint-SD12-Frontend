import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <div className="card">
        <h1>✈️ Flight Tracker</h1>
        <div className="button-group">
          <button className="btn">View Flights</button>
          <button className="btn">Admin Dashboard</button>
        </div>
      </div>
    </div>
  )
}

export default App
