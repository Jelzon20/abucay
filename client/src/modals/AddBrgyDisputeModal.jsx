import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Label, Textarea, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const AddBrgyDisputeModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    defendant: "",
    complainant: "",
    complaint: "",
    description: "",
    date: null,
    mediatedBy: "",
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [officials, setOfficials] = useState([]);

  useEffect(() => {
    fetch("/api/officials/getOfficials")
      .then((res) => res.json())
      .then((data) => setOfficials(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleDateChange = (e) => {
    setForm({ ...form, date: e.target.value }); // Format: YYYY-MM-DD
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/brgyDisputes/createDispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        setForm({
          defendant: "",
          complainant: "",
          complaint: "",
          description: "",
          date: null,
          mediatedBy: "",
          status: "",
        });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving lupon: " + error.message);
    } finally {
      setIsLoading(false);
    }
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
              Add Brgy Dispute
            </Dialog.Title>

            <div className="mb-4">
              <label
                htmlFor="defendant"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Defendant
              </label>
              <TextInput
                id="defendant"
                type="text"
                value={form.defendant}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter defendant's name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="complainant"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Complainant
              </label>
              <TextInput
                id="complainant"
                type="text"
                value={form.complainant}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter complainant's name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="complaint"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Complaint
              </label>
              <TextInput
                id="complaint"
                type="text"
                value={form.complaint}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter complaints"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <Textarea
                id="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter case description"
              />
            </div>

            <div className="mb-4">
              <Label>Date</Label>
              <TextInput
                type="datetime-local"
                id="date"
                value={form.date}
                onChange={handleDateChange}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="mediatedBy"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Mediated by
              </label>
              <Select
                id="mediatedBy"
                value={form.mediatedBy}
                onChange={handleChange}
                className="block w-full text-sm border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Mediator</option>
                {officials.map((official) => (
                  <option key={official._id} value={official.name}>
                    {official.name} ({official.position})
                  </option>
                ))}
              </Select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status
              </label>
              <Select
                id="status"
                value={form.status}
                onChange={handleChange}
                className="block w-full text-sm border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select status</option>
                <option value="Pending - First Hearing">
                  Pending - First Hearing
                </option>
                <option value="Pending - Second Hearing">
                  Pending - Second Hearing
                </option>
                <option value="Pending - Third Hearing">
                  Pending - Third Hearing
                </option>
                <option value="Resolved - First Hearing">
                  Resolved - First Hearing
                </option>
                <option value="Resolved - Second Hearing">
                  Resolved - Second Hearing
                </option>
                <option value="Resolved - Third Hearing">
                  Resolved - Third Hearing
                </option>
                <option value="Endorsed">Endorsed</option>
                <option value="Dismissed">Dismissed</option>
              </Select>
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

export default AddBrgyDisputeModal;
