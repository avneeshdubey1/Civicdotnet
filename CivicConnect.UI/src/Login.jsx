import { useNavigate, Link } from 'react-router-dom';
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

      const token = response.data.token; 
      localStorage.setItem('token', token);
      
      if (response.data.role) {
          localStorage.setItem('role', response.data.role);
      }
      navigate('/dashboard'); 

    } catch (err) {
      console.error(err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side: Image */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 items-center justify-center relative overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            alt="City Night"
        />
        <div className="relative z-10 text-white p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg text-blue-100">"The best way to predict the future is to create it."</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gray-50">
        <div className="w-full max-w-md">
            <div className="mb-8 text-center">
                <img src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" className="w-12 h-12 mx-auto mb-4" alt="Logo" />
                <h2 className="text-3xl font-bold text-gray-800">Login to your account</h2>
                <p className="text-gray-500 mt-2">Access your dashboard to manage complaints & donations.</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm text-center border border-red-200">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none transition" 
                        placeholder="you@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:bg-white focus:outline-none transition" 
                        placeholder="••••••••"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Sign In
                </button>
            </form>

            <p className="mt-8 text-center text-gray-600 text-sm">
                Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create Account</Link>
            </p>
        </div>
      </div>
    </div>
  );
}