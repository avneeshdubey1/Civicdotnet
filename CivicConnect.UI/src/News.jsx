import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function News() {
  const [alerts, setAlerts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('Normal');
  const navigate = useNavigate();

  // 1. Fetch News on Load
  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/'); return; }

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
      
      alert("News Published!");
      fetchAlerts(); 
      setTitle(''); setContent('');
    } catch (error) {
      alert("Failed to publish (Are you an Admin?)");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-800">City News & Alerts</h1>
          <button onClick={() => navigate('/dashboard')} className="text-purple-700 font-bold hover:underline">
            ← Back to Dashboard
          </button>
        </div>

        {/* Publish Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-purple-500">
          <h2 className="text-xl font-bold mb-4 text-purple-700">Broadcast Announcement</h2>
          <form onSubmit={handlePublish} className="space-y-4">
            <input 
              className="w-full p-2 border rounded" 
              placeholder="Headline" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
            />
            <textarea 
              className="w-full p-2 border rounded" 
              rows="3" 
              placeholder="Full details..." 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              required 
            ></textarea>
            
            <div className="flex gap-4">
              <select 
                className="p-2 border rounded bg-white" 
                value={priority} 
                onChange={e => setPriority(e.target.value)}
              >
                <option value="Normal">Normal Priority</option>
                <option value="High">High Priority</option>
                <option value="Critical">Critical Alert</option>
              </select>
              <button className="flex-1 bg-purple-600 text-white font-bold py-2 rounded hover:bg-purple-700">
                Publish News
              </button>
            </div>
          </form>
        </div>

        {/* News Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-700">Latest Updates</h2>
          {alerts.map((news) => (
            <div key={news.id} className={`bg-white p-5 rounded-lg shadow border-l-4 ${
              news.priority === "Critical" ? "border-red-500" : 
              news.priority === "High" ? "border-orange-500" : "border-purple-500"
            }`}>
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{news.title}</h3>
                <span className={`text-xs px-2 py-1 rounded font-bold uppercase text-white ${
                   news.priority === "Critical" ? "bg-red-500" : 
                   news.priority === "High" ? "bg-orange-500" : "bg-purple-500"
                }`}>
                  {news.priority}
                </span>
              </div>
              <p className="text-gray-600 mt-2">{news.content}</p>
              <p className="text-xs text-gray-400 mt-4">Posted on: {new Date(news.postedDate).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}