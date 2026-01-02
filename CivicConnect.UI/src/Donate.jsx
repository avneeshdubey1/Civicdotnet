import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('Tree Plantation');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check role from LocalStorage
  const role = localStorage.getItem('role'); 

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      // LOGIC: If Admin, fetch ALL. If User, fetch MINE.
      const endpoint = role === 'Admin' 
        ? 'http://localhost:5192/api/Donations' 
        : 'http://localhost:5192/api/Donations/my-donations';

      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setHistory(response.data);
    } catch (error) { console.error(error); }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5192/api/Payment/create-checkout-session', 
        { amount: parseFloat(amount), purpose: purpose }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-pink-700 mb-8">Support Your City</h1>
        
        {/* 1. Donation Form */}
        <div className="bg-white p-8 rounded shadow-md mb-8">
            <h2 className="text-2xl font-bold mb-4">Donate via Stripe</h2>
            <form onSubmit={handleDonate}>
                <input type="number" className="border p-2 w-full mb-4" placeholder="Amount (INR)" value={amount} onChange={e => setAmount(e.target.value)} required />
                <select className="border p-2 w-full mb-4" value={purpose} onChange={e => setPurpose(e.target.value)}>
                    <option>Tree Plantation</option>
                    <option>Street Lighting</option>
                    <option>School Supplies</option>
                </select>
                <button disabled={loading} className="bg-pink-600 text-white px-6 py-2 rounded font-bold w-full hover:bg-pink-700 transition">
                    {loading ? "Redirecting..." : "Pay with Stripe"}
                </button>
            </form>
        </div>

        {/* 2. Donation History Table (THIS WAS MISSING) */}
        <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {role === 'Admin' ? "All Community Donations" : "My Donation History"}
            </h2>

            {history.length === 0 ? (
                <p className="text-gray-500">No donations found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-pink-100 text-pink-800">
                                <th className="p-3 border-b">Date</th>
                                <th className="p-3 border-b">Purpose</th>
                                <th className="p-3 border-b">Amount</th>
                                <th className="p-3 border-b">Reference ID</th>
                                {/* Only show User column to Admins */}
                                {role === 'Admin' && <th className="p-3 border-b">User</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((donation) => (
                                <tr key={donation.id} className="hover:bg-gray-50">
                                    <td className="p-3 border-b">{new Date(donation.donationDate).toLocaleDateString()}</td>
                                    <td className="p-3 border-b">{donation.purpose}</td>
                                    <td className="p-3 border-b font-bold text-green-600">₹{donation.amount}</td>
                                    <td className="p-3 border-b text-xs text-gray-500 font-mono">{donation.paymentId}</td>
                                    {role === 'Admin' && (
                                        <td className="p-3 border-b text-sm">
                                            {donation.user ? donation.user.username : "Unknown"}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}