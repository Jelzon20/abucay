import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { storage } from "../firebase"; // adjust path as needed
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddDocumentModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    files: [],
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
        const storageRef = ref(storage, `files/${Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      const urls = await Promise.all(uploadPromises);

      setFormData((prev) => ({
        ...prev,
        files: [...(prev.files || []), ...urls],
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
    const updated = [...formData.files];
    updated.splice(index, 1);
    setFormData({ ...formData, files: updated });
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.files.length)
      return alert("Missing fields");
    setUploading(true);

    try {
      const res = await fetch("/api/documents/addDocument", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save");

      const data = await res.json();
      onSubmit(data);
      setFormData({ title: "", description: "", files: [] });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Submission failed.");
    } finally {
      setUploading(false);
    }
  };

  console.log(formData);

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
              Add Document
            </Dialog.Title>

            <div className="space-y-4">
              <TextInput
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <TextInput
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Files
                </label>
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
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
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
                  onChange={onFileInputChange}
                  className="hidden"
                />

                {uploadStatus && (
                  <p className="text-sm text-blue-600 mt-1">{uploadStatus}</p>
                )}
              </div>

              {formData.files.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{truncate(file, 30)}</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:underline text-xs"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={handleSubmit} disabled={uploading}>
                {uploading ? "Uploading..." : "Submit"}
              </Button>
              <Button color="gray" onClick={onClose} disabled={uploading}>
                Cancel
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      )}
    </Dialog>
  );
};

export default AddDocumentModal;
