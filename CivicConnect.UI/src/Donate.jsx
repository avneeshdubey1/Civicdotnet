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
      if (!token) { navigate('/login'); return; }
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
      
      // --- STEP 1: Ask Backend to Create an Order (Professional Flow) ---
      // This matches the 'createRazorpayOrder' logic from your reference
      const orderResponse = await axios.post('http://localhost:5192/api/Payment/create-order', 
        { amount: parseFloat(amount) }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { orderId } = orderResponse.data;
      console.log("Backend generated Order ID:", orderId);

      // --- STEP 2: Simulate Payment Processing ---
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5s Fake Delay

      // --- STEP 3: Save Donation with the ID we got from Backend ---
      await axios.post('http://localhost:5192/api/Donations', {
        amount: parseFloat(amount),
        purpose: purpose,
        paymentId: orderId // <--- Using the ID from Step 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert(`✅ Payment Successful! Transaction ID: ${orderId}`);
      setAmount('');
      fetchHistory(); 

    } catch (error) {
      console.error(error);
      alert("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-pink-700">Support Your City</h1>
          <button onClick={() => navigate('/dashboard')} className="text-pink-600 font-bold hover:underline">
            ← Back to Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md h-fit border-t-4 border-pink-500">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Make a Contribution</h2>
            <form onSubmit={handleDonate} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-bold mb-2">Amount (₹)</label>
                <input type="number" className="w-full p-3 border rounded text-lg" placeholder="500" value={amount} onChange={e => setAmount(e.target.value)} required min="1" />
              </div>
              <div>
                <label className="block text-gray-700 font-bold mb-2">Purpose</label>
                <select className="w-full p-3 border rounded bg-white" value={purpose} onChange={e => setPurpose(e.target.value)}>
                  <option>Tree Plantation</option>
                  <option>Street Lighting</option>
                  <option>School Supplies</option>
                  <option>General City Fund</option>
                </select>
              </div>
              <button disabled={loading} className={`w-full text-white font-bold py-3 rounded-lg text-lg shadow ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"}`}>
                {loading ? "Connecting to Bank..." : "❤️ Donate Securely"}
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-700">Your Donation History</h2>
            {history.length === 0 ? <p className="text-gray-500 italic">No donations yet.</p> : (
              <div className="space-y-3 h-96 overflow-y-auto pr-2">
                {history.map((d) => (
                  <div key={d.id} className="bg-white p-4 rounded shadow flex justify-between items-center border-l-4 border-green-400">
                    <div>
                      <p className="font-bold text-gray-800 text-lg">₹{d.amount}</p>
                      <p className="text-sm text-gray-500">{d.purpose}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded font-bold">SUCCESS</span>
                      <p className="text-xs text-gray-400 mt-1">{new Date(d.donationDate).toLocaleDateString()}</p>
                      <p className="text-[10px] text-gray-300 uppercase">{d.paymentId}</p>
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