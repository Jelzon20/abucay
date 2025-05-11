import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "flowbite-react";
import abucay_logo from "../assets/abucay_logo.jpg";
import LoadingSpinner from "../components/LoadingSpinner";

const PreviewCertModal = ({ show, onClose, data }) => {
  const [officials, setOfficials] = useState([]);
  const [chairman, setChairman] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const fetchOfficials = async () => {
    setIsLoading(true);
    const res = await fetch("/api/officials/getOfficials");
    const data = await res.json();
    setOfficials(data);
    const punong = data.find(
      (official) => official.position === "Sangguniang Punong Barangay"
    );
    setChairman(punong);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  const today = new Date();
  const formattedDate = `${today.getDate()}${getDaySuffix(
    today.getDate()
  )} of ${today.toLocaleString("default", {
    month: "long",
  })} ${today.getFullYear()}`;

  function getDaySuffix(day) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }
  console.log(officials);

  return (
    <Dialog open={show} onClose={onClose}>
      <div className="fixed inset-0 bg-black/30 z-40" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl rounded-lg bg-white p-10 shadow-xl">
          {isLoading && chairman ? (
            <LoadingSpinner />
          ) : (
            <div ref={contentRef} className="print-container">
              <div className="text-center space-y-1">
                <div className="flex align-content justify-center gap-10">
                  <img
                    src={abucay_logo}
                    alt="abucay_logo"
                    className="w-20 h-20"
                  />
                  <div>
                    <p className="text-sm">
                      <b>Republic of the Philippines</b>
                    </p>
                    <p className="text-sm">Province of Leyte</p>
                    <p className="text-sm">Tacloban City</p>
                  </div>
                  <img
                    src={abucay_logo}
                    alt="abucay_logo"
                    className="w-20 h-20"
                  />
                </div>
                <hr className="mt-4" />

                <h2 className="text-2xl font-bold mt-4 underline">
                  CERTIFICATION
                </h2>
              </div>

              <div className="mt-8 text-justify text-[16px] leading-relaxed">
                <p className="font-semibold">To Whom It May Concern:</p>

                <p className="mt-4">
                  This is to certify that{" "}
                  <span className="font-semibold">{`${data?.requestor?.first_name} ${data?.requestor?.middle_name} ${data?.requestor?.last_name}`}</span>
                  ,{" "}
                  <span className="font-semibold">
                    {data?.requestor?.age} yrs. old
                  </span>{" "}
                  is a resident of {`${data?.requestor.purok}`} Barangay 91 -
                  Abucay, Tacloban City, Leyte for{" "}
                  {`${data.requestor?.length_of_stay}`} years, is known to be of
                  good moral character and has no pending case either civil or
                  criminal in this barangay as of this date.
                </p>

                <p className="mt-4">
                  This certification is issued upon the request of the
                  above-mentioned name for{" "}
                  <span className="font-semibold uppercase">
                    {data?.purpose}
                  </span>
                  .
                </p>

                <p className="mt-4">
                  Issued this {formattedDate}, at the Office of Punong Barangay,
                  Rodrigo M. Aniano, Barangay Sampaguita Dagami Leyte.
                </p>
              </div>

              <div className="mt-12 text-right pr-10">
                <p className="font-semibold underline">{chairman.name}</p>
                <p>Barangay Captain</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-end gap-2">
            <Button color="gray" onClick={onClose}>
              Close
            </Button>
            <Button color="green" onClick={reactToPrintFn}>
              Print
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PreviewCertModal;
