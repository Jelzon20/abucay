import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button } from "flowbite-react";
import { storage } from "../firebase"; // adjust the path as needed
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UpdateDocumentModal = ({
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

  const truncate = (str, n) =>
    str.length > n ? str.slice(0, n - 3) + "..." : str;

  const handleFiles = async (files) => {
    if (!files.length) return;

    setUploading(true);
    setUploadStatus("Uploading...");

    const uploadedUrls = [];

    try {
      for (const file of files) {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        uploadedUrls.push(downloadUrl);
      }

      setEditData((prev) => ({
        ...prev,
        files: [...(prev.files || []), ...uploadedUrls],
      }));

      setUploadStatus("Upload complete");
    } catch (err) {
      console.error("Firebase upload error:", err);
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const removeFile = (index) => {
    const updated = [...(editData.files || [])];
    updated.splice(index, 1);
    setEditData((prev) => ({ ...prev, files: updated }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `/api/documents/updateDocument/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editData.title,
            description: editData.description,
            files: editData.files, // array of Firebase URLs
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update document");
      }

      const result = await response.json();
      console.log("Document updated:", result);
      onSubmit(); // Call parent callback
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Update Document
          </Dialog.Title>

          <div className="space-y-4">
            <TextInput
              placeholder="Title"
              value={editData.title || ""}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <TextInput
              placeholder="Description"
              value={editData.description || ""}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
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
                onChange={onFileInputChange}
                className="hidden"
              />

              {uploadStatus && (
                <p className="text-sm text-blue-600 mt-1">{uploadStatus}</p>
              )}
            </div>

            {editData.files && editData.files.length > 0 && (
              <ul className="mt-2 text-sm space-y-1">
                {editData.files.map((fileUrl, index) => {
                  const decoded = decodeURIComponent(fileUrl);
                  const filename =
                    decoded.split("/files/")[1]?.split("?")[0] || "Unknown";
                  return (
                    <li
                      key={index}
                      className="flex justify-between items-center border-b pb-1"
                    >
                      <span title={filename}>{truncate(filename, 30)}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:underline text-xs"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button onClick={handleSave} disabled={uploading}>
              {uploading ? "Uploading..." : "Save"}
            </Button>
            <Button color="gray" onClick={onClose} disabled={uploading}>
              Cancel
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UpdateDocumentModal;
