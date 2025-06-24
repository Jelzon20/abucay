import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Textarea, Label, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

// Helper to format ISO date to 'YYYY-MM-DDTHH:MM' for datetime-local input
const formatToLocalDateTime = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const pad = (n) => n.toString().padStart(2, "0");

  const yyyy = date.getFullYear();
  const mm = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());

  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};

const UpdateBrgyDisputeModal = ({
  show,
  onClose,
  editData,
  setEditData,
  onSubmit,
}) => {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [officials, setOfficials] = useState([]);

  const isLocked = editData.status === "Endorsed";
  useEffect(() => {
    fetch("/api/officials/getOfficials")
      .then((res) => res.json())
      .then((data) => setOfficials(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (editData) {
      setForm({
        defendant: editData.defendant || "",
        complainant: editData.complainant || "",
        complaint: editData.complaint || "",
        description: editData.description || "",
        date: formatToLocalDateTime(editData.date),
        mediatedBy: editData.mediatedBy || "",
        status: editData.status || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    setForm({ ...form, date: e.target.value }); // Value is already in local format
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/brgyDisputes/updateDispute/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update brgy dispute record.");
      }

      await response.json();
      onSubmit();
    } catch (error) {
      toast.error("Error updating brgy dispute record");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
      onClose();
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
              Update Brgy Dispute
            </Dialog.Title>

            <div className="mb-4">
              <Label htmlFor="defendant">Defendant</Label>
              <TextInput
                id="defendant"
                type="text"
                value={form.defendant}
                onChange={handleChange}
                placeholder="Enter defendant's name"
                disabled={isLocked}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="complainant">Complainant</Label>
              <TextInput
                id="complainant"
                type="text"
                value={form.complainant}
                onChange={handleChange}
                placeholder="Enter complainant's name"
                disabled={isLocked}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="complaint">Complaint</Label>
              <TextInput
                id="complaint"
                type="text"
                value={form.complaint}
                onChange={handleChange}
                placeholder="Enter complaint"
                disabled={isLocked}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Enter case description"
                disabled={isLocked}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="date">Date</Label>
              <TextInput
                id="date"
                type="datetime-local"
                value={form.date}
                onChange={handleDateChange}
                disabled={isLocked}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="mediatedBy">Mediated By</Label>
              <Select
                id="mediatedBy"
                value={form.mediatedBy}
                onChange={handleChange}
                disabled={isLocked}
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
              <Label htmlFor="status">Status</Label>
              <Select
                id="status"
                value={form.status}
                onChange={handleChange}
                disabled={isLocked}
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
                <option value="Resolved">Resolved</option>
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

export default UpdateBrgyDisputeModal;
