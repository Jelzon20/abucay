import React, { useState, useEffect, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Label, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const UpdateResolutionModal = ({
  show,
  onClose,
  editData,
  setEditData,
  onSubmit,
}) => {
  const [uploading, setUploading] = useState(false);

  const [uploadStatus, setUploadStatus] = useState("");

  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    resolutionNo: "",
    title: "",
    description: "",
    dateFiled: "",
    author: "",
    committee: "",
    status: "",
    attachments: [],
  });

  const truncate = (str, n) =>
    str?.length > n ? str.slice(0, n - 3) + "..." : str;

  // FORMAT DATE
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return "";

    return date.toISOString().split("T")[0];
  };

  // LOAD EDIT DATA
  useEffect(() => {
    if (editData) {
      setForm({
        resolutionNo: editData.resolutionNo || "",
        title: editData.title || "",
        description: editData.description || "",
        dateFiled: formatDateForInput(editData.dateFiled),
        author: editData.author || "",
        committee: editData.committee || "",
        status: editData.status || "",
        attachments: Array.isArray(editData.attachments)
          ? editData.attachments
          : [],
      });
    }
  }, [editData]);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  // HANDLE FILES
  const handleFiles = async (files) => {
    if (!files || !files.length) return;

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
        attachments: [...prev.attachments, ...urls],
      }));

      setUploadStatus("Uploaded successfully");
    } catch (error) {
      console.error(error);

      toast.error("Upload failed");

      setUploadStatus("Upload failed");
    } finally {
      setUploading(false);

      setTimeout(() => {
        setUploadStatus("");
      }, 2000);
    }
  };

  // FILE INPUT CHANGE
  const onFileInputChange = (e) => {
    handleFiles(e.target.files);

    e.target.value = null;
  };

  // DRAG DROP
  const onDrop = (e) => {
    e.preventDefault();

    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);

      e.dataTransfer.clearData();
    }
  };

  // REMOVE FILE
  const removeFile = (index) => {
    setForm((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  // CLEAN FILE NAME
  const getFileName = (url) => {
    try {
      const parts = url.split("/").pop()?.split("?")[0] || "";

      const decoded = decodeURIComponent(parts);

      return decoded.replace(/^\d+-/, "");
    } catch {
      return "File";
    }
  };

  // SUBMIT
  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `/api/resolutions/updateResolution/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update resolution.");
      }

      toast.success("Resolution updated successfully");

      onSubmit();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Error updating resolution");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <Toaster richColors position="top-center" expand={true} />

      <div className="fixed inset-0 bg-black/40" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl overflow-y-auto max-h-[90vh]">
            <Dialog.Title className="text-2xl font-bold mb-6">
              Update Resolution
            </Dialog.Title>

            {/* Resolution No */}
            <div className="mb-4">
              <Label htmlFor="resolutionNo" value="Resolution No." />

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
              <Label htmlFor="title" value="Title" />

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
              <Label htmlFor="description" value="Description" />

              <TextInput
                id="description"
                type="text"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </div>

            {/* Date Filed */}
            <div className="mb-4">
              <Label htmlFor="dateFiled" value="Date Filed" />

              <TextInput
                id="dateFiled"
                type="date"
                value={form.dateFiled}
                onChange={handleChange}
              />
            </div>

            {/* Author */}
            <div className="mb-4">
              <Label htmlFor="author" value="Author" />

              <TextInput
                id="author"
                type="text"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter author"
              />
            </div>

            {/* Committee */}
            <div className="mb-4">
              <Label htmlFor="committee" value="Committee" />

              <TextInput
                id="committee"
                type="text"
                value={form.committee}
                onChange={handleChange}
                placeholder="Enter committee"
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <Label htmlFor="status" value="Status" />

              <Select id="status" value={form.status} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Archived">Archived</option>
              </Select>
            </div>

            {/* Upload */}
            <div className="mb-4">
              <Label value="Upload Attachments" />

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
                onClick={() => fileInputRef.current?.click()}
                className={`flex items-center justify-center h-28 border-2 border-dashed rounded-lg cursor-pointer transition ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              >
                <span className="text-sm text-gray-600">
                  {uploading
                    ? "Uploading..."
                    : isDragging
                      ? "Drop files here..."
                      : "Click or drag files here to upload"}
                </span>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={onFileInputChange}
                className="hidden"
              />

              {uploadStatus && (
                <p className="text-sm text-blue-600 mt-2">{uploadStatus}</p>
              )}
            </div>

            {/* Attachments */}
            {form.attachments.length > 0 && (
              <div className="mb-4">
                <Label value="Attachments" />

                <ul className="space-y-2 mt-2">
                  {form.attachments.map((url, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center border p-2 rounded"
                    >
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        {truncate(getFileName(url), 40)}
                      </a>

                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button color="gray" onClick={onClose}>
                Cancel
              </Button>

              <Button onClick={handleSubmit} disabled={uploading}>
                {uploading ? "Uploading..." : "Update"}
              </Button>
            </div>
          </Dialog.Panel>
        )}
      </div>
    </Dialog>
  );
};

export default UpdateResolutionModal;
