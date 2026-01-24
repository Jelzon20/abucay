import React, { useState } from "react";
import contact from "../assets/contact.jpg";
import { toast, Toaster } from "sonner";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    issueType: "",
    otherIssue: "",
    address: "",
    message: "",
    preferredContact: "",
    consent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.phone.trim() &&
    formData.issueType.trim() &&
    formData.address.trim() &&
    formData.message.trim() &&
    formData.consent &&
    (formData.issueType !== "Other" || formData.otherIssue.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      setIsSubmitting(true);
      const response = await fetch("/api/contact/createReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.message || "Submission failed");
        return;
      }

      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        issueType: "",
        otherIssue: "",
        address: "",
        message: "",
        preferredContact: "",
        consent: false,
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen relative font-sans">
      <Toaster richColors position="top-center" expand={true} />

      {/* HERO */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center">
        <img
          src={contact}
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="relative z-10 text-center w-full px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
            Contact Us
          </h1>
          <p className="text-white/90 max-w-xl mx-auto text-sm md:text-base">
            We're here to help and listen to your concerns. Fill the form below
            and we'll get back to you promptly.
          </p>
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT: IMAGE/INFO */}
          <div className="hidden md:block">
            <img
              src={contact}
              alt="Contact"
              className="rounded-2xl shadow-xl w-full object-cover"
            />
          </div>

          {/* RIGHT: FORM */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Issue Type */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Issue Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an issue</option>
                  <option value="Water Supply Issues">
                    Water Supply Issues
                  </option>
                  <option value="Electricity Problems">
                    Electricity Problems
                  </option>
                  <option value="Road Conditions">Road Conditions</option>
                  <option value="Public Safety Concerns">
                    Public Safety Concerns
                  </option>
                  <option value="Waste Management Issues">
                    Waste Management Issues
                  </option>
                  <option value="Environmental Concerns">
                    Environmental Concerns
                  </option>
                  <option value="Health Services">Health Services</option>
                  <option value="Education Issues">Education Issues</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Other Issue */}
              {formData.issueType === "Other" && (
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Please specify <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="otherIssue"
                    value={formData.otherIssue}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Preferred Contact */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Preferred Method of Contact
                </label>
                <div className="flex gap-4 text-sm">
                  {["Email", "Phone Call", "SMS"].map((method) => (
                    <label key={method} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={formData.preferredContact === method}
                        onChange={handleChange}
                      />
                      {method}
                    </label>
                  ))}
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleChange}
                />
                <p>I consent to the collection and use of my information.</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isFormValid || isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  !isFormValid || isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white px-8 py-6 rounded-2xl shadow-xl text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-sm font-medium">Submitting your report...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
