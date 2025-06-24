import React from "react";

import abucay_cover from "../assets/abucay_cover.jpg";
const officials = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    position: "Barangay Captain",
    image: "/images/juan.jpg",
  },
  {
    id: 2,
    name: "Maria Santos",
    position: "Barangay Secretary",
    image: "/images/maria.jpg",
  },
  {
    id: 3,
    name: "Maria Santos",
    position: "Barangay Secretary",
    image: "/images/maria.jpg",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      {/* <section
        className="relative bg-blue-800 text-white py-16 px-4 text-center"
        style={{ backgroundImage: `url(${abucay_cover})` }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">Barangay Abucay</h1>
          <p className="text-lg mt-2">
            Serving the people with integrity and compassion.
          </p>
        </div>
      </section> */}

      <section className="w-full">
        <img
          src={abucay_cover}
          alt="Barangay Hero"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Officials Section */}
      <section className="py-16 px-4">
        <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
          Barangay Officials
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {officials.map((official) => (
            <div
              key={official.id}
              className="bg-white p-6 rounded-xl shadow text-center"
            >
              <img
                src={official.image}
                alt={official.name}
                className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-800">
                {official.name}
              </h3>
              <p className="text-blue-600">{official.position}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
