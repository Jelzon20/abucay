import { Dialog } from "@headlessui/react";
import { Button } from "flowbite-react";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import abucay_logo from "../assets/abucay_logo.jpg";
import LoadingSpinner from "../components/LoadingSpinner";

import { CERT_TEMPLATES } from "../components/certTemplates";

const PreviewCertModal = ({ show, onClose, data }) => {
  const contentRef = useRef(null);

  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "Barangay Certification",
  });

  const TemplateComponent = CERT_TEMPLATES[data.type];

  const officials = useSelector((state) => state.officials.list || []);
  const [resident] = useState(() => data?.requestor || null);
  const [loading] = useState(false);

  const handlePrint = () => {
    if (!contentRef.current) {
      console.error("Nothing to print — ref not ready");
      return;
    }
    reactToPrintFn();
  };

  const today = new Date();
  const formattedDate = `${today.getDate()}${getDaySuffix(
    today.getDate()
  )} day of ${today.toLocaleString("default", {
    month: "long",
  })}, ${today.getFullYear()}`;

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    return ["th", "st", "nd", "rd"][day % 10] || "th";
  }

  if (!show || !resident) return null;

  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 print:hidden" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white w-full max-w-5xl rounded shadow-lg p-6 print:p-0 print:shadow-none">
          {loading && <LoadingSpinner />}

          {/* ================= PRINTABLE AREA ================= */}
          <div
            ref={contentRef}
            className="border border-black p-6 print:border-none"
          >
            <div className="grid grid-cols-[280px_1fr] gap-4 min-h-[1000px]">
              {/* LEFT COLUMN */}
              <div className="border-r border-black pr-4">
                <div className="text-center mb-4">
                  <img
                    src={abucay_logo}
                    alt="Barangay Logo"
                    className="w-24 h-24 mx-auto"
                  />
                </div>

                <p className="text-xs font-bold text-center mb-3">
                  SANGGUNIANG BARANGAY COUNCIL
                </p>

                <ul className="text-xs space-y-3 text-center">
                  {officials.map((o) => (
                    <li key={o._id} className="p-2">
                      <p className="font-bold text-md uppercase">{o.name}</p>
                      <p className="italic text-[11px]">
                        {o.additionalDetails}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* RIGHT COLUMN */}
              <div className="pl-4 flex flex-col">
                {/* HEADER */}
                <div className="text-center border-b border-black pb-3">
                  <p className="font-bold text-sm">
                    REPUBLIC OF THE PHILIPPINES
                  </p>
                  <p className="font-bold text-sm">CITY OF TACLOBAN</p>
                  <p className="font-bold text-sm">BARANGAY 91 ABUCAY</p>
                  <p className="font-bold text-xs">
                    barangay91abucay@gmail.com
                  </p>
                </div>

                {/* TITLE */}
                <h1 className="text-3xl font-bold text-center mt-6">
                  {data.type.toUpperCase()}
                </h1>
                {/* <p className="text-sm text-center font-semibold mt-1">
                  (FIRST TIME JOB SEEKERS ACT – RA 11261)
                </p> */}

                {/* BODY */}
                <div className="mt-6 text-sm leading-relaxed text-justify flex-1">
                  {TemplateComponent ? (
                    <TemplateComponent
                      resident={resident}
                      formattedDate={formattedDate}
                      data={data}
                    />
                  ) : (
                    <p className="italic text-red-500">
                      No template found for this document type.
                    </p>
                  )}
                </div>

                {/* SIGNATURE */}
                <div className="mt-16 relative">
                  {/* PUNONG BARANGAY (RIGHT - HIGHER) */}
                  <div className="absolute right-0 top-0 text-right">
                    <p className="font-bold uppercase underline">
                      {
                        officials.find((o) => o.position === "Punong Barangay")
                          ?.name
                      }
                    </p>
                    <p className="text-sm">Punong Barangay</p>
                  </div>

                  {/* BARANGAY SECRETARY (LEFT - LOWER) */}
                  <div className="absolute left-0 top-24 text-left">
                    <p className="font-bold uppercase underline">
                      {
                        officials.find(
                          (o) => o.position === "Barangay Secretary"
                        )?.name
                      }
                    </p>
                    <p className="text-sm">Barangay Secretary</p>
                  </div>

                  {/* Spacer to preserve layout height */}
                  <div className="h-40" />
                </div>

                <p className="text-xs text-right mt-8 italic">
                  Not Valid Without Official Seal
                </p>
              </div>
            </div>
          </div>

          {/* ================= ACTIONS ================= */}
          <div className="mt-4 flex justify-end gap-2 print:hidden">
            <Button color="gray" onClick={onClose}>
              Close
            </Button>
            <Button
              color="green"
              onClick={handlePrint}
              disabled={!resident || officials.length === 0}
            >
              Print
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PreviewCertModal;
