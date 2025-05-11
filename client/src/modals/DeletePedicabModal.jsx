import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "flowbite-react";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "../components/LoadingSpinner";

const DeletePedicabModal = ({ show, onClose, onConfirm, deleteData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirmDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/pedicabs/deleteVehicle/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update document");
      }
      onConfirm();
    } catch (err) {
      toast.error("Failed to delete:", err);
    }
    setIsLoading(false);
  };
  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <Toaster richColors position="top-center" expand={true} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>

            <div className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete
              <strong> {deleteData.number}</strong>? This action cannot be
              undone.
            </div>

            <div className="flex justify-end gap-2">
              <Button color="gray" onClick={onClose}>
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => handleConfirmDelete(deleteData._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
};

export default DeletePedicabModal;
