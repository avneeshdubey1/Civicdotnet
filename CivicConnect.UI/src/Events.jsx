import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// 1. Curated List of Reliable Images (No broken links)
const EVENT_IMAGES = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800", // Event Crowd
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800", // Community Talk
  "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=800", // Park/Music
  "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800", // Meeting
  "https://images.unsplash.com/photo-1561489401-fc2876ced162?auto=format&fit=crop&q=80&w=800", // Presentation
  "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800"  // Social Gathering
];

export default function Events() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    checkAdmin();
  }, []);

  const checkAdmin = () => {
    const role = localStorage.getItem('role');
    if (role === 'Admin') setIsAdmin(true);
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const response = await axios.get('http://localhost:5192/api/Events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data);
    } catch (error) { console.error(error); }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5192/api/Events', {
        title, description: desc, venue, eventDate: date
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      toast.success("Event Created Successfully!");
      setTitle(''); setDesc(''); setVenue(''); setDate('');
      fetchEvents();
    } catch (error) { toast.error("Failed to create event."); }
  };

  const handleJoin = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5192/api/Events/${id}/register`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("You have joined the event!");
      fetchEvents();
    } catch (error) { toast.error("You are already registered."); }
  };

  // Helper to pick a reliable image based on ID (so it's consistent)
  const getImageForEvent = (id) => {
    return EVENT_IMAGES[id % EVENT_IMAGES.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Community Gatherings</h1>
            <p className="text-gray-500 mt-2">Discover and join local events happening around you.</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="mt-4 md:mt-0 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition">
            ← Back to Dashboard
          </button>
        </div>

        {/* ADMIN: Create Event Section */}
        {isAdmin && (
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-12 border border-blue-100">
             <div className="flex items-center gap-2 mb-6 border-b pb-4">
                <span className="bg-blue-100 p-2 rounded-lg text-xl">📅</span>
                <h2 className="text-xl font-bold text-gray-800">Create New Event</h2>
            </div>
            <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="Event Title" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={title} onChange={e => setTitle(e.target.value)} required />
              <input type="text" placeholder="Venue / Location" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={venue} onChange={e => setVenue(e.target.value)} required />
              <input type="datetime-local" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={date} onChange={e => setDate(e.target.value)} required />
              <input type="text" placeholder="Description" className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={desc} onChange={e => setDesc(e.target.value)} required />
              <button className="col-span-1 md:col-span-2 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-md">Launch Event</button>
            </form>
          </div>
        )}

        {/* EVENTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((ev) => (
            <div key={ev.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              
              {/* IMAGE SECTION */}
              <div className="h-48 relative overflow-hidden bg-gray-200">
                 <img 
                    src={getImageForEvent(ev.id)} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="Event"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 
                 {/* Date Badge */}
                 <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg min-w-[60px]">
                    <p className="text-xs font-bold text-red-500 uppercase tracking-wider">{new Date(ev.eventDate).toLocaleString('default', { month: 'short' })}</p>
                    <p className="text-xl font-extrabold text-gray-800 leading-none">{new Date(ev.eventDate).getDate()}</p>
                 </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">{ev.title}</h3>
                
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                    <span>📍 {ev.venue}</span>
                    <span>•</span>
                    <span>⏰ {new Date(ev.eventDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-6 line-clamp-2">{ev.description}</p>
                
                <div className="flex items-center justify-between border-t pt-4">
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        👥 {ev.registrationCount} Going
                    </span>
                    <button 
                        onClick={() => handleJoin(ev.id)}
                        className="bg-gray-900 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-black transition shadow-sm"
                    >
                        Join Now
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {events.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-lg">No upcoming events found.</p>
                {isAdmin && <p className="text-gray-400 text-sm">Create one above to get started!</p>}
            </div>
        )}

      </div>
    </div>
  );
}