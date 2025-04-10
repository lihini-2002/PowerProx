// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import { FiGrid, FiMapPin, FiBell, FiPower, FiCpu } from "react-icons/fi";
import logo from "../assets/logo.png"; // place your logo image in src/assets/logo.png
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="PowerProx Logo" className="navbar-logo" />
        <span className="navbar-title">PowerProx Dashboard</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" className="nav-item">
          <FiGrid size={16} />
          <span>Overview</span>
        </NavLink>
        <NavLink to="/generators" className="nav-item">
          <FiCpu size={16} />
          <span>Generators</span>
        </NavLink>
        <NavLink to="/locations" className="nav-item">
          <FiMapPin size={16} />
          <span>Locations</span>
        </NavLink>
        <NavLink to="/alarms" className="nav-item">
          <FiBell size={16} />
          <span>Alarms</span>
        </NavLink>
      </div>
      <div className="navbar-right">
        <button className="logout-btn">
          <FiPower size={16} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
