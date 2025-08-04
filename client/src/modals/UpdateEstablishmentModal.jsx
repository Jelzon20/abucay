import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const extractFileName = (url) => {
  try {
    const decoded = decodeURIComponent(url);
    const pathPart = decoded.split("/o/")[1].split("?")[0];
    const filename = pathPart.split("/").pop();
    const nameParts = filename.split("-");
    nameParts.shift(); // remove timestamp
    return nameParts.join("-");
  } catch (err) {
    return "Unknown File";
  }
};

const UpdateEstablishmentModal = ({
  show,
  onClose,
  editData,
  setEditData,
  onSubmit,
}) => {
  const [form, setForm] = useState({});
  const [attachments, setAttachments] = useState([]); // new files
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        establishment: editData.establishment || "",
        description: editData.description || "",
        owner: editData.owner || "",
        dateEstablished: editData.dateEstablished?.slice(0, 10) || "",
        numberOfEmployees: editData.numberOfEmployees || "",
        attachments: editData.attachments || [],
      });
      setAttachments([]);
    }
  }, [editData]);

  console.log(editData);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    setForm({ ...form, dateEstablished: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const newUploadedURLs = [];
      for (const file of attachments) {
        const fileRef = ref(
          storage,
          `establishments/${Date.now()}-${file.name}`
        );
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        newUploadedURLs.push(downloadURL);
      }

      const updatedData = {
        ...form,
        numberOfEmployees: parseInt(form.employees, 10),
        attachments: [...form.attachments, ...newUploadedURLs],
      };

      const response = await fetch(
        `/api/establishments/updateEstablishment/${editData._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update document");

      toast.success("Establishment updated successfully!");
      onSubmit();
      onClose();
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
              {/* Establishment Name */}
              <div>
                <label
                  htmlFor="establishment"
                  className="block text-sm font-medium text-gray-700 mb-1"
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

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <TextInput
                  id="description"
                  type="text"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                />
              </div>

              {/* Owner */}
              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Owner
                </label>
                <TextInput
                  id="owner"
                  type="text"
                  value={form.owner}
                  onChange={handleChange}
                  placeholder="Enter owner's name"
                />
              </div>

              {/* Date Established */}
              <div>
                <label
                  htmlFor="dateEstablished"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date Established
                </label>
                <TextInput
                  id="dateEstablished"
                  type="date"
                  value={form.dateEstablished}
                  onChange={handleDateChange}
                />
              </div>

              {/* Number of Employees */}
              <div>
                <label
                  htmlFor="employees"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Number of Employees
                </label>
                <TextInput
                  id="numberOfEmployees"
                  type="number"
                  value={form.numberOfEmployees}
                  onChange={handleChange}
                  placeholder="e.g. 20"
                />
              </div>

              {/* New Attachments */}
              <div>
                <label
                  htmlFor="attachments"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload New Attachments
                </label>
                <input
                  type="file"
                  multiple
                  id="attachments"
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files);
                    const uniqueFiles = newFiles.filter(
                      (file) => !attachments.some((f) => f.name === file.name)
                    );
                    if (uniqueFiles.length < newFiles.length) {
                      toast.warning("Duplicate files were ignored.");
                    }
                    setAttachments((prev) => [...prev, ...uniqueFiles]);
                  }}
                  className="block w-full text-sm border border-gray-300 rounded-lg text-gray-900 cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
                />
                {attachments.length > 0 && (
                  <ul className="mt-2 space-y-1 text-sm text-gray-600">
                    {attachments.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setAttachments((prev) =>
                              prev.filter((_, i) => i !== index)
                            );
                          }}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Existing Attachments */}
              {form.attachments?.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Existing Attachments
                  </label>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {form.attachments.map((url, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {extractFileName(url)}
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...form.attachments];
                            updated.splice(index, 1);
                            setForm((prev) => ({
                              ...prev,
                              attachments: updated,
                            }));
                          }}
                          className="text-red-500 text-xs hover:underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button onClick={handleSubmit}>Update</Button>
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
