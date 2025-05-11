import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
// import { storage } from "../firebase"; // adjust path as needed
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddEstablishmentModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    establishment: "",
    description: "",
    owner: "",
    dateEstablished: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleDateChange = (e) => {
    setForm({ ...form, dateEstablished: e.target.value }); // Format: YYYY-MM-DD
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/establishments/addEstablishment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        setForm({
          establishment: "",
          description: "",
          owner: "",
          dateEstablished: null,
        });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving establishment: " + error.message);
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
              Add Establishment
            </Dialog.Title>

            <div className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="establishment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Establishment
                </label>
                <TextInput
                  id="establishment"
                  type="text"
                  value={form.establishment}
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter an establishment name"
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
                  value={form.description}
                  type="text"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Owner
                </label>
                <TextInput
                  id="owner"
                  value={form.owner}
                  type="text"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label
                  htmlFor="dateEstablished"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date Established
                </label>
                <TextInput
                  name="birthday"
                  type="date"
                  value={form.dateEstablished}
                  onChange={handleDateChange}
                  required
                />
              </div>
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

export default AddEstablishmentModal;
