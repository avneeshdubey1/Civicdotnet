import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from "./Home";
import Login from "./Login";
import Register from "./Register"; // Import the new page
import Dashboard from "./Dashboard";
import Complaints from "./Complaints";
import Events from "./Events";
import News from "./News";
import Donate from "./Donate";
import PaymentSuccess from "./PaymentSuccess";
import About from "./About";

function App() {
  return (
    <Routes>
      {/* 1. Pages inside Layout (Header + Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
      </Route>

      {/* 2. Authentication Pages (No Header/Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* New Route */}
    </Routes>
  );
}

export default App;