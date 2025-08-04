import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { storage } from "../firebase"; // adjust path as needed
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddEstablishmentModal = ({ show, onClose, onSubmit }) => {
  const [attachments, setAttachments] = useState([]);
  const [form, setForm] = useState({
    establishment: "",
    description: "",
    address: "",
    establishment_type: "",
    owner: "",
    dateEstablished: null,
    numberOfEmployees: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleDateChange = (e) => {
    setForm({ ...form, dateEstablished: e.target.value }); // Format: YYYY-MM-DD
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. Upload files to Firebase
      const uploadedURLs = [];
      for (const file of attachments) {
        const fileRef = ref(
          storage,
          `establishments/${Date.now()}-${file.name}`
        );
        await uploadBytes(fileRef, file);
        const downloadURL = await getDownloadURL(fileRef);
        uploadedURLs.push(downloadURL);
      }

      // 2. Prepare form data with download URLs
      const payload = {
        ...form,
        attachments: uploadedURLs,
      };

      // 3. Submit to your API
      const res = await fetch("/api/establishments/addEstablishment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        setForm({
          establishment: "",
          establishment_type: "",
          address: "",
          description: "",
          owner: "",
          dateEstablished: null,
          numberOfEmployees: "",
        });
        setAttachments([]);
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving establishment: " + error.message);
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
              Add Establishment
            </Dialog.Title>

            <div className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="establishment"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Establishment
                </label>
                <TextInput
                  id="establishment"
                  type="text"
                  value={form.establishment}
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter an establishment name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Establishment Type
                </label>
                <Select
                  id="establishment_type"
                  value={form.establishment_type}
                  onChange={handleChange}
                  className="block w-full text-sm border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="">Select Establishment Type</option>
                  <option value="Business">Business</option>
                  <option value="Church">Church</option>
                  <option value="Hospital">Hospital</option>
                  <option value="Office">Office</option>
                  <option value="School">School</option>
                </Select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Description
                </label>
                <TextInput
                  id="description"
                  value={form.description}
                  type="text"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Owner
                </label>
                <TextInput
                  id="owner"
                  value={form.owner}
                  type="text"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Address
                </label>
                <TextInput
                  id="address"
                  value={form.address}
                  type="text"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label
                  htmlFor="dateEstablished"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date Established
                </label>
                <TextInput
                  name="birthday"
                  type="date"
                  value={form.dateEstablished}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="employees"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Number of Employees
                </label>
                <TextInput
                  id="numberOfEmployees"
                  value={form.numberOfEmployees}
                  type="number"
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="attachments"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Attachments
                </label>
                <input
                  type="file"
                  multiple
                  id="attachments"
                  onChange={(e) => {
                    setAttachments((prev) => [
                      ...prev,
                      ...Array.from(e.target.files),
                    ]);
                  }}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
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

export default AddEstablishmentModal;
