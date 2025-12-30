import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("Verifying Payment...");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saveDonation = async () => {
      // Prevent double-saving in React Strict Mode
      if (isSaved) return;

      const amount = searchParams.get('amount');
      const purpose = searchParams.get('purpose');
      const sessionId = searchParams.get('session_id');
      const token = localStorage.getItem('token');

      if (!token || !sessionId) {
        setStatus("⚠️ Invalid Session. Please log in.");
        return;
      }

      try {
        // Save the successful donation to your Database
        await axios.post('http://localhost:5192/api/Donations', {
          amount: parseFloat(amount),
          purpose: purpose,
          paymentId: sessionId // Using Stripe Session ID as the proof
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setIsSaved(true);
        setStatus("✅ Payment Successful! Redirecting...");
        setTimeout(() => navigate('/donate'), 3000); // Go back to Donate page after 3s

      } catch (error) {
        console.error(error);
        setStatus("❌ Payment received by Stripe, but failed to save to Database.");
      }
    };

    saveDonation();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-lg shadow-xl text-center border-t-4 border-green-500">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{status}</h1>
        <p className="text-gray-500">Please do not close this window.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;