import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import comu1 from "../assets/comu1.jpg";
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

  /* DISPLAY ORDER */
  const typeOrder = [
    "Brgy. Health Worker",
    "Brgy. Nutrition Scholar",
    "Brgy. Service Point Officer",
    "Brgy. Tanod",
    "Brgy. Aide",
    "Others",
  ];

  /* ICON PER TYPE */
  const typeIcons = {
    "Brgy. Health Worker": <HeartIcon />,
    "Brgy. Nutrition Scholar": <ClipboardDocumentIcon />,
    "Brgy. Service Point Officer": <UsersIcon />,
    "Brgy. Tanod": <ShieldCheckIcon />,
    "Brgy. Aide": <UserIcon />,
    Others: <UsersIcon />,
  };

  /* GROUP DATA */
  const groupedData = data.reduce((acc, record) => {
    if (!acc[record.type]) acc[record.type] = [];
    acc[record.type].push(record);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100 text-gray-800">
      {/* PAGE HERO */}
      <section className="relative py-28 overflow-hidden">
        <img
          src={comu1}
          alt="Barangay-Based Institutions"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Barangay-Based Institutions
          </h1>
          <p className="text-white/90 max-w-2xl mx-auto text-sm md:text-base">
            Dedicated volunteers and officers working together to serve and
            protect the community of Barangay Abucay.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="relative py-20 overflow-hidden">
        <img
          src={comu1}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-white/85"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          {isLoading && <LoadingSpinner />}

          {typeOrder.map(
            (type) =>
              groupedData[type] && (
                <div key={type} className="mb-20">
                  {/* SECTION HEADER */}
                  <div className="text-center mb-10">
                    <div className="flex justify-center mb-3">
                      {React.cloneElement(typeIcons[type], {
                        className: "h-10 w-10 text-blue-600",
                      })}
                    </div>
                    <h2 className="text-2xl font-bold">{type}</h2>
                  </div>

                  {/* MEMBERS GRID */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {groupedData[type].map((record) => (
                      <div
                        key={record._id}
                        className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-xl transition"
                      >
                        <img
                          src={record.photo}
                          alt={`${record.firstName} ${record.lastName}`}
                          className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
                        />

                        <p className="text-sm font-semibold truncate">
                          {record.firstName} {record.lastName}
                        </p>

                        {type === "Others" && record.typeOthers && (
                          <p className="text-xs text-gray-500 truncate mt-1">
                            {record.typeOthers}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
          )}
        </div>
      </section>
    </div>
  );
};

export default BarangayInstitution;
