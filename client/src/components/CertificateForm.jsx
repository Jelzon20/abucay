import React, { useState } from "react";
import CertificateTemplate from "./CertificateTemplate";

const CertificateForm = () => {
  const [formData, setFormData] = useState({
    residentName: "",
    purpose: "",
    address: "",
    dateIssued: new Date().toLocaleDateString(),
    chairmanName: "Hon. Juan Dela Cruz",
  });

  const [showCertificate, setShowCertificate] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    setShowCertificate(true);
  };

  return (
    <div className="p-6">
      {!showCertificate ? (
        <div className="space-y-4">
          <input
            type="text"
            name="residentName"
            placeholder="Resident's Full Name"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            type="text"
            name="purpose"
            placeholder="Purpose of Certificate"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Generate Certificate
          </button>
        </div>
      ) : (
        <CertificateTemplate formData={formData} />
      )}
    </div>
  );
};

export default CertificateForm;
