import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const navigate = useNavigate();

  // 1. Fetch Complaints when page loads
  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('token');
      // If not logged in, go back to login page
      if (!token) { 
        navigate('/'); 
        return; 
      }

      // Check your backend port! I am using 5192 based on your previous messages.
      const response = await axios.get('http://localhost:5192/api/Complaints', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  // 2. Handle New Complaint Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      await axios.post('http://localhost:5192/api/Complaints', {
        title: title,
        description: desc,
        location: "Detected Location" // Hardcoded for now
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Complaint Registered!");
      setTitle('');
      setDesc('');
      fetchComplaints(); // Refresh the list instantly
    } catch (error) {
      console.error(error);
      alert("Failed to register complaint.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Public Grievances</h1>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="text-blue-600 hover:underline font-semibold"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT: Submit Form */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4 text-blue-600">Report an Issue</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Issue Title</label>
                <input 
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="e.g., Deep Pothole"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea 
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  rows="4"
                  placeholder="Details about the problem..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
              >
                Submit Complaint
              </button>
            </form>
          </div>

          {/* RIGHT: List of Complaints */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-700">Recent Complaints</h2>
            {complaints.length === 0 ? (
              <p className="text-gray-500 italic">No complaints found.</p>
            ) : (
              <div className="space-y-4 h-96 overflow-y-auto pr-2">
                {complaints.map((c) => (
                  <div key={c.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-gray-800">{c.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                        c.status === "Resolved" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {c.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{c.description}</p>
                    <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                      <span>📍 {c.location}</span>
                      <span>ID: {c.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}