import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Label } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const UpdateActivityModal = ({
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

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title || "",
        description: editData.description || "",
        date: formatDateForInput(editData.date) || "",
        location: editData.location || "",
        organizer: editData.organizer || "",
        photos: editData.photos || [],
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
        `/api/activities/updateActivity/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update activity record.");
      }

      await response.json();
      onSubmit();
    } catch (error) {
      toast.error("Error updating activity record");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  // Function to remove photo by index
  const removePhoto = (index) => {
    setForm((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  // Function to get clean filename (no URL, no extension)
  const getFileName = (url) => {
    const parts = url.split("/").pop().split("?")[0];
    const decoded = decodeURIComponent(parts);
    return decoded.replace(/^\d+-/, "").replace(/\.[^/.]+$/, "");
  };

  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <Toaster richColors position="top-center" expand={true} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl overflow-y-auto max-h-[90vh]">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Update Activity
            </Dialog.Title>

            {/* Title */}
            <div className="mb-4">
              <Label htmlFor="title">Activity Title</Label>
              <TextInput
                id="title"
                type="text"
                value={form.title}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <TextInput
                id="description"
                type="text"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <Label htmlFor="date">Date of Incident</Label>
              <TextInput
                type="datetime-local"
                id="date"
                value={form.date}
                onChange={handleDateChange}
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <Label htmlFor="location">Location</Label>
              <TextInput
                id="location"
                type="text"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            {/* Organizer */}
            <div className="mb-4">
              <Label htmlFor="organizer">Organizer</Label>
              <TextInput
                id="organizer"
                type="text"
                value={form.organizer}
                onChange={handleChange}
              />
            </div>

            {/* Image Previews */}
            {form.photos && form.photos.length > 0 && (
              <div className="mb-4">
                <Label>Photos</Label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {form.photos.map((url, index) => (
                    <div key={index} className="relative group">
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={url}
                          alt={`Photo ${index + 1}`}
                          className="w-16 h-16 object-cover rounded border border-gray-300 hover:opacity-80 transition"
                        />
                      </a>
                      {/* Remove button (shows on hover) */}
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                        title="Remove photo"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
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

export default UpdateActivityModal;
