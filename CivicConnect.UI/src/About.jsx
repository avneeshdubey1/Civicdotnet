import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-blue-900 text-white py-24 px-6 text-center overflow-hidden">
        {/* Background decorative blob */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
            <span className="text-blue-300 font-bold tracking-wider uppercase text-sm mb-4 block">Our Mission</span>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8 leading-tight">
                Empowering Citizens.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">Building Better Cities.</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
                CivicConnect bridges the gap between residents and city administration. 
                We believe that transparency, technology, and community participation are the keys to a smarter future.
            </p>
        </div>
      </section>

      {/* 2. STATS STRIP */}
      <div className="bg-white shadow-lg -mt-10 mx-6 md:mx-auto max-w-5xl rounded-2xl relative z-20 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 p-8">
        <StatItem value="100%" label="Transparency" />
        <StatItem value="24/7" label="Support" />
        <StatItem value="50K+" label="Lives Impacted" />
      </div>

      {/* 3. THE TEAM SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet the Minds Behind It</h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-16">
                A passionate team of developers dedicated to solving real-world problems through code.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <TeamMember name="Avneesh Dubey" role="Full Stack Developer" />
                <TeamMember name="Devendra Deore" role="Full Stack Developer" />
                <TeamMember name="Parikshit Urkande" role="Full Stack Developer" />
                <TeamMember name="Satyajit Kadam" role="Full Stack Developer" />
                <TeamMember name="Aryan Pate" role="Full Stack Developer" />
            </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="bg-gray-900 text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to make a difference?</h2>
        <button 
            onClick={() => navigate('/login')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-full transition shadow-lg hover:shadow-blue-500/50"
        >
            Join CivicConnect Today
        </button>
      </section>
    </div>
  );
}

/* --- Sub Components --- */

function TeamMember({ name, role }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            {/* Avatar Placeholder */}
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
                👨‍💻
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
            <p className="text-blue-600 text-sm font-medium">{role}</p>
        </div>
    );
}

function StatItem({ value, label }) {
    return (
        <div className="text-center p-4">
            <div className="text-4xl font-extrabold text-gray-800 mb-1">{value}</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">{label}</div>
        </div>
    );
}