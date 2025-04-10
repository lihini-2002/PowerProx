import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import Generators from "./pages/Generators";
import Locations from "./pages/Locations";
import Alarms from "./pages/Alarms";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/generators" element={<Generators />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/alarms" element={<Alarms />} />
      </Routes>
    </Router>
  );
}

export default App;
