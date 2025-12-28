import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Import the new Master Layout

// Your existing page imports
import Home from "./Home";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Complaints from "./Complaints";
import Events from "./Events";
import News from "./News";
import Donate from "./Donate";

function App() {
  return (
    <Routes>
      {/* GROUP 1: Pages WITH Header and Footer */}
      {/* The 'element={<Layout />}` wraps all these routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/donate" element={<Donate />} />
      </Route>

      {/* GROUP 2: Pages WITHOUT Header and Footer (Standalone) */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;