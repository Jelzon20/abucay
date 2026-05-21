import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Label, Textarea, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase"; // adjust import path

const AddResolutionModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    resolutionNo: "",
    title: "",
    description: "",
    dateFiled: null,
    author: "",
    committee: "",
    status: "Pending",
    attachments: [],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const truncate = (str, n) =>
    str.length > n ? str.slice(0, n - 3) + "..." : str;

  const handleFiles = async (files) => {
    if (!files.length) return;
    setUploading(true);
    setUploadStatus("Uploading...");

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const storageRef = ref(
          storage,
          `resolutions/${Date.now()}-${file.name}`,
        );
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      const urls = await Promise.all(uploadPromises);

      setForm((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...urls],
      }));

      setUploadStatus("Uploaded");
    } catch (err) {
      console.error(err);
      setUploadStatus("Upload failed");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadStatus(""), 2000);
    }
  };

  const onFileInputChange = (e) => {
    handleFiles(e.target.files);
    e.target.value = null;
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (index) => {
    const updated = [...form.attachments];
    updated.splice(index, 1);
    setForm({ ...form, attachments: updated });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    setForm({ ...form, dateFiled: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/resolutions/addResolution", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        setForm({
          resolutionNo: "",
          title: "",
          description: "",
          dateFiled: null,
          author: "",
          committee: "",
          status: "Pending",
          attachments: [],
        });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving resolution: " + error.message);
    }
    setIsLoading(false);
  };

  const getFileName = (url) => {
    const parts = url.split("/").pop().split("?")[0]; // get last path before query
    const decoded = decodeURIComponent(parts); // decode %20 etc.
    return decoded.replace(/^\d+-/, ""); // remove timestamp prefix if any
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
              Add Resolution
            </Dialog.Title>

            {/* Resolution No */}
            <div className="mb-4">
              <Label htmlFor="title">Resolution No.</Label>
              <TextInput
                id="resolutionNo"
                type="text"
                value={form.resolutionNo}
                onChange={handleChange}
                placeholder="Enter Resolution No."
              />
            </div>

            {/* Title */}
            <div className="mb-4">
              <Label htmlFor="title">Title</Label>
              <TextInput
                id="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter title"
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
              <Label htmlFor="date">Date Filed</Label>
              <TextInput
                type="date"
                id="dateFiled"
                value={form.dateFiled || ""}
                onChange={handleDateChange}
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <Label htmlFor="location">Author</Label>
              <TextInput
                id="author"
                type="text"
                value={form.author}
                onChange={handleChange}
              />
            </div>

            {/* Organizer */}
            <div className="mb-4">
              <Label htmlFor="organizer">Committee</Label>
              <TextInput
                id="committee"
                type="text"
                value={form.committee}
                onChange={handleChange}
              />
            </div>

            {/* Upload Area */}
            <div className="mb-4">
              <Label>Upload Attachments</Label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current.click()}
                className={`flex items-center justify-center h-24 border-2 border-dashed rounded-lg cursor-pointer transition ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              >
                <span className="text-sm text-gray-600">
                  {isDragging
                    ? "Drop files here..."
                    : "Click or drag files here to upload"}
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={onFileInputChange}
                className="hidden"
              />

              {uploadStatus && (
                <p className="text-sm text-blue-600 mt-1">{uploadStatus}</p>
              )}
            </div>

            {/* Photo List */}
            {form.attachments.map((url, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>{getFileName(url)}</span>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Remove
                </button>
              </li>
            ))}

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={handleSubmit} disabled={uploading}>
                Submit
              </Button>
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

export default AddResolutionModal;
