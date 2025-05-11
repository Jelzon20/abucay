import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <header className="relative bg-white shadow-md">
        <img
          src="https://source.unsplash.com/1600x600/?community,philippines"
          alt="Barangay"
          className="w-full h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl font-bold drop-shadow-md">
            Barangay 91 - Abucay
          </h1>
          <p className="text-lg mt-2 drop-shadow-md">
            Empowering the community with digital services
          </p>
        </div>
      </header>

      {/* About Section */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">About Us</h2>
        <p className="text-center text-lg text-gray-700 leading-relaxed">
          Welcome to the Barangay Management System of Barangay 91 - Abucay,
          Tacloban City. Our platform enables residents to access essential
          services, request documents, and stay updated with local
          announcements—all from the comfort of your home.
        </p>
      </section>

      {/* Services Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">
            Our Services
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-gray-50 rounded-xl shadow p-6 text-center">
              <img
                src="https://source.unsplash.com/300x200/?document,form"
                alt="Document Request"
                className="rounded-md mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Document Request</h3>
              <p>Request Barangay Clearance, Certificates, and more.</p>
            </div>

            <div className="bg-gray-50 rounded-xl shadow p-6 text-center">
              <img
                src="https://source.unsplash.com/300x200/?council,meeting"
                alt="Officials"
                className="rounded-md mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Barangay Officials</h3>
              <p>Meet your community leaders and know their roles.</p>
            </div>

            <div className="bg-gray-50 rounded-xl shadow p-6 text-center">
              <img
                src="https://source.unsplash.com/300x200/?announcement,community"
                alt="Announcements"
                className="rounded-md mx-auto mb-4"
              />
              <h3 className="text-xl font-bold mb-2">Announcements</h3>
              <p>Stay updated on community events and important notices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
