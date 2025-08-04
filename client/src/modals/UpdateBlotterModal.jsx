import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Textarea, Label, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const UpdateBlotterModal = ({
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
      console.log("Raw editData.scheduleOfHearing:", editData.date);
      setForm({
        incident: editData.incident || "",
        description: editData.description || "",
        takenBy: editData.takenBy || "",
        actionTaken: editData.actionTaken || "",
        date: formatDateForInput(editData.date),
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    setForm({ ...form, date: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/blotters/updateBlotter/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update blotter record.");
      }

      const result = await response.json();
      onSubmit();
      onClose();
    } catch (error) {
      toast.error("Error updating blotter record");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(editData);

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
              Update Blotter
            </Dialog.Title>

            <div className="mb-4">
              <label
                htmlFor="incident"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Incident
              </label>
              <TextInput
                id="incident"
                type="text"
                value={form.incident}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Description
              </label>
              <TextInput
                id="description"
                type="text"
                value={form.description}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="takenBy"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Taken By
              </label>
              <TextInput
                id="takenBy"
                type="text"
                value={form.takenBy}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="actionTaken"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Action Taken
              </label>
              <TextInput
                id="actionTaken"
                type="text"
                value={form.actionTaken}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="col-span-6 sm:col-span-2">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date of Incident
              </label>
              <TextInput
                type="datetime-local"
                id="scheduleOfHearing"
                value={form.date}
                onChange={handleDateChange}
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

export default UpdateBlotterModal;
