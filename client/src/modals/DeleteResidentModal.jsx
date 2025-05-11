import { Dialog } from "@headlessui/react";
import { toast, Toaster } from "sonner";

export default function DeleteResidentModal({ resident, onClose, onDeleted }) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/residents/deleteResident/${resident._id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      toast.success("Resident deleted!");
      onDeleted();
    } catch (error) {
      toast.error("Failed to delete resident");
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="relative z-50">
      {/* Blurred & semi-transparent backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Centered modal wrapper */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl p-8 shadow-2xl transform transition-all duration-300 scale-100">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Delete a Resident Record
          </h2>
          <p className="text-center text-gray-600 mb-4">
            Are you sure you want to delete{" "}
            <strong>
              {resident.first_name} {resident.last_name}
            </strong>
            's record?
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              onClick={handleDelete}
            >
              Yes, Delete
            </button>
            <button
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
