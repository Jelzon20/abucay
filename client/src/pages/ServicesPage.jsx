import React from "react";

const services = [
  {
    title: "Barangay Clearance",
    description:
      "Issuance of clearance for employment, business permits, and other legal or personal transactions.",
  },
  {
    title: "Certificate of Residency",
    description:
      "Official document proving that the person resides in the barangay.",
  },
  {
    title: "Indigency Certificate",
    description:
      "A certificate issued to individuals with low income, often used to access government assistance.",
  },
  {
    title: "Business Permit Endorsement",
    description:
      "Endorsement provided by the barangay for individuals or businesses applying for permits.",
  },
  {
    title: "Complaint Assistance",
    description:
      "Support in filing complaints or resolving issues within the community through proper mediation.",
  },
  {
    title: "Barangay ID Application",
    description:
      "Process for obtaining a local barangay identification card for residents.",
  },
];

const ServicesPage = () => {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 dark:text-white">
        Barangay Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
          >
            {/* Image Cover Placeholder */}
            <div className="w-full h-40 bg-gray-300" />

            {/* Content */}
            <div className="p-4 text-center">
              <h2 className="text-gray-800 text-xl font-semibold mb-2">
                {service.title}
              </h2>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
