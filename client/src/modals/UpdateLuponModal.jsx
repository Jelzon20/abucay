import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Textarea, Label, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const UpdateLuponModal = ({
  show,
  onClose,
  editData,
  setEditData,
  onSubmit,
}) => {
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Invalid date string:", dateString);
      return "";
    }

    const pad = (n) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    const formatted = `${year}-${month}-${day}T${hours}:${minutes}`;
    console.log("Formatted date for input:", formatted);
    return formatted;
  };

  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      console.log(
        "Raw editData.scheduleOfHearing:",
        editData.scheduleOfHearing
      );
      setForm({
        defendant: editData.defendant || "",
        complainant: editData.complainant || "",
        description: editData.description || "",
        scheduleOfHearing: formatDateForInput(editData.scheduleOfHearing),
        status: editData.status || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    setForm({ ...form, scheduleOfHearing: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/lupons/updateLupon/${editData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Failed to update lupon record.");
      }

      const result = await response.json();
      onSubmit();
      onClose();
    } catch (error) {
      toast.error("Error updating lupon record");
      console.error("Update error:", error);
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
              Update Lupon
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
                value={form.defendant || ""}
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
                value={form.complainant || ""}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter complainant's name"
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
                value={form.description || ""}
                onChange={handleChange}
                rows={4}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter case description"
              />
            </div>

            <div className="mb-4">
              <Label>Schedule of Hearing</Label>
              <TextInput
                type="datetime-local"
                id="scheduleOfHearing"
                value={form.scheduleOfHearing || ""}
                onChange={handleDateChange}
              />
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
                value={form.status || ""}
                onChange={handleChange}
                className="block w-full text-sm border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
              >
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

export default UpdateLuponModal;
