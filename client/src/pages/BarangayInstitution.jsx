import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import comu1 from "../assets/comu1.jpg";
import whiteBg from "../assets/white-bg.jpg";
import {
  HeartIcon,
  ClipboardDocumentIcon,
  ShieldCheckIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

const BarangayInstitution = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBBIs = async () => {
    setIsLoading(true);
    const res = await fetch("/api/bbi/getInstitutions");
    const data = await res.json();
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBBIs();
  }, []);

  const typeOrder = [
    "Brgy. Health Worker",
    "Brgy. Nutrition Scholar",
    "Brgy. Service Point Officer",
    "Brgy. Tanod",
    "Brgy. Aide",
    "Others",
  ];
  const [activeType, setActiveType] = useState(typeOrder[0]);

  const typeIcons = {
    "Brgy. Health Worker": HeartIcon,
    "Brgy. Nutrition Scholar": ClipboardDocumentIcon,
    "Brgy. Service Point Officer": UsersIcon,
    "Brgy. Tanod": ShieldCheckIcon,
    "Brgy. Aide": UserIcon,
    Others: UsersIcon,
  };

  const groupedData = data.reduce((acc, record) => {
    if (!acc[record.type]) acc[record.type] = [];
    acc[record.type].push(record);
    return acc;
  }, {});

  return (
    <div className="bg-slate-50 text-slate-800">
      {/* HERO */}
      <section className="relative py-32 overflow-hidden">
        <img
          src={comu1}
          alt="Barangay-Based Institutions"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/40" />

        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
            Barangay-Based Institutions
          </h1>
          <p className="text-white/90 max-w-3xl mx-auto mt-5 text-base md:text-lg">
            Dedicated volunteers and officers working together to serve and
            protect the community of Barangay Abucay
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative py-24">
        <img
          src={whiteBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm" />

        <div className="relative max-w-7xl mx-auto px-6">
          {isLoading && <LoadingSpinner />}

          {/* CATEGORY TABS */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {typeOrder.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition
            ${
              activeType === type
                ? "bg-blue-600 text-white shadow"
                : "bg-white text-slate-700 hover:bg-blue-50"
            }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* ACTIVE GRID */}
          {groupedData[activeType] && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
              {groupedData[activeType].map((record) => (
                <div
                  key={record._id}
                  className="group bg-white w-64 rounded-2xl p-6
                       shadow-sm hover:shadow-2xl transition-all
                       flex flex-col items-center text-center"
                >
                  <img
                    src={record.photo}
                    alt={`${record.firstName} ${record.lastName}`}
                    className="w-40 h-40 rounded-full object-cover
                         ring-4 ring-white shadow-md
                         group-hover:scale-105 transition"
                  />

                  <p className="mt-4 font-semibold text-sm uppercase tracking-wide">
                    {record.firstName} {record.lastName}
                  </p>

                  <p className="text-xs text-slate-500 mt-1">
                    {record.purokAssigned}
                  </p>

                  {activeType === "Others" && record.typeOthers && (
                    <p className="text-xs text-blue-600 mt-2 font-medium">
                      {record.typeOthers}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BarangayInstitution;
