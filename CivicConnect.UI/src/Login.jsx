import { useNavigate, Link } from 'react-router-dom'; // Added Link
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5192/api/Auth/login', {
        email: email,
        password: password
      });

      // FIX: Extract the specific 'token' string from the object
      const token = response.data.token; 
      localStorage.setItem('token', token);
      
      // Optional: Save the role too if you need it later
      if (response.data.role) {
          localStorage.setItem('role', response.data.role);
      }
      
      // Decode token to find role (optional, but good practice)
      // For now, we just redirect
      navigate('/dashboard'); 

    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">CivicConnect Login</h2>
        
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="admin@civic.com" />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" placeholder="********" />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
            Login
          </button>
        </form>

        {/* The Missing Link */}
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 font-bold">Register</Link>
        </p>
      </div>
    </div>
  );
}