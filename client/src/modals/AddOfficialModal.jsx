import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Label, Textarea, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const AddOfficialModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    officialPicture: "",
    name: "",
    additionalDetails: "",
    position: "",
    contact_number: "",
    term: "",
  });
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [defaultImg, setDefaultImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      uploadImage(e.target.files[0]);
    }
  };
  const uploadImage = (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setUploadProgress(progress);
        setStatus("Uploading...");
      },
      (error) => {
        console.error("Upload failed", error);
        setStatus("Upload failed. Please try again.");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDefaultImg(downloadURL);
          setForm((prev) => ({ ...prev, officialPicture: downloadURL }));
          setStatus("Upload successful!");
        });
      }
    );
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/officials/addOfficial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        resetForm();
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving record: " + error.message);
    }
    setIsLoading(false);
  };

  const resetForm = (e) => {
    setForm({
      officialPicture: "",
      name: "",
      additionalDetails: "",
      position: "",
      contactNumber: "",
      term: "",
    });
    setDefaultImg(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    setStatus("");
    if (fileInputRef.current) fileInputRef.current.value = ""; // for file inputs
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
              Add Barangay Official
            </Dialog.Title>

            <div className="mb-4">
              <div className="col-span-1 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <img
                    src={defaultImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="upload-photo"
                />
                <label htmlFor="upload-photo">
                  <Button size="sm" color="gray" as="span">
                    Change Photo
                  </Button>
                </label>
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <p className="text-sm mt-2 text-blue-500">
                    Uploading: {uploadProgress}%
                  </p>
                )}
                {status && (
                  <p className="text-sm mt-1 text-gray-600">{status}</p>
                )}
              </div>
              <label
                htmlFor="incident"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Complete Name
              </label>
              <TextInput
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter incident title"
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Additional Details
              </label>
              <TextInput
                id="additionalDetails"
                type="text"
                value={form.additionalDetails}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Position
              </label>
              <Select
                id="position"
                value={form.position}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                <option value="Punong Barangay">Punong Barangay</option>
                <option value="Sangguniang Barangay Member">
                  Sangguniang Barangay Member
                </option>
                <option value="Sangguniang Barangay Member">
                  SK Chairperson
                </option>
                <option value="Sangguniang Barangay Member">
                  Barangay Secretary
                </option>
                <option value="Sangguniang Barangay Member">SK Member</option>
                <option value="Sangguniang Barangay Member">
                  SK Secretary
                </option>
              </Select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Contact Number
              </label>
              <TextInput
                id="contactNumber"
                type="text"
                value={form.location}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="takenBy"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Term
              </label>
              <Select
                id="term"
                value={form.term}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                <option value="2023 - 2025">2023 - 2025</option>
              </Select>
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

export default AddOfficialModal;
