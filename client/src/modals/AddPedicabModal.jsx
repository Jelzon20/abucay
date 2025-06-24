import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const AddPedicabModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    number: "",
    owner: "",
    vehicle_type: "",
    driver: "",
    dateRegistered: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleDateChange = (e) => {
    setForm({ ...form, dateRegistered: e.target.value }); // Format: YYYY-MM-DD
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/pedicabs/addVehicle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        setForm({
          number: "",
          owner: "",
          driver: "",
          dateRegistered: null,
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
              Add Pedicab
            </Dialog.Title>

            <div className="mb-4">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pedicab Number
              </label>
              <TextInput
                id="number"
                type="text"
                value={form.number}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter vehicle number"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Vehicle Type
              </label>
              <Select
                id="vehicle_type"
                value={form.vehicle_type}
                onChange={handleChange}
                className="block w-full text-sm border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Dismissed">Electric Bike</option>
                <option value="Resolved">Pedicab</option>
                <option value="Dismissed">Multicab</option>
              </Select>
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

            <div className="mb-4">
              <label
                htmlFor="driver"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Driver
              </label>
              <TextInput
                id="driver"
                value={form.driver}
                type="text"
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dateRegistered"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date Registered
              </label>
              <TextInput
                name="dateRegistered"
                type="date"
                value={form.dateRegistered}
                onChange={handleDateChange}
                required
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

export default AddPedicabModal;
