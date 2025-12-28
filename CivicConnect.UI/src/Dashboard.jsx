import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  // 1. Check if user is logged in
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token, kick them back to login
    window.location.href = "/login"; 
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token'); // Destroy the key
    navigate('/login'); // Go back to login
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold">CivicConnect Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm font-bold transition"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600">You are now logged into the CivicConnect System.</p>
          
          {/* GRID UPDATE: Changed from grid-cols-3 to grid-cols-4 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Complaints Card */}
            <div 
              onClick={() => navigate('/complaints')} 
              className="bg-blue-50 p-6 rounded border border-blue-100 cursor-pointer hover:bg-blue-100 transition shadow-sm hover:shadow-md"
            >
              <h3 className="font-bold text-blue-700 text-lg">Complaints</h3>
              <p className="text-sm text-gray-600 mt-2">View and resolve citizen complaints.</p>
            </div>

            {/* 2. Events Card */}
            <div 
              onClick={() => navigate('/events')}
              className="bg-green-50 p-6 rounded border border-green-100 cursor-pointer hover:bg-green-100 transition shadow-sm hover:shadow-md"
            >
              <h3 className="font-bold text-green-700 text-lg">Events</h3>
              <p className="text-sm text-gray-600 mt-2">Manage upcoming city events.</p>
            </div>

            {/* 3. News Card */}
            <div 
              onClick={() => navigate('/news')} 
              className="bg-purple-50 p-6 rounded border border-purple-100 cursor-pointer hover:bg-purple-100 transition shadow-sm hover:shadow-md"
            >
              <h3 className="font-bold text-purple-700 text-lg">News</h3>
              <p className="text-sm text-gray-600 mt-2">Post announcements for citizens.</p>
            </div>

            {/* 4. Donations Card (NEW) */}
            <div 
              onClick={() => navigate('/donate')} 
              className="bg-pink-50 p-6 rounded border border-pink-100 cursor-pointer hover:bg-pink-100 transition shadow-sm hover:shadow-md"
            >
              <h3 className="font-bold text-pink-700 text-lg">Donations</h3>
              <p className="text-sm text-gray-600 mt-2">Support city projects and funds.</p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}