import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    role: 'User'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Helper to update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple Password Validation (Frontend)
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // Sends Username, Email, Password, MobileNumber to API
      await axios.post('http://localhost:5192/api/Auth/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/login');
    } catch (err) {
      console.error(err);
      // Show server error or default message
      setError(err.response?.data || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* Left Side: Image (Matches Login Style) */}
      <div className="hidden lg:flex w-1/2 bg-blue-900 items-center justify-center relative overflow-hidden">
        <img 
            src="https://images.unsplash.com/photo-1570126618953-d437136e8c03?auto=format&fit=crop&q=80" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            alt="Community"
        />
        <div className="relative z-10 text-white p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Join the Movement</h2>
            <p className="text-lg text-blue-100 max-w-md mx-auto">"Citizenship consists in the service of the country."</p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-gray-50">
        <div className="w-full max-w-md">
            <div className="mb-8 text-center">
                <img src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png" className="w-12 h-12 mx-auto mb-4" alt="Logo" />
                <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
                <p className="text-gray-500 mt-2">Sign up to report issues and support your city.</p>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-6 text-sm text-center border border-red-200">{error}</div>}

            <form onSubmit={handleRegister} className="space-y-4">
                
                {/* Username */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-1">Username</label>
                    <input 
                        type="text" name="username"
                        value={formData.username} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition" 
                        placeholder="JohnDoe" required
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-1">Email Address</label>
                    <input 
                        type="email" name="email"
                        value={formData.email} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition" 
                        placeholder="you@example.com" required
                    />
                </div>

                {/* Mobile Number (Crucial Fix) */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-1">Mobile Number</label>
                    <input 
                        type="tel" name="mobileNumber"
                        value={formData.mobileNumber} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition" 
                        placeholder="+91 98765 43210" required
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
                    <input 
                        type="password" name="password"
                        value={formData.password} onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:border-blue-500 focus:outline-none transition" 
                        placeholder="••••••••" required
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-md hover:shadow-lg mt-2"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>
            </form>

            <p className="mt-8 text-center text-gray-600 text-sm">
                Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
            </p>
        </div>
      </div>
    </div>
  );
}