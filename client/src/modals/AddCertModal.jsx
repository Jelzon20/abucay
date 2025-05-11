import React, { useState, useRef, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Label, Textarea, Select } from "flowbite-react";
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
  const printRef = useRef();

  // Fetch residents on mount
  useEffect(() => {
    fetch("/api/residents/getResidents")
      .then((res) => res.json())
      .then((data) => setResidents(data))
      .catch((err) => console.error("Error fetching residents:", err));
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    if (id === "requestor") {
      const resident = residents.find((res) => res._id === value);
      setSelectedResident(resident || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/certs/addCertificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

            <div className="mb-4">
              <label
                htmlFor="incident"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Requestor
              </label>
              <Select
                id="requestor"
                value={form.requestor}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                {residents.map((res) => (
                  <option key={res._id} value={res._id}>
                    {res.first_name} {res.middle_name} {res.last_name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Type of Certificate
              </label>
              <Select
                id="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                <option value="Barangay Certificate">
                  Barangay Certificate
                </option>
              </Select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="incident"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Purpose
              </label>
              <TextInput
                id="purpose"
                type="text"
                value={form.purpose}
                onChange={handleChange}
                placeholder="Enter incident title"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

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
