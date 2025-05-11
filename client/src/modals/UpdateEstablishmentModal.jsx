import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const UpdateEstablishmentModal = ({
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
        establishment: editData.establishment || "",
        description: editData.description || "",
        owner: editData.owner || "",
        dateEstablished: editData.dateEstablished?.slice(0, 10) || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    setForm({ ...form, dateEstablished: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/establishments/updateEstablishment/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update document");
      }

      const result = await response.json();
      //   toast.success("Establishment updated successfully!");
      onSubmit(); // Notify parent
      onClose(); // Close modal
    } catch (error) {
      toast.error("Error updating establishment");
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
              Update Establishment
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="establishment"
                  className="block text-sm font-medium mb-2"
                >
                  Establishment
                </label>
                <TextInput
                  id="establishment"
                  type="text"
                  value={form.establishment}
                  onChange={handleChange}
                  placeholder="Enter establishment name"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2"
                >
                  Description
                </label>
                <TextInput
                  id="description"
                  type="text"
                  value={form.description}
                  onChange={handleChange}
                />
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
                  htmlFor="dateEstablished"
                  className="block text-sm font-medium mb-2"
                >
                  Date Established
                </label>
                <TextInput
                  id="dateEstablished"
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

export default UpdateEstablishmentModal;
