import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Label, Textarea, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const AddLuponMemberModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    contact_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
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
      const res = await fetch("/api/luponMembers/createLuponMember", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        setForm({
          name: "",
          contact_number: "",
        });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving activity: " + error.message);
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
              Add Lupon Member
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

export default AddLuponMemberModal;
