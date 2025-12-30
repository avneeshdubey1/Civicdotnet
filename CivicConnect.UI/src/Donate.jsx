import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Donate() {
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('Tree Plantation');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await axios.get('http://localhost:5192/api/Donations/my-donations', {
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
      // Call Stripe Endpoint
      const response = await axios.post('http://localhost:5192/api/Payment/create-checkout-session', 
        { amount: parseFloat(amount), purpose: purpose }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Redirect to Stripe
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
        <div className="bg-white p-8 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Donate via Stripe</h2>
            <form onSubmit={handleDonate}>
                <input type="number" className="border p-2 w-full mb-4" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required />
                <select className="border p-2 w-full mb-4" value={purpose} onChange={e => setPurpose(e.target.value)}>
                    <option>Tree Plantation</option>
                    <option>Street Lighting</option>
                </select>
                <button disabled={loading} className="bg-pink-600 text-white px-6 py-2 rounded font-bold w-full">
                    {loading ? "Redirecting..." : "Pay with Stripe"}
                </button>
            </form>
        </div>
      </div>
    </div>
  );
}