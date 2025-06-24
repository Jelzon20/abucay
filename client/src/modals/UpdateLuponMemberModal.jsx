import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Textarea, Label, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const UpdateLuponMemberModal = ({
  show,
  onClose,
  editData,
  setEditData,
  onSubmit,
}) => {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      //   console.log("Raw editData.scheduleOfHearing:", editData.date);
      setForm({
        name: editData.name || "",
        contact_number: editData.contact_number || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/luponMembers/updateLuponMember/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update lupon member record.");
      }

      const result = await response.json();
      onSubmit();
    } catch (error) {
      toast.error("Error updating lupon member record");
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
              Update Lupon Member
            </Dialog.Title>

            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <TextInput
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter a name"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contact_number"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contact Number
              </label>
              <TextInput
                id="contact_number"
                type="text"
                value={form.contact_number}
                onChange={handleChange}
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

export default UpdateLuponMemberModal;
