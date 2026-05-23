import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const AddCertModal = ({ show, onClose, onSubmit }) => {
  const [residents, setResidents] = useState([]);

  const [form, setForm] = useState({
    requestor: "",
    type: "",
    purpose: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [selectedResident, setSelectedResident] = useState(null);

  const [showDropdown, setShowDropdown] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef(null);

  // FETCH RESIDENTS
  useEffect(() => {
    fetch("/api/residents/getResidents")
      .then((res) => res.json())
      .then((data) => setResidents(data))
      .catch((err) => console.error("Error fetching residents:", err));
  }, []);

  // CLOSE DROPDOWN WHEN CLICK OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // FILTER RESIDENTS
  const filteredResidents = residents.filter((res) => {
    const fullName = `${res.first_name} ${
      res.middle_name || ""
    } ${res.last_name}`.toLowerCase();

    return fullName.includes(searchTerm.toLowerCase());
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { id, value } = e.target;

    setForm({
      ...form,
      [id]: value,
    });
  };

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch("/api/certs/addCertificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();

        onSubmit();

        setForm({
          requestor: "",
          type: "",
          purpose: "",
        });

        setSearchTerm("");

        setSelectedResident(null);
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving record: " + error.message);
    }

    setIsLoading(false);
  };

  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />

      <Toaster richColors position="top-center" expand={true} />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Create Certificate
            </Dialog.Title>

            {/* REQUESTOR */}
            <div className="mb-4 relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requestor
              </label>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);

                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder="Search resident..."
                className="w-full border border-gray-300 rounded-lg p-2"
              />

              {showDropdown && (
                <div className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
                  {filteredResidents.length > 0 ? (
                    filteredResidents.map((res) => {
                      const fullName = `${res.first_name} ${
                        res.middle_name || ""
                      } ${res.last_name}`;

                      return (
                        <div
                          key={res._id}
                          onClick={() => {
                            setForm({
                              ...form,
                              requestor: res._id,
                            });

                            setSelectedResident(res);

                            setSearchTerm(fullName);

                            setShowDropdown(false);
                          }}
                          className="p-2 hover:bg-blue-100 cursor-pointer"
                        >
                          {fullName}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-2 text-gray-500">No resident found</div>
                  )}
                </div>
              )}
            </div>

            {/* CERTIFICATE TYPE */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type of Certificate
              </label>

              <Select
                id="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>

                <option value="CERTIFICATE OF INDIGENCY">
                  CERTIFICATE OF INDIGENCY
                </option>

                <option value="BARANGAY CERTIFICATION (Senior Citizen)">
                  BARANGAY CERTIFICATION (Senior Citizen)
                </option>

                <option value="BARANGAY CERTIFICATION (FIRST TIME JOB SEEKERS ACT –RA 11261)">
                  BARANGAY CERTIFICATION (FIRST TIME JOB SEEKERS ACT –RA 11261)
                </option>
              </Select>
            </div>

            {/* PURPOSE */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Purpose
              </label>

              <TextInput
                id="purpose"
                type="text"
                value={form.purpose}
                onChange={handleChange}
                placeholder="Enter purpose"
              />
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={handleSubmit}>Submit</Button>

              <Button color="gray" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      )}
    </Dialog>
  );
};

export default AddCertModal;
