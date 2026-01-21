import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Button, Label, Select } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const UpdateBarangayInstitutionModal = ({
  show,
  onClose,
  editData,
  setEditData,
  onSubmit,
}) => {
  const [form, setForm] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setForm({
        type: editData.type || "",
        typeOthers: editData.typeOthers || "",
        firstName: editData.firstName || "",
        lastName: editData.lastName || "",
        gender: editData.gender || "",
        contactNumber: editData.contactNumber || "",
        address: editData.address || "",
        purokAssigned: editData.purokAssigned || "",
        photo: editData.photo || "",
      });
    }
  }, [editData]);

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
          setForm((prev) => ({ ...prev, photo: downloadURL }));
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
      const res = await fetch(`/api/bbi/updateInstitution/${editData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        onClose();
        onSubmit();
        setForm({
          type: "",
          typeOthers: "",
          photo: "",
          firstName: "",
          lastName: "",
          gender: "",
          contactNumber: "",
          address: "",
          purokAssigned: "",
          photo: "",
        });
      } else {
        toast.error(data.error || "Something went wrong.");
      }
    } catch (error) {
      toast.error("Error saving a record: " + error.message);
    }
    setIsLoading(false);
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
              Update Barangay-Based Institution Record
            </Dialog.Title>

            <div className="mb-4">
              {/* Left Column - Photo */}
              <div className="col-span-1 flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-gray-200 overflow-hidden mb-4">
                  <img
                    src={form.photo || defaultImg}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="photo"
                />
                <label htmlFor="photo">
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

            {/* Type */}
            <div className="mb-4">
              <Label htmlFor="location">Type of Institution</Label>
              <Select
                id="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                <option value="Brgy. Health Worker">Brgy. Health Worker</option>
                <option value="Brgy. Nutrition Scholar">
                  Brgy. Nutrition Scholar
                </option>
                <option value="Brgy. Service Point Officer">
                  Brgy. Service Point Officer
                </option>
                <option value="Brgy. Tanod">Brgy. Tanod</option>
                <option value="Brgy. Aide">Brgy. Aide</option>
                <option value="Others">Others</option>
              </Select>

              {/* Show text input if 'Others' is selected */}
              {form.type === "Others" && (
                <div className="mt-2">
                  <Label htmlFor="otherType">Please specify</Label>
                  <TextInput
                    id="typeOthers"
                    value={form.typeOthers || ""}
                    onChange={handleChange}
                    placeholder="Enter institution type"
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <Label>First name</Label>
              <TextInput
                id="firstName"
                type="text"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label>Last name</Label>
              <TextInput
                id="lastName"
                type="text"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <Label>Gender</Label>
              <Select id="gender" value={form.gender} onChange={handleChange}>
                <option value="">Select here</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </div>
            <div className="mb-4">
              <Label>Contact Number</Label>
              <TextInput
                id="contactNumber"
                type="number"
                value={form.contactNumber}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label>Address</Label>
              <TextInput
                id="address"
                type="text"
                value={form.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <Label>Purok</Label>
              <Select
                id="purokAssigned"
                value={form.purokAssigned}
                onChange={handleChange}
                required
              >
                <option value="">Select here</option>
                <option value="Purok 1">Purok 1</option>
                <option value="Purok 1">Purok 2</option>
                <option value="Purok 3">Purok 3</option>
                <option value="Purok 4">Purok 4</option>
                <option value="Purok 5">Purok 5</option>
                <option value="Purok 6">Purok 6</option>
                <option value="Purok 7">Purok 7</option>
              </Select>
            </div>

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

export default UpdateBarangayInstitutionModal;
