import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // If already logged in, go to Dashboard
      navigate('/dashboard');
    } else {
      // If NOT logged in, go strictly to Login
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col text-white">
        
        {/* Background Image */}
        <div className="absolute inset-0">
            <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80"
            alt="Smart City"
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-black/60"></div>
        </div>

        {/* Navbar */}
        <nav className="relative z-10 flex justify-between items-center px-6 md:px-12 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
                <img
                src="https://cdn-icons-png.flaticon.com/512/3063/3063822.png"
                alt="CivicConnect Logo"
                className="w-8 h-8"
                />
            </div>
            <span className="text-2xl font-bold tracking-wide">CivicConnect</span>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold px-6 py-2 rounded-full hover:bg-white hover:text-blue-900 transition duration-300"
          >
            Login
          </button>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-4">
          <span className="bg-blue-600/30 text-blue-200 border border-blue-400/30 px-4 py-1 rounded-full text-sm font-semibold mb-6">
            🚀 The Future of City Management
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight max-w-4xl drop-shadow-lg">
            Smart City.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Smart Citizens.</span>
          </h1>
          
          <p className="text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
            Report civic issues, donate to local causes, participate in community events, and help build a better city together.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button
                onClick={handleGetStarted}
                className="bg-blue-600 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
            >
                Get Started Now
            </button>
            <button
                onClick={() => navigate('/about')}
                className="bg-transparent border-2 border-white text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-white hover:text-blue-900 transition"
            >
                Learn More
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER (Simple version for Home) */}
      <footer className="bg-gray-900 text-gray-400 py-6 text-center border-t border-gray-800">
        <p>© 2025 CivicConnect — Building Smarter Cities.</p>
      </footer>
    </div>
  );
}