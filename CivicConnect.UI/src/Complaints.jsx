import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // New State
  const navigate = useNavigate();

  useEffect(() => {
    fetchComplaints();
    checkAdminRole();
  }, []);

  const checkAdminRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    // Decode token to find role (Simple check)
    // In a real app, you'd use a library like 'jwt-decode'
    // For now, let's assume you stored the role in localStorage on Login
    const role = localStorage.getItem('role'); 
    if (role === 'Admin') setIsAdmin(true);
  };

  const fetchComplaints = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5192/api/Complaints', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setComplaints(response.data);
  };

  // NEW: Admin Action
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
      fetchComplaints(); // Refresh list
    } catch (error) {
      alert("Failed to resolve. Are you really an Admin?");
    }
  };

  // ... (Keep your existing handleSubmit logic here) ...

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ... (Keep your existing Header/Form code) ... */}

      {/* RIGHT SIDE: List */}
      <div>
        <h2 className="text-xl font-bold mb-4">Recent Complaints</h2>
        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c.id} className="bg-white p-4 rounded shadow border-l-4 border-blue-500">
              <div className="flex justify-between">
                 <h3 className="font-bold">{c.title}</h3>
                 <span className={`px-2 py-1 rounded text-xs ${c.status === 'Resolved' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {c.status}
                 </span>
              </div>
              <p className="text-gray-600">{c.description}</p>
              <p className="text-xs text-gray-400 mt-2">📍 {c.area}</p>
              
              {/* ADMIN BUTTON - Only shows if isAdmin is true */}
              {isAdmin && c.status === 'Pending' && (
                <button 
                  onClick={() => handleResolve(c.id)}
                  className="mt-3 bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700"
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