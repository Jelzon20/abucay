import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { TextInput, Select, Button, Tabs, Label } from "flowbite-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const AddResidentModal = ({ isOpen, onClose, onAddResident }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    place_of_birth: "",
    birthday: "",
    age: "",
    relationship: "",
    singleParent: "",
    civil_status: "",
    gender: "",
    voter_status: "",
    occupation: "",
    education_attainment: "",
    email: "",
    contact_number: "",
    citizenship: "",
    fp_method: "",
    pwd: "",
    fourps: "",
    prev_address: "",
    cur_address: "",
    length_of_stay: "",
    purok: "",
    household_no: "",
    precinct_no: "",
    residentPicture: "",
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
          setFormData((prev) => ({ ...prev, residentPicture: downloadURL }));
          setStatus("Upload successful!");
        });
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = {
      ...formData,
      [name]: value,
    };

    // Compute age if birthday is changed
    if (name === "birthday") {
      const birthDate = new Date(value);
      const today = new Date();

      let ageText = "";

      const diffInMonths =
        today.getMonth() -
        birthDate.getMonth() +
        12 * (today.getFullYear() - birthDate.getFullYear());

      const diffInYears = today.getFullYear() - birthDate.getFullYear();
      const hasHadBirthdayThisYear =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());

      const realYears = hasHadBirthdayThisYear ? diffInYears : diffInYears - 1;

      if (realYears < 1) {
        ageText = `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} old`;
      } else {
        ageText = `${realYears} year${realYears !== 1 ? "s" : ""} old`;
      }

      updatedFormData.age = ageText;
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddResident(formData);
    onClose();
    resetForm();
    // console.log(formData);
  };

  const resetForm = (e) => {
    setFormData({
      first_name: "",
      middle_name: "",
      last_name: "",
      place_of_birth: "",
      birthday: "",
      age: "",
      relationship: "",
      singleParent: "",
      civil_status: "",
      gender: "",
      voter_status: "",
      occupation: "",
      education_attainment: "",
      email: "",
      contact_number: "",
      citizenship: "",
      fp_method: "",
      pwd: "",
      fourps: "",
      prev_address: "",
      cur_address: "",
      length_of_stay: "",
      purok: "",
      household_no: "",
      precinct_no: "",
      residentPicture: "",
    });
    setDefaultImg(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    setStatus("");
    if (fileInputRef.current) fileInputRef.current.value = ""; // for file inputs
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      <div className="fixed inset-0 flex items-start justify-center overflow-y-auto p-6">
        <div className="w-full max-w-6xl bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Add New Resident
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

              {/* Right Column - Tabs */}
              <div className="col-span-1 md:col-span-3">
                <Tabs style={{ textDecoration: "underline" }}>
                  {/* 1. Personal Information */}
                  <Tabs.Item title="Personal Information">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="mb-2 block">First name</Label>
                        <TextInput
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Middle name</Label>
                        <TextInput
                          name="middle_name"
                          value={formData.middle_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Last name</Label>
                        <TextInput
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Place of Birth</Label>
                        <TextInput
                          name="place_of_birth"
                          value={formData.place_of_birth}
                          onChange={handleChange}
                          placeholder="Place of Birth"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Birthday</Label>
                        <TextInput
                          name="birthday"
                          type="date"
                          value={formData.birthday}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Age</Label>
                        <TextInput
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="Age"
                          disabled
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Gender</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="gender"
                              value="Male"
                              checked={formData.gender === "Male"}
                              onChange={handleChange}
                              required
                            />
                            Male
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="gender"
                              value="Female"
                              checked={formData.gender === "Female"}
                              onChange={handleChange}
                            />
                            Female
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label className="mb-2 block">Citizenship</Label>
                        <TextInput
                          name="citizenship"
                          value={formData.citizenship}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Email</Label>
                        <TextInput
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email"
                          type="email"
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Contact number</Label>
                        <TextInput
                          name="contact_number"
                          value={formData.contact_number}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Previous Address</Label>
                        <TextInput
                          name="prev_address"
                          value={formData.prev_address}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Current Address</Label>
                        <TextInput
                          name="cur_address"
                          value={formData.cur_address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">
                          Length of stay (in years)
                        </Label>
                        <TextInput
                          name="length_of_stay"
                          value={formData.length_of_stay}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">Purok</Label>
                        <Select
                          name="purok"
                          value={formData.purok}
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
                      <div>
                        <Label className="mb-2 block">Household no.</Label>
                        <TextInput
                          name="household_no"
                          value={formData.household_no}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </Tabs.Item>

                  {/* 2. Civil and Family Status */}
                  <Tabs.Item title="Civil & Family Status">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="mb-2 block">Family Role</Label>
                        <Select
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select here</option>
                          <option value="Father">Father</option>
                          <option value="Mother">Mother</option>
                          <option value="Son">Son</option>
                          <option value="Daughter">Daughter</option>
                          <option value="Other">Other</option>
                        </Select>
                      </div>
                      {(formData.relationship === "Father" ||
                        formData.relationship === "Mother") && (
                        <div>
                          <Label className="mb-2 block">Single Parent?</Label>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="singleParent"
                                value="Yes"
                                checked={formData.singleParent === "Yes"}
                                onChange={handleChange}
                              />
                              Yes
                            </label>
                            <label className="flex items-center gap-1">
                              <input
                                type="radio"
                                name="singleParent"
                                value="No"
                                checked={formData.singleParent === "No"}
                                onChange={handleChange}
                              />
                              No
                            </label>
                          </div>
                        </div>
                      )}
                      <div>
                        <Label className="mb-2 block">Civil Status</Label>
                        <Select
                          name="civil_status"
                          value={formData.civil_status}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select here</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Widowed">Widowed</option>
                        </Select>
                      </div>
                    </div>
                  </Tabs.Item>

                  {/* 3. Voting & Government Aid */}
                  <Tabs.Item title="Voting & Government Aid">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="mb-2 block">Voter Status</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="voter_status"
                              value="Registered"
                              checked={formData.voter_status === "Registered"}
                              onChange={handleChange}
                            />
                            Registered
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="voter_status"
                              value="Not Registered"
                              checked={
                                formData.voter_status === "Not Registered"
                              }
                              onChange={handleChange}
                            />
                            Not Registered
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label className="mb-2 block">Precinct no.</Label>
                        <TextInput
                          name="precinct_no"
                          value={formData.precinct_no}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">PWD</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="pwd"
                              value="Yes"
                              checked={formData.pwd === "Yes"}
                              onChange={handleChange}
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="pwd"
                              value="No"
                              checked={formData.pwd === "No"}
                              onChange={handleChange}
                            />
                            No
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label className="mb-2 block">4Ps</Label>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="fourps"
                              value="Yes"
                              checked={formData.fourps === "Yes"}
                              onChange={handleChange}
                            />
                            Yes
                          </label>
                          <label className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="fourps"
                              value="No"
                              checked={formData.fourps === "No"}
                              onChange={handleChange}
                            />
                            No
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label className="mb-2 block">Family Planning</Label>
                        <Select
                          name="fp_method"
                          value={formData.fp_method}
                          onChange={handleChange}
                        >
                          <option value="">Select here</option>
                          <option value="None">None</option>
                          <option value="Vasectomy">Vasectomy</option>
                          <option value="Tubal Ligate">Tubal Ligate</option>
                          <option value="Implant">Implant</option>
                          <option value="Condom">Condom</option>
                          <option value="IUD">IUD</option>
                          <option value="Pill">Pill</option>
                          <option value="Injectable">Injectable</option>
                          <option value="NFP">NFP</option>
                        </Select>
                      </div>
                    </div>
                  </Tabs.Item>

                  {/* 4. Occupation & Education */}
                  <Tabs.Item title="Occupation & Education">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label className="mb-2 block">Occupation</Label>
                        <TextInput
                          name="occupation"
                          value={formData.occupation}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <Label className="mb-2 block">
                          Education Attainment
                        </Label>
                        <TextInput
                          name="education_attainment"
                          value={formData.education_attainment}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </Tabs.Item>
                </Tabs>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <Button color="gray" onClick={onClose}>
                Cancel
              </Button>

              {status === "Uploading..." ? (
                <></>
              ) : (
                <Button type="submit" color="blue">
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default AddResidentModal;
