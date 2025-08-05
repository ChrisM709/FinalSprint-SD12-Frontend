import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FlightTracker from "./components/FlightTracker.jsx";
import AdminDashboard from './components/AdminDashboard.jsx';
import ManageAircrafts from "./components/ManageAircrafts";
import ManageGates from "./components/ManageGates";
import App from './App.jsx'
import './styles/index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/flights" element={<FlightTracker />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/aircrafts" element={<ManageAircrafts />} />
        <Route path="/admin/gates" element={<ManageGates />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
