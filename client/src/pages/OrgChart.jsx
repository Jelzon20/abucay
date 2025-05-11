import React from "react";

const OrgChart = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-10">
        Organizational Chart
      </h1>

      {/* Level 1: Punong Barangay */}
      <div className="flex justify-center mb-12">
        <PersonCard role="Punong Barangay" />
      </div>

      {/* Level 2: Barangay Council */}
      <div className="flex justify-center flex-wrap gap-6 mb-12">
        {Array.from({ length: 7 }).map((_, i) => (
          <PersonCard key={i} role="Sangguniang Barangay Member" />
        ))}
        <PersonCard role="Barangay Secretary" />
      </div>

      {/* Level 3: SK Chairperson */}
      <div className="flex justify-center mb-8">
        <PersonCard role="SK Chairperson" />
      </div>

      {/* Level 4: SK Members and SK Secretary */}
      <div className="flex justify-center flex-wrap gap-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <PersonCard key={i} role="SK Member" />
        ))}
        <PersonCard role="SK Secretary" />
      </div>
    </div>
  );
};

const PersonCard = ({ role }) => (
  <div className="bg-white rounded-xl shadow-md p-4 w-48 flex flex-col items-center text-center">
    <div className="w-20 h-20 rounded-full bg-gray-300 mb-4" />
    <h3 className="font-medium text-sm">{role}</h3>
  </div>
);

export default OrgChart;
