import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    donationAmount: 0,
    alertCount: 0,
    complaintCount: 0,
    latestAlert: null
  });
  const [loading, setLoading] = useState(true);

  // Get User Info
  const role = localStorage.getItem('role') || 'Citizen';
  const token = localStorage.getItem('token');
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      // 1. Fetch Donations (Calculate Total)
      const donationsRes = await axios.get('http://localhost:5192/api/Donations/my-donations', config);
      const totalDonated = donationsRes.data.reduce((sum, item) => sum + item.amount, 0);

      // 2. Fetch Alerts (Get Count & Latest)
      const alertsRes = await axios.get('http://localhost:5192/api/Alerts', config);
      const latestAlert = alertsRes.data.length > 0 ? alertsRes.data[alertsRes.data.length - 1] : null;

      // 3. Fetch Complaints (Get Total Count)
      const complaintsRes = await axios.get('http://localhost:5192/api/Complaints', config);

      setStats({
        donationAmount: totalDonated,
        alertCount: alertsRes.data.length,
        complaintCount: complaintsRes.data.length,
        latestAlert: latestAlert
      });
      setLoading(false);

    } catch (error) {
      console.error("Error fetching dashboard data", error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 1. WELCOME BANNER WITH DATE */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl shadow-xl p-8 md:p-10 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
            
            <div className="relative z-10">
                <p className="text-blue-200 font-medium mb-1 uppercase tracking-wide text-sm">{today}</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-2">Hello, {role}! 👋</h2>
                <p className="text-blue-100 text-lg opacity-90">Ready to make a difference in your city today?</p>
            </div>
            
            <div className="relative z-10 mt-6 md:mt-0 text-right">
               <div className="inline-block bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2 rounded-full">
                  <span className="font-bold text-xl">Civic</span><span className="font-light">Connect</span>
               </div>
            </div>
        </div>
        
        {/* 2. LIVE STATS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                label="My Contributions" 
                value={`₹${stats.donationAmount}`} 
                icon="💰" 
                color="bg-green-50 text-green-700 border-green-200"
            />
            <StatCard 
                label="Active Alerts" 
                value={stats.alertCount} 
                icon="📢" 
                color="bg-purple-50 text-purple-700 border-purple-200"
            />
            <StatCard 
                label="Community Issues" 
                value={stats.complaintCount} 
                icon="📝" 
                color="bg-orange-50 text-orange-700 border-orange-200"
            />
        </div>

        {/* 3. MAIN CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT SIDE: QUICK ACTIONS (2/3 Width) */}
            <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   🚀 Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <ActionCard 
                        title="Report Complaint" 
                        desc="File a new issue in your area."
                        icon="⚠️"
                        onClick={() => navigate('/complaints')}
                        bgColor="bg-white"
                    />
                    <ActionCard 
                        title="City Events" 
                        desc="Join upcoming community drives."
                        icon="📅"
                        onClick={() => navigate('/events')}
                        bgColor="bg-white"
                    />
                     <ActionCard 
                        title="Donate Funds" 
                        desc="Support local development projects."
                        icon="❤️"
                        onClick={() => navigate('/donate')}
                        bgColor="bg-white"
                    />
                     <ActionCard 
                        title="Read News" 
                        desc="Stay updated with city announcements."
                        icon="📰"
                        onClick={() => navigate('/news')}
                        bgColor="bg-white"
                    />
                </div>
            </div>

            {/* RIGHT SIDE: LATEST UPDATE (1/3 Width) */}
            <div className="lg:col-span-1 space-y-6">
                 <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                   🔔 Latest Update
                </h3>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 h-full">
                    {stats.latestAlert ? (
                        <div>
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${
                                stats.latestAlert.priority === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                                {stats.latestAlert.priority} Priority
                            </span>
                            <h4 className="text-lg font-bold text-gray-800 mt-3 mb-2">{stats.latestAlert.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-4">
                                {stats.latestAlert.content}
                            </p>
                            <button 
                                onClick={() => navigate('/news')}
                                className="text-blue-600 text-sm font-bold hover:underline"
                            >
                                Read Full Story →
                            </button>
                        </div>
                    ) : (
                        <div className="text-center text-gray-400 py-10">
                            <p>No active alerts right now.</p>
                            <p className="text-sm">Enjoy your day!</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

// --- Sub Components ---

function StatCard({ label, value, icon, color }) {
    return (
        <div className={`p-6 rounded-2xl border ${color} shadow-sm flex items-center gap-4 transition hover:scale-105 duration-300`}>
            <div className="text-3xl bg-white p-3 rounded-full shadow-sm">{icon}</div>
            <div>
                <p className="text-sm font-bold opacity-80 uppercase tracking-wider">{label}</p>
                <p className="text-3xl font-extrabold">{value}</p>
            </div>
        </div>
    );
}

function ActionCard({ title, desc, icon, onClick, bgColor }) {
    return (
        <button 
            onClick={onClick} 
            className={`${bgColor} p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 text-left group`}
        >
            <div className="flex justify-between items-start mb-2">
                <span className="text-3xl group-hover:scale-110 transition-transform">{icon}</span>
                <span className="text-gray-300 group-hover:text-blue-500 transition-colors">↗</span>
            </div>
            <h4 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{title}</h4>
            <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </button>
    );
}