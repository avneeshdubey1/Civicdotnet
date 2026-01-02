import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  
  // Form State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [area, setArea] = useState(''); // <--- MISSING IN YOUR SNIPPET

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
    try {
        const response = await axios.get('http://localhost:5192/api/Complaints', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setComplaints(response.data);
    } catch (error) {
        console.error("Error fetching complaints:", error);
    }
  };

  // --- RESTORED: Handle Submit Logic ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('http://localhost:5192/api/Complaints', {
        title: title,
        description: desc,
        area: area // <--- Must match DTO
      }, {
        headers: { Authorization: `Bearer ${token}` } // <--- Must send Token
      });

      alert("Complaint Registered Successfully!");
      setTitle('');
      setDesc('');
      setArea('');
      fetchComplaints(); // Refresh the list immediately
    } catch (error) {
      console.error(error);
      alert("Failed to register complaint. Are you logged in?");
    }
  };

  // --- Admin Logic ---
  const handleResolve = async (id) => {
    const token = localStorage.getItem('token');
    const remark = prompt("Enter resolution remark:");
    if (!remark) return;

    try {
      await axios.put(`http://localhost:5192/api/Complaints/${id}/resolve`, 
        { resolutionRemark: remark },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Complaint Resolved!");
      fetchComplaints(); 
    } catch (error) {
      alert("Failed to resolve. Only Admins can do this.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      
      {/* LEFT SIDE: Registration Form */}
      <div className="bg-white p-6 rounded shadow h-fit">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Register a Complaint</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full p-2 border rounded" 
              placeholder="e.g. Broken Street Light"
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
              className="w-full p-2 border rounded" 
              placeholder="Describe the issue in detail..."
              rows="3"
              required 
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Area</label>
            <input 
              type="text" 
              value={area} 
              onChange={(e) => setArea(e.target.value)} 
              className="w-full p-2 border rounded" 
              placeholder="e.g. Sector 4, Main Road"
              required 
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">
            Submit Complaint
          </button>
        </form>
      </div>

      {/* RIGHT SIDE: List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Complaints</h2>
        <div className="space-y-4">
          {complaints.length === 0 ? <p className="text-gray-500">No complaints found.</p> : null}
          
          {complaints.map((c) => (
            <div key={c.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
              <div className="flex justify-between">
                 <h3 className="font-bold text-lg">{c.title}</h3>
                 <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'Resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {c.status}
                 </span>
              </div>
              <p className="text-gray-600 mt-1">{c.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-400">📍 {c.area}</p>
                <p className="text-xs text-gray-400">👤 {c.user ? c.user.username : 'Anonymous'}</p>
              </div>

              {/* Resolution Remark Display */}
              {c.status === 'Resolved' && (
                <div className="mt-2 bg-gray-50 p-2 text-sm italic text-gray-600 border-t">
                    <strong>Admin Note:</strong> {c.resolutionRemark}
                </div>
              )}
              
              {/* ADMIN BUTTON */}
              {isAdmin && c.status === 'Pending' && (
                <button 
                  onClick={() => handleResolve(c.id)}
                  className="mt-3 w-full bg-green-600 text-white text-sm py-1 rounded hover:bg-green-700"
                >
                  ✅ Mark as Resolved
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}