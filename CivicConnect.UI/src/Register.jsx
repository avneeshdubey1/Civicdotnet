import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '', // Changed from fullName to match Backend DTO
    email: '',
    password: '',
    mobileNumber: '',
    role: 'Citizen'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5192/api/Auth/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border rounded" required />
          <input name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} className="w-full p-2 border rounded" required />
          
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold">Login here</Link>
        </p>
      </div>
    </div>
  );
}