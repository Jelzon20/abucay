import React from "react";
import comu3 from "../assets/comu3.jpg";
import {
  CheckBadgeIcon,
  ScaleIcon,
  DocumentTextIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

const ServicesPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* HERO / PAGE HEADER */}
      <section className="relative py-28 overflow-hidden">
        <img
          src={comu3}
          alt="Barangay Services"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Barangay Services
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-base">
            Providing accessible, efficient, and transparent public services for
            every resident of Barangay Abucay.
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="relative py-20 overflow-hidden">
        <img
          src={comu3}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-2xl font-bold mb-2">
              Available Barangay Services
            </h2>
            <p className="text-sm text-gray-600">
              Services designed to support community welfare and good governance
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Certificate of Indigency */}
            <ServiceCard
              icon={<CheckBadgeIcon />}
              title="Certificate of Indigency"
              description="Issued to residents who require proof of indigency
              for medical assistance, scholarships, or social aid programs."
            />

            {/* Lupon */}
            <ServiceCard
              icon={<ScaleIcon />}
              title="Lupon"
              description="Barangay-based justice system that mediates disputes
              among residents to promote peace and avoid court proceedings."
            />

            {/* Barangay Certification */}
            <ServiceCard
              icon={<DocumentTextIcon />}
              title="Barangay Certification"
              description="Official document confirming residency, identity, or
              other barangay-related records and transactions."
            />

            {/* Senior Citizen Certification */}
            <ServiceCard
              icon={<UserGroupIcon />}
              title="Senior Citizen Certification"
              description="Certification issued to senior citizens to help them
              access government benefits and privileges."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

/* SERVICE CARD – ELEMENTOR STYLE */
const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 text-center">
    <div className="flex justify-center mb-5">
      <div className="bg-blue-100 p-4 rounded-full">
        {React.cloneElement(icon, {
          className: "h-8 w-8 text-blue-600",
        })}
      </div>
    </div>

    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

export default ServicesPage;
