import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-20 px-8 text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to CivicConnect</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          The all-in-one platform for Smart Citizens. Report issues, join events, 
          and stay updated with your city's latest news.
        </p>
        <button 
          onClick={() => navigate('/login')}
          className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition shadow-lg"
        >
          Login / Register
        </button>
      </div>

      {/* Features Grid */}
      <div className="flex-1 bg-gray-50 p-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📢</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Report Grievances</h3>
            <p className="text-gray-600">Spot a pothole or garbage pile? Report it instantly and track the status.</p>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Community Events</h3>
            <p className="text-gray-600">Join plantation drives, cleanups, and city meetups to make a difference.</p>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <div className="text-4xl mb-4">📰</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">City Updates</h3>
            <p className="text-gray-600">Get real-time alerts about water cuts, traffic diversions, and more.</p>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>© 2025 CivicConnect Smart City Platform. Built with .NET & React.</p>
      </footer>
    </div>
  );
}