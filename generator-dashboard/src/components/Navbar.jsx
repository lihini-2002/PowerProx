import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#222", color: "#fff" }}>
      <Link to="/" style={{ margin: "0 10px" }}>
        Overview
      </Link>
      <Link to="/generators" style={{ margin: "0 10px" }}>
        Generators
      </Link>
      <Link to="/locations" style={{ margin: "0 10px" }}>
        Locations
      </Link>
      <Link to="/alarms" style={{ margin: "0 10px" }}>
        Alarms
      </Link>
    </nav>
  );
}

export default Navbar;
