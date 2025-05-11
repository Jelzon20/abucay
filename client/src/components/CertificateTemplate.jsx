import React, { useRef } from "react";

const CertificateTemplate = ({ formData }) => {
  const printRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <div
        ref={printRef}
        className="border p-10 max-w-3xl mx-auto bg-white text-black"
      >
        <div className="text-center mb-6">
          <div className="flex justify-between items-center mb-4">
            <img
              src="/path/to/city-logo.png"
              alt="City Logo"
              className="h-20"
            />
            <img
              src="/path/to/barangay-logo.png"
              alt="Barangay Logo"
              className="h-20"
            />
          </div>
          <h2 className="text-lg font-semibold">Republic of the Philippines</h2>
          <h3 className="text-md">Province of [Your Province]</h3>
          <h3 className="text-md">City/Municipality of [Your City]</h3>
          <h1 className="text-2xl font-bold mt-2">Barangay Certificate</h1>
        </div>

        <p className="text-justify mt-6 leading-7">
          This is to certify that <strong>{formData.residentName}</strong> of
          <strong> {formData.address}</strong> is a bona fide resident of this
          barangay and known to be a person of good moral character.
        </p>
        <p className="text-justify mt-4 leading-7">
          This certificate is being issued upon the request of the above-named
          person for the purpose of <strong>{formData.purpose}</strong>.
        </p>

        <p className="mt-8">
          Issued this <strong>{formData.dateIssued}</strong> at Barangay [Your
          Barangay], [City/Municipality], Philippines.
        </p>

        <div className="text-right mt-12">
          <p className="font-semibold underline">{formData.chairmanName}</p>
          <p>Barangay Chairman</p>
        </div>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={handlePrint}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Print Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateTemplate;
