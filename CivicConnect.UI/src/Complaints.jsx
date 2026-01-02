import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [area, setArea] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
    checkAdminRole();
  }, []);

  const checkAdminRole = () => {
    const role = localStorage.getItem('role'); 
    if (role === 'Admin') setIsAdmin(true);
  };

  const fetchComplaints = async () => {
    const token = localStorage.getItem('token');
    if(!token) return;
    try {
        const response = await axios.get('http://localhost:5192/api/Complaints', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(response.data);
    } catch (error) { console.error(error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5192/api/Complaints', {
        title, description: desc, area
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      alert("Complaint Registered!");
      setTitle(''); setDesc(''); setArea('');
      fetchComplaints();
    } catch (error) { alert("Failed to register."); }
  };

  const handleResolve = async (id) => {
    const token = localStorage.getItem('token');
    const remark = prompt("Resolution Remark:");
    if (!remark) return;
    try {
      await axios.put(`http://localhost:5192/api/Complaints/${id}/resolve`, 
        { resolutionRemark: remark },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchComplaints(); 
    } catch (error) { alert("Error resolving."); }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Registration Form */}
        <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    📢 <span className="text-blue-600">Report Issue</span>
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Issue Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Broken Light" required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
                        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows="4" placeholder="Details..." required />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-1">Area/Location</label>
                        <input type="text" value={area} onChange={(e) => setArea(e.target.value)} className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. Sector 4" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md">Submit Report</button>
                </form>
            </div>
        </div>

        {/* RIGHT: List */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Community Reports</h2>
            {complaints.length === 0 && <div className="text-center py-10 text-gray-400">No complaints found. Good news!</div>}
            
            {complaints.map((c) => (
                <div key={c.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-3">
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">{c.title}</h3>
                            <p className="text-xs text-gray-400 mt-1">📍 {c.area} • 👤 {c.user?.username || 'Citizen'}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${c.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {c.status}
                        </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{c.description}</p>
                    
                    {c.status === 'Resolved' && (
                        <div className="mt-4 bg-green-50 p-3 rounded-lg border border-green-100 text-sm text-green-800">
                            <strong>✅ Admin Resolution:</strong> {c.resolutionRemark}
                        </div>
                    )}
                    
                    {isAdmin && c.status === 'Pending' && (
                        <button onClick={() => handleResolve(c.id)} className="mt-4 text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            Mark as Resolved
                        </button>
                    )}
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}