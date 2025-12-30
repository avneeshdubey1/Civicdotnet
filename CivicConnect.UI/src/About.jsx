import React from 'react';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-blue-900 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Empowering Citizens. Transforming Cities.</h1>
        <p className="text-xl max-w-2xl mx-auto text-blue-100">
          Civic Connect bridges the gap between you and your local administration. 
          Report issues, donate to causes, and participate in events—all in one place.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            We believe that a smart city is built by smart citizens. Our platform provides
            a transparent and efficient way to highlight infrastructure problems like potholes,
            broken streetlights, and garbage dumps directly to the authorities.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Beyond complaints, we foster community spirit through donation drives and 
            volunteering events, ensuring that every citizen can contribute to the city's growth.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-6 rounded-lg text-center">
                <span className="text-4xl font-bold text-blue-600 block">5k+</span>
                <span className="text-gray-600">Complaints Resolved</span>
            </div>
            <div className="bg-pink-50 p-6 rounded-lg text-center">
                <span className="text-4xl font-bold text-pink-600 block">₹2M+</span>
                <span className="text-gray-600">Funds Raised</span>
            </div>
            <div className="bg-green-50 p-6 rounded-lg text-center">
                <span className="text-4xl font-bold text-green-600 block">100+</span>
                <span className="text-gray-600">Active Events</span>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg text-center">
                <span className="text-4xl font-bold text-purple-600 block">50k</span>
                <span className="text-gray-600">Active Citizens</span>
            </div>
        </div>
      </div>

      {/* Team/Contact Callout */}
      <div className="bg-gray-50 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to make a difference?</h2>
        <a href="/login" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition">
          Join Us Today
        </a>
      </div>
    </div>
  );
};

export default About;