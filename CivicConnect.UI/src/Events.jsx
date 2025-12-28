import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  // 1. Fetch Events on Load
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) { navigate('/'); return; }

      const response = await axios.get('http://localhost:5192/api/Events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // 2. Create New Event (Admin)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5192/api/Events', {
        title,
        description: desc,
        venue,
        eventDate: date
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      alert("Event Created!");
      fetchEvents(); // Refresh list
      setTitle(''); setDesc(''); setVenue(''); setDate('');
    } catch (error) {
      alert("Failed to create event. (Are you an Admin?)");
    }
  };

  // 3. Register for Event (Citizen)
  const handleRegister = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5192/api/Events/${eventId}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Successfully Registered! See you there.");
      fetchEvents(); // Update the count
    } catch (error) {
      alert("Registration failed (You might already be registered).");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Community Events</h1>
          <button onClick={() => navigate('/dashboard')} className="text-green-700 font-bold hover:underline">
            ← Back to Dashboard
          </button>
        </div>

        {/* Create Event Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-t-4 border-green-500">
          <h2 className="text-xl font-bold mb-4 text-green-700">Create New Event</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="p-2 border rounded" placeholder="Event Title" value={title} onChange={e => setTitle(e.target.value)} required />
            <input className="p-2 border rounded" placeholder="Venue / Location" value={venue} onChange={e => setVenue(e.target.value)} required />
            <input type="datetime-local" className="p-2 border rounded" value={date} onChange={e => setDate(e.target.value)} required />
            <input className="p-2 border rounded" placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} required />
            <button className="col-span-1 md:col-span-2 bg-green-600 text-white font-bold py-2 rounded hover:bg-green-700">
              Publish Event
            </button>
          </form>
        </div>

        {/* Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((evt) => (
            <div key={evt.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-gray-800">{evt.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{evt.description}</p>
              
              <div className="mt-4 text-sm text-gray-500 space-y-1">
                <p>📍 {evt.venue}</p>
                <p>📅 {new Date(evt.eventDate).toLocaleString()}</p>
                <p>👥 {evt.registrationCount} Volunteers</p>
              </div>

              <button 
                onClick={() => handleRegister(evt.id)}
                className="mt-4 w-full bg-blue-100 text-blue-700 font-bold py-2 rounded hover:bg-blue-200 transition"
              >
                Volunteer Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}