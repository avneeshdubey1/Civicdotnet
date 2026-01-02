import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function News() {
  const [alerts, setAlerts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [isAdmin, setIsAdmin] = useState(false); // State for Admin check
  const navigate = useNavigate();

  // 1. Fetch News & Check Role on Load
  useEffect(() => {
    fetchAlerts();
    checkAdminRole();
  }, []);

  const checkAdminRole = () => {
    const role = localStorage.getItem('role');
    if (role === 'Admin') {
      setIsAdmin(true);
    }
  };

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/login'); return; }

      const response = await axios.get('http://localhost:5192/api/Alerts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAlerts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 2. Publish News (Admin Only)
  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5192/api/Alerts', {
        title,
        content,
        priority
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("News Published Successfully!");
      fetchAlerts(); 
      setTitle(''); setContent('');
    } catch (error) {
      alert("Failed to publish. Ensure you have Admin privileges.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              📰 City News & Alerts
            </h1>
            <p className="text-gray-500 mt-1">Stay updated with the latest announcements.</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* ADMIN ONLY: Publish Form */}
        {isAdmin && (
          <div className="bg-white p-6 rounded-2xl shadow-lg mb-10 border border-blue-100">
            <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <span className="bg-blue-100 p-2 rounded-lg text-xl">📢</span>
                <h2 className="text-xl font-bold text-gray-800">Broadcast Announcement</h2>
            </div>
            
            <form onSubmit={handlePublish} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Headline</label>
                <input 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  placeholder="e.g. Water Supply Interruption" 
                  value={title} 
                  onChange={e => setTitle(e.target.value)} 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-1">Details</label>
                <textarea 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
                  rows="3" 
                  placeholder="Write the full announcement details here..." 
                  value={content} 
                  onChange={e => setContent(e.target.value)} 
                  required 
                ></textarea>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/3">
                    <label className="block text-sm font-semibold text-gray-600 mb-1">Priority Level</label>
                    <select 
                        className="w-full p-3 border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none" 
                        value={priority} 
                        onChange={e => setPriority(e.target.value)}
                    >
                        <option value="Normal">ℹ️ Normal Priority</option>
                        <option value="High">⚠️ High Priority</option>
                        <option value="Critical">🚨 Critical Alert</option>
                    </select>
                </div>
                <div className="w-full md:w-2/3 flex items-end">
                    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                        Publish News
                    </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* News Feed (Visible to Everyone) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Updates</h2>
          
          {alerts.length === 0 ? (
            <div className="text-center py-12 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-300">
                <p>No news or alerts posted yet.</p>
            </div>
          ) : null}

          {alerts.map((news) => (
            <div key={news.id} className={`bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition duration-300 relative overflow-hidden ${
              news.priority === "Critical" ? "border-l-8 border-l-red-500 border-gray-100" : 
              news.priority === "High" ? "border-l-8 border-l-orange-500 border-gray-100" : 
              "border-l-8 border-l-blue-500 border-gray-100"
            }`}>
              
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-800">{news.title}</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide shadow-sm ${
                   news.priority === "Critical" ? "bg-red-100 text-red-700" : 
                   news.priority === "High" ? "bg-orange-100 text-orange-700" : 
                   "bg-blue-100 text-blue-700"
                }`}>
                  {news.priority}
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">{news.content}</p>
              
              <div className="flex items-center gap-2 text-xs text-gray-400 border-t pt-3">
                 <span>📅 Posted on {new Date(news.postedDate).toLocaleDateString()}</span>
                 {/* Optional: Add time if available */}
                 <span>• {new Date(news.postedDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}