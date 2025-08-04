import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
const UpdatePedicabModal = ({
  show,
  onClose,
  editData,
  setEditData,
  onSubmit,
}) => {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form when modal is shown or editData changes
  useEffect(() => {
    if (editData) {
      setForm({
        number: editData.number || "",
        vehicle_type: editData.vehicle_type || "",
        owner: editData.owner || "",
        owner_contactNumber: editData.owner_contactNumber || "",
        owner_address: editData.owner_address || "",
        driver: editData.driver || "",
        driver_contactNumber: editData.driver_contactNumber || "",
        driver_address: editData.driver_address || "",
        dateRegistered: editData.dateRegistered?.slice(0, 10) || "",
        driver_photo: editData.driver_photo || "",
      });
    }
  }, [editData]);

  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("");
  const [defaultImg, setDefaultImg] = useState(editData.driver_photo);

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
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleDateChange = (e) => {
    setForm({ ...form, dateRegistered: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/pedicabs/updateVehicle/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update pedicab record.");
      }

      const result = await response.json();
      //   toast.success("Establishment updated successfully!");
      onSubmit(); // Notify parent
      onClose(); // Close modal
    } catch (error) {
      toast.error("Error updating pedicab record");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(editData);

  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <Toaster richColors position="top-center" expand={true} />
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Update Pedicab
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="establishment"
                  className="block text-sm font-medium mb-2"
                >
                  Pedicab number
                </label>
                <TextInput
                  id="establishment"
                  type="text"
                  value={form.number}
                  onChange={handleChange}
                  placeholder="Enter pedicab number"
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

              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium mb-2"
                >
                  Owner
                </label>
                <TextInput
                  id="owner"
                  type="text"
                  value={form.owner}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium mb-2"
                >
                  Owner Contact Number
                </label>
                <TextInput
                  id="owner_contactNumber"
                  type="text"
                  value={form.owner_contactNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium mb-2"
                >
                  Owner Address
                </label>
                <TextInput
                  id="owner_address"
                  type="text"
                  value={form.owner_address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="driver"
                  className="block text-sm font-medium mb-2"
                >
                  Driver
                </label>
                <TextInput
                  id="driver"
                  type="text"
                  value={form.driver}
                  onChange={handleChange}
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

              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium mb-2"
                >
                  Driver Contact Number
                </label>
                <TextInput
                  id="driver_contactNumber"
                  type="text"
                  value={form.driver_contactNumber}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  htmlFor="owner"
                  className="block text-sm font-medium mb-2"
                >
                  Driver Address
                </label>
                <TextInput
                  id="driver_address"
                  type="text"
                  value={form.driver_address}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="dateRegistered"
                  className="block text-sm font-medium mb-2"
                >
                  Date Registered
                </label>
                <TextInput
                  id="dateRegistered"
                  type="date"
                  value={form.dateRegistered}
                  onChange={handleDateChange}
                  required
                />
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

export default UpdatePedicabModal;
