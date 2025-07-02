import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const UpdatePedicabModal = ({
  show,
  onClose,
  editData,
  setEditData,
  onSubmit,
}) => {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form when modal is shown or editData changes
  useEffect(() => {
    if (editData) {
      setForm({
        number: editData.number || "",
        vehicle_type: editData.vehicle_type || "",
        owner: editData.owner || "",
        driver: editData.driver || "",
        dateRegistered: editData.dateRegistered?.slice(0, 10) || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    setForm({ ...form, dateRegistered: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/pedicabs/updateVehicle/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update pedicab record.");
      }

      const result = await response.json();
      //   toast.success("Establishment updated successfully!");
      onSubmit(); // Notify parent
      onClose(); // Close modal
    } catch (error) {
      toast.error("Error updating pedicab record");
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
              Update Pedicab
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="establishment"
                  className="block text-sm font-medium mb-2"
                >
                  Pedicab number
                </label>
                <TextInput
                  id="establishment"
                  type="text"
                  value={form.number}
                  onChange={handleChange}
                  placeholder="Enter pedicab number"
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
                  <option value="Electric Bike">Electric Bike</option>
                  <option value="Pedicab">Pedicab</option>
                  <option value="Multicab">Multicab</option>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium mb-2"
                >
                  Owner
                </label>
                <TextInput
                  id="owner"
                  type="text"
                  value={form.owner}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="driver"
                  className="block text-sm font-medium mb-2"
                >
                  Driver
                </label>
                <TextInput
                  id="driver"
                  type="text"
                  value={form.driver}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="dateRegistered"
                  className="block text-sm font-medium mb-2"
                >
                  Date Established
                </label>
                <TextInput
                  id="dateRegistered"
                  type="date"
                  value={form.dateRegistered}
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

export default UpdatePedicabModal;
