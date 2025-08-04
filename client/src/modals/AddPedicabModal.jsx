import React, { useState, useRef } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const AddPedicabModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    number: "",
    owner: "",
    owner_contactNumber: "",
    owner_address: "",
    vehicle_type: "",
    driver: "",
    driver_contactNumber: "",
    driver_address: "",
    dateRegistered: null,
    driver_photo: "",
  });
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [defaultImg, setDefaultImg] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

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
          setForm((prev) => ({ ...prev, driver_photo: downloadURL }));
          setStatus("Upload successful!");
        });
      }
    );
  };
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };
  const handleDateChange = (e) => {
    setForm({ ...form, dateRegistered: e.target.value }); // Format: YYYY-MM-DD
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/pedicabs/addVehicle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        setForm({
          number: "",
          owner: "",
          owner_contactNumber: "",
          owner_address: "",
          vehicle_type: "",
          driver: "",
          driver_contactNumber: "",
          driver_address: "",
          dateRegistered: null,
          driver_photo: "",
        });
        setDefaultImg(
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        );
        setStatus("");
        // if (fileInputRef.current) fileInputRef.current.value = ""; // for file inputs
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving vehicle registration: " + error.message);
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
          {/* <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"> */}
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Add Pedicab
            </Dialog.Title>

            <div className="mb-4">
              <label
                htmlFor="number"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Pedicab Number
              </label>
              <TextInput
                id="number"
                type="text"
                value={form.number}
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter vehicle number"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Vehicle Type
              </label>
              <Select
                id="vehicle_type"
                value={form.vehicle_type}
                onChange={handleChange}
                className="block w-full text-sm border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Electric Bike">Electric Bike</option>
                <option value="Pedicab">Pedicab</option>
                <option value="Multicab">Multicab</option>
              </Select>
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
                htmlFor="owner"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Owner Contact Number
              </label>
              <TextInput
                id="owner_contactNumber"
                value={form.owner_contactNumber}
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
                Owner Address
              </label>
              <TextInput
                id="owner_address"
                value={form.owner_address}
                type="text"
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="driver"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Driver
              </label>
              <TextInput
                id="driver"
                value={form.driver}
                type="text"
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div className="mb-4">
              {/* Left Column - Photo */}
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
            </div>
            <div className="mb-4">
              <label
                htmlFor="owner"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Driver Contact Number
              </label>
              <TextInput
                id="driver_contactNumber"
                value={form.driver_contactNumber}
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
                Driver Address
              </label>
              <TextInput
                id="driver_address"
                value={form.driver_address}
                type="text"
                onChange={handleChange}
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dateRegistered"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Date Registered
              </label>
              <TextInput
                name="dateRegistered"
                type="date"
                value={form.dateRegistered}
                onChange={handleDateChange}
                required
              />
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

export default AddPedicabModal;
